#!/bin/bash

# Replace DISTRIBUTION_ID with your actual CloudFront distribution ID
# This is E3T7VX6HV95Q5O based on your deploy script

# First, get the current configuration
echo "📥 Getting current CloudFront configuration..."
aws cloudfront get-distribution-config --id E3T7VX6HV95Q5O --output json > cloudfront-config.json

# Extract the ETag (required for updates)
ETAG=$(jq -r '.ETag' cloudfront-config.json)
echo "🏷️ Using ETag: $ETAG"

# Modify the configuration to add proper error responses for SPA routing
# Preserve the existing configuration while adding/updating CustomErrorResponses
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

# Now extract just the DistributionConfig part for the update command
jq '.DistributionConfig' cloudfront-with-errors.json > cloudfront-updated.json

# Update the CloudFront distribution
echo "🔄 Updating CloudFront distribution..."
aws cloudfront update-distribution --id E3T7VX6HV95Q5O --if-match "$ETAG" --distribution-config file://cloudfront-updated.json

echo "✅ CloudFront configuration update requested!"
echo "⏱️ Note: Changes can take up to 15-30 minutes to propagate through the CloudFront network." 