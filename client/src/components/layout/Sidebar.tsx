import { useContext } from "react";
import { Link, useLocation } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Package, 
  Send, 
  Truck, 
  FileText, 
  Wallet, 
  BarChart3, 
  Plug, 
  QrCode, 
  Settings, 
  Sun, 
  Moon 
} from "lucide-react";
import { AppContext } from "@/context/AppContext";

interface SidebarProps {
  user: {
    name: string;
    role: string;
    profileImage: string;
  };
  isMobile?: boolean;
  closeMobileMenu?: () => void;
  openQRScanner?: () => void;
}

export default function Sidebar({ 
  user, 
  isMobile = false, 
  closeMobileMenu, 
  openQRScanner 
}: SidebarProps) {
  const [location] = useLocation();
  const { theme, sidebarCollapsed, toggleTheme, toggleSidebar } = useContext(AppContext);

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLinkClick = () => {
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handleQRScanClick = () => {
    if (openQRScanner) {
      openQRScanner();
    }
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  // Using Lucide icons instead of FontAwesome 
  const navItems = [
    { path: "/", icon: <LayoutDashboard className="sidebar-item-icon" />, label: "Dashboard" },
    { path: "/inventory", icon: <Package className="sidebar-item-icon" />, label: "Inventory" },
    { path: "/transfers", icon: <Send className="sidebar-item-icon" />, label: "Transfers" },
    { path: "/suppliers", icon: <Truck className="sidebar-item-icon" />, label: "Suppliers" },
    { path: "/smart-contracts", icon: <FileText className="sidebar-item-icon" />, label: "Smart Contracts" },
    { path: "/transactions", icon: <Wallet className="sidebar-item-icon" />, label: "Transactions" },
    { path: "/analytics", icon: <BarChart3 className="sidebar-item-icon" />, label: "Analytics" },
    { path: "/integrations", icon: <Plug className="sidebar-item-icon" />, label: "Integrations" },
    { path: "/qr-scanner", icon: <QrCode className="sidebar-item-icon" />, label: "QR Scanner", onClick: handleQRScanClick },
    { path: "/settings", icon: <Settings className="sidebar-item-icon" />, label: "Settings" },
  ];

  if (isMobile) {
    return (
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={item.onClick}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <a 
                onClick={handleLinkClick}
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </Link>
          )
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 px-4 py-3">
            <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`sidebar hidden md:flex flex-col ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-100">HandReceipt</span>
              </div>
              <span className="text-xs font-medium bg-blue-900/50 text-blue-100 py-1 px-2 rounded">Commercial</span>
            </>
          )}
          {sidebarCollapsed && (
            <div className="bg-blue-600 text-white p-1 rounded mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={item.onClick}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <a
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </a>
            </Link>
          )
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-blue-900/50 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? 
              <Moon className="h-5 w-5 text-gray-200" /> : 
              <Sun className="h-5 w-5 text-gray-200" />
            }
          </button>
          
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-900/50 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? 
              <ChevronRight className="h-5 w-5 text-gray-200" /> : 
              <ChevronLeft className="h-5 w-5 text-gray-200" />
            }
          </button>
        </div>
        
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="flex justify-center">
            <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
          </div>
        )}
      </div>
    </aside>
  );
}
