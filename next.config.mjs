// import MillionLint from '@million/lint';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { withSentryConfig } from "@sentry/nextjs";
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

}

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "andrewske",
  project: "masakali",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  automaticVercelMonitors: true,
  disableLogger: true,
}

export default MillionLint.next({ rsc: true })(withSentryConfig(nextConfig, sentryWebpackPluginOptions))