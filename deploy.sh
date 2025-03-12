#!/bin/bash

# Build the project
echo "🏗️ Building project..."
npm run build

# Upload to S3 with correct cache settings
echo "📤 Uploading to S3..."

# First, set the correct MIME types on existing JS files (in case they were incorrect)
echo "🔧 Setting correct MIME types on existing JavaScript files..."
aws s3 cp s3://www.handreceipt.com/civilian/assets/ s3://www.handreceipt.com/civilian/assets/ \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript" \
  --metadata-directive REPLACE \
  --recursive

# Upload JS files with correct MIME type and long cache duration
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript"

# Upload CSS files with correct MIME type and long cache duration
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css"

# Upload image files with correct MIME types and long cache duration
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.png" \
  --content-type "image/png"

aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.jpg" \
  --include "*.jpeg" \
  --content-type "image/jpeg"

aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.svg" \
  --content-type "image/svg+xml"

# Upload font files with correct MIME types and long cache duration
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.woff" \
  --content-type "font/woff"

aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*" \
  --include "*.woff2" \
  --content-type "font/woff2"

# Upload remaining assets (except HTML) with long cache duration
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html" \
  --exclude "*.js" \
  --exclude "*.css" \
  --exclude "*.png" \
  --exclude "*.jpg" \
  --exclude "*.jpeg" \
  --exclude "*.svg" \
  --exclude "*.woff" \
  --exclude "*.woff2"

# Upload HTML files with no-cache
aws s3 sync dist/public/ s3://www.handreceipt.com/civilian/ \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html"

# Double-check the MIME type of our problem JavaScript file
echo "🔍 Verifying MIME type for JavaScript file..."
aws s3api head-object --bucket www.handreceipt.com --key civilian/assets/index-ARjxnxVI.js

# Invalidate CloudFront cache thoroughly
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/civilian/*" "/civilian/assets/*" "/civilian/assets/*.js" "/civilian/index.html" "/civilian/assets/index-ARjxnxVI.js"

echo "⏳ Waiting for CloudFront invalidation to complete..."
sleep 10

echo "✅ Deployment complete!" 