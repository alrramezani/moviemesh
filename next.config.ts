import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/moviemesh', // name of your GitHub repo
  images: {
    unoptimized: true, // disables next/image optimization for static export
  },
};

export default nextConfig;