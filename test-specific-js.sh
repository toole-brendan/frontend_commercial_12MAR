#!/bin/bash

echo "🔍 Testing specific JavaScript files for MIME type issues..."

# Base domain for our tests
BASE_URL="https://handreceipt.com"

# List of paths to test - add the specific paths that are failing with MIME errors
PATHS_TO_TEST=(
  "/commercial/public/assets/index-BD-Rb9Rg.js"
  "/commercial/public/assets/index-C-gYXANp.js" 
  "/commercial/index.js"
  "/commercial/assets/index.js"
)

# Function to test a URL for its MIME type
test_url() {
  local url=$1
  echo ""
  echo "🔎 Testing URL: $url"
  echo "-----------------------------------"
  curl -s -I "$url" | grep -i "content-type"
  echo "-----------------------------------"
}

# Test each path
for path in "${PATHS_TO_TEST[@]}"; do
  test_url "${BASE_URL}${path}"
done

echo ""
echo "📝 Now let's also check what modules the HTML file is trying to load..."
echo "-----------------------------------"
curl -s "${BASE_URL}/commercial/public/index.html" | grep -o '<script[^>]*src="[^"]*"[^>]*>' | grep -o 'src="[^"]*"'
echo ""
echo "-----------------------------------"

echo "✅ Test complete!"
echo "Check the output above for any JavaScript files with incorrect MIME types (should be application/javascript)" 