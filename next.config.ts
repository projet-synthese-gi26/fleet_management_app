import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Configuration du Proxy pour rediriger les appels API vers le serveur de la collaboratrice
  async rewrites() {
    return [
      {
        // Tous les appels commençant par /api/proxy seront redirigés
        source: "/api/proxy/:path*",
        // URL du serveur backend (IP fournie dans ton api-client)
        destination: "http://192.168.180.48:8080/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;