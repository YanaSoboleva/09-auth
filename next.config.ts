// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'ac.goit.global',
//         pathname: '/**',
//       },
//     ],
//   },

//   async redirects() {
//     return [
//       {
//         source: '/notes',
//         destination: '/notes/filter/all',
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;

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

  // Rewrites дозволяють показувати контент з одного шляху за іншою адресою
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/', // Користувач бачить головну, але в URL залишається /home
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