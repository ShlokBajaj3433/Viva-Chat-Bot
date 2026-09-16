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
  // Exclude canvg and related packages from server-side bundling to fix Turbopack errors
  serverExternalPackages: ["canvg", "canvas", "dompurify", "@xmldom/xmldom"],
};

export default nextConfig;
