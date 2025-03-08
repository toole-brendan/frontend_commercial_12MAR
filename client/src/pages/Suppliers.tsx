import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockSuppliers } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Star, MessageSquare, FileText, ExternalLink, Edit, Trash2, Building } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { format } from "date-fns";

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Simulate API fetch with mock data
  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ["/api/suppliers"],
    queryFn: async () => mockSuppliers
  });

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = searchQuery === "" || 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !filterStatus || supplier.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  function handleViewDetails(supplier: any) {
    setSelectedSupplier(supplier);
  }

  // 8VC style action buttons
  const actionButtons = (
    <button 
      className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
      onClick={() => setIsAddDialogOpen(true)}
    >
      <Plus className="h-4 w-4 mr-1" />
      <span>Add Supplier</span>
    </button>
  );

  return (
    <PageWrapper
      className="space-y-4 pt-4"
      actions={actionButtons}
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Partner Network</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Supplier Management</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Manage your supplier relationships and blockchain contracts</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      {/* 8VC Style Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="category-tag mb-1.5">Network Size</div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20">
              <Building size={18} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 dark:text-white">{suppliers.length} Total Suppliers</h3>
          </div>
          <div className="text-sm font-light text-gray-500 dark:text-gray-400 mt-1">
            {suppliers.filter(s => s.status === "Active").length} active partners
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="category-tag mb-1.5">Smart Contracts</div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 flex items-center justify-center bg-indigo-500/10 dark:bg-indigo-500/20">
              <FileText size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 dark:text-white">
              {suppliers.filter(s => s.contractId).length} Blockchain Contracts
            </h3>
          </div>
          <div className="text-sm font-light text-gray-500 dark:text-gray-400 mt-1">
            {Math.round((suppliers.filter(s => s.contractId).length / suppliers.length) * 100)}% contract utilization rate
          </div>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="category-tag mb-1.5">Performance</div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 flex items-center justify-center bg-amber-500/10 dark:bg-amber-500/20">
              <Star size={18} className="text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 dark:text-white">
              {(suppliers.reduce((acc, supplier) => acc + supplier.rating, 0) / suppliers.length).toFixed(1)} Average Rating
            </h3>
          </div>
          <div className="text-sm font-light text-gray-500 dark:text-gray-400 mt-1">
            Based on delivery performance metrics
          </div>
        </div>
      </div>
      

      
      {/* 8VC Style Table with Filter Controls */}
      <div className="w-full mt-3">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5 mb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <select 
                className="text-xs uppercase tracking-wider font-medium border border-gray-300 dark:border-white/10 bg-transparent py-1 px-3 text-gray-600 dark:text-white w-full sm:w-auto"
                onChange={(e) => setFilterStatus(e.target.value === "all" ? null : e.target.value)}
              >
                <option value="all">All Suppliers</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
              
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search suppliers..."
                  className="block w-full sm:w-[240px] pl-10 pr-3 py-1 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
              <div className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mr-3">
                {filteredSuppliers.length} suppliers shown
              </div>
              <button 
                className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-xs"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-white/10">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading suppliers data...</p>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-white/10">
            <Building className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-1">No suppliers found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
            <div className="overflow-x-auto">
              <table className="min-w-full data-table">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-white/10">
                    <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Terms</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Order</th>
                    <th scope="col" className="py-2 pl-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pr-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer" onClick={() => handleViewDetails(supplier)}>
                      <td className="py-2.5 pr-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20">
                            <Building size={18} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-normal text-gray-900 dark:text-white">{supplier.name}</div>
                            <div className="text-xs font-light text-gray-500 dark:text-gray-400">{supplier.contactPerson}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400 font-mono">{supplier.paymentTerms}</td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                          {supplier.rating}
                          <Star className="h-4 w-4 ml-1 text-amber-500 dark:text-amber-400" />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border ${
                          supplier.status === "Active" 
                            ? "border-green-500/30 text-green-600 dark:text-green-400" 
                            : "border-gray-500/30 text-gray-600 dark:text-gray-400"
                        }`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400 font-mono">
                        {format(supplier.lastOrder, 'MMM d, yyyy')}
                      </td>
                      <td className="py-2.5 pl-4 whitespace-nowrap text-right pr-5">
                        <div className="flex items-center space-x-3 justify-end">
                          <button 
                            className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                            onClick={(e) => { e.stopPropagation(); handleViewDetails(supplier); }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" onClick={(e) => { e.stopPropagation(); }}>
                            <FileText className="h-4 w-4" />
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
      
      {/* Add Supplier Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Enter the supplier details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <label className="text-sm font-medium dark:text-gray-200">Company Name</label>
              <Input className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Contact Person</label>
              <Input className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Email</label>
              <Input className="mt-1" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Phone</label>
              <Input className="mt-1" type="tel" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Category</label>
              <Input className="mt-1" />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium dark:text-gray-200">Address</label>
              <Input className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Payment Terms</label>
              <Input className="mt-1" placeholder="e.g. Net 30" />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Preferred Payment</label>
              <Input className="mt-1" placeholder="USDC, Shells, Traditional" />
            </div>
          </div>
          
          <DialogFooter>
            <button 
              className="btn-8vc text-sm px-4 py-2" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="btn-8vc-primary text-sm px-4 py-2" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Save Supplier
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Supplier Details Dialog */}
      {selectedSupplier && (
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedSupplier.name}</DialogTitle>
              <DialogDescription>
                Supplier ID: {selectedSupplier.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="font-medium mb-2 text-foreground dark:text-gray-200">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Contact Person:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Email:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Phone:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Address:</span>
                    <span className="text-right text-foreground dark:text-gray-300">{selectedSupplier.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-foreground dark:text-gray-200">Supplier Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Category:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Status:</span>
                    <Badge variant="outline" className={
                      selectedSupplier.status === "Active" 
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50 dark:hover:bg-green-900/30" 
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700/50 dark:hover:bg-gray-800/40"
                    }>
                      {selectedSupplier.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Rating:</span>
                    <div className="flex items-center text-foreground dark:text-gray-300">
                      {selectedSupplier.rating}
                      <Star className="h-3 w-3 ml-1 text-amber-500 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Onboarded:</span>
                    <span className="text-foreground dark:text-gray-300">{format(selectedSupplier.onboarded, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-foreground dark:text-gray-200">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Payment Terms:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Preferred Payment:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.preferredPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Contract ID:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.contractId || 'No contract'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Total Orders:</span>
                    <span className="text-foreground dark:text-gray-300">{selectedSupplier.totalOrders}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-foreground dark:text-gray-200">Notes</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{selectedSupplier.notes}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <div className="flex flex-wrap gap-3">
                <button className="btn-8vc text-sm flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </button>
                <button className="btn-8vc text-sm flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  View Contracts
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="btn-8vc-primary text-sm flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 border border-red-600 dark:border-red-700 text-sm py-1.5 px-3 flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageWrapper>
  );
}