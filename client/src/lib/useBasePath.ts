import { BASE_PATH } from "./constants";
import { getNavigationPath } from "./navigation";

/**
 * Hook to get the application's base path and path utility functions
 */
export function useBasePath() {
  /**
   * Gets the full path including the base path
   */
  const getFullPath = (path: string) => getNavigationPath(path);
  
  /**
   * Gets the base path of the application
   */
  const getBasePath = () => BASE_PATH;
  
  /**
   * Determines if the given path is the base dashboard path
   */
  const isRootPath = (path: string) => {
    return path === BASE_PATH || path === `${BASE_PATH}/` || path === `${BASE_PATH}/dashboard`;
  };
  
  return {
    getFullPath,
    getBasePath,
    isRootPath,
    BASE_PATH
  };
}

export default useBasePath;
