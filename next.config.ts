/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" }
    ],
  },
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
};
export default nextConfig;
