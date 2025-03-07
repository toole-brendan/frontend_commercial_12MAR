import React, { ReactNode } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { usePageLayout } from '@/hooks/use-page-layout';

interface PageWrapperProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

/**
 * PageWrapper - A standardized container component for all pages
 * Maintains consistent spacing, width, and responsive behavior
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  actions,
  children,
  fullWidth = false,
  className,
}) => {
  const { layoutClasses } = usePageLayout({ fullWidth });

  return (
    <div className={cn(
      'page-container',
      layoutClasses,
      className
    )}>
      {title && (
        <PageHeader
          title={title}
          description={description}
          actions={actions}
        />
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;