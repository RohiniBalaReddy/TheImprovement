/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compress: true,
  reactStrictMode: true,
  experimental: {
    modern: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dreamcasaimages.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },

      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: "vendor",
            chunks: "all",
            priority: 10,
            minSize: 20000,
            maxSize: 40000,
          },
        },
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        moment$: "moment/moment.js",
      };
    }

    return config;
  },
};

module.exports = nextConfig;
