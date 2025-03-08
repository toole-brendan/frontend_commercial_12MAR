import { useState, useContext, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { currentUser } from "@/lib/mockData";
import QRScannerModal from "@/components/shared/QRScannerModal";
import { AppContext } from "@/context/AppContext";
import { Menu, X } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { theme, sidebarCollapsed, toggleTheme, toggleSidebar } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  // Theme classes are already managed by the AppContext effect

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openQRScanner = () => {
    setIsQRScannerOpen(true);
  };

  const closeQRScanner = () => {
    setIsQRScannerOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme}-theme`}>
      {/* Sidebar - Desktop */}
      <Sidebar 
        user={currentUser} 
        openQRScanner={openQRScanner}
        toggleTheme={toggleTheme}
        toggleSidebar={toggleSidebar}
      />

      {/* Mobile header - 8VC Style */}
      <div className="md:hidden bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.location.href = '/'}
          >
            <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1.5">
              <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
            </div>
          </div>
          <button 
            className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 p-2 transition-colors focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile menu - 8VC Style */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black z-50 md:hidden">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
            <div 
              className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.location.href = '/'}
            >
              <div className="border border-gray-800/70 dark:border-gray-100/70 px-4 py-1">
                <h1 className="text-lg font-light tracking-widest text-gray-800 dark:text-gray-100 m-0 font-serif">HandReceipt</h1>
              </div>
            </div>
            <button 
              className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 p-2 transition-colors focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <Sidebar 
            user={currentUser} 
            isMobile={true} 
            closeMobileMenu={toggleMobileMenu}
            openQRScanner={openQRScanner}
            toggleTheme={toggleTheme}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}

      {/* Main content area */}
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="w-full max-w-full">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav openQRScanner={openQRScanner} />

      {/* QR Scanner Modal */}
      <QRScannerModal isOpen={isQRScannerOpen} onClose={closeQRScanner} />
    </div>
  );
}
