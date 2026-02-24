import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://nextjs-skill-bridge-backend-project.onrender.com/api/auth/:path*",
      },
    ];
  },
};



export default nextConfig;
