import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    viewTransition: true,
    inlineCss: true,
    // optimizePackageImports: ['lucide-react', 'zod', 'sonner'],
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
};

export default nextConfig;