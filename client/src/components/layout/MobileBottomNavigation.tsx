import React, { useContext } from 'react';
import { useLocation, Link } from 'wouter';
import { AppContext } from '@/context/AppContext';
import { LayoutDashboard, Package, QrCode, Send, MoreHorizontal } from "lucide-react";

const MobileBottomNavigation: React.FC = () => {
  const [location] = useLocation();
  const { notifications, toggleScanner } = useContext(AppContext);

  const isActive = (path: string) => {
    return location === path || (path !== '/' && location.startsWith(path));
  };

  return (
    <nav className="lg:hidden flex items-center justify-around bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 py-3 z-10 fixed bottom-0 left-0 right-0">
      <Link href="/dashboard">
        <div className={`flex flex-col items-center ${isActive('/dashboard') || isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Dashboard</span>
        </div>
      </Link>
      <Link href="/inventory">
        <div className={`flex flex-col items-center ${isActive('/inventory') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Package className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Inventory</span>
        </div>
      </Link>
      <div 
        className="flex flex-col items-center cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          toggleScanner();
        }}
      >
        <div className="p-2 bg-purple-600 dark:bg-purple-600 rounded-full -mt-6 border-4 border-white dark:border-black">
          <QrCode className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs uppercase tracking-wider font-light mt-1 text-gray-500 dark:text-gray-400">Scan</span>
      </div>
      <Link href="/transfers">
        <div className={`flex flex-col items-center relative ${isActive('/transfers') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Send className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Transfers</span>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 text-xs w-4 h-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group cursor-pointer">
        <MoreHorizontal className="h-5 w-5 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
        <span className="text-xs uppercase tracking-wider font-light mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400">More</span>
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
