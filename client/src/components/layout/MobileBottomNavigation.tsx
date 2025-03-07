import React, { useContext } from 'react';
import { useLocation, Link } from 'wouter';
import { AppContext } from '@/context/AppContext';

const MobileBottomNavigation: React.FC = () => {
  const [location] = useLocation();
  const { notifications, toggleScanner } = useContext(AppContext);

  const isActive = (path: string) => {
    return location === path || (path !== '/' && location.startsWith(path));
  };

  return (
    <nav className="lg:hidden flex items-center justify-around bg-background dark:bg-mobile-nav-bg-dark border-t border-border dark:border-border py-3">
      <Link href="/dashboard">
        <a className={`flex flex-col items-center ${isActive('/dashboard') || isActive('/') ? 'text-primary' : 'text-muted-foreground dark:text-theme-text-secondary'}`}>
          <span className="material-icons text-sm">dashboard</span>
          <span className="text-xs mt-1">Dashboard</span>
        </a>
      </Link>
      <Link href="/inventory">
        <a className={`flex flex-col items-center ${isActive('/inventory') ? 'text-primary' : 'text-muted-foreground dark:text-theme-text-secondary'}`}>
          <span className="material-icons text-sm">inventory_2</span>
          <span className="text-xs mt-1">Inventory</span>
        </a>
      </Link>
      <a 
        className="flex flex-col items-center"
        onClick={(e) => {
          e.preventDefault();
          toggleScanner();
        }}
      >
        <div className="bg-primary text-white p-3 rounded-full -mt-5 shadow-lg">
          <span className="material-icons">qr_code_scanner</span>
        </div>
        <span className="text-xs mt-1 text-foreground dark:text-theme-text-primary">Scan</span>
      </a>
      <Link href="/transfers">
        <a className={`flex flex-col items-center relative ${isActive('/transfers') ? 'text-primary' : 'text-muted-foreground dark:text-theme-text-secondary'}`}>
          <span className="material-icons text-sm">swap_horiz</span>
          <span className="text-xs mt-1">Transfers</span>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </a>
      </Link>
      <a className="flex flex-col items-center text-muted-foreground dark:text-theme-text-secondary group">
        <span className="material-icons text-sm group-hover:text-foreground dark:group-hover:text-theme-text-primary">more_horiz</span>
        <span className="text-xs mt-1 group-hover:text-foreground dark:group-hover:text-theme-text-primary">More</span>
      </a>
    </nav>
  );
};

export default MobileBottomNavigation;
