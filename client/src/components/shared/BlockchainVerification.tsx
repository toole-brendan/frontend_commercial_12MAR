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
    <div className="bg-card dark:bg-card-bg-dark shadow-sm p-6">
      <div className="flex items-center mb-5">
        <div className={`h-10 w-10 ${statusConfig.bgColor} flex items-center justify-center mr-4`}>
          <span className={`material-icons ${statusConfig.color}`}>{statusConfig.icon}</span>
        </div>
        <div>
          <h3 className="font-medium text-foreground dark:text-theme-text-primary font-display">{statusConfig.label}</h3>
          {typeConfig && (
            <div className="flex items-center mt-1 text-xs text-muted-foreground dark:text-theme-text-secondary font-display">
              <span className={`material-icons-outlined text-sm mr-1 ${typeConfig.color}`}>{typeConfig.icon}</span>
              <span>{typeConfig.label}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 text-sm font-display">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground dark:text-theme-text-secondary">Transaction ID:</span>
          <span className="font-mono text-xs bg-accent dark:bg-accent-dark px-2 py-1 rounded-none dark:text-theme-text-primary">{transactionId}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground dark:text-theme-text-secondary">Blockchain ID:</span>
          <span className="font-mono text-xs bg-accent dark:bg-accent-dark px-2 py-1 rounded-none truncate max-w-[180px] dark:text-theme-text-primary">
            {blockchainId}
          </span>
        </div>
        
        {timestamp && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground dark:text-theme-text-secondary">Timestamp:</span>
            <span className="text-foreground dark:text-theme-text-primary font-mono text-xs">{timestamp.toLocaleString()}</span>
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-border dark:border-border">
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