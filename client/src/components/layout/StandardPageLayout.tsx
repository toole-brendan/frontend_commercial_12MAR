import React, { ReactNode } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

interface StandardPageLayoutProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * StandardPageLayout - A consistent wrapper for all pages
 * Ensures consistent padding, width constraints, and responsive behavior
 */
const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  title,
  description,
  actions,
  children,
  className,
}) => {
  return (
    <div className={cn(
      "w-full max-w-full mx-auto px-4 md:px-6 py-4 md:py-6",
      className
    )}>
      {title && (
        <PageHeader
          title={title}
          description={description}
          actions={actions}
          className="mb-6"
        />
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default StandardPageLayout;