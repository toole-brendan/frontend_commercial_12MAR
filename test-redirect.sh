#!/bin/bash

echo "🔍 Testing for redirections with the JavaScript file..."

# Check with curl following redirects and showing headers
echo "🔸 Full curl output with redirects followed:"
curl -v https://www.handreceipt.com/civilian/assets/index-ARjxnxVI.js > /dev/null

echo ""
echo "✅ Test complete!" 