import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/pdf-to-txt" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  env: {
    BASE_PATH: basePath,
  },
  trailingSlash: true,
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
