#!/bin/bash

echo "🔍 Testing the MIME type of the deployed JavaScript file..."

# Check S3 object metadata directly
echo "🔸 S3 Object Metadata:"
aws s3api head-object --bucket www.handreceipt.com --key civilian/assets/index-ARjxnxVI.js

# Check CloudFront response headers
echo ""
echo "🔸 CloudFront Response Headers (using curl):"
curl -I https://www.handreceipt.com/civilian/assets/index-ARjxnxVI.js

echo ""
echo "✅ Test complete!" 