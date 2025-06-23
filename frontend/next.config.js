/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  turbopack: {
    rules: {

    },
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig; 