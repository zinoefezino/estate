import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Raise Server Action upload limit (default is 1MB — phone photos exceed it)
  serverActions: {
    bodySizeLimit: "10mb",
  },
  experimental: {
    // Next 16 proxy layer also caps request bodies — keep in sync
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
