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
        <a className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-tachometer-alt text-lg"></i>
          <span className="text-xs mt-1">Dashboard</span>
        </a>
      </Link>
      <Link href="/inventory">
        <a className={`flex flex-col items-center justify-center ${isActive('/inventory') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-boxes text-lg"></i>
          <span className="text-xs mt-1">Inventory</span>
        </a>
      </Link>
      <a 
        href="#"
        className="flex flex-col items-center justify-center text-gray-500"
        onClick={handleQRScanClick}
      >
        <i className="fas fa-qrcode text-lg"></i>
        <span className="text-xs mt-1">Scan</span>
      </a>
      <Link href="/transfers">
        <a className={`flex flex-col items-center justify-center ${isActive('/transfers') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-exchange-alt text-lg"></i>
          <span className="text-xs mt-1">Transfers</span>
        </a>
      </Link>
      <Link href="/payments">
        <a className={`flex flex-col items-center justify-center ${isActive('/payments') ? 'text-primary' : 'text-gray-500'}`}>
          <i className="fas fa-wallet text-lg"></i>
          <span className="text-xs mt-1">Payments</span>
        </a>
      </Link>
    </nav>
  );
}
