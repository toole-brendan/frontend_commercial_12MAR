import { Link, useLocation } from "wouter";

interface MobileNavProps {
  openQRScanner?: () => void;
}

export default function MobileNav({ openQRScanner }: MobileNavProps) {
  const [location] = useLocation();

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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-10">
      <Link href="/">
        <div className={`flex flex-col items-center justify-center cursor-pointer ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-tachometer-alt text-lg"></i>
          <span className="text-xs mt-1">Dashboard</span>
        </div>
      </Link>
      <Link href="/inventory">
        <div className={`flex flex-col items-center justify-center cursor-pointer ${isActive('/inventory') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-boxes text-lg"></i>
          <span className="text-xs mt-1">Inventory</span>
        </div>
      </Link>
      <div 
        className="flex flex-col items-center justify-center text-gray-500 cursor-pointer"
        onClick={handleQRScanClick}
      >
        <i className="fas fa-qrcode text-lg"></i>
        <span className="text-xs mt-1">Scan</span>
      </div>
      <Link href="/transfers">
        <div className={`flex flex-col items-center justify-center cursor-pointer ${isActive('/transfers') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-exchange-alt text-lg"></i>
          <span className="text-xs mt-1">Transfers</span>
        </div>
      </Link>
      <Link href="/payments">
        <div className={`flex flex-col items-center justify-center cursor-pointer ${isActive('/payments') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-wallet text-lg"></i>
          <span className="text-xs mt-1">Payments</span>
        </div>
      </Link>
    </nav>
  );
}
