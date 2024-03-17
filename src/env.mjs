import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

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
    STRIPE_TEST_KEY: z.string(),
    STRIPE_LOCAL_SECRET: z.string(),
    CURRENCY_API_KEY: z.string(),
    WEBSITE_DISCOUNT: z.string(),
    WEBSITE_TAX: z.string(),
    PAYPAL_SECRET: z.string(),
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
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string(),
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
    STRIPE_TEST_KEY: process.env.STRIPE_TEST_KEY,
    STRIPE_LOCAL_SECRET: process.env.STRIPE_LOCAL_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    CURRENCY_API_KEY: process.env.CURRENCY_API_KEY,
    WEBSITE_DISCOUNT: process.env.WEBSITE_DISCOUNT,
    WEBSITE_TAX: process.env.WEBSITE_TAX,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
});
