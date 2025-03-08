import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { recentTransactions as mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';
import PageWrapper from '@/components/layout/PageWrapper';
import { Download, FileText, Search, ArrowUpDown, ShoppingCart, Truck, FileType, Eye, MoreVertical, Shield, AreaChart, Calendar, Filter } from 'lucide-react';

export default function TransactionHistory() {
  const [dateRange, setDateRange] = useState('all');
  const [transactionType, setTransactionType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Fetch transactions from API
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    staleTime: 60000, // 1 minute
  });

  // Fallback to mock data if API call fails
  const displayTransactions = transactions || mockTransactions;

  // Filter transactions based on filters
  const filteredTransactions = displayTransactions.filter(transaction => {
    // Filter by transaction type
    if (transactionType !== 'all' && transaction.type !== transactionType) {
      return false;
    }
    
    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const transactionDate = new Date(transaction.date);
      
      if (dateRange === 'today') {
        const today = new Date();
        if (transactionDate.getDate() !== today.getDate() ||
            transactionDate.getMonth() !== today.getMonth() ||
            transactionDate.getFullYear() !== today.getFullYear()) {
          return false;
        }
      } else if (dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (transactionDate < weekAgo) {
          return false;
        }
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (transactionDate < monthAgo) {
          return false;
        }
      }
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(term) ||
        transaction.reference.toLowerCase().includes(term) ||
        String(transaction.amount).includes(term) ||
        String(transaction.amountUSD).includes(term)
      );
    }
    
    return true;
  });

  const handleExportCSV = () => {
    toast({
      title: "Export CSV",
      description: "Transactions would be exported as CSV"
    });
  };

  const handleViewDetails = (transactionId: number) => {
    toast({
      title: "View Transaction",
      description: `Viewing details for transaction ID: ${transactionId}`
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <AreaChart size={18} className="text-emerald-600 dark:text-emerald-400" />;
      case 'outgoing':
        return <ArrowUpDown size={18} className="text-red-600 dark:text-red-400" />;
      case 'transfer':
        return <ArrowUpDown size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'purchase':
        return <ShoppingCart size={18} className="text-indigo-600 dark:text-indigo-400" />;
      case 'shipment':
        return <Truck size={18} className="text-amber-600 dark:text-amber-400" />;
      case 'receipt':
        return <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />;
      default:
        return <FileText size={18} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'outgoing':
        return 'bg-red-500/10 dark:bg-red-500/20';
      case 'transfer':
        return 'bg-blue-500/10 dark:bg-blue-500/20';
      case 'purchase':
        return 'bg-indigo-500/10 dark:bg-indigo-500/20';
      case 'shipment':
        return 'bg-amber-500/10 dark:bg-amber-500/20';
      case 'receipt':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      default:
        return 'bg-gray-500/10 dark:bg-gray-500/20';
    }
  };

  const getStatusBadge = (status: string) => {
    // 8VC style badges with square borders instead of rounded
    switch(status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">Completed</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">Pending</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-blue-500/30 text-blue-600 dark:text-blue-400">In Transit</span>;
      case 'failed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-red-500/30 text-red-600 dark:text-red-400">Failed</span>;
      default:
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-500/30 text-gray-600 dark:text-gray-400">{status}</span>;
    }
  };

  // 8VC style action buttons
  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleExportCSV}
      >
        <Download className="h-4 w-4 mr-1" />
        <span>Export CSV</span>
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
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Transaction History</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">View and analyze your complete transaction history with blockchain verification</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      {/* Filter and Search - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="date-range" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">Date Range</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="date-range"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1">
            <label htmlFor="transaction-type" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">Transaction Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="transaction-type"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="incoming">Incoming Payments</option>
                <option value="outgoing">Outgoing Payments</option>
                <option value="transfer">Transfers</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1">
            <label htmlFor="search" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="Search by description, reference, or amount"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-0 mt-4">
        <div className="p-5 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">Transaction Records</h3>
            {filteredTransactions.length > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Showing {filteredTransactions.length} of {displayTransactions.length} transactions
              </div>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-2 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No transactions found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 flex items-center justify-center mr-3 ${getIconBgColor(transaction.type)}`}>
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{transaction.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), 'h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                        {transaction.currency === 'items' 
                          ? `${transaction.amount} items` 
                          : `${transaction.amount.toLocaleString()} ${transaction.currency}`}
                      </div>
                      {transaction.currency !== 'items' && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">${transaction.amountUSD.toLocaleString()} USD</div>
                      )}
                      {transaction.currency === 'items' && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">Value: ${transaction.amountUSD.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center text-xs text-gray-700 dark:text-gray-300 font-mono">
                        <Shield className="h-3 w-3 text-green-500 mr-1" />
                        <span className="truncate max-w-[80px]">0x8f4e6b2a...</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end items-center space-x-3">
                        <button 
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
                          onClick={() => handleViewDetails(transaction.id)}
                        >
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
        )}
        
        {/* Pagination - 8VC Style */}
        {filteredTransactions.length > 0 && (
          <div className="mt-4 py-3 px-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(filteredTransactions.length, 10)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
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
        )}
      </div>
      
      {/* Blockchain Verification - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5 mt-6">
        <div className="flex items-start">
          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center mr-4 bg-primary/10 text-primary dark:text-purple-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="category-tag mb-1.5">Security</div>
            <h3 className="heading-medium mb-2 text-gray-900 dark:text-white">Blockchain Verification</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-4">
              All transactions are securely recorded on the blockchain for maximum transparency and auditability.
              This immutable record ensures the integrity of your supply chain data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="border border-gray-200 dark:border-white/10 p-4">
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">Immutable Records</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Once recorded on the blockchain, transaction records cannot be altered or deleted.</p>
              </div>
              <div className="border border-gray-200 dark:border-white/10 p-4">
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">Instant Verification</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Transactions are verified within seconds, without the need for intermediaries.</p>
              </div>
              <div className="border border-gray-200 dark:border-white/10 p-4">
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">Cryptographic Security</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Advanced encryption ensures all transactions are secure and tamper-proof.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
