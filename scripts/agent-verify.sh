#!/bin/bash
set -e

echo "Starting verification pipeline..."

# 1. Environment Check
echo "Checking environment..."
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm ci..."
  npm ci
fi

# 2. Linting
echo "Running linter..."
npm run lint

# 3. Building
echo "Building project..."
npm run build

# 4. Testing
echo "Running Playwright tests..."
npx playwright test

echo "Verification pipeline completed successfully!"
