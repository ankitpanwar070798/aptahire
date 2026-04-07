import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      { protocol: "https", hostname: "deepsense.in" },
      { protocol: "https", hostname: "aptahire.ai" },
      { protocol: "https", hostname: "www.aptahire.ai" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  compress: true,
};

export default nextConfig;
