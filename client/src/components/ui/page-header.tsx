import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  actions, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",
      className
    )}>
      <div>
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-muted-foreground dark:text-theme-text-secondary">
          {title.includes(' ') ? title.split(' ')[0] : 'Overview'}
        </div>
        <h1 className="heading-medium text-xl md:text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-2xl font-light">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}