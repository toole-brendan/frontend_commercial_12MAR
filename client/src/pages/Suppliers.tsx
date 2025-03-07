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
import { Plus, Search, Filter, Star, MessageSquare, FileText, ExternalLink, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ActionButton } from "@/components/ui/action-button";
import { format } from "date-fns";

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
  
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

  const actionButtons = (
    <ActionButton 
      variant="primary"
      onClick={() => setIsAddDialogOpen(true)}
      icon={<Plus className="h-4 w-4" />}
    >
      Add Supplier
    </ActionButton>
  );

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <PageHeader 
        title="Suppliers" 
        description="Manage your supplier relationships and contracts"
        actions={actionButtons}
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              {suppliers.filter(s => s.status === "Active").length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.filter(s => s.contractId).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((suppliers.filter(s => s.contractId).length / suppliers.length) * 100)}% of suppliers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Supplier Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {(suppliers.reduce((acc, supplier) => acc + supplier.rating, 0) / suppliers.length).toFixed(1)}
              <Star className="h-4 w-4 text-yellow-400 ml-1" />
            </div>
            <p className="text-xs text-muted-foreground">Based on performance history</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilterStatus(null)}>All</TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilterStatus("Active")}>Active</TabsTrigger>
            <TabsTrigger value="inactive" onClick={() => setFilterStatus("Inactive")}>Inactive</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Payment Terms</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">Loading suppliers...</TableCell>
                      </TableRow>
                    ) : filteredSuppliers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">No suppliers found</TableCell>
                      </TableRow>
                    ) : (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{supplier.contactPerson}</div>
                          </TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>{supplier.paymentTerms}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {supplier.rating}
                              <Star className="h-3 w-3 ml-1 text-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              supplier.status === "Active" 
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900" 
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                            }>
                              {supplier.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(supplier.lastOrder, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewDetails(supplier)}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          {/* Same content but filtered for active suppliers */}
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          {/* Same content but filtered for inactive suppliers */}
        </TabsContent>
      </Tabs>
      
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
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
                <h3 className="font-medium mb-2 dark:text-gray-200">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Contact Person:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Address:</span>
                    <span className="text-right dark:text-gray-300">{selectedSupplier.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 dark:text-gray-200">Supplier Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <Badge className={
                      selectedSupplier.status === "Active" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                    }>
                      {selectedSupplier.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                    <div className="flex items-center dark:text-gray-300">
                      {selectedSupplier.rating}
                      <Star className="h-3 w-3 ml-1 text-yellow-400" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Onboarded:</span>
                    <span className="dark:text-gray-300">{format(selectedSupplier.onboarded, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 dark:text-gray-200">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Payment Terms:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Preferred Payment:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.preferredPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Contract ID:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.contractId || 'No contract'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Total Orders:</span>
                    <span className="dark:text-gray-300">{selectedSupplier.totalOrders}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 dark:text-gray-200">Notes</h3>
                <p className="text-sm dark:text-gray-400">{selectedSupplier.notes}</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Contracts
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}