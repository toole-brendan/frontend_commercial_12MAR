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
    <div className="bg-white dark:bg-black shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center mb-2 sm:mb-0 bg-primary/10 text-primary dark:text-purple-400">
          <span className="material-icons">{getIconByCategory()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white font-display">{title}</h3>
              {getCategoryBadge()}
            </div>
            {status === 'connected' && (
              <span className="px-2 py-1 text-xs bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex-shrink-0 flex items-center font-display">
                <span className="material-icons text-xs mr-1">check_circle</span>
                Connected
              </span>
            )}
            {status === 'coming-soon' && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex-shrink-0 flex items-center font-display">
                <span className="material-icons text-xs mr-1">schedule</span>
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 font-light">{description}</p>
          <div className="mt-4">
            {status === 'connected' ? (
              <button 
                className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-white transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={onConfigure}
              >
                <span className="material-icons text-sm mr-2">settings</span>
                Configure
              </button>
            ) : status === 'available' ? (
              <button 
                className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary dark:text-purple-400 border border-primary/20 dark:border-primary/30 text-sm font-medium transition-colors hover:bg-primary/20 dark:hover:bg-primary/30"
                onClick={onConnect}
              >
                <span className="material-icons text-sm mr-2">link</span>
                Connect
              </button>
            ) : (
              <button 
                disabled 
                className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 text-sm font-medium cursor-not-allowed"
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