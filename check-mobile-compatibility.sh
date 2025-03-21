#!/bin/bash

echo "🔍 Checking mobile compatibility for HandReceipt Commercial..."

# Check if the index.html has proper headers and is accessible
echo "Checking main index.html headers..."
curl -I -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://www.handreceipt.com/commercial/

# Check root path
echo "Checking root path..."
curl -I -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://www.handreceipt.com/commercial

# Check a specific route to verify SPA routing
echo "Checking SPA routing with a specific path..."
curl -I -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://www.handreceipt.com/commercial/dashboard

# Download and check actual HTML content
echo "Getting actual HTML content to verify..."
curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://www.handreceipt.com/commercial/ | grep -A 5 "<script" 

# Check for MIME types being served
echo "Checking MIME types for JS files..."
curl -I -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" https://www.handreceipt.com/commercial/assets/index-*.js | grep "Content-Type"

echo "✅ Mobile compatibility check complete!" 