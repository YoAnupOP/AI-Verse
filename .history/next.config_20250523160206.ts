import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Completely disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Also ignore TypeScript errors temporarily
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;