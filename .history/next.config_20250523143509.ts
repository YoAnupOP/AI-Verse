import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: Also disable TypeScript errors during build (if needed)
  typescript: {
    ignoreBuildErrors: false, // Keep this false to catch real TypeScript errors
  }
};

export default nextConfig;