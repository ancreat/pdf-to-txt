import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/pdf-to-txt" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  env: {
    BASE_PATH: basePath,
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: false,
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
