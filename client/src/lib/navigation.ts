import { BASE_PATH } from "./constants";

/**
 * Ensures all navigation paths include the base path
 */
export function getNavigationPath(path: string): string {
  // If it already includes the base path or is an external URL, return as is
  if (path.startsWith('http') || path.includes(BASE_PATH)) {
    return path;
  }
  
  // Format and return with base path
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${formattedPath}`;
}

/**
 * Formats API and navigation URLs with the base path
 */
export function getFullUrl(url: string): string {
  // Handle different URL types
  if (url.startsWith('http') || url.startsWith(BASE_PATH)) {
    return url;
  }
  
  if (url.startsWith('/api')) {
    return `${BASE_PATH}${url}`;
  }
  
  return `${BASE_PATH}${url.startsWith('/') ? url : `/${url}`}`;
}
