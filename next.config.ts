import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "ik.imagekit.io",
  //       port: "",
  //     },
  //   ],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exclude canvg and related packages from server-side bundling
  serverExternalPackages: ["canvg", "canvas", "dompurify", "@xmldom/xmldom"],
  experimental: {
    serverComponentsExternalPackages: ["canvg", "canvas"],
  },
};

export default nextConfig;
