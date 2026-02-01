#!/bin/bash
set -e

echo "Starting verification pipeline..."

# 1. Check for node_modules
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm ci..."
  npm ci
fi

# 2. Run linting
echo "Running lint..."
npm run lint

# 3. Run build
echo "Running build..."
npm run build

# 4. Install Playwright browsers (if needed)
echo "Ensuring Playwright browsers are installed..."
npx playwright install firefox

# 5. Run Playwright tests
echo "Running tests..."
npx playwright test

echo "Verification pipeline completed successfully!"
