import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Ajout des rewrites pour faire passer les appels API par le serveur Node de Next.js
  // Cela cache votre origine localhost au serveur distant
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://fleet-management-geofence.pynfi.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;