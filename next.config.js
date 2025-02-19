/** @type {import('next').NextConfig} */

const basePath = process.env.NODE_ENV === "production" ? "/pdf-to-txt" : "";

const nextConfig = {
  output: "export",
  basePath: basePath,
  env: {
    BASE_PATH: basePath,
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  skipTrailingSlashRedirect: true,
  devIndicators: {
    appIsrStatus: false,
  },
};

module.exports = nextConfig;
