#!/bin/bash

echo "🔄 Setting up proper SPA routing for the commercial app..."

# First, check if we have the main index.html file (non-redirect version)
echo "🔍 Checking for the original index.html file..."
aws s3 ls s3://www.handreceipt.com/commercial/public/index.html

# Copy the public/index.html file to be the main entry point for all routes
echo "📤 Setting up the main index.html as the entry point for all routes..."
aws s3 cp s3://www.handreceipt.com/commercial/public/index.html \
  s3://www.handreceipt.com/commercial/index.html \
  --content-type "text/html" \
  --cache-control "no-cache"

# Remove the redirect at /commercial/dashboard if it exists
echo "🗑️ Removing any redirect files at /commercial/dashboard..."
aws s3 rm s3://www.handreceipt.com/commercial/dashboard || echo "No dashboard file to remove"

# Update the CloudFront distribution to handle SPA routing correctly
echo "🔄 Updating CloudFront error handling for SPA routing..."
aws cloudfront get-distribution-config --id E3T7VX6HV95Q5O --output json > cloudfront-config.json

# Extract the ETag
ETAG=$(jq -r '.ETag' cloudfront-config.json)
echo "🏷️ Using ETag: $ETAG"

# Set up proper error handling for SPA
jq 'del(.ETag) | .DistributionConfig.CustomErrorResponses = {
  "Quantity": 1,
  "Items": [
    {
      "ErrorCode": 404,
      "ResponsePagePath": "/commercial/index.html",
      "ResponseCode": "200", 
      "ErrorCachingMinTTL": 10
    }
  ]
}' cloudfront-config.json > cloudfront-with-errors.json

# Extract just the DistributionConfig part
jq '.DistributionConfig' cloudfront-with-errors.json > cloudfront-updated.json

# Update the CloudFront distribution
echo "🔄 Updating CloudFront distribution..."
aws cloudfront update-distribution --id E3T7VX6HV95Q5O --if-match "$ETAG" --distribution-config file://cloudfront-updated.json

# Invalidate CloudFront cache 
echo "⏱️ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/*"

echo "✅ SPA routing setup complete!"
echo "⏱️ Note: It may take a few minutes (up to 15) for CloudFront to refresh the cache." 