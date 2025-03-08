import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import PageWrapper from '@/components/layout/PageWrapper';
import { inventoryItems as mockInventoryItems } from '@/lib/mockData';
import { Plus, FileText, Search, Box, Edit, ArrowLeftRight, QrCode } from 'lucide-react';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { toast } = useToast();

  // Fetch inventory items from API
  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ['/api/inventory'],
    staleTime: 60000, // 1 minute
  });

  // Fallback to mock data if API call fails
  const displayItems = inventoryItems || mockInventoryItems;

  // Filter items based on search term and category
  const filteredItems = displayItems.filter(item => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filter dropdown
  const categories = Array.from(
    new Set(displayItems.map(item => item.category))
  ).filter(Boolean) as string[];

  const handleAddItem = () => {
    toast({
      title: "Add Item",
      description: "This would open a form to add a new inventory item"
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export CSV",
      description: "This would export inventory data as CSV"
    });
  };

  const handleItemClick = (id: number) => {
    toast({
      title: "Item Details",
      description: `Viewing details for item ID: ${id}`
    });
  };

  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <button 
        className="btn-8vc-primary flex items-center space-x-2"
        onClick={handleAddItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        <span>Add Item</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2"
        onClick={handleExportCSV}
      >
        <FileText className="h-4 w-4 mr-2" />
        <span>Export CSV</span>
      </button>
    </div>
  );

  return (
    <PageWrapper
      className="space-y-4"
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Inventory</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Inventory Management</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Manage and track your inventory items across all locations</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div></div>
        {actionButtons}
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
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
                placeholder="Search by name, code, or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <label htmlFor="category" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">Category</label>
            <select
              id="category"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 overflow-hidden mt-2">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading inventory data...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <Box className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No inventory items found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr className="border-b border-gray-300 dark:border-white/10">
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer" onClick={() => handleItemClick(item.id!)}>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100/50 dark:bg-white/5 flex items-center justify-center">
                          <Box className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-normal text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-xs font-light text-gray-500 dark:text-gray-400 max-w-xs truncate">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400 font-mono">{item.itemCode}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400">{item.location}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium font-mono">{item.quantity}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {item.blockchainHash ? (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 mr-3" onClick={(e) => { e.stopPropagation(); }}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 mr-3" onClick={(e) => { e.stopPropagation(); }}>
                        <ArrowLeftRight className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                        <QrCode className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
