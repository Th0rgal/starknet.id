/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    domains: [
      "i.ibb.co",
      "starknet.id",
      "starknetid.netlify.app",
      "robohash.org",
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:slug*",
        headers: [
          {
            key: "content-type",
            value: "image/svg+xml",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;