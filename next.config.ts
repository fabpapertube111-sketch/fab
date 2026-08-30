import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-fab-paper-tube.pantheonsite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pantheonsite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.wordpress.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Skip optimization for external WP images to avoid domain errors
    unoptimized: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
