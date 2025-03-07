import { 
  users, type User, type InsertUser, 
  inventoryItems, type InventoryItem, type InsertInventoryItem,
  transfers, type Transfer, type InsertTransfer,
  transactions, type Transaction, type InsertTransaction,
  smartContracts, type SmartContract, type InsertSmartContract
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Inventory operations
  getAllInventoryItems(): Promise<InventoryItem[]>;
  getInventoryItem(id: string): Promise<InventoryItem | undefined>;
  createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateInventoryItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem>;

  // Transfer operations
  getTransfers(status?: string, type?: string): Promise<Transfer[]>;
  getTransfer(id: string): Promise<Transfer | undefined>;
  createTransfer(transfer: InsertTransfer): Promise<Transfer>;
  updateTransferStatus(id: string, status: string): Promise<Transfer>;

  // Transaction operations
  getTransactions(type?: string): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Smart Contract operations
  getSmartContracts(status?: string): Promise<SmartContract[]>;
  getSmartContract(id: string): Promise<SmartContract | undefined>;
  createSmartContract(contract: InsertSmartContract): Promise<SmartContract>;
  updateSmartContract(id: string, updates: Partial<SmartContract>): Promise<SmartContract>;

  // Statistics
  getStatistics(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inventoryItems: Map<string, InventoryItem>;
  private transfers: Map<string, Transfer>;
  private transactions: Map<string, Transaction>;
  private smartContracts: Map<string, SmartContract>;
  
  private userCurrentId: number;
  private transferCurrentId: number;
  private transactionCurrentId: number;
  private contractCurrentId: number;

  constructor() {
    // Initialize Maps to store data
    this.users = new Map();
    this.inventoryItems = new Map();
    this.transfers = new Map();
    this.transactions = new Map();
    this.smartContracts = new Map();
    
    // Initialize ID counters
    this.userCurrentId = 1;
    this.transferCurrentId = 4300; // Start with T-4300
    this.transactionCurrentId = 3939; // Start with TX-3939
    this.contractCurrentId = 1231; // Start with SC-1231

    // Add a default user
    this.seedData();
  }

  private seedData() {
    // Seed a default user
    this.createUser({
      username: "alex.johnson",
      password: "password123", // In a real app, this would be hashed
      name: "Alex Johnson",
      role: "Supply Manager",
      email: "alex@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    });

    // Seed inventory items
    this.inventoryItems.set("SKU-83910", {
      id: "SKU-83910",
      name: "Premium Electronics",
      description: "High-end consumer electronics",
      category: "Electronics",
      location: "Warehouse A",
      quantity: 235,
      unit: "units",
      status: "In Stock",
      lastUpdated: new Date(),
      blockchainId: "0x783d2a96a0b7d0ce8d9a60d174c143b4a7c5a923",
      metadata: { manufacturer: "TechCorp", warranty: "2 years" },
      createdBy: 1
    });

    this.inventoryItems.set("SKU-77120", {
      id: "SKU-77120",
      name: "Office Furniture Set",
      description: "Ergonomic office furniture",
      category: "Furniture",
      location: "Warehouse B",
      quantity: 42,
      unit: "units",
      status: "Low Stock",
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      blockchainId: "0x8374fe920a3b9d29342fdca3726bb8e3d27c2a3c",
      metadata: { material: "Wood and Steel", assembly: "Required" },
      createdBy: 1
    });

    this.inventoryItems.set("SKU-45123", {
      id: "SKU-45123",
      name: "Raw Materials Pack",
      description: "Industrial raw materials",
      category: "Raw Materials",
      location: "Warehouse C",
      quantity: 178,
      unit: "units",
      status: "In Stock",
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      blockchainId: "0x6293a41ec1beef8a841e11a04ae8795831811c4d",
      metadata: { type: "Industrial", hazardous: false },
      createdBy: 1
    });

    this.inventoryItems.set("SKU-29381", {
      id: "SKU-29381",
      name: "Industrial Equipment",
      description: "Heavy-duty industrial machinery",
      category: "Equipment",
      location: "Warehouse A",
      quantity: 10,
      unit: "pallets",
      status: "On Hold",
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      blockchainId: "0x3df918c9c2c5e9a5f3e295bbd7edc8a8781b9e1a",
      metadata: { weight: "Heavy", requires_training: true },
      createdBy: 1
    });

    // Seed transfers
    this.transfers.set("T-4302", {
      id: "T-4302",
      type: "incoming",
      itemId: "SKU-83910",
      fromEntity: "Global Logistics Partners",
      toEntity: "",
      quantity: 35,
      status: "pending",
      notes: "Scheduled delivery",
      scheduled: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      completedAt: undefined,
      blockchainId: "0x9182fe90b432ad2f62c83c79eabbc2e6e1f49a12",
      createdAt: new Date(),
      createdBy: 1
    });

    this.transfers.set("T-4301", {
      id: "T-4301",
      type: "outgoing",
      itemId: "SKU-77120",
      fromEntity: "",
      toEntity: "Retail Distribution Center",
      quantity: 15,
      status: "pending_approval",
      notes: "Urgent delivery requested",
      scheduled: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      completedAt: undefined,
      blockchainId: undefined,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      createdBy: 1
    });

    this.transfers.set("T-4299", {
      id: "T-4299",
      type: "incoming",
      itemId: "SKU-45123",
      fromEntity: "Eastern Manufacturing",
      toEntity: "",
      quantity: 50,
      status: "pending",
      notes: "Regular scheduled delivery",
      scheduled: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      completedAt: undefined,
      blockchainId: undefined,
      createdAt: new Date(),
      createdBy: 1
    });

    // Seed transactions
    this.transactions.set("TX-3942", {
      id: "TX-3942",
      type: "transfer",
      description: "Inventory Transfer",
      amount: "150 units of SKU-83910",
      counterparty: "Warehouse B",
      status: "completed",
      blockchainId: "0x783d2a96a0b7d0ce8d9a60d174c143b4a7c5a923",
      relatedTransferId: undefined,
      relatedContractId: undefined,
      createdAt: new Date(),
      completedAt: new Date()
    });

    this.transactions.set("TX-3941", {
      id: "TX-3941",
      type: "payment",
      description: "Invoice Payment",
      amount: "8,500 USDC",
      counterparty: "Eastern Manufacturing",
      status: "completed",
      blockchainId: "0x6293a41ec1beef8a841e11a04ae8795831811c4d",
      relatedTransferId: undefined,
      relatedContractId: "SC-1234",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
    });

    this.transactions.set("TX-3940", {
      id: "TX-3940",
      type: "contract",
      description: "Smart Contract Execution",
      amount: "3,200 USDC",
      counterparty: "Global Logistics",
      status: "pending",
      blockchainId: "0x9182fe90b432ad2f62c83c79eabbc2e6e1f49a12",
      relatedTransferId: undefined,
      relatedContractId: "SC-1233",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      completedAt: undefined
    });

    this.transactions.set("TX-3939", {
      id: "TX-3939",
      type: "transfer",
      description: "Inventory Receipt",
      amount: "75 units of SKU-45123",
      counterparty: "Supplier Partners Inc.",
      status: "completed",
      blockchainId: "0x3df918c9c2c5e9a5f3e295bbd7edc8a8781b9e1a",
      relatedTransferId: undefined,
      relatedContractId: undefined,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    });

    // Seed smart contracts
    this.smartContracts.set("SC-1234", {
      id: "SC-1234",
      name: "Payment on Receipt",
      counterparty: "Eastern Manufacturing",
      type: "Auto-Payment",
      terms: "Payment released upon verified receipt of goods",
      paymentMethod: "usdc",
      status: "Active",
      blockchainId: "0x8374fe920a3b9d29342fdca3726bb8e3d27c2a3c",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      createdBy: 1
    });

    this.smartContracts.set("SC-1233", {
      id: "SC-1233",
      name: "Monthly Supplier Payment",
      counterparty: "Global Logistics",
      type: "Recurring Payment",
      terms: "3,200 USDC paid on the 1st of each month",
      paymentMethod: "usdc",
      status: "Active",
      blockchainId: "0x9182fe90b432ad2f62c83c79eabbc2e6e1f49a12",
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      createdBy: 1
    });

    this.smartContracts.set("SC-1232", {
      id: "SC-1232",
      name: "Inventory Threshold Order",
      counterparty: "Supplier Partners Inc.",
      type: "Conditional",
      terms: "Auto-order when inventory falls below 50 units",
      paymentMethod: "usdc",
      status: "Active",
      blockchainId: "0x6293a41ec1beef8a841e11a04ae8795831811c4d",
      createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), // 55 days ago
      createdBy: 1
    });

    this.smartContracts.set("SC-1231", {
      id: "SC-1231",
      name: "Quarterly Payment Release",
      counterparty: "Retail Distribution",
      type: "Time-based",
      terms: "10,000 USDC released quarterly",
      paymentMethod: "shells",
      status: "Inactive",
      blockchainId: "0x3df918c9c2c5e9a5f3e295bbd7edc8a8781b9e1a",
      createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000), // 80 days ago
      createdBy: 1
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Inventory operations
  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return Array.from(this.inventoryItems.values());
  }

  async getInventoryItem(id: string): Promise<InventoryItem | undefined> {
    return this.inventoryItems.get(id);
  }

  async createInventoryItem(item: InsertInventoryItem): Promise<InventoryItem> {
    const now = new Date();
    const newItem: InventoryItem = { 
      ...item, 
      lastUpdated: now 
    };
    this.inventoryItems.set(item.id, newItem);
    return newItem;
  }

  async updateInventoryItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    const item = this.inventoryItems.get(id);
    if (!item) {
      throw new Error(`Inventory item with ID ${id} not found`);
    }
    
    const now = new Date();
    const updatedItem: InventoryItem = { 
      ...item, 
      ...updates, 
      lastUpdated: now 
    };
    this.inventoryItems.set(id, updatedItem);
    return updatedItem;
  }

  // Transfer operations
  async getTransfers(status?: string, type?: string): Promise<Transfer[]> {
    let transfers = Array.from(this.transfers.values());
    
    if (status) {
      transfers = transfers.filter(transfer => transfer.status === status);
    }
    
    if (type) {
      transfers = transfers.filter(transfer => transfer.type === type);
    }
    
    return transfers;
  }

  async getTransfer(id: string): Promise<Transfer | undefined> {
    return this.transfers.get(id);
  }

  async createTransfer(transfer: InsertTransfer): Promise<Transfer> {
    const now = new Date();
    // Generate ID if not provided
    const id = transfer.id || `T-${this.transferCurrentId++}`;
    
    const newTransfer: Transfer = { 
      ...transfer, 
      id,
      createdAt: now 
    };
    this.transfers.set(id, newTransfer);
    return newTransfer;
  }

  async updateTransferStatus(id: string, status: string): Promise<Transfer> {
    const transfer = this.transfers.get(id);
    if (!transfer) {
      throw new Error(`Transfer with ID ${id} not found`);
    }
    
    const now = new Date();
    const completedAt = status === 'completed' ? now : transfer.completedAt;
    
    const updatedTransfer: Transfer = { 
      ...transfer, 
      status,
      completedAt 
    };
    this.transfers.set(id, updatedTransfer);
    
    // If completing a transfer, update inventory quantities
    if (status === 'completed') {
      await this.updateInventoryQuantityFromTransfer(transfer);
    }
    
    return updatedTransfer;
  }

  private async updateInventoryQuantityFromTransfer(transfer: Transfer): Promise<void> {
    const item = this.inventoryItems.get(transfer.itemId);
    if (!item) {
      throw new Error(`Inventory item with ID ${transfer.itemId} not found`);
    }
    
    let newQuantity = item.quantity;
    
    // For incoming transfers, add to quantity
    if (transfer.type === 'incoming') {
      newQuantity += transfer.quantity;
    } 
    // For outgoing transfers, subtract from quantity
    else if (transfer.type === 'outgoing') {
      newQuantity -= transfer.quantity;
      if (newQuantity < 0) {
        throw new Error(`Insufficient quantity for inventory item ${transfer.itemId}`);
      }
    }
    
    // Update inventory item quantity
    await this.updateInventoryItem(transfer.itemId, { quantity: newQuantity });
  }

  // Transaction operations
  async getTransactions(type?: string): Promise<Transaction[]> {
    let transactions = Array.from(this.transactions.values());
    
    if (type) {
      transactions = transactions.filter(transaction => transaction.type === type);
    }
    
    return transactions;
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const now = new Date();
    // Generate ID if not provided
    const id = transaction.id || `TX-${this.transactionCurrentId++}`;
    
    const newTransaction: Transaction = { 
      ...transaction, 
      id,
      createdAt: now,
      completedAt: transaction.status === 'completed' ? now : undefined
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  // Smart Contract operations
  async getSmartContracts(status?: string): Promise<SmartContract[]> {
    let contracts = Array.from(this.smartContracts.values());
    
    if (status) {
      contracts = contracts.filter(contract => contract.status === status);
    }
    
    return contracts;
  }

  async getSmartContract(id: string): Promise<SmartContract | undefined> {
    return this.smartContracts.get(id);
  }

  async createSmartContract(contract: InsertSmartContract): Promise<SmartContract> {
    const now = new Date();
    // Generate ID if not provided
    const id = contract.id || `SC-${this.contractCurrentId++}`;
    
    const newContract: SmartContract = { 
      ...contract, 
      id,
      createdAt: now 
    };
    this.smartContracts.set(id, newContract);
    return newContract;
  }

  async updateSmartContract(id: string, updates: Partial<SmartContract>): Promise<SmartContract> {
    const contract = this.smartContracts.get(id);
    if (!contract) {
      throw new Error(`Smart contract with ID ${id} not found`);
    }
    
    const updatedContract: SmartContract = { 
      ...contract, 
      ...updates 
    };
    this.smartContracts.set(id, updatedContract);
    return updatedContract;
  }

  // Statistics
  async getStatistics(): Promise<any> {
    const totalInventory = Array.from(this.inventoryItems.values()).reduce((sum, item) => sum + item.quantity, 0);
    const pendingTransfers = Array.from(this.transfers.values()).filter(t => t.status === 'pending' || t.status === 'pending_approval').length;
    const completedToday = Array.from(this.transfers.values()).filter(t => {
      if (!t.completedAt) return false;
      const today = new Date();
      const completedDate = new Date(t.completedAt);
      return completedDate.getDate() === today.getDate() && 
             completedDate.getMonth() === today.getMonth() && 
             completedDate.getFullYear() === today.getFullYear();
    }).length;
    
    return {
      totalInventory: {
        value: totalInventory,
        change: 4.3, // Mock percentage change
      },
      pendingTransfers: {
        value: pendingTransfers,
        change: 2, // Mock absolute change
      },
      completedToday: {
        value: completedToday,
        change: 12, // Mock percentage change
      },
      usdcBalance: {
        value: 24380,
        lastUpdated: "2 min ago", // Mock time
      }
    };
  }
}

export const storage = new MemStorage();
