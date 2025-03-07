import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role"),
  email: text("email"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
  email: true,
  avatar: true,
});

// Inventory Items Schema
export const inventoryItems = pgTable("inventory_items", {
  id: text("id").primaryKey(), // SKU-XXXXX format
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  location: text("location"),
  quantity: integer("quantity").notNull().default(0),
  unit: text("unit").default("units"),
  status: text("status").default("In Stock"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  blockchainId: text("blockchain_id"),
  metadata: jsonb("metadata"),
  createdBy: integer("created_by").references(() => users.id),
});

export const insertInventoryItemSchema = createInsertSchema(inventoryItems).pick({
  id: true,
  name: true,
  description: true,
  category: true,
  location: true,
  quantity: true,
  unit: true,
  status: true,
  blockchainId: true,
  metadata: true,
  createdBy: true,
});

// Transfers Schema
export const transfers = pgTable("transfers", {
  id: text("id").primaryKey(), // T-XXXX format
  type: text("type").notNull(), // incoming, outgoing
  itemId: text("item_id").references(() => inventoryItems.id),
  fromEntity: text("from_entity"),
  toEntity: text("to_entity"),
  quantity: integer("quantity").notNull(),
  status: text("status").notNull().default("pending"), // pending, pending_approval, completed, declined
  notes: text("notes"),
  scheduled: timestamp("scheduled"),
  completedAt: timestamp("completed_at"),
  blockchainId: text("blockchain_id"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

export const insertTransferSchema = createInsertSchema(transfers).pick({
  id: true,
  type: true,
  itemId: true,
  fromEntity: true,
  toEntity: true,
  quantity: true,
  status: true,
  notes: true,
  scheduled: true,
  blockchainId: true,
  createdBy: true,
});

// Transactions Schema
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(), // TX-XXXX format
  type: text("type").notNull(), // transfer, payment, contract
  description: text("description").notNull(),
  amount: text("amount").notNull(),
  counterparty: text("counterparty"),
  status: text("status").notNull().default("pending"), // pending, completed
  blockchainId: text("blockchain_id"),
  relatedTransferId: text("related_transfer_id").references(() => transfers.id),
  relatedContractId: text("related_contract_id").references(() => smartContracts.id),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  id: true,
  type: true,
  description: true,
  amount: true,
  counterparty: true,
  status: true,
  blockchainId: true,
  relatedTransferId: true,
  relatedContractId: true,
});

// Smart Contracts Schema
export const smartContracts = pgTable("smart_contracts", {
  id: text("id").primaryKey(), // SC-XXXX format
  name: text("name").notNull(),
  counterparty: text("counterparty").notNull(),
  type: text("type").notNull(), // Auto-Payment, Recurring Payment, Conditional, Time-based
  terms: text("terms").notNull(),
  paymentMethod: text("payment_method").default("usdc"), // usdc, shells
  status: text("status").notNull().default("Active"), // Active, Inactive
  blockchainId: text("blockchain_id"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

export const insertSmartContractSchema = createInsertSchema(smartContracts).pick({
  id: true,
  name: true,
  counterparty: true,
  type: true,
  terms: true,
  paymentMethod: true,
  status: true,
  blockchainId: true,
  createdBy: true,
});

// Type definitions for schema
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;
export type InventoryItem = typeof inventoryItems.$inferSelect;

export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type Transfer = typeof transfers.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertSmartContract = z.infer<typeof insertSmartContractSchema>;
export type SmartContract = typeof smartContracts.$inferSelect;
