import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockSuppliers } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="flex items-center mb-8">
        <div className="mr-4">
          <h1 className="text-2xl font-semibold tracking-tight">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your supplier relationships and contracts
          </p>
        </div>
        <div className="ml-auto">
          <span className="uppercase text-xs tracking-wide px-2 py-1 border border-purple-200 text-purple-600 dark:text-purple-400 dark:border-purple-800/50 bg-purple-50 dark:bg-purple-900/20 rounded-sm">
            Partner Ecosystem
          </span>
        </div>
      </div>
      
      <div className="w-full h-px bg-border mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col p-5 rounded-sm border border-gray-200 dark:border-gray-700/60 bg-background dark:bg-black">
          <h4 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-2">Total Suppliers</h4>
          <div className="text-3xl font-bold dark:text-white">{suppliers.length}</div>
          <div className="text-xs font-medium text-muted-foreground dark:text-gray-400 mt-1">
            {suppliers.filter(s => s.status === "Active").length} active
          </div>
        </div>
        
        <div className="flex flex-col p-5 rounded-sm border border-gray-200 dark:border-gray-700/60 bg-background dark:bg-black">
          <h4 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-2">Smart Contracts</h4>
          <div className="text-3xl font-bold dark:text-white">
            {suppliers.filter(s => s.contractId).length}
          </div>
          <div className="text-xs font-medium text-muted-foreground dark:text-gray-400 mt-1">
            {Math.round((suppliers.filter(s => s.contractId).length / suppliers.length) * 100)}% of suppliers
          </div>
        </div>
        
        <div className="flex flex-col p-5 rounded-sm border border-gray-200 dark:border-gray-700/60 bg-background dark:bg-black">
          <h4 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-2">Avg. Supplier Rating</h4>
          <div className="text-3xl font-bold flex items-center dark:text-white">
            {(suppliers.reduce((acc, supplier) => acc + supplier.rating, 0) / suppliers.length).toFixed(1)}
            <Star className="h-5 w-5 text-amber-500 dark:text-amber-400 ml-1" />
          </div>
          <div className="text-xs font-medium text-muted-foreground dark:text-gray-400 mt-1">
            Based on performance history
          </div>
        </div>
      </div>
      
      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setFilterStatus(null)}
              className={`px-3 py-1.5 text-sm font-medium ${!filterStatus ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus("Active")}
              className={`px-3 py-1.5 text-sm font-medium ${filterStatus === "Active" ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilterStatus("Inactive")}
              className={`px-3 py-1.5 text-sm font-medium ${filterStatus === "Inactive" ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              Inactive
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8 w-[250px] rounded-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="inline-flex items-center justify-center rounded-sm border border-gray-200 dark:border-gray-800 h-10 w-10 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-800 rounded-sm bg-white dark:bg-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Terms</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Order</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-5 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Loading suppliers...</td>
                  </tr>
                ) : filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-5 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No suppliers found</td>
                  </tr>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/10">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-9 w-9 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 text-purple-500 dark:text-purple-400 rounded-sm flex items-center justify-center">
                            <Building className="h-4 w-4" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{supplier.contactPerson}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{supplier.category}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{supplier.paymentTerms}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                          {supplier.rating}
                          <Star className="h-4 w-4 ml-1 text-amber-500 dark:text-amber-400" />
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-none font-medium border ${
                          supplier.status === "Active" 
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50" 
                            : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700"
                        }`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {format(supplier.lastOrder, 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                          onClick={() => handleViewDetails(supplier)}
                        >
                          <ExternalLink className="h-4 w-4 inline" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                          <Edit className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-gray-200 dark:border-gray-700">
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Supplier
            </Button>
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
            
            <div className="flex justify-between mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                  <FileText className="mr-2 h-4 w-4" />
                  View Contracts
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageWrapper>
  );
}