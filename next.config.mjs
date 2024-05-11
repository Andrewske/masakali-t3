// import MillionLint from '@million/lint';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { withSentryConfig } from "@sentry/nextjs";
import withBundleAnalyzer from '@next/bundle-analyzer'

import { env } from "./src/env.mjs";

await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgur.com', 'avatar.iran.liara.run', 'lh3.googleusercontent.com', 'dynamic-media-cdn.tripadvisor.com']
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
}
const analyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});


export default withSentryConfig(env.ANALYZE === 'true' ? { ...nextConfig, ...analyzerConfig } : nextConfig,
  {
    silent: true,
    org: "andrewske",
    project: "masakali",
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  })