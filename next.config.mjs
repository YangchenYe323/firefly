import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },

  images: {
    remotePatterns: [
      // Allow API service on localhost for development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8787',
        pathname: '/api/v1/artwork/**',
      },
      // Allow any HTTPS domain for production (more flexible)
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      // Allow bilibili image CDN. God knows why they are not using https.
      {
        protocol: 'http',
        hostname: '*.hdslb.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
