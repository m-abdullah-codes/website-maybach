import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1680],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768],
    minimumCacheTTL: 31536000,
  },
};

export default withNextIntl(nextConfig);
