#!/bin/bash
set -e

echo "🚀 Starting agent verification pipeline..."

# 1. Environment Check
echo "🔍 Checking environment..."
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Running npm ci..."
  npm ci
else
  echo "✅ node_modules found."
fi

# 2. Linting
echo "🧹 Running linter..."
npm run lint

# 3. Building
echo "🏗️  Building project..."
npm run build

# 4. Testing
echo "🧪 Running Playwright tests..."
# Install browsers if needed (only if in a fresh environment)
# npx playwright install --with-deps
npx playwright test

echo "✅ Verification pipeline completed successfully!"
