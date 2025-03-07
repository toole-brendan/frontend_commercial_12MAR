import { InventoryItem, Transfer, Transaction, SmartContract } from '@shared/schema';

// Mock user
export const currentUser = {
  id: 1,
  username: 'sarah.johnson',
  name: 'Sarah Johnson',
  role: 'Supply Chain Manager',
  profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
};

// Mock dashboard stats
export const dashboardStats = {
  totalInventory: 356,
  pendingTransfers: 12,
  completedToday: 28,
  shellBalance: 1245
};

// Mock suppliers
export const mockSuppliers = [
  {
    id: "SUP-001",
    name: "SupplyTech Inc.",
    contactPerson: "John Williams",
    email: "john.williams@supplytech.com",
    phone: "555-123-4567",
    address: "123 Supply Lane, San Francisco, CA 94107",
    rating: 4.8,
    status: "Active",
    category: "Electronics",
    paymentTerms: "Net 30",
    onboarded: new Date("2022-05-15"),
    lastOrder: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    totalOrders: 47,
    contractId: "SC-1001",
    preferredPayment: "USDC",
    notes: "Preferred supplier for electronics and IT equipment."
  },
  {
    id: "SUP-002",
    name: "ServicePro Inc.",
    contactPerson: "Emma Davis",
    email: "e.davis@servicepro.com",
    phone: "555-987-6543",
    address: "456 Provider Ave, Austin, TX 78701",
    rating: 4.5,
    status: "Active",
    category: "Maintenance",
    paymentTerms: "Net 15",
    onboarded: new Date("2021-11-20"),
    lastOrder: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    totalOrders: 32,
    contractId: "SC-1002",
    preferredPayment: "Shells",
    notes: "Primary service provider for equipment maintenance."
  },
  {
    id: "SUP-003",
    name: "TechLease Corporation",
    contactPerson: "Michael Chen",
    email: "m.chen@techlease.com",
    phone: "555-234-5678",
    address: "789 Lease Blvd, Seattle, WA 98101",
    rating: 4.2,
    status: "Inactive",
    category: "Equipment",
    paymentTerms: "Net 45",
    onboarded: new Date("2022-02-10"),
    lastOrder: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    totalOrders: 8,
    contractId: "SC-1003",
    preferredPayment: "Shells",
    notes: "Equipment leasing provider, contract currently on hold."
  },
  {
    id: "SUP-004",
    name: "RapidShip Logistics",
    contactPerson: "Sarah Parker",
    email: "s.parker@rapidship.com",
    phone: "555-345-6789",
    address: "101 Shipping Lane, Chicago, IL 60607",
    rating: 4.7,
    status: "Active",
    category: "Logistics",
    paymentTerms: "Net 7",
    onboarded: new Date("2023-01-05"),
    lastOrder: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    totalOrders: 53,
    contractId: null,
    preferredPayment: "Traditional",
    notes: "Reliable shipping partner for expedited deliveries."
  },
  {
    id: "SUP-005",
    name: "OfficeWorks Solutions",
    contactPerson: "Robert Taylor",
    email: "r.taylor@officeworks.com",
    phone: "555-456-7890",
    address: "222 Office Park, Boston, MA 02110",
    rating: 4.0,
    status: "Active",
    category: "Office Supplies",
    paymentTerms: "Net 30",
    onboarded: new Date("2022-08-15"),
    lastOrder: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    totalOrders: 29,
    contractId: null,
    preferredPayment: "Traditional",
    notes: "Primary supplier for office and stationery supplies."
  }
];

// Mock transfer requests
export const transferRequests = [
  {
    id: 1,
    itemId: 1,
    itemName: 'Industrial Printer #A24193',
    fromParty: 'Tech Department',
    toParty: 'Your Department',
    status: 'pending',
    quantity: 1,
    type: 'incoming',
    blockchainVerified: false
  },
  {
    id: 2,
    itemId: 2,
    itemName: 'Conference Room Display #B2901',
    fromParty: 'Marketing Team',
    toParty: 'Your Department',
    status: 'pending',
    quantity: 1,
    type: 'incoming',
    blockchainVerified: false
  },
  {
    id: 3,
    itemId: 3,
    itemName: 'Inventory Scanners (5) #C1245',
    fromParty: 'Your Department',
    toParty: 'Warehouse #3',
    status: 'pending',
    quantity: 5,
    type: 'outgoing',
    blockchainVerified: false
  },
  {
    id: 4,
    itemId: 4,
    itemName: 'Forklift #FLT-982',
    fromParty: 'Your Department',
    toParty: 'Loading Dock',
    status: 'completed',
    quantity: 1,
    type: 'outgoing',
    blockchainVerified: true
  }
];

