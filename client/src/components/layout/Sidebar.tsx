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
  Moon,
  User
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
      <nav className="flex-1 p-4 flex flex-col min-h-full">
        {/* Mobile User Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 mb-4">
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
        
        {/* Main Navigation Items */}
        <div className="space-y-4 flex-1 overflow-y-auto">
          {navItems.filter(item => item.path !== '/qr-scanner' && item.path !== '/settings' && !item.path.includes('profile')).map((item) => 
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
        </div>
        
        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
          {/* Bottom Navigation Items */}
          <div className="space-y-3 mb-2">
            {/* QR Scanner Item - Renamed */}
            {navItems.find(item => item.path === '/qr-scanner') && (
              <div 
                onClick={handleQRScanClick}
                className={`sidebar-item ${isActive('/qr-scanner') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
              >
                {navItems.find(item => item.path === '/qr-scanner')?.icon}
                <span className="uppercase text-xs tracking-wider font-light">Scan QR Code</span>
              </div>
            )}
            
            {/* Settings Item */}
            {navItems.find(item => item.path === '/settings') && (
              <Link href="/settings">
                <div
                  onClick={handleLinkClick}
                  className={`sidebar-item ${isActive('/settings') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
                >
                  {navItems.find(item => item.path === '/settings')?.icon}
                  <span className="uppercase text-xs tracking-wider font-light">Settings</span>
                </div>
              </Link>
            )}
            
            {/* Profile Item - NEW */}
            <Link href="/profile">
              <div
                onClick={handleLinkClick}
                className={`sidebar-item ${isActive('/profile') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
              >
                <User className="sidebar-item-icon" />
                <span className="uppercase text-xs tracking-wider font-light">Profile</span>
              </div>
            </Link>
          </div>
          
          {/* Theme Toggle */}
          <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-800">
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
          </div>
        </div>
      </nav>
    );
  }

  return (
    <aside className={`sidebar hidden md:flex flex-col ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Header - Logo */}
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
      
      {/* User Profile - NEW POSITION */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white text-xs tracking-wider uppercase">
              {user.profileImage}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-light">{user.role}</p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="flex justify-center">
            <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white text-xs tracking-wider uppercase">
              {user.profileImage}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Navigation */}
      <nav className={`flex-1 px-6 py-6 space-y-6 overflow-y-auto ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {navItems.filter(item => item.path !== '/qr-scanner' && item.path !== '/settings' && !item.path.includes('profile')).map((item) => 
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
      
      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
        {/* Bottom Navigation Items */}
        <div className="px-6 py-3 space-y-3">
          {/* QR Scanner Item - Renamed */}
          {navItems.find(item => item.path === '/qr-scanner') && (
            <div 
              onClick={openQRScanner}
              className={`sidebar-item ${isActive('/qr-scanner') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
            >
              {navItems.find(item => item.path === '/qr-scanner')?.icon}
              {!sidebarCollapsed && <span className="uppercase text-xs tracking-wider font-light">Scan QR Code</span>}
            </div>
          )}
          
          {/* Settings Item */}
          {navItems.find(item => item.path === '/settings') && (
            <Link href="/settings">
              <div
                className={`sidebar-item ${isActive('/settings') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
              >
                {navItems.find(item => item.path === '/settings')?.icon}
                {!sidebarCollapsed && <span className="uppercase text-xs tracking-wider font-light">Settings</span>}
              </div>
            </Link>
          )}
          
          {/* Profile Item - NEW */}
          <Link href="/profile">
            <div
              className={`sidebar-item ${isActive('/profile') ? "active text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-400"} hover:text-purple-600 dark:hover:text-white`}
            >
              <User className="sidebar-item-icon" />
              {!sidebarCollapsed && <span className="uppercase text-xs tracking-wider font-light">Profile</span>}
            </div>
          </Link>
        </div>
      
        {/* Footer - Theme & Collapse Toggles */}
        <div className={`py-3 px-4 border-t border-gray-200 dark:border-gray-800 ${sidebarCollapsed ? 'collapsed' : ''}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between">
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
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-white" />
              </button>
            </div>
          )}
          
          {sidebarCollapsed && (
            <div className="flex flex-col items-center gap-3">
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
                title="Expand sidebar"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}