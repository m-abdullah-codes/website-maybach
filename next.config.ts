import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // QA builds can be given their own output directory (MB_DIST_DIR=.next-qa npm run build) so a running
  // dev server cannot overwrite the production build the screenshots are taken from. Unset in normal use.
  ...(process.env.MB_DIST_DIR ? { distDir: process.env.MB_DIST_DIR } : {}),
  async headers() {
    // The faces are content-stable (scripts/subset-fonts.py bumps the ?v token when they are not).
    return [{ source: "/fonts/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1680],
    // No overlap with deviceSizes, so srcsets carry no duplicate candidates.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000,
  },
};

export default withNextIntl(nextConfig);
