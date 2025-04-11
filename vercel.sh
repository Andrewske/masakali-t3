if [[ $VERCEL_ENV == "production" || $VERCEL_ENV == "preview" ]] ; then
  # Build with sourcemaps
  NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY npm run build

  # Install PostHog CLI if not already installed
  if [ ! -f "/vercel/.posthog/posthog-cli" ]; then
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/PostHog/posthog/releases/download/posthog-cli-v0.0.4/posthog-cli-installer.sh | sh
  fi

  # Login to PostHog if not already logged in
  if [ ! -f "/vercel/.posthog/credentials.json" ]; then
    /vercel/.posthog/posthog-cli --host https://eu.posthog.com login --personal-api-key $NEXT_PUBLIC_POSTHOG_KEY
  fi

  # Upload sourcemaps
  if [ -d "./.next/static/chunks" ]; then
    /vercel/.posthog/posthog-cli --host https://eu.posthog.com sourcemap inject --directory ./.next/static/chunks || true
    /vercel/.posthog/posthog-cli --host https://eu.posthog.com sourcemap upload --directory ./.next/static/chunks || true
  else
    echo "Warning: .next/static/chunks directory not found. Skipping sourcemap upload."
  fi
else
  npm run build
fi
