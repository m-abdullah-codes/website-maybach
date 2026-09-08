// Lighthouse runner: node scripts/lh.mjs <path> [runs] [label]
// Mobile preset, simulated slow 4G. Prints every run and the median.
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import fs from "node:fs";

const [, , path = "/", runsArg = "3", label = ""] = process.argv;
const origin = process.env.ORIGIN || "http://localhost:3100";
const url = /^https?:/.test(path) ? path : origin + path;
const runs = Number(runsArg);
const cats = (process.env.CATS || "performance").split(",");
// BLOCK="pattern1,pattern2" drops matching requests, for isolating what a resource costs.
const blocked = process.env.BLOCK ? process.env.BLOCK.split(",") : undefined;

const med = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const rows = [];

const flags = ["--headless=new", "--no-sandbox", "--disable-gpu"];
if (process.env.INSECURE) flags.push("--ignore-certificate-errors");
const chrome = await launch({ chromeFlags: flags });
for (let i = 0; i < runs; i++) {
  const r = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: cats, blockedUrlPatterns: blocked });
  const a = r.lhr.audits, c = r.lhr.categories;
  const n = (id) => (a[id] ? a[id].numericValue : 0);
  const row = {
    perf: c.performance ? Math.round(c.performance.score * 100) : 0,
    fcp: n("first-contentful-paint"),
    lcp: n("largest-contentful-paint"),
    tbt: n("total-blocking-time"),
    cls: n("cumulative-layout-shift"),
    si: n("speed-index"),
    a11y: c.accessibility ? Math.round(c.accessibility.score * 100) : "-",
    bp: c["best-practices"] ? Math.round(c["best-practices"].score * 100) : "-",
    seo: c.seo ? Math.round(c.seo.score * 100) : "-",
  };
  rows.push(row);
  console.log(`run${i + 1}`, JSON.stringify({ ...row, fcp: Math.round(row.fcp), lcp: Math.round(row.lcp), tbt: Math.round(row.tbt), si: Math.round(row.si), cls: +row.cls.toFixed(3) }));
  if (label) fs.writeFileSync(`qa/lighthouse/${label}-${i + 1}.json`, r.report);
}
await chrome.kill();

const f = (k, d = 0) => med(rows.map((r) => r[k])).toFixed(d);
console.log(`MEDIAN ${label || path}  perf ${f("perf")}  fcp ${f("fcp")}  lcp ${f("lcp")}  tbt ${f("tbt")}  cls ${f("cls", 3)}  si ${f("si")}`);
