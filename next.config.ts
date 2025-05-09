import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export" as const, // 启用静态导出
  trailingSlash: true,
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
