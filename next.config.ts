import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/', 
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/notes',
        destination: '/notes/filter/all',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;