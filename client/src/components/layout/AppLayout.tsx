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

      {/* Mobile header */}
      <div className="md:hidden bg-gradient-to-r from-sky-900 to-blue-900 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">HandReceipt</span>
          </div>
          <button 
            className="text-white hover:bg-blue-800 p-2 rounded-md transition-colors focus:outline-none"
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
          className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-950 to-blue-950 text-white z-50 md:hidden">
          <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">HandReceipt</span>
            </div>
            <button 
              className="text-white hover:bg-blue-800 p-2 rounded-md transition-colors focus:outline-none"
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
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav openQRScanner={openQRScanner} />

      {/* QR Scanner Modal */}
      <QRScannerModal isOpen={isQRScannerOpen} onClose={closeQRScanner} />
    </div>
  );
}
