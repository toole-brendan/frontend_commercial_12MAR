#!/bin/bash

echo "🔍 Testing landing page redirect..."

# Test redirects for the commercial root URL
echo ""
echo "🔎 Testing redirect from /commercial/ to /commercial/dashboard..."
echo "-----------------------------------"
curl -s -I "https://handreceipt.com/commercial/" | grep -i "location\|content-type"
echo "-----------------------------------"

# Test the index.html redirect
echo ""
echo "🔎 Testing redirect from /commercial/index.html to /commercial/dashboard..."
echo "-----------------------------------"
curl -s -I "https://handreceipt.com/commercial/index.html" | grep -i "refresh\|content-type"
echo "-----------------------------------"

# Test the dashboard direct access
echo ""
echo "🔎 Verifying dashboard page exists..."
echo "-----------------------------------"
curl -s -I "https://handreceipt.com/commercial/dashboard" | grep -i "content-type\|status"
echo "-----------------------------------"

echo "✅ Redirect tests complete!"
echo "If you see 'location: /commercial/dashboard' or HTML with refresh meta tag pointing to dashboard, the redirect is working." 