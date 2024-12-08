/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // now we let images from all sources
      },
      {
        protocol: "http",
        hostname: "*", // now we let images from all sources
      },
    ],
  },
};

module.exports = nextConfig;
