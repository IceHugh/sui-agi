import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true,
  serverExternalPackages: ["@mastra/*"],
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
