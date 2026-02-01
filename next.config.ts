import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  
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
  // AJOUTER CECI :
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
