// HTTP/2 in front of `next start`, so the build can be measured the way Vercel serves it (one
// multiplexed connection) rather than over HTTP/1.1's six. Test only.
//   node scripts/h2-proxy.mjs <certDir> [listenPort=3443] [upstreamPort=3100]
import http2 from "node:http2";
import http from "node:http";
import fs from "node:fs";

const [, , certDir, listen = "3443", upstream = "3100"] = process.argv;
const server = http2.createSecureServer({
  key: fs.readFileSync(`${certDir}/key.pem`),
  cert: fs.readFileSync(`${certDir}/cert.pem`),
  allowHTTP1: true,
});

server.on("sessionError", () => {});
server.on("clientError", (_e, socket) => socket.destroy());
server.on("stream", (stream, headers) => {
  stream.on("error", () => {});
  const path = headers[":path"];
  const method = headers[":method"];
  const out = {};
  for (const [k, v] of Object.entries(headers)) if (!k.startsWith(":")) out[k] = v;
  out.host = `localhost:${upstream}`;
  const req = http.request({ host: "127.0.0.1", port: Number(upstream), path, method, headers: out }, (res) => {
    const h = { ":status": res.statusCode };
    for (const [k, v] of Object.entries(res.headers)) {
      if (["connection", "keep-alive", "transfer-encoding", "upgrade"].includes(k)) continue;
      h[k] = v;
    }
    if (stream.destroyed) { res.destroy(); return; }
    stream.respond(h);
    res.pipe(stream);
    res.on("error", () => stream.destroyed || stream.end());
  });
  req.on("error", () => { try { stream.respond({ ":status": 502 }); stream.end(); } catch {} });
  // GET/HEAD streams are already half-closed by the client, so piping would never end the request.
  if (method === "GET" || method === "HEAD" || stream.readableEnded) req.end();
  else stream.pipe(req);
});

// HTTP/1.1 fallback (curl and other tools that skip ALPN), so the same port serves both.
server.on("request", (creq, cres) => {
  if (creq.httpVersionMajor === 2) return;
  const headers = { ...creq.headers, host: `localhost:${upstream}` };
  const req = http.request({ host: "127.0.0.1", port: Number(upstream), path: creq.url, method: creq.method, headers }, (res) => {
    cres.writeHead(res.statusCode, res.headers);
    res.pipe(cres);
  });
  req.on("error", () => { cres.writeHead(502); cres.end(); });
  creq.pipe(req);
});

server.listen(Number(listen), () => console.log(`h2 on https://localhost:${listen} -> :${upstream}`));
