#!/bin/bash
set -e

echo "Starting verification pipeline..."

echo "Running lint..."
npm run lint

echo "Running build..."
npm run build

echo "Running tests..."
# Start the dev server in the background for playwright if needed,
# but playwright.config.ts has a webServer section.
npx playwright test

echo "Verification pipeline completed successfully."
