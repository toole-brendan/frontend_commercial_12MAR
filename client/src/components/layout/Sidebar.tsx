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
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: {
    name: string;
    role: string;
    profileImage: string;
  };
  isMobile?: boolean;
  closeMobileMenu?: () => void;
  openQRScanner?: () => void;
  toggleTheme?: () => void;
  toggleSidebar?: () => void;
}

export default function Sidebar({ 
  user, 
  isMobile = false, 
  closeMobileMenu, 
  openQRScanner,
  toggleTheme: toggleThemeProp,
  toggleSidebar: toggleSidebarProp
}: SidebarProps) {
  const [location] = useLocation();
  const { theme, sidebarCollapsed } = useContext(AppContext);
  
  // Use the functions from context directly if they're not passed as props
  const toggleTheme = () => {
    if (toggleThemeProp) {
      toggleThemeProp(); 
    }
  };
  
  const toggleSidebar = () => {
    if (toggleSidebarProp) {
      toggleSidebarProp();
    }
  };

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
  
  const handleLogoClick = () => {
    // Navigate to the dashboard page
    window.location.href = '/';
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
      <nav className="flex-1 p-4 space-y-3">
        {/* Mobile Logo */}
        <div 
          className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity mb-8"
          onClick={handleLogoClick}
        >
          <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
            <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
          </div>
        </div>
        
        {/* Navigation Items */}
        {navItems.map((item, index) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={item.onClick}
              className={`sidebar-item ${isActive(item.path) ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
            >
              {item.icon}
              <span className="uppercase text-xs tracking-wider font-light">{item.label}</span>
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <div 
                onClick={handleLinkClick}
                className={`sidebar-item ${isActive(item.path) ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
              >
                {item.icon}
                <span className="uppercase text-xs tracking-wider font-light">{item.label}</span>
              </div>
            </Link>
          )
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 mb-4">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? 
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : 
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              }
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white text-xs tracking-wider uppercase">
                {user.profileImage}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`sidebar hidden md:flex flex-col ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        {!sidebarCollapsed ? (
          <div 
            className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
              <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-5">
            {/* Empty div to maintain spacing in collapsed mode */}
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`flex-1 px-6 py-6 space-y-6 overflow-y-auto ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {navItems.map((item) => 
          item.onClick ? (
            <div 
              key={item.path}
              onClick={item.onClick}
              className={`sidebar-item ${isActive(item.path) ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
            >
              {item.icon}
              {!sidebarCollapsed && <span className="uppercase text-xs tracking-wider font-light">{item.label}</span>}
            </div>
          ) : (
            <Link key={item.path} href={item.path}>
              <div
                className={`sidebar-item ${isActive(item.path) ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="uppercase text-xs tracking-wider font-light">{item.label}</span>}
              </div>
            </Link>
          )
        )}
      </nav>
      
      {/* Footer */}
      <div className={`p-6 border-t border-gray-200 dark:border-gray-800 ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {!sidebarCollapsed && (
          <>
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={toggleTheme}
                className="p-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? 
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : 
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                }
              </button>
              
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white text-xs tracking-wider uppercase">
                {user.profileImage}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light">{user.role}</p>
              </div>
            </div>
          </>
        )}
        
        {sidebarCollapsed && (
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white text-xs tracking-wider uppercase">
              {user.profileImage}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}