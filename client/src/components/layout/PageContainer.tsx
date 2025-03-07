import React, { ReactNode } from 'react';
import { PageHeader } from '@/components/ui/page-header';

interface PageContainerProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, actions, children }) => {
  return (
    <div className="p-6 bg-background">
      {title && (
        <PageHeader 
          title={title} 
          description={description} 
          actions={actions} 
        />
      )}
      {children}
    </div>
  );
};

export default PageContainer;
