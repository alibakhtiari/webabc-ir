import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  experimental: {
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Static export does not support headers() or redirects() in next.config.js
  // Use _headers or _redirects files for Cloudflare Pages if needed.
};

export default nextConfig;
