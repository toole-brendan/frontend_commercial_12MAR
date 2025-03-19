import React, { useContext } from 'react';
import { useLocation } from 'wouter';
import { AppContext } from '@/context/AppContext';
import { Menu, QrCode, Bell } from 'lucide-react';

const TopNavigation: React.FC = () => {
  const [location] = useLocation();
  const { toggleScanner } = useContext(AppContext);

  const getPageTitle = () => {
    switch (location) {
      case '/':
      case '/dashboard':
        return 'Dashboard';
      case '/inventory':
        return 'Inventory';
      case '/transfers':
        return 'Transfers';
      case '/transactions':
        return 'Transactions';
      case '/contracts':
      case '/smart-contracts':
        return 'Smart Contracts';
      case '/integrations':
        return 'Integrations';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleLogoClick = () => {
    // Navigate to the main HandReceipt website
    window.location.href = 'https://handreceipt.com';
  };

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 py-4 px-6 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button className="lg:hidden text-gray-700 dark:text-white">
        <Menu className="h-5 w-5" />
      </button>
      
      {/* Mobile Logo */}
      <div 
        className="lg:hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleLogoClick}
      >
        <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
          <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
        </div>
      </div>
      
      {/* Desktop Header Text */}
      <h1 className="hidden lg:block text-xl font-light tracking-tight text-gray-800 dark:text-white font-display">{getPageTitle()}</h1>
      
      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        <button 
          className="bg-transparent border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-4 py-2 flex items-center hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black transition-colors duration-300 uppercase text-xs tracking-wider font-medium"
          onClick={toggleScanner}
        >
          <QrCode className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Scan</span>
        </button>
        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
