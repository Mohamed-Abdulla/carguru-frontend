import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://129.154.249.140:3003/api/:path*",
      },
    ];
  },
};

export default nextConfig;