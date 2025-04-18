import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'opus.ing',
      'image.aladin.co.kr',
      'www.deviantart.com',
      'w0.peakpx.com',
      'avatars.githubusercontent.com',
    ],
  },

  experimental: {
    ppr: 'incremental',
  },

  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript build errors
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during build
  },
};

export default nextConfig;
