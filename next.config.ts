import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Required for 'use cache' and advanced caching in Next.js 15+
    // dynamicIO: true,
  },
  images: {
    // Cloudflare Free Tier doesn't support Node.js image optimization API
    // We use 'unoptimized' to serve images as-is (super fast) or use a loader
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
