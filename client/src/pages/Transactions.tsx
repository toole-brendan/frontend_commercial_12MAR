import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { mockTransactions } from '@/lib/mockData';

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-800 font-display">Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-amber-100 text-amber-800 font-display">Pending</span>;
      case 'in_transit':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-blue-100 text-blue-800 font-display">In Transit</span>;
      case 'processing':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-purple-100 text-purple-800 font-display">Processing</span>;
      default:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-800 font-display">{status}</span>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt':
        return <span className="material-icons text-emerald-500 text-xl">inventory</span>;
      case 'invoice':
        return <span className="material-icons text-violet-500 text-xl">receipt_long</span>;
      case 'transfer':
        return <span className="material-icons text-blue-500 text-xl">swap_horiz</span>;
      case 'purchase':
        return <span className="material-icons text-indigo-500 text-xl">shopping_cart</span>;
      case 'shipment':
        return <span className="material-icons text-amber-500 text-xl">local_shipping</span>;
      case 'contract':
        return <span className="material-icons text-red-500 text-xl">description</span>;
      default:
        return <span className="material-icons text-gray-500 text-xl">receipt</span>;
    }
  };
  
  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'bg-emerald-50';
      case 'invoice':
        return 'bg-violet-50';
      case 'transfer':
        return 'bg-blue-50';
      case 'purchase':
        return 'bg-indigo-50';
      case 'shipment':
        return 'bg-amber-50';
      case 'contract':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  return (
    <PageContainer title="Transactions">
      {/* Tabs */}
      <div className="bg-white shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none font-display ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Transactions
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none font-display ${activeTab === 'receipts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('receipts')}
          >
            Receipts
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none font-display ${activeTab === 'transfers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('transfers')}
          >
            Transfers
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none font-display ${activeTab === 'shipments' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('shipments')}
          >
            Shipments
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none font-display ${activeTab === 'purchases' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Date Range:</label>
            <select className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-display">
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
              className="pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-display"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-display">
            <span className="material-icons mr-2">file_download</span>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-display">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions
                .filter(tx => activeTab === 'all' || tx.type === activeTab.slice(0, -1))
                .map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center mr-3 ${getIconBgColor(tx.type)}`}>
                          {getTypeIcon(tx.type)}
                        </div>
                        <div className="text-sm font-medium text-gray-900 font-display px-2">{tx.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize font-display">{tx.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-display">{tx.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-display">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-display">{tx.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-display">{tx.date.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-blue-700 mr-3 font-display">View</button>
                      <button className="text-gray-500 hover:text-gray-700 font-display">
                        <span className="material-icons text-sm">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-300 px-2 py-1 text-sm bg-white text-gray-500 font-display">Previous</button>
            <button className="border border-primary bg-primary px-2 py-1 text-sm text-white font-display">1</button>
            <button className="border border-gray-300 px-2 py-1 text-sm bg-white text-gray-700 font-display">2</button>
            <button className="border border-gray-300 px-2 py-1 text-sm bg-white text-gray-700 font-display">3</button>
            <button className="border border-gray-300 px-2 py-1 text-sm bg-white text-gray-700 font-display">Next</button>
          </div>
        </div>
      </div>
      
      {/* Blockchain Verification */}
      <div className="bg-white shadow-sm p-6 mt-6">
        <div className="flex items-start">
          <div className="bg-blue-50 p-3 mr-4">
            <span className="material-icons text-primary">security</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Blockchain Verification</h3>
            <p className="text-sm text-gray-500 mt-1">
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
