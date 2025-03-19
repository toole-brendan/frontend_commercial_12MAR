#!/bin/bash

echo "🔍 Fixing the specific JavaScript file with MIME type issues..."

# The file we need to fix
PROBLEM_FILE="/commercial/assets/index.js"
S3_PATH="s3://www.handreceipt.com${PROBLEM_FILE}"

# First check if the file exists in S3
echo "🔍 Checking if file exists in S3..."
if aws s3 ls ${S3_PATH} 2>&1 | grep -q 'NoSuchKey'; then
  echo "⚠️ File does not exist at this exact path. Let's check for similar files..."
  aws s3 ls s3://www.handreceipt.com/commercial/assets/ --recursive
else
  echo "✅ File exists. Fixing the MIME type..."
  aws s3 cp ${S3_PATH} ${S3_PATH} \
    --content-type "application/javascript" \
    --metadata-directive REPLACE
fi

# Let's also check if we need to create a redirect or copy a file
echo ""
echo "🔄 Checking the actual location of the needed file..."
aws s3 ls s3://www.handreceipt.com/commercial/public/assets/ | grep -i index

echo ""
echo "🔄 Creating a copy of the correct file to the location the browser is expecting..."
# Copy from /commercial/public/assets/index-C-gYXANp.js to /commercial/assets/index-C-gYXANp.js
aws s3 cp s3://www.handreceipt.com/commercial/public/assets/index-C-gYXANp.js \
  s3://www.handreceipt.com/commercial/assets/index-C-gYXANp.js \
  --content-type "application/javascript"

# Invalidate CloudFront cache
echo "⏱️ Now invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/assets/*"

echo "✅ All operations complete!" 