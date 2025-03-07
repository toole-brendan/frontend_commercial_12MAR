import React from 'react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: string;
  status: 'connected' | 'available' | 'coming-soon';
  category?: 'payment' | 'erp' | 'scanner' | 'warehouse' | 'blockchain';
  onConnect?: () => void;
  onConfigure?: () => void;
}

export default function IntegrationCard({
  title,
  description,
  icon,
  status,
  category,
  onConnect,
  onConfigure
}: IntegrationCardProps) {
  const getCategoryBadge = () => {
    if (!category) return null;
    
    const badgeConfig = {
      payment: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'payments',
        label: 'Payment'
      },
      erp: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'business',
        label: 'ERP'
      },
      scanner: {
        bg: 'bg-violet-50',
        text: 'text-violet-600',
        icon: 'qr_code_scanner',
        label: 'Scanner'
      },
      warehouse: {
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        icon: 'warehouse',
        label: 'Warehouse'
      },
      blockchain: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        icon: 'lan',
        label: 'Blockchain'
      }
    };
    
    const config = badgeConfig[category];
    
    return (
      <span className={`${config.bg} ${config.text} text-xs px-2 py-1 ml-2 font-display flex items-center`}>
        <span className="material-icons text-xs mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };
  
  const getIconByCategory = () => {
    switch (category) {
      case 'payment':
        return 'payments';
      case 'erp':
        return 'business';
      case 'scanner':
        return 'qr_code_scanner';
      case 'warehouse':
        return 'warehouse';
      case 'blockchain':
        return 'lan';
      default:
        return icon || 'integration_instructions';
    }
  };
  
  return (
    <div className="bg-card dark:bg-card-bg-dark shadow-sm p-6 border border-border dark:border-border hover:border-gray-300 dark:hover:border-border-hover transition-colors">
      <div className="flex items-start">
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center mr-4 bg-blue-50">
          <span className="material-icons text-primary">{getIconByCategory()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="font-medium text-foreground dark:text-theme-text-primary font-display">{title}</h3>
              {getCategoryBadge()}
            </div>
            {status === 'connected' && (
              <span className="px-2 py-1 text-xs bg-green-50 text-green-600 flex-shrink-0 flex items-center font-display">
                <span className="material-icons text-xs mr-1">check_circle</span>
                Connected
              </span>
            )}
            {status === 'coming-soon' && (
              <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 flex-shrink-0 flex items-center font-display">
                <span className="material-icons text-xs mr-1">schedule</span>
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-display">{description}</p>
          <div className="mt-4">
            {status === 'connected' ? (
              <button 
                className="btn btn-secondary flex items-center"
                onClick={onConfigure}
              >
                <span className="material-icons text-sm mr-2">settings</span>
                Configure
              </button>
            ) : status === 'available' ? (
              <button 
                className="btn btn-primary flex items-center"
                onClick={onConnect}
              >
                <span className="material-icons text-sm mr-2">link</span>
                Connect
              </button>
            ) : (
              <button 
                disabled 
                className="btn flex items-center bg-gray-50 text-gray-400 cursor-not-allowed"
              >
                <span className="material-icons text-sm mr-2">schedule</span>
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}