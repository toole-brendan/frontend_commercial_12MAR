#!/bin/bash

echo "🔍 Finding and fixing MIME types for JavaScript files in the commercial folder..."

# List all JavaScript files in the commercial path
echo "📋 Listing JavaScript files..."
aws s3 ls s3://www.handreceipt.com/commercial/ --recursive | grep "\.js$" > js_files.txt

# Process each file to update its MIME type
echo "🔄 Updating MIME types..."
while read -r line; do
  # Extract the file path from the ls output
  file_path=$(echo "$line" | awk '{$1=$2=$3=""; sub(/^[ \t]+/, ""); print}')
  
  echo "📄 Processing: $file_path"
  
  # Copy the file onto itself with the correct MIME type
  aws s3 cp "s3://www.handreceipt.com/$file_path" "s3://www.handreceipt.com/$file_path" \
    --content-type "application/javascript" \
    --metadata-directive REPLACE

done < js_files.txt

# Clean up
rm js_files.txt

echo "✅ MIME type update complete!"
echo "⏱️ Now invalidating CloudFront cache..."

# Invalidate CloudFront cache for JS files
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/commercial/*.js"

echo "✅ All operations complete!" 