// Mock activities
export const activities = [
  {
    id: 1,
    description: 'Smart contract created with SupplyTech Inc.',
    details: 'Payment terms: Net 30, automated payment on delivery',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: 'contract',
    blockchainVerified: true
  },
  {
    id: 2,
    description: 'Received 24 laptops from TechDistributors',
    details: 'Auto-payment processed: 12,500 SHL ($12,500)',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    type: 'receipt',
    blockchainVerified: true
  },
  {
    id: 3,
    description: 'Transferred 5 barcode scanners to Warehouse #2',
    details: 'Internal transfer completed by Mark Wilson',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    type: 'transfer',
    blockchainVerified: true
  },
  {
    id: 4,
    description: 'Created new inventory batch: Office Supplies',
    details: '42 items added to inventory system',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    type: 'inventory',
    blockchainVerified: true
  }
];

// Mock low stock items
export const lowStockItems = [
  {
    id: 1,
    name: 'Printer Toner #T450',
    quantity: 3,
    reorderThreshold: 20,
    percentRemaining: 15
  },
  {
    id: 2,
    name: 'Laptop Chargers',
    quantity: 6,
    reorderThreshold: 20,
    percentRemaining: 30
  },
  {
    id: 3,
    name: 'HDMI Cables',
    quantity: 5,
    reorderThreshold: 20,
    percentRemaining: 25
  },
  {
    id: 4,
    name: 'Office Paper A4',
    quantity: 2,
    reorderThreshold: 20,
    percentRemaining: 10
  }
];

// Mock transactions
export const mockTransactions = [
  {
    id: "TR-10035",
    type: 'receipt',
    description: 'Inventory Receipt: Office Supplies',
    reference: 'PO #PO-2023-156',
    date: new Date(2023, 4, 4),
    amount: 3500,
    amountUSD: 3500,
    currency: 'SHL',
    status: 'completed'
  },
  {
    id: "TR-10036",
    type: 'invoice',
    description: 'Payment to SupplyTech Inc',
    reference: 'Invoice #INV-2023-089',
    date: new Date(2023, 4, 3),
    amount: 1250,
    amountUSD: 1250,
    currency: 'SHL',
    status: 'completed'
  },
  {
    id: "TR-10037",
    type: 'transfer',
    description: 'Asset Transfer: Electronics',
    reference: 'Warehouse #1 to HQ',
    date: new Date(2023, 4, 2),
    amount: 18,
    amountUSD: 8240,
    currency: 'items',
    status: 'in_transit'
  },
  {
    id: "TR-10038",
    type: 'purchase',
    description: 'Equipment Purchase: Scanners',
    reference: 'PO #PO-2023-075',
    date: new Date(2023, 4, 1),
    amount: 890,
    amountUSD: 890,
    currency: 'SHL',
    status: 'completed'
  },
  {
    id: "TR-10039",
    type: 'shipment',
    description: 'Outbound Shipment: Customer Order',
    reference: 'Order #ORD-2023-112',
    date: new Date(2023, 4, 1),
    amount: 24,
    amountUSD: 5760,
    currency: 'items',
    status: 'processing'
  },
  {
    id: "TR-10040",
    type: 'contract',
    description: 'Smart Contract: Service Agreement',
    reference: 'Contract #SC-2023-008',
    date: new Date(2023, 3, 28),
    amount: 1200,
    amountUSD: 1200,
    currency: 'SHL',
    status: 'pending'
  },
];

// Mock inventory items
export const inventoryItems: Partial<InventoryItem>[] = [
  {
    id: "SKU-1001",
    name: 'Industrial Printer',
    description: 'High capacity industrial printer for warehouse use',
    category: 'Equipment',
    location: 'Warehouse #1',
    quantity: 5,
    unit: 'units',
    status: 'In Stock',
    lastUpdated: new Date(),
    blockchainId: '0x8f4e6b2a1c9d8e7f',
    metadata: { reorderThreshold: 2, assignedTo: 'Tech Department' }
  },
  {
    id: "SKU-1002",
    name: 'Conference Room Display',
    description: 'LED display for conference room presentations',
    category: 'Electronics',
    location: 'HQ',
    quantity: 10,
    unit: 'units',
    status: 'In Stock',
    lastUpdated: new Date(),
    blockchainId: '0x3a2b1c4d5e6f7g8',
    metadata: { reorderThreshold: 3, assignedTo: 'Marketing Team' }
  },
  {
    id: "SKU-1003",
    name: 'Inventory Scanners',
    description: 'Handheld barcode scanners for inventory management',
    category: 'Equipment',
    location: 'Warehouse #2',
    quantity: 15,
    unit: 'units',
    status: 'In Stock',
    lastUpdated: new Date(),
    blockchainId: '0x9a8b7c6d5e4f3g',
    metadata: { reorderThreshold: 5, assignedTo: 'Inventory Team' }
  },
  {
    id: "SKU-1004",
    name: 'Forklift',
    description: 'Electric forklift for warehouse operations',
    category: 'Heavy Equipment',
    location: 'Warehouse #1',
    quantity: 3,
    unit: 'units',
    status: 'In Stock',
    lastUpdated: new Date(),
    blockchainId: '0x1a2b3c4d5e6f7g',
    metadata: { reorderThreshold: 1, assignedTo: 'Loading Dock' }
  },
  {
    id: "SKU-1005",
    name: 'Printer Toner',
    description: 'Toner cartridges for office printers',
    category: 'Supplies',
    location: 'Supply Room',
    quantity: 2,
    unit: 'boxes',
    status: 'Low Stock',
    lastUpdated: new Date(),
    blockchainId: '0x7g6f5e4d3c2b1a',
    metadata: { reorderThreshold: 10, assignedTo: 'Office Management' }
  }
];

