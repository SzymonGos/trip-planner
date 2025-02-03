/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
