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
    icon: 'fa-check-circle',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Verified on Blockchain'
  },
  pending: {
    icon: 'fa-clock',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Pending Verification'
  },
  failed: {
    icon: 'fa-exclamation-circle',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Verification Failed'
  }
};

const typeIcons = {
  transfer: {
    icon: 'fa-exchange-alt',
    label: 'Transfer'
  },
  payment: {
    icon: 'fa-dollar-sign',
    label: 'Payment'
  },
  contract: {
    icon: 'fa-file-contract',
    label: 'Smart Contract'
  },
  inventory: {
    icon: 'fa-boxes',
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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <div className={`${statusConfig.bgColor} p-2 rounded-full mr-3`}>
          <i className={`fas ${statusConfig.icon} ${statusConfig.color}`}></i>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{statusConfig.label}</h3>
          {typeConfig && (
            <span className="text-xs text-gray-500">
              <i className={`fas ${typeConfig.icon} mr-1`}></i> {typeConfig.label}
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Transaction ID:</span>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{transactionId}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Blockchain ID:</span>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[180px]">
            {blockchainId}
          </span>
        </div>
        
        {timestamp && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Timestamp:</span>
            <span className="text-gray-700">{timestamp.toLocaleString()}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <a 
          href="#" 
          className="flex items-center justify-center text-primary text-sm hover:text-primary-dark"
        >
          <i className="fas fa-external-link-alt mr-2"></i>
          View on Blockchain Explorer
        </a>
      </div>
    </div>
  );
}