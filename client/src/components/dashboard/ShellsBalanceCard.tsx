import React from 'react';

interface ShellsBalanceCardProps {
  balance: number;
  balanceUSD: number;
  lastUpdated: Date;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onConvert?: () => void;
}

export default function ShellsBalanceCard({
  balance,
  balanceUSD,
  lastUpdated,
  onDeposit,
  onWithdraw,
  onConvert
}: ShellsBalanceCardProps) {
  return (
    <div className="bg-white border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div>
          <h2 className="text-lg font-semibold">Shells Balance (SHL)</h2>
          <div className="text-sm text-indigo-100 data-value">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>
        <div className="bg-white bg-opacity-20 p-3">
          <i className="fas fa-coins text-2xl"></i>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-800 font-display stat-value">{balance.toLocaleString()} SHL</div>
            <div className="text-sm text-gray-500 numeric-display">≈ ${balanceUSD.toLocaleString()}</div>
          </div>
          <div className="text-xs px-2 py-1 bg-green-100 text-green-800">
            <i className="fas fa-check-circle mr-1"></i> Verified on Chain
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-6">
          <button 
            onClick={onDeposit}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 hover:bg-gray-50 transition-colors action-element"
          >
            <div className="bg-green-100 p-2 mb-2">
              <i className="fas fa-arrow-down text-green-600"></i>
            </div>
            <span className="text-xs font-medium">Deposit</span>
          </button>
          
          <button 
            onClick={onWithdraw}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 hover:bg-gray-50 transition-colors action-element"
          >
            <div className="bg-blue-100 p-2 mb-2">
              <i className="fas fa-arrow-up text-blue-600"></i>
            </div>
            <span className="text-xs font-medium">Withdraw</span>
          </button>
          
          <button 
            onClick={onConvert}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 hover:bg-gray-50 transition-colors action-element"
          >
            <div className="bg-indigo-100 p-2 mb-2">
              <i className="fas fa-exchange-alt text-indigo-600"></i>
            </div>
            <span className="text-xs font-medium">Convert</span>
          </button>
        </div>
        
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="text-sm font-medium mb-2">Quick Links</div>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="text-sm text-primary flex items-center hover:underline">
              <i className="fas fa-history mr-1"></i> Transaction History
            </a>
            <a href="#" className="text-sm text-primary flex items-center hover:underline">
              <i className="fas fa-receipt mr-1"></i> Invoices
            </a>
            <a href="#" className="text-sm text-primary flex items-center hover:underline">
              <i className="fas fa-file-contract mr-1"></i> Smart Contracts
            </a>
            <a href="#" className="text-sm text-primary flex items-center hover:underline">
              <i className="fas fa-question-circle mr-1"></i> Shells FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}