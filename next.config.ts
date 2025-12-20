import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    viewTransition: true,
    inlineCss: true,
    optimizePackageImports: [
      'lucide-react',
      'zod',
      'sonner',
      'date-fns',
      'lodash'
    ],
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