import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { mockInventoryItems } from '@/lib/mockData';

const QRScanner: React.FC = () => {
  const { showScanner, closeScanner, openTransferModal } = useContext(AppContext);

  useEffect(() => {
    if (showScanner) {
      // Mock QR scanning after 3 seconds
      const timer = setTimeout(() => {
        // Simulate successful scan by picking a random inventory item
        const randomIndex = Math.floor(Math.random() * mockInventoryItems.length);
        const scannedItem = mockInventoryItems[randomIndex];
        
        // Close scanner and open transfer modal
        closeScanner();
        openTransferModal(scannedItem);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showScanner, closeScanner, openTransferModal]);

  if (!showScanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
      <div className="w-[280px] h-[280px] border-2 border-white rounded-2xl relative">
        <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
        
        <div className="h-[2px] bg-blue-500 absolute top-0 left-0 right-0 animate-[scan_2s_linear_infinite]"></div>
      </div>
      
      <p className="text-white mt-8 text-center">Position QR code within the frame</p>
      
      <div className="mt-8 flex space-x-4">
        <button 
          className="bg-gray-800 text-white px-6 py-2 rounded-lg"
          onClick={closeScanner}
        >
          Cancel
        </button>
        <button className="bg-primary text-white px-6 py-2 rounded-lg flex items-center">
          <span className="material-icons mr-1">flashlight_on</span>
          Flashlight
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
