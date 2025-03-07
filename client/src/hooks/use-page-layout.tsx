import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState, useMemo } from 'react';

interface UsePageLayoutOptions {
  /**
   * Set to true if the page requires full-width layout in desktop view
   */
  fullWidth?: boolean;
  
  /**
   * The base padding to apply to the page
   */
  basePadding?: string;
  
  /**
   * Additional container classes
   */
  containerClasses?: string;
  
  /**
   * Max width constraint for the container
   * Values: 'default' | 'narrow' | 'wide' | 'full'
   */
  width?: 'default' | 'narrow' | 'wide' | 'full';
}

/**
 * Hook to manage consistent page layout properties
 * 
 * Provides standardized layout classes and properties for all pages
 * to ensure consistent spacing, width constraints, and responsive behavior.
 * 
 * @param options - Configuration options for the page layout
 * @returns Layout classes and properties for consistent page styling
 */
export function usePageLayout(options: UsePageLayoutOptions = {}) {
  const { 
    fullWidth = false,
    basePadding = 'p-4 md:p-6',
    containerClasses = '',
    width = 'default',
  } = options;
  
  const isMobile = useIsMobile();
  const [layoutClasses, setLayoutClasses] = useState('');
  
  // Map width option to actual Tailwind classes
  const widthClass = useMemo(() => {
    switch (width) {
      case 'narrow': return 'max-w-4xl';
      case 'wide': return 'max-w-7xl';
      case 'full': return 'max-w-full';
      case 'default':
      default: return 'max-w-6xl';
    }
  }, [width]);
  
  useEffect(() => {
    // Base classes for all page layouts
    const baseClasses = [
      'w-full',
      basePadding,
      'bg-background',
      'transition-all',
      'duration-200'
    ];
    
    // Add container constraints unless fullWidth is true
    if (!fullWidth && !isMobile) {
      baseClasses.push(widthClass, 'mx-auto');
    }
    
    // Add any custom container classes
    if (containerClasses) {
      baseClasses.push(containerClasses);
    }
    
    setLayoutClasses(baseClasses.join(' '));
  }, [fullWidth, isMobile, basePadding, containerClasses, widthClass]);
  
  // Return standardized layout properties
  return {
    layoutClasses,
    fullWidth,
    isMobile,
    widthClass
  };
}