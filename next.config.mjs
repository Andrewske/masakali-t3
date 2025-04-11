// import MillionLint from '@million/lint';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import MillionLint from "@million/lint";
// import withBundleAnalyzer from '@next/bundle-analyzer'
import "./src/env.js";



/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/public',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a-/**',
      },
      {
        protocol: 'https',
        hostname: 'dynamic-media-cdn.tripadvisor.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '67rl3g15b4.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],

  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/ingest/static/:path*",
  //       destination: "https://us-assets.i.posthog.com/static/:path*",
  //       has: [
  //         {
  //           type: 'header',
  //           key: 'Origin',
  //           value: 'http://localhost:3000',
  //         },
  //       ],
  //     },
  //     {
  //       source: "/ingest/:path*",
  //       destination: "https://us.i.posthog.com/:path*",
  //     },
  //     {
  //       source: "/ingest/decide",
  //       destination: "https://us.i.posthog.com/decide",
  //     },
  //   ];
  // },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       path: false,
  //       crypto: false,
  //     };
  //   }
  //   return config;
  // },
}

export default MillionLint.next({ rsc: true })(nextConfig)
