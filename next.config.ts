import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default Server Action body limit is 1MB — too small for property photos
    serverActions: {
      bodySizeLimit: "10mb",
    },
    // Next 16 proxy layer also caps bodies — keep in sync
    proxyClientMaxBodySize: "10mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;