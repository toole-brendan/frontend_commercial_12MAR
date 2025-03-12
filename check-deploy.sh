#!/bin/bash

echo "🔍 Checking the HTML file for correct paths after deployment..."

# Download and view the HTML file
echo "🔸 HTML content from CloudFront:"
curl -s https://www.handreceipt.com/civilian/index.html | grep -A 2 "script type=\"module\""

echo ""
echo "🔸 Checking JavaScript file access directly:"
curl -I https://www.handreceipt.com/civilian/assets/index-ARjxnxVI.js | head -5

echo ""
echo "✅ Check complete!" 