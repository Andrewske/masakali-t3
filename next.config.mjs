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
      {
        protocol: 'https',
        hostname: 'utfs.io',
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

export default withSentryConfig(withSentryConfig(nextConfig, sentryWebpackPluginOptions), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "andrewske",
project: "masakali",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});