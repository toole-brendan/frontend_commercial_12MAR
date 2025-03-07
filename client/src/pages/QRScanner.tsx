import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/ui/page-header';

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [recentScans, setRecentScans] = useState<Array<{
    id: number;
    code: string;
    timestamp: Date;
    itemName?: string;
    status: 'success' | 'pending' | 'failed';
    message?: string;
  }>>([]);
  const [cameraSelection, setCameraSelection] = useState('default');
  const [mockScanResult, setMockScanResult] = useState('');
  const { toast } = useToast();

  // Fetch inventory items for item lookup after scan
  const { data: inventoryItems } = useQuery({
    queryKey: ['/api/inventory'],
    staleTime: 60000, // 1 minute
  });

  const handleStartScan = () => {
    setIsScanning(true);
    toast({
      title: "Camera Started",
      description: "Scanning for QR codes. In a real implementation, this would access your camera."
    });
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleManualScan = () => {
    if (!mockScanResult.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid code",
        variant: "destructive",
      });
      return;
    }

    processScan(mockScanResult);
    setMockScanResult('');
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCameraSelection(e.target.value);
    if (isScanning) {
      toast({
        title: "Camera Switched",
        description: `Switched to ${e.target.value === 'default' ? 'default camera' : 'front camera'}`
      });
    }
  };

  const processScan = (code: string) => {
    // Mock successful scan
    const timestamp = new Date();
    
    // In a real implementation, this would make an API call to validate the QR code
    // and fetch the associated item information
    
    // Mock lookup in inventory
    let found = false;
    let itemName = '';
    
    if (inventoryItems) {
      const item = inventoryItems.find((item: any) => item.itemCode === code);
      if (item) {
        found = true;
        itemName = item.name;
      }
    }
    
    // Add to recent scans with different statuses for demo purposes
    const scanId = Date.now();
    const status = found ? 'success' : Math.random() > 0.3 ? 'pending' : 'failed';
    const message = found ? `Found: ${itemName}` : 
                   status === 'pending' ? 'Processing code...' : 
                   'Item not found in inventory';
    
    const newScan = {
      id: scanId,
      code,
      timestamp,
      itemName: found ? itemName : undefined,
      status,
      message
    };
    
    setRecentScans(prev => [newScan, ...prev].slice(0, 10)); // Keep only the 10 most recent
    
    // Show toast based on status
    if (status === 'success') {
      toast({
        title: "Scan Successful",
        description: `Item found: ${itemName}`
      });
    } else if (status === 'pending') {
      toast({
        title: "Processing Scan",
        description: "Searching for item in inventory..."
      });
      
      // Simulate delayed resolution for pending scans
      setTimeout(() => {
        setRecentScans(prev => prev.map(scan => 
          scan.id === scanId 
            ? {...scan, status: Math.random() > 0.5 ? 'success' : 'failed', message: Math.random() > 0.5 ? 'Item found after processing' : 'Failed to resolve item code'} 
            : scan
        ));
      }, 3000);
    } else {
      toast({
        title: "Scan Failed",
        description: "Item not found in inventory",
        variant: "destructive"
      });
    }
  };

  const actionButtons = (
    <select
      className="border border-gray-300 rounded-md py-2 px-3 text-sm"
      value={cameraSelection}
      onChange={handleCameraChange}
    >
      <option value="default">Default Camera</option>
      <option value="front">Front Camera</option>
    </select>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader 
        title="QR Code Scanner" 
        description="Scan QR codes to quickly look up and manage inventory items"
        actions={actionButtons}
      />

      {/* QR Scanner Area */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Scan QR Code</h2>
        </div>
        <div className="p-5">
          <div 
            className="bg-gray-100 rounded-lg aspect-video max-h-96 flex flex-col items-center justify-center mx-auto"
            onClick={!isScanning ? handleStartScan : undefined}
          >
            {!isScanning ? (
              <div className="text-center cursor-pointer">
                <i className="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">Click to activate camera</p>
                <p className="text-xs text-gray-400 mt-2">Make sure you've granted camera permissions</p>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                {/* Mock camera feed */}
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <p className="text-white">Camera feed simulation</p>
                </div>
                
                {/* Scan target overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-primary w-1/2 h-1/2 rounded-lg relative">
                    {/* Corner markers */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary"></div>
                    
                    {/* Scan line animation */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="h-0.5 bg-primary w-full absolute top-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex space-x-3">
              {isScanning ? (
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                  onClick={handleStopScan}
                >
                  <i className="fas fa-stop"></i>
                  <span>Stop Scanning</span>
                </button>
              ) : (
                <button 
                  className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                  onClick={handleStartScan}
                >
                  <i className="fas fa-play"></i>
                  <span>Start Scanning</span>
                </button>
              )}
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                onClick={() => processScan(`ITEM-${Math.floor(Math.random() * 1000)}`)}
              >
                <i className="fas fa-random"></i>
                <span>Simulate Scan</span>
              </button>
            </div>
            
            <div className="flex w-full md:w-auto mt-4 md:mt-0">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter code manually"
                value={mockScanResult}
                onChange={(e) => setMockScanResult(e.target.value)}
              />
              <button 
                className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-r-md text-sm"
                onClick={handleManualScan}
              >
                Process
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Recent Scans</h2>
        </div>
        <div className="p-0">
          {recentScans.length === 0 ? (
            <div className="p-8 text-center">
              <i className="fas fa-qrcode text-gray-400 text-2xl mb-2"></i>
              <p className="text-gray-600">No recent scans</p>
              <p className="text-xs text-gray-500 mt-2">Scan a QR code to see its information here</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentScans.map((scan) => (
                <li key={scan.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        p-2 rounded-lg
                        ${scan.status === 'success' ? 'bg-green-100' : 
                          scan.status === 'pending' ? 'bg-yellow-100' : 
                          'bg-red-100'}
                      `}>
                        <i className={`
                          fas 
                          ${scan.status === 'success' ? 'fa-check text-green-600' : 
                            scan.status === 'pending' ? 'fa-clock text-yellow-600' : 
                            'fa-times text-red-600'}
                        `}></i>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-800">{scan.code}</p>
                          <span className="text-xs text-gray-500 ml-2">
                            {scan.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{scan.message}</p>
                      </div>
                    </div>
                    <div>
                      {scan.status === 'success' && (
                        <button className="text-primary hover:text-primary-dark text-sm">
                          View Item
                        </button>
                      )}
                      {scan.status === 'pending' && (
                        <div className="animate-pulse">
                          <i className="fas fa-spinner fa-spin text-yellow-500"></i>
                        </div>
                      )}
                      {scan.status === 'failed' && (
                        <button className="text-primary hover:text-primary-dark text-sm">
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">How to Scan QR Codes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Position</h3>
            <p className="text-sm text-gray-600">
              Hold your device so the QR code appears in the scanning area
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Steady</h3>
            <p className="text-sm text-gray-600">
              Keep your device steady until the code is recognized
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Process</h3>
            <p className="text-sm text-gray-600">
              Once scanned, the system will automatically process the code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
