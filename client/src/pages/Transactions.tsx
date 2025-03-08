import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';
import PageWrapper from '@/components/layout/PageWrapper';
import { Plus, Download, Search, FileText, ArrowUpDown, ShoppingCart, Truck, FileType, Eye, MoreVertical, Shield } from 'lucide-react';

export default function Transactions() {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  const handleNewTransaction = () => {
    toast({
      title: "New Transaction",
      description: "This would open a form to create a new transaction"
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Transactions",
      description: "This would export your transactions data"
    });
  };
  
  const getStatusBadge = (status: string) => {
    // 8VC style badges with square borders instead of rounded
    switch(status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">Completed</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">Pending</span>;
      case 'in_transit':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-blue-500/30 text-blue-600 dark:text-blue-400">In Transit</span>;
      case 'processing':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">Processing</span>;
      default:
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-500/30 text-gray-600 dark:text-gray-400">{status}</span>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt':
        return <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />;
      case 'invoice':
        return <FileType size={18} className="text-violet-600 dark:text-violet-400" />;
      case 'transfer':
        return <ArrowUpDown size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'purchase':
        return <ShoppingCart size={18} className="text-indigo-600 dark:text-indigo-400" />;
      case 'shipment':
        return <Truck size={18} className="text-amber-600 dark:text-amber-400" />;
      case 'contract':
        return <FileText size={18} className="text-red-600 dark:text-red-400" />;
      default:
        return <FileText size={18} className="text-gray-600 dark:text-gray-400" />;
    }
  };
  
  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'invoice':
        return 'bg-violet-500/10 dark:bg-violet-500/20';
      case 'transfer':
        return 'bg-blue-500/10 dark:bg-blue-500/20';
      case 'purchase':
        return 'bg-indigo-500/10 dark:bg-indigo-500/20';
      case 'shipment':
        return 'bg-amber-500/10 dark:bg-amber-500/20';
      case 'contract':
        return 'bg-red-500/10 dark:bg-red-500/20';
      default:
        return 'bg-gray-500/10 dark:bg-gray-500/20';
    }
  };
  
  // 8VC style action buttons
  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <button 
        className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleNewTransaction}
      >
        <Plus className="h-4 w-4 mr-1" />
        <span>New Transaction</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleExport}
      >
        <Download className="h-4 w-4 mr-1" />
        <span>Export</span>
      </button>
    </div>
  );

  return (
    <PageWrapper
      className="space-y-4 pt-4"
      actions={actionButtons}
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Financial Records</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Transaction management</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">View and manage all financial transactions across the system</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      {/* Tabs - 8VC Style with bottom border instead of rounded tabs */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 mb-4">
        <div className="border-b border-gray-200 dark:border-white/10">
          <nav className="flex overflow-x-auto">
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'all' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Transactions
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'receipts' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('receipts')}
            >
              Receipts
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'transfers' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('transfers')}
            >
              Transfers
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'shipments' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('shipments')}
            >
              Shipments
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'purchases' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('purchases')}
            >
              Purchases
            </button>
          </nav>
        </div>
      
        {/* Filters and Search */}
        <div className="p-5 border-b border-gray-200 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mr-3">Date Range:</label>
              <select className="text-xs uppercase tracking-wider font-medium border border-gray-300 dark:border-white/10 bg-transparent py-1 px-3 text-gray-600 dark:text-white">
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            <div className="relative ml-auto">
              <div className="flex items-center border border-gray-300 dark:border-white/10">
                <Search className="h-4 w-4 ml-2 text-gray-500 dark:text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="pl-2 pr-4 py-1 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Transactions Table */}
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr className="border-b border-gray-300 dark:border-white/10">
                  <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reference</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="py-2 pl-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {mockTransactions
                  .filter(tx => activeTab === 'all' || tx.type === activeTab.slice(0, -1))
                  .map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150">
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 flex items-center justify-center mr-3 ${getIconBgColor(tx.type)}`}>
                            {getTypeIcon(tx.type)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">TX-{tx.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{tx.type}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400">{tx.description}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">{tx.amount} {tx.currency}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">${tx.amountUSD} USD</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">{tx.reference}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-sm font-light text-gray-900 dark:text-white">
                          {format(tx.date, 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {format(tx.date, 'h:mm a')}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(tx.status)}
                      </td>
                      <td className="py-3 pl-4 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center space-x-3">
                          <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination - 8VC Style */}
          <div className="mt-4 py-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> results
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <button className="border border-gray-300 dark:border-white/10 px-3 py-1 text-xs bg-transparent text-gray-500 dark:text-gray-400">Previous</button>
              <button className="border border-purple-600 dark:border-purple-400 px-3 py-1 text-xs bg-transparent text-purple-600 dark:text-purple-400">1</button>
              <button className="border border-gray-300 dark:border-white/10 px-3 py-1 text-xs bg-transparent text-gray-700 dark:text-gray-300">2</button>
              <button className="border border-gray-300 dark:border-white/10 px-3 py-1 text-xs bg-transparent text-gray-700 dark:text-gray-300">3</button>
              <button className="border border-gray-300 dark:border-white/10 px-3 py-1 text-xs bg-transparent text-gray-700 dark:text-gray-300">Next</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blockchain Verification - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5 mt-6">
        <div className="flex items-start">
          <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20 mr-4">
            <Shield size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="category-tag mb-1">Security</div>
            <h3 className="text-lg font-light text-gray-900 dark:text-white mb-1">Blockchain Verification</h3>
            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
              All transactions are securely recorded on the blockchain for maximum transparency and auditability.
              Click on any transaction to view the blockchain details.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
