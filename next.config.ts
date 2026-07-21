import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.0.105"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
