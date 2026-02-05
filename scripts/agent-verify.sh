#!/bin/bash

# Exit on any error
set -e

echo "Starting verification pipeline..."

# 1. Environment Check
echo "Checking environment..."
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

# 2. Linting
echo "Running linter..."
npm run lint

# 3. Building
echo "Building the project..."
npm run build

# 4. Testing
echo "Running tests..."
# Use xvfb-run to run playwright in a headless environment if needed,
# but playwright handles headless by default.
npx playwright test

echo "Verification pipeline completed successfully!"
