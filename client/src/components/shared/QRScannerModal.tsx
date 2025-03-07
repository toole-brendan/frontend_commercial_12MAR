import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan?: (data: string) => void;
}

export default function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleStartCamera = () => {
    // In a real implementation, this would request camera access
    setIsCameraActive(true);
    toast({
      title: "Camera Access",
      description: "In a real implementation, this would access your camera for QR scanning",
    });
  };

  const handleSwitchCamera = () => {
    toast({
      title: "Camera Switched",
      description: "In a real implementation, this would switch between available cameras",
    });
  };

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      if (onScan) {
        onScan(manualCode);
      }
      toast({
        title: "Code Processed",
        description: `Processed code: ${manualCode}`,
      });
      setManualCode('');
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid code",
        variant: "destructive",
      });
    }
  };

  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full m-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Scan QR Code</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4">
          {showManualInput ? (
            <form onSubmit={handleManualCodeSubmit} className="space-y-4">
              <div>
                <label htmlFor="manual-code" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Code Manually
                </label>
                <input
                  type="text"
                  id="manual-code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter QR code value"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm"
                >
                  Process Code
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm"
                  onClick={toggleManualInput}
                >
                  Back to Scanner
                </button>
              </div>
            </form>
          ) : (
            <>
              <div 
                className="bg-gray-100 rounded-lg aspect-square flex flex-col items-center justify-center"
                onClick={!isCameraActive ? handleStartCamera : undefined}
              >
                <div className="relative w-full h-full">
                  {/* Camera feed placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isCameraActive ? (
                      <div className="text-center cursor-pointer">
                        <i className="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                        <p className="text-gray-500">Click to activate camera</p>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <p className="text-white text-center">Camera feed simulation</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Scan frame indicator */}
                  {isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-primary w-2/3 h-2/3 rounded-lg"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">Position the QR code within the frame to scan. Hold the device steady.</p>
                
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm"
                    onClick={handleSwitchCamera}
                  >
                    Switch Camera
                  </button>
                  <button 
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm"
                    onClick={toggleManualInput}
                  >
                    Enter Code Manually
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
