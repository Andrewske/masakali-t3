#!/bin/sh

# Check if VERCEL_ENV is 'prod'
if [ "$VERCEL_ENV" != "production" ]; then
  echo "Skipping sourcemap upload: VERCEL_ENV is not 'production'"
  exit 0
fi

# Install PostHog CLI
curl -LsSf https://github.com/PostHog/posthog/releases/download/posthog-cli-v0.0.4/posthog-cli-installer.sh | sh

# Add to PATH
export PATH="$HOME/.posthog"

# Update posthog-cli
posthog-cli-update

# Upload source maps
posthog-cli sourcemap inject --directory .next
posthog-cli --host https://us.i.posthog.com sourcemap upload --directory .next