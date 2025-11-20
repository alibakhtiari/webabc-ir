import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    // dynamicIO: true, // Enable for 'use cache' support if using Next.js 15+ canary or specific versions where it's available. 
    // For now, keeping it simple unless we are on a specific canary that requires it.
    // 'use cache' is part of the new caching semantics.
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
