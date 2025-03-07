import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { mockTransactions } from '@/lib/mockData';

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Pending</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <span className="material-icons text-blue-500">swap_horiz</span>;
      case 'payment':
        return <span className="material-icons text-green-500">payments</span>;
      case 'contract':
        return <span className="material-icons text-amber-500">description</span>;
      default:
        return <span className="material-icons text-gray-500">receipt</span>;
    }
  };
  
  return (
    <PageContainer title="Transactions">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Transactions
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'transfers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('transfers')}
          >
            Transfers
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'payments' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
          <button 
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'contracts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('contracts')}
          >
            Smart Contracts
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Date Range:</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">
            <span className="material-icons mr-2">file_download</span>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counterparty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions
                .filter(tx => activeTab === 'all' || tx.type === activeTab.slice(0, -1))
                .map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        {getTypeIcon(tx.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{tx.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{tx.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.counterparty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date.toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-blue-700 mr-3">View</button>
                    <button className="text-gray-500 hover:text-gray-700">
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">42</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-gray-500">Previous</button>
            <button className="border border-primary bg-primary rounded-md px-2 py-1 text-sm text-white">1</button>
            <button className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-gray-700">2</button>
            <button className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-gray-700">3</button>
            <button className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-gray-700">Next</button>
          </div>
        </div>
      </div>
      
      {/* Blockchain Verification */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="flex items-start">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
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
