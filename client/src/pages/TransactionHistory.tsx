import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { recentTransactions as mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';

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

  const handlePrintReport = () => {
    toast({
      title: "Print Report",
      description: "Transaction report would be prepared for printing"
    });
  };

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'incoming':
        return <div className="bg-green-100 p-2 rounded"><i className="fas fa-arrow-down text-green-600"></i></div>;
      case 'outgoing':
        return <div className="bg-red-100 p-2 rounded"><i className="fas fa-arrow-up text-red-600"></i></div>;
      case 'transfer':
        return <div className="bg-blue-100 p-2 rounded"><i className="fas fa-exchange-alt text-blue-600"></i></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded"><i className="fas fa-circle text-gray-600"></i></div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Transit</span>;
      case 'failed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Transaction History</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm"
            onClick={handleExportCSV}
          >
            <i className="fas fa-file-export"></i>
            <span>Export CSV</span>
          </button>
          <button 
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm"
            onClick={handlePrintReport}
          >
            <i className="fas fa-print"></i>
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              id="date-range"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="transaction-type" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <select
              id="transaction-type"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="incoming">Incoming Payments</option>
              <option value="outgoing">Outgoing Payments</option>
              <option value="transfer">Transfers</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Search by description, reference, or amount"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Transaction Records</h2>
        </div>
        {isLoading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-history text-gray-400 text-2xl mb-2"></i>
            <p className="text-gray-600">No transactions found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(transaction.date, 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.currency === 'items' 
                          ? `${transaction.amount} items` 
                          : `${transaction.amount.toLocaleString()} ${transaction.currency}`}
                      </div>
                      {transaction.currency !== 'items' && (
                        <div className="text-xs text-gray-500">${transaction.amountUSD.toLocaleString()} USD</div>
                      )}
                      {transaction.currency === 'items' && (
                        <div className="text-xs text-gray-500">Value: ${transaction.amountUSD.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center text-xs text-gray-700">
                        <i className="fas fa-check-circle text-green-500 mr-1"></i>
                        <span className="truncate max-w-[80px]">0x8f4e6b2a...</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary hover:text-primary-dark mr-3">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-primary hover:text-primary-dark">
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blockchain Verification Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 p-2 rounded mr-3">
            <i className="fas fa-shield-alt text-green-600"></i>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Blockchain Verification</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          All transactions in HandReceipt are secured and verified on the blockchain, providing an immutable record
          of every payment, transfer, and inventory change. This ensures complete transparency and auditability
          throughout your supply chain.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="border border-gray-200 rounded p-3">
            <div className="font-medium text-gray-700 mb-1">Immutable Records</div>
            <p className="text-gray-600">Once recorded on the blockchain, transaction records cannot be altered or deleted.</p>
          </div>
          <div className="border border-gray-200 rounded p-3">
            <div className="font-medium text-gray-700 mb-1">Instant Verification</div>
            <p className="text-gray-600">Transactions are verified within seconds, without the need for intermediaries.</p>
          </div>
          <div className="border border-gray-200 rounded p-3">
            <div className="font-medium text-gray-700 mb-1">Cryptographic Security</div>
            <p className="text-gray-600">Advanced encryption ensures all transactions are secure and tamper-proof.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
