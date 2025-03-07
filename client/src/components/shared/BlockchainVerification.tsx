import React from 'react';

interface BlockchainVerificationProps {
  transactionId?: string;
  blockchainId?: string;
  status: 'verified' | 'pending' | 'failed';
  timestamp?: Date;
  type?: 'transfer' | 'payment' | 'contract' | 'inventory';
}

const statusIcons = {
  verified: {
    icon: 'check_circle',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Verified on Blockchain'
  },
  pending: {
    icon: 'schedule',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    label: 'Pending Verification'
  },
  failed: {
    icon: 'error',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'Verification Failed'
  }
};

const typeIcons = {
  transfer: {
    icon: 'swap_horiz',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Transfer'
  },
  payment: {
    icon: 'payments',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    label: 'Payment'
  },
  contract: {
    icon: 'description',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Smart Contract'
  },
  inventory: {
    icon: 'inventory',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    label: 'Inventory Update'
  }
};

export default function BlockchainVerification({ 
  transactionId = 'N/A', 
  blockchainId = 'N/A', 
  status, 
  timestamp,
  type
}: BlockchainVerificationProps) {
  const statusConfig = statusIcons[status];
  const typeConfig = type ? typeIcons[type] : null;
  
  return (
    <div className="bg-white shadow-sm p-6">
      <div className="flex items-center mb-5">
        <div className={`h-10 w-10 ${statusConfig.bgColor} flex items-center justify-center mr-4`}>
          <span className={`material-icons ${statusConfig.color}`}>{statusConfig.icon}</span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 font-display">{statusConfig.label}</h3>
          {typeConfig && (
            <div className="flex items-center mt-1 text-xs text-gray-500 font-display">
              <span className={`material-icons-outlined text-sm mr-1 ${typeConfig.color}`}>{typeConfig.icon}</span>
              <span>{typeConfig.label}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 text-sm font-display">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Transaction ID:</span>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-none">{transactionId}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Blockchain ID:</span>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-none truncate max-w-[180px]">
            {blockchainId}
          </span>
        </div>
        
        {timestamp && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Timestamp:</span>
            <span className="text-gray-700 font-mono text-xs">{timestamp.toLocaleString()}</span>
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-200">
        <a 
          href="#" 
          className="flex items-center justify-center text-primary text-sm hover:text-primary-dark font-display"
        >
          <span className="material-icons text-sm mr-2">open_in_new</span>
          View on Blockchain Explorer
        </a>
      </div>
    </div>
  );
}