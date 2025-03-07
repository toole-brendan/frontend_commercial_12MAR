import { Link, useLocation } from "wouter";

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

export default function Sidebar({ user, isMobile = false, closeMobileMenu, openQRScanner }: SidebarProps) {
  const [location] = useLocation();

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

  const navItems = [
    { path: "/", icon: "fa-tachometer-alt", label: "Dashboard" },
    { path: "/inventory", icon: "fa-boxes", label: "Inventory" },
    { path: "/transfers", icon: "fa-exchange-alt", label: "Transfers" },
    { path: "/smart-contracts", icon: "fa-file-contract", label: "Smart Contracts" },
    { path: "/payments", icon: "fa-wallet", label: "Payments" },
    { path: "/transaction-history", icon: "fa-history", label: "Transaction History" },
    { path: "/qr-scanner", icon: "fa-qrcode", label: "QR Scanner", onClick: handleQRScanClick },
    { path: "/settings", icon: "fa-cogs", label: "Settings" },
  ];

  if (isMobile) {
    return (
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              onClick={item.onClick || handleLinkClick}
              className={`flex items-center space-x-3 rounded-lg p-3 ${
                isActive(item.path) 
                  ? "text-primary font-medium bg-primary-50" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-800">HandReceipt</span>
          </div>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 py-1 px-2 rounded">Commercial</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              onClick={item.onClick}
              className={`flex items-center space-x-3 rounded-lg p-3 ${
                isActive(item.path) 
                  ? "text-primary font-medium bg-primary-50" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
