import { useContext } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Package, QrCode, Send, Wallet } from "lucide-react";
import { AppContext } from "@/context/AppContext";

interface MobileNavProps {
  openQRScanner?: () => void;
}

export default function MobileNav({ openQRScanner }: MobileNavProps) {
  const [location] = useLocation();
  const { theme } = useContext(AppContext);

  const isActive = (path: string) => {
    return location === path;
  };

  const handleQRScanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openQRScanner) {
      openQRScanner();
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 flex justify-around p-3 z-10">
      <Link href="/">
        <div className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Dashboard</span>
        </div>
      </Link>
      <Link href="/inventory">
        <div className={`flex flex-col items-center justify-center ${isActive('/inventory') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Package className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Inventory</span>
        </div>
      </Link>
      <div 
        className={`flex flex-col items-center justify-center cursor-pointer 
                   p-2 bg-purple-600 dark:bg-purple-600 rounded-full -mt-6 border-4 
                   ${theme === 'dark' ? 'border-black' : 'border-white'}`}
        onClick={handleQRScanClick}
      >
        <QrCode className="h-6 w-6 text-white" />
      </div>
      <Link href="/transfers">
        <div className={`flex flex-col items-center justify-center ${isActive('/transfers') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Send className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Transfers</span>
        </div>
      </Link>
      <Link href="/transactions">
        <div className={`flex flex-col items-center justify-center ${isActive('/transactions') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Wallet className="h-5 w-5" />
          <span className="text-xs uppercase tracking-wider font-light mt-1">Money</span>
        </div>
      </Link>
    </nav>
  );
}
