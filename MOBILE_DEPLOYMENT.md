# Mobile Deployment Guide for HandReceipt Commercial Frontend

## Common Mobile Deployment Issues

Mobile browsers handle web applications differently from desktop browsers in several key ways:

1. **Path Resolution**: Mobile browsers tend to be more strict about how they resolve paths, especially when using `<base>` tags
2. **Asset Loading**: Absolute vs. relative paths behave differently on mobile
3. **SPA Routing**: Single-page application routing requires special configuration for mobile compatibility
4. **MIME Types**: Mobile browsers may be stricter about content types and MIME types

## Pre-Deployment Checklist

Before deploying, ensure that:

- [x] The `<base>` tag is properly set in index.html to `/commercial/`
- [x] All asset paths in HTML use relative paths (`./assets/` instead of `/assets/`)
- [x] Script tags use relative paths (`./src/` instead of `/src/`)
- [x] CloudFront is configured for proper SPA routing
- [x] Proper content types are set for all files

## Deployment Steps

### 1. Build the Project with Asset Path Fixes

```bash
# First build the project
npm run build

# Then fix asset paths for mobile compatibility
./fix-vite-assets.sh
```

### 2. Deploy to AWS

```bash
# Deploy with the enhanced deployment script
./deploy.sh

# Fix SPA routing for mobile
./fix-spa-routing.sh
```

### 3. Verify Deployment

```bash
# Check if mobile compatibility issues are resolved
./check-mobile-compatibility.sh
```

## Troubleshooting Common Issues

### HTML Not Loading on Mobile

**Problem**: The site works on desktop but not mobile.

**Solution**:
1. Check that script and asset paths use relative paths (starting with `./`) instead of absolute paths (starting with `/`)
2. Ensure the `<base href="/commercial/">` tag is correctly set in index.html
3. Verify CloudFront is routing 404 errors to index.html with a low cache TTL

### JavaScript Not Loading

**Problem**: HTML loads but JavaScript files fail to load.

**Solution**:
1. Check MIME types in S3 and CloudFront (`application/javascript` for JS files)
2. Ensure JS files are accessible at the correct paths
3. Run `./fix-vite-assets.sh` to correct asset paths

### SPA Routes Not Working

**Problem**: Main page loads but navigating to other routes fails.

**Solution**:
1. Run `./fix-spa-routing.sh` to update CloudFront configuration
2. Ensure the `ErrorCachingMinTTL` is set to 0 for quick fixes
3. Verify index.html is properly placed at both `/commercial/index.html` and `/commercial/`

## Technical Explanation

### Path Resolution with Base Tag

When using a `<base href="/commercial/">` tag, all relative paths are resolved relative to this base:

- `src="/assets/main.js"` → resolves to `/assets/main.js` (ignores base tag)
- `src="./assets/main.js"` → resolves to `/commercial/assets/main.js`

Mobile browsers are often more strict about this resolution, so using relative paths is essential.

### CloudFront SPA Configuration

For single-page applications, CloudFront must be configured to return index.html for any unknown routes:

```json
{
  "ErrorCode": 404,
  "ResponsePagePath": "/commercial/index.html",
  "ResponseCode": "200", 
  "ErrorCachingMinTTL": 0
}
```

## Maintenance Scripts

The repository includes several scripts to help maintain mobile compatibility:

- `fix-vite-assets.sh`: Fixes asset paths in the build output
- `fix-spa-routing.sh`: Updates CloudFront configuration for SPA routing
- `check-mobile-compatibility.sh`: Verifies mobile compatibility
- Enhanced `deploy.sh`: Includes proper MIME type settings

## Preventing Future Issues

- Always test on mobile devices after deployment
- Use the provided scripts for building and deployment
- Be cautious when updating Vite or other build tools that might change path handling
- If adding new asset types, ensure proper MIME type configuration 