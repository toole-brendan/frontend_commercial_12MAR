#!/bin/bash

echo "🔄 Fixing asset file locations..."

# Create the assets directory if it doesn't exist
echo "📁 Creating commercial/assets/ directory..."
mkdir -p temp_assets

# Sync all files from public/assets to assets
echo "🔄 Copying assets from public/assets/ to assets/..."
aws s3 sync s3://www.handreceipt.com/commercial/public/assets/ s3://www.handreceipt.com/commercial/assets/ \
  --content-type "application/javascript" \
  --exclude "*.css" \
  --exclude "*.map" \
  --exclude "*.png" \
  --exclude "*.jpg" \
  --exclude "*.svg" \
  --exclude "*.json"

# Copy CSS files with correct content type
echo "🔄 Copying CSS files with correct content type..."
aws s3 sync s3://www.handreceipt.com/commercial/public/assets/ s3://www.handreceipt.com/commercial/assets/ \
  --content-type "text/css" \
  --exclude "*" \
  --include "*.css"

# Copy other assets with their respective content types
echo "🔄 Copying other asset files..."
aws s3 sync s3://www.handreceipt.com/commercial/public/assets/ s3://www.handreceipt.com/commercial/assets/ \
  --exclude "*.js" \
  --exclude "*.css"

# Specifically ensure the problematic file exists with correct MIME type
echo "🔄 Ensuring problematic file exists with correct MIME type..."
aws s3 cp s3://www.handreceipt.com/commercial/public/assets/index-C-gYXANp.js \
  s3://www.handreceipt.com/commercial/assets/index-C-gYXANp.js \
  --content-type "application/javascript"

# Invalidate CloudFront cache
echo "⏱️ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/assets/*"

echo "✅ Asset location fix complete!"
echo "⏱️ Note: It may take a few minutes for CloudFront to refresh the cache." 