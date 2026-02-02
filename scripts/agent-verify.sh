#!/bin/bash

# Exit on any error
set -e

echo "Starting Agent Verification Pipeline..."

# 1. Environment Check
echo "Checking Environment..."
node --version
npm --version

# 2. Linting
echo "Running Linting..."
npm run lint

# 3. Building
echo "Running Build..."
npm run build

# 4. Playwright Tests
echo "Running Playwright Tests..."
npx playwright install firefox
npx playwright test

echo "Verification Pipeline Completed Successfully!"
