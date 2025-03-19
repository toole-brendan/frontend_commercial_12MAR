import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { currentUser } from '../lib/mockData';

interface AppContextType {
  isLoading: boolean;
  user: User | null;
  stats: Stats;
  notifications: number;
  showScanner: boolean;
  showTransferModal: boolean;
  scannedItem: InventoryItem | null;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
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
  theme: 'light',
  sidebarCollapsed: false,
  toggleTheme: () => {},
  toggleSidebar: () => {},
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for saved theme preference or use light mode as default
    const savedTheme = localStorage.getItem('handreceipt-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    // Use light mode as default for commercial frontend
    return 'light';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('handreceipt-sidebar');
    return savedState === 'collapsed';
  });

  // Apply theme class to document
  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('light-theme', 'dark-theme', 'dark', 'light');
    
    // Add the theme-specific classes
    document.documentElement.classList.add(`${theme}-theme`);
    document.documentElement.classList.add(theme);
    
    // Add dark class for Tailwind's dark: variants to work
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    // Store the preference
    localStorage.setItem('handreceipt-theme', theme);
    
    console.log('Theme changed to:', theme);
  }, [theme]);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('handreceipt-sidebar', sidebarCollapsed ? 'collapsed' : 'expanded');
  }, [sidebarCollapsed]);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Set mock data
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role,
          avatar: currentUser.profileImage
        });
        
        setStats({
          totalInventory: {
            value: 1250000,
            change: 5.8,
          },
          pendingTransfers: {
            value: 14,
            change: -2.3,
          },
          completedToday: {
            value: 32,
            change: 12.5,
          },
          usdcBalance: {
            value: 287500,
            lastUpdated: new Date().toISOString(),
          },
        });
        
        setNotifications(3);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

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
        theme,
        sidebarCollapsed,
        toggleTheme,
        toggleSidebar,
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
