import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  // basePath: '/moviemesh', // name of your GitHub repo
  // images: {
  //   unoptimized: true, // disables next/image optimization for static export
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // replace with the domain of your images
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;