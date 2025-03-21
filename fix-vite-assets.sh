#!/bin/bash

echo "🔧 Fixing Vite asset paths for mobile compatibility..."

# Build the project first if needed
if [ ! -d "dist" ]; then
  echo "⚠️ Dist directory not found. Building project first..."
  npm run build
fi

# Create a backup of the original index.html
cp dist/public/index.html dist/public/index.html.bak

# Update the script tag in index.html to use relative paths correctly
echo "Updating script tags to use relative paths..."
sed -i '' 's|src="/src/|src="./src/|g' dist/public/index.html
sed -i '' 's|src="/assets/|src="./assets/|g' dist/public/index.html

# Ensure any links to assets use relative paths
echo "Updating asset references to use relative paths..."
find dist/public -name "*.html" -exec sed -i '' 's|href="/assets/|href="./assets/|g' {} \;
find dist/public -name "*.html" -exec sed -i '' 's|src="/assets/|src="./assets/|g' {} \;

# Check the fixed index.html
echo "Checking the fixed index.html..."
grep "<script" dist/public/index.html

echo "✅ Vite asset paths fixed!"

# Prompt for redeployment
echo "Do you want to redeploy now? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  ./deploy.sh
  ./fix-spa-routing.sh
fi 