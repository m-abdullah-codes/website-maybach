import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Nothing on this site differs between two visitors: 37 routes, all prerendered, no cookies, no
  // headers, no revalidation. So the build writes them out as files and there is no server in front
  // of a page view at all — see scripts/flatten-export.mjs for how /en becomes the root, and
  // src/worker/index.ts for the one endpoint that does still run (the enquiry form).
  output: "export",
  reactStrictMode: true,
  devIndicators: false,
  // QA builds can be given their own output directory (MB_DIST_DIR=.next-qa npm run build) so a running
  // dev server cannot overwrite the production build the screenshots are taken from. Unset in normal use.
  ...(process.env.MB_DIST_DIR ? { distDir: process.env.MB_DIST_DIR } : {}),
  // `headers()` does not run in an export — there is nothing to run it. Every rule it used to carry
  // now lives in public/_headers, which is what the Cloudflare asset store reads.
  images: {
    // scripts/derive-images.mjs encodes every size ahead of the build; the loader picks one.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1680],
    // No overlap with deviceSizes, so srcsets carry no duplicate candidates.
    // 384 is dropped deliberately: it sits 1.5% below the 390 device size, and the two together made
    // the same photograph fetch twice on a phone — the car hero at `100vw` resolved to 390 and the same
    // file as a gallery tile at `86vw` resolved to 384, ~40 kB of the identical picture.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512],
  },
};

export default withNextIntl(nextConfig);
