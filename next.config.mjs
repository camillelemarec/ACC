/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.backblazeb2.com" },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;

