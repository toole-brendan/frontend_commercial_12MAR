import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertInventoryItemSchema, 
  insertTransferSchema, 
  insertTransactionSchema, 
  insertSmartContractSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - All prefixed with /api
  
  // USER ENDPOINTS
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In a real app, this would come from authenticated session
      const user = await storage.getUserByUsername("alex.johnson");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password in response
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  // INVENTORY ENDPOINTS
  app.get("/api/inventory", async (req, res) => {
    try {
      const items = await storage.getAllInventoryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res.status(500).json({ message: "Failed to fetch inventory items" });
    }
  });

  app.get("/api/inventory/:id", async (req, res) => {
    try {
      const item = await storage.getInventoryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
      res.status(500).json({ message: "Failed to fetch inventory item" });
    }
  });

  app.post("/api/inventory", async (req, res) => {
    try {
      const validatedData = insertInventoryItemSchema.parse(req.body);
      const newItem = await storage.createInventoryItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inventory data", errors: error.errors });
      }
      console.error("Error creating inventory item:", error);
      res.status(500).json({ message: "Failed to create inventory item" });
    }
  });

  app.patch("/api/inventory/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await storage.getInventoryItem(itemId);
      if (!item) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
      
      const updates = req.body;
      const updatedItem = await storage.updateInventoryItem(itemId, updates);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating inventory item:", error);
      res.status(500).json({ message: "Failed to update inventory item" });
    }
  });

  // TRANSFER ENDPOINTS
  app.get("/api/transfers", async (req, res) => {
    try {
      let status = req.query.status as string | undefined;
      let type = req.query.type as string | undefined;
      
      const transfers = await storage.getTransfers(status, type);
      res.json(transfers);
    } catch (error) {
      console.error("Error fetching transfers:", error);
      res.status(500).json({ message: "Failed to fetch transfers" });
    }
  });

  app.post("/api/transfers", async (req, res) => {
    try {
      const validatedData = insertTransferSchema.parse(req.body);
      const newTransfer = await storage.createTransfer(validatedData);
      res.status(201).json(newTransfer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transfer data", errors: error.errors });
      }
      console.error("Error creating transfer:", error);
      res.status(500).json({ message: "Failed to create transfer" });
    }
  });

  app.patch("/api/transfers/:id", async (req, res) => {
    try {
      const transferId = req.params.id;
      const transfer = await storage.getTransfer(transferId);
      if (!transfer) {
        return res.status(404).json({ message: "Transfer not found" });
      }
      
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const updatedTransfer = await storage.updateTransferStatus(transferId, status);
      res.json(updatedTransfer);
    } catch (error) {
      console.error("Error updating transfer:", error);
      res.status(500).json({ message: "Failed to update transfer" });
    }
  });

  // TRANSACTION ENDPOINTS
  app.get("/api/transactions", async (req, res) => {
    try {
      let type = req.query.type as string | undefined;
      
      const transactions = await storage.getTransactions(type);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const newTransaction = await storage.createTransaction(validatedData);
      res.status(201).json(newTransaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      console.error("Error creating transaction:", error);
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });

  // SMART CONTRACT ENDPOINTS
  app.get("/api/contracts", async (req, res) => {
    try {
      let status = req.query.status as string | undefined;
      
      const contracts = await storage.getSmartContracts(status);
      res.json(contracts);
    } catch (error) {
      console.error("Error fetching smart contracts:", error);
      res.status(500).json({ message: "Failed to fetch smart contracts" });
    }
  });

  app.post("/api/contracts", async (req, res) => {
    try {
      const validatedData = insertSmartContractSchema.parse(req.body);
      const newContract = await storage.createSmartContract(validatedData);
      res.status(201).json(newContract);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid smart contract data", errors: error.errors });
      }
      console.error("Error creating smart contract:", error);
      res.status(500).json({ message: "Failed to create smart contract" });
    }
  });

  app.patch("/api/contracts/:id", async (req, res) => {
    try {
      const contractId = req.params.id;
      const contract = await storage.getSmartContract(contractId);
      if (!contract) {
        return res.status(404).json({ message: "Smart contract not found" });
      }
      
      const updates = req.body;
      const updatedContract = await storage.updateSmartContract(contractId, updates);
      res.json(updatedContract);
    } catch (error) {
      console.error("Error updating smart contract:", error);
      res.status(500).json({ message: "Failed to update smart contract" });
    }
  });

  // STATS ENDPOINT
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
