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
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Payment'
      },
      erp: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'ERP'
      },
      scanner: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Scanner'
      },
      warehouse: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        label: 'Warehouse'
      },
      blockchain: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-800',
        label: 'Blockchain'
      }
    };
    
    const config = badgeConfig[category];
    
    return (
      <span className={`${config.bg} ${config.text} text-xs px-2 py-1 rounded-full font-medium ml-2`}>
        {config.label}
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="bg-blue-50 p-3 rounded-full mr-4 flex-shrink-0">
          <i className={`fas ${icon} text-primary`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900">{title}</h3>
              {getCategoryBadge()}
            </div>
            {status === 'connected' && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex-shrink-0">
                <i className="fas fa-check-circle mr-1"></i>
                Connected
              </span>
            )}
            {status === 'coming-soon' && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex-shrink-0">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          <div className="mt-4">
            {status === 'connected' ? (
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                onClick={onConfigure}
              >
                <i className="fas fa-cog mr-1"></i> Configure
              </button>
            ) : status === 'available' ? (
              <button 
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                onClick={onConnect}
              >
                <i className="fas fa-plug mr-1"></i> Connect
              </button>
            ) : (
              <button 
                disabled 
                className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed"
              >
                <i className="fas fa-clock mr-1"></i> Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}