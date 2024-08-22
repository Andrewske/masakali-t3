// import MillionLint from '@million/lint';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { withSentryConfig } from "@sentry/nextjs";
// import withBundleAnalyzer from '@next/bundle-analyzer'

// import { env } from "./src/env.mjs";

await import('./src/env.mjs');



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

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)