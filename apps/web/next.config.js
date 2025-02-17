/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || '',
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
