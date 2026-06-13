import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image domains if needed in the future
    remotePatterns: [],
    // Allow SVG files (used as placeholders until real images are uploaded)
    // Safe because we control all SVG content in the /public folder
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
