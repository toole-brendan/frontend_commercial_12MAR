#!/bin/bash

# Build the project
echo "🏗️ Building project..."
npm run build

# Fix Vite asset paths for mobile compatibility
echo "🔧 Fixing Vite asset paths for mobile compatibility..."
mkdir -p dist_deploy

# Make a backup of the original files
cp -r dist/public/* dist_deploy/

# Update paths in the HTML files for mobile compatibility
echo "Updating asset references to use relative paths..."
find dist_deploy -name "*.html" -exec sed -i '' 's|src="/assets/|src="./assets/|g' {} \;
find dist_deploy -name "*.html" -exec sed -i '' 's|href="/assets/|href="./assets/|g' {} \;
find dist_deploy -name "*.html" -exec sed -i '' 's|src="/src/|src="./src/|g' {} \;

# Upload to S3 with correct cache settings
echo "📤 Uploading to S3..."

# Upload JS files with long cache duration and correct content type
aws s3 sync dist_deploy/ s3://www.handreceipt.com/commercial/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript"

# Upload CSS files with long cache duration and proper content type
aws s3 sync dist_deploy/ s3://www.handreceipt.com/commercial/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css"

# Upload other static assets with long cache duration
aws s3 sync dist_deploy/ s3://www.handreceipt.com/commercial/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html" \
  --exclude "*.js" \
  --exclude "*.css"

# Upload HTML files with no-cache and correct content type
aws s3 sync dist_deploy/ s3://www.handreceipt.com/commercial/ \
  --delete \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8"

# Copy index.html to base path (important for mobile SPA routing)
aws s3 cp dist_deploy/index.html s3://www.handreceipt.com/commercial/index.html \
  --cache-control "no-cache" \
  --content-type "text/html; charset=utf-8"

# Also ensure index.html exists at the root of commercial path
aws s3 cp dist_deploy/index.html s3://www.handreceipt.com/commercial/ \
  --cache-control "no-cache" \
  --content-type "text/html; charset=utf-8"

# Upload server file to root
aws s3 cp dist/index.js s3://www.handreceipt.com/commercial/index.js \
  --cache-control "max-age=31536000,public" \
  --content-type "application/javascript"

# Clean up temporary directory
rm -rf dist_deploy

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/*" "/commercial" "/commercial/index.html"

echo "✅ Deployment complete!" 
echo "📱 For mobile testing, run ./check-mobile-compatibility.sh"
echo "🔄 To update SPA routing config, run ./fix-spa-routing.sh" 