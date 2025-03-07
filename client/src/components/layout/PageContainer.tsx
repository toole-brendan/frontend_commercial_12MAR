import React, { ReactNode } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  title, 
  description, 
  actions, 
  children, 
  className,
  fullWidth = false
}) => {
  return (
    <div className={cn(
      "p-4 md:p-6 bg-background w-full max-w-full",
      fullWidth ? "" : "mx-auto container",
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

export default PageContainer;
