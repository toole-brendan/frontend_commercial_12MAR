import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { mockTransactions } from '@/lib/mockData';
import { format } from 'date-fns';

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">Pending</span>;
      case 'in_transit':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">In Transit</span>;
      case 'processing':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">Processing</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">{status}</span>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt':
        return <span className="material-icons text-emerald-500 dark:text-emerald-400 text-xl">inventory</span>;
      case 'invoice':
        return <span className="material-icons text-violet-500 dark:text-violet-400 text-xl">receipt_long</span>;
      case 'transfer':
        return <span className="material-icons text-blue-500 dark:text-blue-400 text-xl">swap_horiz</span>;
      case 'purchase':
        return <span className="material-icons text-indigo-500 dark:text-indigo-400 text-xl">shopping_cart</span>;
      case 'shipment':
        return <span className="material-icons text-amber-500 dark:text-amber-400 text-xl">local_shipping</span>;
      case 'contract':
        return <span className="material-icons text-red-500 dark:text-red-400 text-xl">description</span>;
      default:
        return <span className="material-icons text-gray-500 dark:text-gray-400 text-xl">receipt</span>;
    }
  };
  
  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'bg-emerald-50 dark:bg-emerald-900/20';
      case 'invoice':
        return 'bg-violet-50 dark:bg-violet-900/20';
      case 'transfer':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'purchase':
        return 'bg-indigo-50 dark:bg-indigo-900/20';
      case 'shipment':
        return 'bg-amber-50 dark:bg-amber-900/20';
      case 'contract':
        return 'bg-red-50 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };
  
  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-2">
      <button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
        <span className="material-icons text-sm mr-2">add</span>
        <span>New Transaction</span>
      </button>
      <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
        <span className="material-icons text-sm mr-2">file_download</span>
        <span>Export</span>
      </button>
    </div>
  );

  return (
    <PageContainer 
      title="Transactions" 
      description="Manage and track all transaction records across the system"
      actions={actionButtons}
    >
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All Transactions
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'receipts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('receipts')}
          >
            Receipts
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'transfers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('transfers')}
          >
            Transfers
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'shipments' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('shipments')}
          >
            Shipments
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'purchases' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Date Range:</label>
            <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>All Time</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <div className="relative ml-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-icons text-gray-400 text-sm">search</span>
            </span>
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <span className="material-icons text-sm mr-2">file_download</span>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reference</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions
                .filter(tx => activeTab === 'all' || tx.type === activeTab.slice(0, -1))
                .map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center mr-3 ${getIconBgColor(tx.type)} rounded-full`}>
                          {getTypeIcon(tx.type)}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{tx.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{tx.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(tx.date, 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary-dark mr-3">View</button>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <span className="material-icons text-sm">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 rounded">Previous</button>
            <button className="border border-primary bg-primary px-2 py-1 text-sm text-white rounded">1</button>
            <button className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">2</button>
            <button className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">3</button>
            <button className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>
      
      {/* Blockchain Verification */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-6 mt-6">
        <div className="flex items-start">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 mr-4 rounded-lg">
            <span className="material-icons text-primary dark:text-blue-400">security</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Blockchain Verification</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              All transactions are securely recorded on the blockchain for maximum transparency and auditability.
              Click on any transaction to view the blockchain details.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Transactions;
