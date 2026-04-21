import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/novabrew-quiz",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
