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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/:lang/seo-services',
        destination: '/:lang/services/seo',
        permanent: true,
      },
      {
        source: '/:lang/web-development-services',
        destination: '/:lang/services/web-development',
        permanent: true,
      },
      {
        source: '/:lang/local-seo',
        destination: '/:lang/services/local-seo',
        permanent: true,
      },
      {
        source: '/:lang/wordpress-woocommerce-development',
        destination: '/:lang/services/wordpress-development',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
