/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      // Allow localhost for development
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
        pathname: '/api/v1/artwork/**',
      },
      // Allow bilibili image CDN
      {
        protocol: 'http',
        hostname: '*.hdslb.com',
        port: '',
        pathname: '/**',
      },
      // Allow cloudflare r2 buckets
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
