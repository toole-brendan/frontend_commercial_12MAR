import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { mockUser, mockStats } from '../lib/mockData';

interface AppContextType {
  isLoading: boolean;
  user: User | null;
  stats: Stats;
  notifications: number;
  showScanner: boolean;
  showTransferModal: boolean;
  scannedItem: InventoryItem | null;
  toggleScanner: () => void;
  closeScanner: () => void;
  openTransferModal: (item: InventoryItem) => void;
  closeTransferModal: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Stats {
  totalInventory: {
    value: number;
    change: number;
  };
  pendingTransfers: {
    value: number;
    change: number;
  };
  completedToday: {
    value: number;
    change: number;
  };
  usdcBalance: {
    value: number;
    lastUpdated: string;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: string;
  status: "In Stock" | "Low Stock" | "On Hold" | "Out of Stock";
  lastUpdated: string;
}

export const AppContext = createContext<AppContextType>({
  isLoading: true,
  user: null,
  stats: {
    totalInventory: {
      value: 0,
      change: 0,
    },
    pendingTransfers: {
      value: 0,
      change: 0,
    },
    completedToday: {
      value: 0,
      change: 0,
    },
    usdcBalance: {
      value: 0,
      lastUpdated: "",
    },
  },
  notifications: 0,
  showScanner: false,
  showTransferModal: false,
  scannedItem: null,
  toggleScanner: () => {},
  closeScanner: () => {},
  openTransferModal: () => {},
  closeTransferModal: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalInventory: {
      value: 0,
      change: 0,
    },
    pendingTransfers: {
      value: 0,
      change: 0,
    },
    completedToday: {
      value: 0,
      change: 0,
    },
    usdcBalance: {
      value: 0,
      lastUpdated: "",
    },
  });
  const [notifications, setNotifications] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [scannedItem, setScannedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Set mock data
        setUser(mockUser);
        setStats(mockStats);
        setNotifications(3);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  const openTransferModal = (item: InventoryItem) => {
    setScannedItem(item);
    setShowTransferModal(true);
    setShowScanner(false);
  };

  const closeTransferModal = () => {
    setShowTransferModal(false);
    setScannedItem(null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        user,
        stats,
        notifications,
        showScanner,
        showTransferModal,
        scannedItem,
        toggleScanner,
        closeScanner,
        openTransferModal,
        closeTransferModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
