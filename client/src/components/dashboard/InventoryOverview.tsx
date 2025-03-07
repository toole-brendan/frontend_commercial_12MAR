import React, { useState } from 'react';
import { mockInventoryItems } from '@/lib/mockData';
import { InventoryItem } from '@/context/AppContext';

interface InventoryOverviewProps {
  onTransfer?: (item: InventoryItem) => void;
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ onTransfer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = mockInventoryItems.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransfer = (item: InventoryItem) => {
    if (onTransfer) {
      onTransfer(item);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>;
      case 'Low Stock':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Low Stock</span>;
      case 'On Hold':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">On Hold</span>;
      case 'Out of Stock':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Out of Stock</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Inventory Overview</h2>
        <div className="flex">
          <div className="relative mr-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-icons text-gray-400 text-sm">search</span>
            </span>
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center">
            <span className="material-icons text-sm mr-1">filter_list</span>
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-primary hover:text-blue-700"
                    onClick={() => handleTransfer(item)}
                  >
                    Transfer
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredItems.length}</span> of <span className="font-medium">{mockInventoryItems.length}</span> results
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
  );
};

export default InventoryOverview;
