#!/bin/bash

echo "🔄 Setting up redirect to make dashboard the landing page..."

# Create a simple HTML file that redirects to the dashboard
echo '<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=/commercial/dashboard">
  <title>Redirecting to HandReceipt Commercial Dashboard</title>
</head>
<body>
  <p>If you are not redirected automatically, <a href="/commercial/dashboard">click here</a> to go to the HandReceipt Commercial Dashboard.</p>
</body>
</html>' > redirect.html

# Upload this file as index.html at the commercial root
echo "📤 Uploading redirect file to S3..."
aws s3 cp redirect.html s3://www.handreceipt.com/commercial/index.html \
  --content-type "text/html" \
  --cache-control "no-cache"

# Also set up a website redirect on the S3 object itself
echo "📤 Setting up S3 website redirect rule..."
aws s3api put-object \
  --bucket www.handreceipt.com \
  --key commercial/ \
  --website-redirect-location "/commercial/dashboard" \
  --content-type "text/html" \
  --cache-control "no-cache" \
  --body redirect.html

# Clean up
rm redirect.html

# Invalidate CloudFront cache
echo "⏱️ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/" "/commercial/index.html"

echo "✅ Redirect setup complete!"
echo "⏱️ Note: It may take a few minutes for CloudFront to refresh the cache." 