// Mock smart contracts
export const smartContracts: Partial<SmartContract>[] = [
  {
    id: "SC-1001",
    name: 'Supply Agreement with SupplyTech Inc',
    counterparty: 'SupplyTech Inc',
    type: 'Auto-Payment',
    terms: 'Net 30, automated payment on delivery. Payment triggered on delivery confirmation.',
    status: 'Active',
    blockchainId: '0x8f4e6b2a1c9d8e7f',
    paymentMethod: 'usdc'
  },
  {
    id: "SC-1002",
    name: 'Maintenance Contract with ServicePro',
    counterparty: 'ServicePro Inc',
    type: 'Recurring Payment',
    terms: 'Monthly subscription, 5,000 SHL per month. Automatic payment on the 1st of each month.',
    status: 'Active',
    blockchainId: '0x3a2b1c4d5e6f7g8',
    paymentMethod: 'shells'
  },
  {
    id: "SC-1003",
    name: 'Equipment Lease with TechLease Corp',
    counterparty: 'TechLease Corporation',
    type: 'Time-based',
    terms: '12-month lease, 1,500 SHL per month. Automatic payment on the 15th of each month.',
    status: 'Inactive',
    blockchainId: null,
    paymentMethod: 'shells'
  }
];

// Mock recipients for transfer forms
export const mockRecipients = [
  'Warehouse #1',
  'Warehouse #2',
  'Warehouse #3',
  'Sales Department',
  'Marketing Team',
  'Tech Department',
  'Finance & Accounting',
  'Executive Office',
  'Customer Service',
  'SupplyTech Inc.',
  'ServicePro Inc.',
  'TechLease Corporation',
  'Retail Distribution Center'
];

// Mock analytics data
export const analyticsData = {
  inventoryOverTime: [
    { month: 'Jan', totalItems: 284 },
    { month: 'Feb', totalItems: 306 },
    { month: 'Mar', totalItems: 325 },
    { month: 'Apr', totalItems: 332 },
    { month: 'May', totalItems: 356 },
    { month: 'Jun', totalItems: 370 }
  ],
  transfersByStatus: {
    labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
    values: [67, 23, 12, 5]
  },
  topSuppliers: [
    { name: 'SupplyTech Inc.', transactions: 47, value: 58500 },
    { name: 'ServicePro Inc.', transactions: 32, value: 45000 },
    { name: 'RapidShip Logistics', transactions: 53, value: 37800 },
    { name: 'OfficeWorks Solutions', transactions: 29, value: 22450 },
    { name: 'TechLease Corporation', transactions: 8, value: 12000 }
  ],
  monthlyTransactions: [
    { month: 'Jan', incoming: 12500, outgoing: 9800 },
    { month: 'Feb', incoming: 18300, outgoing: 15200 },
    { month: 'Mar', incoming: 22100, outgoing: 17800 },
    { month: 'Apr', incoming: 19700, outgoing: 16500 },
    { month: 'May', incoming: 24500, outgoing: 18900 },
    { month: 'Jun', incoming: 28700, outgoing: 22100 }
  ],
  categoryDistribution: {
    labels: ['Electronics', 'Equipment', 'Supplies', 'Furniture', 'Other'],
    values: [35, 28, 22, 10, 5]
  },
  paymentMethodDistribution: {
    labels: ['USDC', 'Shells (SHL)', 'Traditional'],
    values: [45, 37, 18]
  },
  inventoryAging: [
    { age: '0-30 days', percentage: 42 },
    { age: '31-60 days', percentage: 28 },
    { age: '61-90 days', percentage: 18 },
    { age: '91+ days', percentage: 12 }
  ],
  kpis: {
    fulfillmentRate: 96.8,
    avgProcessingTime: 1.4,
    orderAccuracy: 99.2,
    onTimePayment: 97.5,
    inventoryTurnover: 4.2,
    supplierReliability: 94.1
  },
  inventoryAlerts: [
    { category: 'Low Stock', count: 12 },
    { category: 'Excess Inventory', count: 8 },
    { category: 'Aging Inventory', count: 6 },
    { category: 'Quality Issues', count: 2 }
  ]
};
