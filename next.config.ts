import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/drcenik-complete' : '',
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '169.254.0.21:3000',
    '*.manus.computer',
  ],
};

export default nextConfig;
