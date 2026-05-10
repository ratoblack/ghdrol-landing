import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghmuscle.com.br",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
