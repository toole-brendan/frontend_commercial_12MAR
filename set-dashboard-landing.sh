#!/bin/bash

echo "🔄 Setting up /commercial/dashboard as the landing page..."

# Create a HTML redirect file for the commercial root
echo "📝 Creating a clean redirect HTML file..."
cat > redirect.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="refresh" content="0; url=/commercial/dashboard">
  <title>Redirecting to HandReceipt Commercial Dashboard</title>
</head>
<body>
  <p>If you are not redirected automatically, <a href="/commercial/dashboard">click here</a> to go to the HandReceipt Commercial Dashboard.</p>
</body>
</html>
EOF

# Upload the redirect file to S3 at the commercial root
echo "📤 Uploading redirect file to commercial root..."
aws s3 cp redirect.html s3://www.handreceipt.com/commercial/index.html \
  --content-type "text/html" \
  --cache-control "no-cache"

# Also set up a website redirect rule for the root path
echo "📤 Setting up website redirect rule for commercial root..."
aws s3api put-object \
  --bucket www.handreceipt.com \
  --key commercial/ \
  --website-redirect-location "/commercial/dashboard" \
  --content-type "text/html" \
  --cache-control "no-cache" \
  --body redirect.html

# Ensure the SPA root index.html file is also in the dashboard path for SPA routing
echo "📤 Copying the SPA root HTML to the dashboard path..."
aws s3 cp s3://www.handreceipt.com/commercial/public/index.html \
  s3://www.handreceipt.com/commercial/dashboard \
  --content-type "text/html" \
  --cache-control "no-cache"

# Clean up temp file
rm redirect.html

# Invalidate CloudFront cache
echo "⏱️ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/" "/commercial/index.html" "/commercial/dashboard"

echo "✅ Landing page setup complete!"
echo "⏱️ Note: It may take a few minutes for CloudFront to refresh the cache."
echo "🔍 The landing page is now set to /commercial/dashboard" 