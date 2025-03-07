import React, { ReactNode } from 'react';

interface PageContainerProps {
  title?: string;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="p-6 bg-gray-50">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      {children}
    </div>
  );
};

export default PageContainer;
