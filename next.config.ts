import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // disables next/image optimization for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", 
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
