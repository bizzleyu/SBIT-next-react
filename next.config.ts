import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/SBTI-test',
  images: { unoptimized: true },
};

export default nextConfig;
