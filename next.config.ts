import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", // TMDB posters/backdrops
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // avatar placeholder
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  reactStrictMode: true,
};

export default nextConfig;