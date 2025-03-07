import React, { ReactNode } from 'react';

interface PageContainerProps {
  title?: string;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="p-6 bg-background">
      {title && (
        <h1 className="text-2xl font-display uppercase tracking-wide mb-6 text-foreground">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
