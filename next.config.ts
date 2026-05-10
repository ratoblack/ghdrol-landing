import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Raiz do projeto no build (evita aviso de lockfile duplo local; compatível com Vercel ESM)
  turbopack: {
    root: process.cwd(),
  },
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
