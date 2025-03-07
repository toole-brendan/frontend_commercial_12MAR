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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-sky-900 to-blue-900 border-t border-gray-700/50 flex justify-around p-3 z-10 shadow-lg">
      <Link href="/">
        <div className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-blue-300' : 'text-gray-300'}`}>
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </div>
      </Link>
      <Link href="/inventory">
        <div className={`flex flex-col items-center justify-center ${isActive('/inventory') ? 'text-blue-300' : 'text-gray-300'}`}>
          <Package className="h-5 w-5" />
          <span className="text-xs mt-1">Inventory</span>
        </div>
      </Link>
      <div 
        className={`flex flex-col items-center justify-center text-gray-300 cursor-pointer 
                   p-2 bg-blue-700 rounded-full -mt-5 shadow-md border-4 
                   ${theme === 'dark' ? 'border-gray-900' : 'border-blue-800'}`}
        onClick={handleQRScanClick}
      >
        <QrCode className="h-6 w-6" />
      </div>
      <Link href="/transfers">
        <a className={`flex flex-col items-center justify-center ${isActive('/transfers') ? 'text-blue-300' : 'text-gray-300'}`}>
          <Send className="h-5 w-5" />
          <span className="text-xs mt-1">Transfers</span>
        </a>
      </Link>
      <Link href="/transactions">
        <a className={`flex flex-col items-center justify-center ${isActive('/transactions') ? 'text-blue-300' : 'text-gray-300'}`}>
          <Wallet className="h-5 w-5" />
          <span className="text-xs mt-1">Money</span>
        </a>
      </Link>
    </nav>
  );
}
