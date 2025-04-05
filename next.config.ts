import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run"
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl"
      }
    ]
  }
};

export default nextConfig;
