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
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground dark:text-theme-text-primary">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground dark:text-theme-text-secondary max-w-2xl">
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