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
  /** URLs amigáveis espelhando kits (a página oficial usa funis em go.ghmuscle.com.br). */
  async redirects() {
    return [
      {
        source: "/checkout/1-unidade",
        destination: "/checkout/1",
        permanent: false,
      },
      {
        source: "/checkout/2-unidades",
        destination: "/checkout/2",
        permanent: false,
      },
      {
        source: "/checkout/3-unidades",
        destination: "/checkout/3",
        permanent: false,
      },
      {
        source: "/checkout/5-unidades",
        destination: "/checkout/5",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
