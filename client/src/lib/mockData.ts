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
    id: 1,
    type: 'incoming',
    description: 'Payment from TechMart Inc',
    reference: 'Invoice #INV-2023-004',
    date: new Date(2023, 4, 4),
    amount: 3500,
    amountUSD: 3500,
    currency: 'SHL',
    status: 'completed'
  },
  {
    id: 2,
    type: 'outgoing',
    description: 'Payment to SupplyOne',
    reference: 'PO #PO-2023-089',
    date: new Date(2023, 4, 3),
    amount: 1250,
    amountUSD: 1250,
    currency: 'SHL',
    status: 'completed'
  },
  {
    id: 3,
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
    id: 4,
    type: 'outgoing',
    description: 'Payment to OfficeDepot',
    reference: 'PO #PO-2023-075',
    date: new Date(2023, 4, 1),
    amount: 890,
    amountUSD: 890,
    currency: 'SHL',
    status: 'completed'
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
