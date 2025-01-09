import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || "",
  },
};

export default nextConfig;
