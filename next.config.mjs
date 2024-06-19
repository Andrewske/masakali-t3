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
    domains: ['imgur.com', 'avatar.iran.liara.run', 'lh3.googleusercontent.com', 'dynamic-media-cdn.tripadvisor.com']

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