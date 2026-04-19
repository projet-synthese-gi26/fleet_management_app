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
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        // Teste avec HTTP si le HTTPS échoue
        destination: "https://fleet-management-geofence.pynfi.com/api/v1/:path*",
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;