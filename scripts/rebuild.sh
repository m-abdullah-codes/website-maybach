#!/usr/bin/env bash
# Rebuild and restart the production server on 3100: kill, build, start detached, wait, warm.
set -e
cd "$(dirname "$0")/.."
for pid in $(powershell.exe -NoProfile -Command "(Get-NetTCPConnection -LocalPort 3100 -State Listen -ErrorAction SilentlyContinue).OwningProcess" 2>/dev/null | tr -d '\r'); do
  [ -n "$pid" ] && powershell.exe -NoProfile -Command "Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue" >/dev/null 2>&1 || true
done
sleep 1
npm run build 2>&1 | grep -E "Compiled|error|Error|Failed|warn|First Load JS shared" | head -8
powershell.exe -NoProfile -Command "Start-Process -FilePath 'node' -ArgumentList 'node_modules/next/dist/bin/next','start','-p','3100' -WorkingDirectory '$(pwd -W 2>/dev/null || pwd)' -WindowStyle Hidden" >/dev/null 2>&1
for i in $(seq 1 30); do
  [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3100/ || true)" = "200" ] && { echo "server up"; break; }
  sleep 1
done
# Warm the image optimiser for the hero candidates so Lighthouse never times a cold sharp encode.
for w in 390 512 640 768 1024 1280 1440; do
  curl -s -o /dev/null -H "Accept: image/avif,image/webp,*/*" "http://localhost:3100/_next/image?url=%2Fimages%2Fmb-cul-cut-b.png&w=$w&q=78"
  curl -s -o /dev/null -H "Accept: image/avif,image/webp,*/*" "http://localhost:3100/_next/image?url=%2Fimages%2Fmb-hm-hero-bg-m.png&w=$w&q=75"
done
# Guard: a stray `next dev` overwrites .next and leaves `next start` serving HTML whose stylesheet
# 404s, which silently invalidates any measurement taken against it.
css=$(curl -s http://localhost:3100/ | grep -o "/_next/static/css/[a-z0-9]*\.css" | head -1)
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3100$css")
[ "$code" = "200" ] || { echo "STYLESHEET $css -> $code: the build on disk is not the one being served"; exit 1; }
echo "warmed (stylesheet $code)"
