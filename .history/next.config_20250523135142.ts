import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Enable static exports for GitHub Pages
  basePath: "/ai-verse",  // GitHub Pages serves under /repository-name
  assetPrefix: "/ai-verse",  // Ensure assets load correctly
  trailingSlash: true,  // Add trailing slashes to URLs
  images: {
    unoptimized: true  // Disable Next.js image optimization for static export
  }
};

export default nextConfig;