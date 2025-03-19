#!/bin/bash

echo "🔍 Verifying that MIME type issues have been fixed..."

# Test the specific file that was causing the problem
echo ""
echo "🔎 Testing the problematic file that was fixed..."
echo "-----------------------------------"
curl -s -I "https://handreceipt.com/commercial/assets/index-C-gYXANp.js" | grep -i "content-type"
echo "-----------------------------------"

# Check what the HTML is trying to load
echo ""
echo "📝 Checking what the HTML file is loading..."
echo "-----------------------------------"
curl -s "https://handreceipt.com/commercial/public/index.html" | grep -o '<script[^>]*src="[^"]*"[^>]*>' | grep -o 'src="[^"]*"'
echo ""
echo "-----------------------------------"

echo "✅ Verification complete!"
echo "If the content-type is 'application/javascript', the issue should be fixed." 