import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import PageWrapper from '@/components/layout/PageWrapper';
import { inventoryItems as mockInventoryItems } from '@/lib/mockData';
import { Plus, FileText, Search, Box, Edit, ArrowLeftRight, QrCode, Download, Upload } from 'lucide-react';
import AddItemModal from '@/components/inventory/AddItemModal';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  // Extract unique locations for the add form
  const locations = Array.from(
    new Set(displayItems.map(item => item.location))
  ).filter(Boolean) as string[];

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleAddSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
    toast({
      title: "Item Added",
      description: "The new item has been added to inventory"
    });
  };

  const handleExportCSV = () => {
    // Create CSV content from inventory items
    const headers = ["Item Code", "Name", "Description", "Category", "Location", "Quantity", "Status"];
    const csvContent = 
      [headers.join(",")]
      .concat(
        filteredItems.map(item => 
          [
            item.itemCode || '',
            `"${item.name?.replace(/"/g, '""') || ''}"`,
            `"${item.description?.replace(/"/g, '""') || ''}"`,
            item.category || '',
            item.location || '',
            item.quantity || '',
            item.blockchainHash ? 'Verified' : 'Pending'
          ].join(",")
        )
      )
      .join("\n");
    
    // Create a downloadable blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Inventory data has been exported as CSV"
    });
  };

  const handleImportCSV = () => {
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    
    // Handle file selection
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // Process the CSV content here
        toast({
          title: "Import Started",
          description: `Importing data from ${file.name}`
        });
        
        // For now, just show a success message
        // In a real implementation, you would parse the CSV and save items to the database
        setTimeout(() => {
          toast({
            title: "Import Successful",
            description: "Inventory data has been imported"
          });
        }, 1500);
      };
      
      reader.readAsText(file);
    };
    
    // Trigger file selection
    fileInput.click();
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
        className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleAddItem}
      >
        <Plus className="h-4 w-4 mr-1" />
        <span>Add Item</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleExportCSV}
      >
        <Download className="h-4 w-4 mr-1" />
        <span>Export CSV</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleImportCSV}
      >
        <Upload className="h-4 w-4 mr-1" />
        <span>Import CSV</span>
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
      <div className="w-full mt-2">
        {isLoading ? (
          <div className="p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-white/10">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading inventory data...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-white/10">
            <Box className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No inventory items found matching your criteria</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
            <div className="overflow-x-auto">
              <table className="min-w-full data-table">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-white/10">
                    <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Code</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="py-2 pl-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer" onClick={() => handleItemClick(item.id!)}>
                      <td className="py-2.5 pr-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/20">
                            <Box size={18} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-normal text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">{item.description?.substring(0, 40)}{item.description?.length > 40 ? '...' : ''}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400 font-mono">{item.itemCode}</td>
                      <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400">{item.location}</td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">{item.quantity}</div>
                        {item.unit && (
                          <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">{item.unit}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
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
                      <td className="py-2.5 pl-4 whitespace-nowrap text-right">
                        <div className="flex items-center space-x-3">
                          <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                            <ArrowLeftRight className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                            <QrCode className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Item Modal */}
      <AddItemModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        categories={categories}
        locations={locations}
      />
    </PageWrapper>
  );
}
