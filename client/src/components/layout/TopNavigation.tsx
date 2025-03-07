import React, { useContext } from 'react';
import { useLocation } from 'wouter';
import { AppContext } from '@/context/AppContext';

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
        return 'Smart Contracts';
      case '/integrations':
        return 'Integrations';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button className="lg:hidden text-gray-700">
        <span className="material-icons">menu</span>
      </button>
      
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center">
        <span className="material-icons text-primary mr-1">change_history</span>
        <h1 className="text-lg font-bold text-primary">HandReceipt</h1>
      </div>
      
      {/* Desktop Header Text */}
      <h1 className="hidden lg:block text-xl font-semibold">{getPageTitle()}</h1>
      
      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        <button 
          className="bg-primary text-white px-3 py-2 rounded-full flex items-center shadow-sm hover:bg-blue-600 lg:w-auto"
          onClick={toggleScanner}
        >
          <span className="material-icons mr-1">qr_code_scanner</span>
          <span className="hidden sm:inline">Scan</span>
        </button>
        <button className="text-gray-700">
          <span className="material-icons">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
