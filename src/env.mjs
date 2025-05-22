import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    SMOOBU_API_URL: z.string(),
    SMOOBU_API_KEY: z.string(),
    EMAIL_SERVER_USER: z.string(),
    EMAIL_SERVER_PASSWORD: z.string(),
    EMAIL_SERVER_HOST: z.string(),
    EMAIL_SERVER_PORT: z.string(),
    EMAIL_FROM: z.string(),
    CURRENCY_API_KEY: z.string(),
    WEBSITE_DISCOUNT: z.string(),
    WEBSITE_TAX: z.string(),
    SENDGRID_API_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    XENDIT_SECRET_KEY: z.string(),
    XENDIT_TEST_SECRET_KEY: z.string(),
    DISCOUNT_CODE: z.string(),
    ANALYZE: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
    SMOOBU_SETTINGS_CHANNEL_ID: z.string(),
    GOOGLE_SERVICE_KEY: z.string(),
    RETREAT_LEADS_SPREADSHEET_ID: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_SMOOBU_SURYA_ID: z.string(),
    NEXT_PUBLIC_SMOOBU_CHANDRA_ID: z.string(),
    NEXT_PUBLIC_SMOOBU_JALA_ID: z.string(),
    NEXT_PUBLIC_SMOOBU_AKASHA_ID: z.string(),
    NEXT_PUBLIC_SMOOBU_LAKSHMI_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
    NEXT_PUBLIC_XENDIT_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_XENDIT_PUBLIC_TEST_KEY: z.string(),
    NEXT_PUBLIC_IS_PRODUCTION: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),

  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_SMOOBU_SURYA_ID: process.env.NEXT_PUBLIC_SMOOBU_SURYA_ID,
    NEXT_PUBLIC_SMOOBU_CHANDRA_ID: process.env.NEXT_PUBLIC_SMOOBU_CHANDRA_ID,
    NEXT_PUBLIC_SMOOBU_JALA_ID: process.env.NEXT_PUBLIC_SMOOBU_JALA_ID,
    NEXT_PUBLIC_SMOOBU_AKASHA_ID: process.env.NEXT_PUBLIC_SMOOBU_AKASHA_ID,
    NEXT_PUBLIC_SMOOBU_LAKSHMI_ID: process.env.NEXT_PUBLIC_SMOOBU_LAKSHMI_ID,
    SMOOBU_API_URL: process.env.SMOOBU_API_URL,
    SMOOBU_API_KEY: process.env.SMOOBU_API_KEY,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    CURRENCY_API_KEY: process.env.CURRENCY_API_KEY,
    WEBSITE_DISCOUNT: process.env.WEBSITE_DISCOUNT,
    WEBSITE_TAX: process.env.WEBSITE_TAX,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    NEXT_PUBLIC_XENDIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY,
    XENDIT_SECRET_KEY: process.env.XENDIT_SECRET_KEY,
    XENDIT_TEST_SECRET_KEY: process.env.XENDIT_TEST_SECRET_KEY,
    NEXT_PUBLIC_XENDIT_PUBLIC_TEST_KEY: process.env.NEXT_PUBLIC_XENDIT_PUBLIC_TEST_KEY,
    NEXT_PUBLIC_IS_PRODUCTION: process.env.NEXT_PUBLIC_IS_PRODUCTION,
    DISCOUNT_CODE: process.env.DISCOUNT_CODE,
    ANALYZE: process.env.ANALYZE,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SMOOBU_SETTINGS_CHANNEL_ID: process.env.SMOOBU_SETTINGS_CHANNEL_ID,
    GOOGLE_SERVICE_KEY: process.env.GOOGLE_SERVICE_KEY,
    RETREAT_LEADS_SPREADSHEET_ID: process.env.RETREAT_LEADS_SPREADSHEET_ID,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  }
});
