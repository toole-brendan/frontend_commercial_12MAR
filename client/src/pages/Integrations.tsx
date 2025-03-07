import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import IntegrationCard from '@/components/shared/IntegrationCard';
import { useToast } from '@/hooks/use-toast';

const Integrations: React.FC = () => {
  const { toast } = useToast();
  
  const handleConnect = () => {
    toast({
      title: "Integration initiated",
      description: "Starting connection process. You'll be guided through the setup.",
    });
  };
  
  const handleConfigure = () => {
    toast({
      title: "Configure Integration",
      description: "Opening configuration panel for this integration.",
    });
  };
  
  return (
    <PageContainer title="Integrations">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <i className="fas fa-plug text-primary text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Commercial Integrations</h2>
            <p className="text-sm text-gray-500 mt-1">
              HandReceipt's commercial version integrates with enterprise systems, payment networks, and blockchain infrastructure to streamline
              your supply chain operations. Connect your existing systems below.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Integration */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 md:flex items-center">
          <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-lg mr-3">
                <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">USDC Stablecoin Integration</h3>
            </div>
            <p className="text-blue-100 mb-4">
              HandReceipt's commercial version features deep integration with Circle's USDC infrastructure, enabling instant settlements, 
              automated payments via smart contracts, and immutable payment records on the blockchain.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                <i className="fas fa-book mr-2"></i> Documentation
              </button>
              <button className="bg-blue-500 bg-opacity-30 text-white border border-blue-300 px-4 py-2 rounded-lg hover:bg-opacity-40 transition-colors">
                <i className="fas fa-cog mr-2"></i> Configure Settings
              </button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg border border-blue-300 border-opacity-30">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <i className="fas fa-check-circle text-green-400 mr-2"></i> Integration Benefits
              </h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span>Instant global payments with no currency conversion</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span>Automated payments via smart contracts</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span>Immutable payment records on blockchain</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span>Lower transaction fees than wire transfers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
      <h3 className="text-lg font-semibold mb-4">ERP Systems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IntegrationCard
          title="SAP"
          description="Connect to your SAP ERP system to synchronize inventory, orders, and transfers."
          icon="fa-box"
          status="available"
          category="erp"
          onConnect={handleConnect}
        />
        
        <IntegrationCard
          title="Oracle ERP Cloud"
          description="Pull data from Oracle ERP Cloud for seamless inventory management."
          icon="fa-cloud"
          status="connected"
          category="erp"
          onConfigure={handleConfigure}
        />
        
        <IntegrationCard
          title="Microsoft Dynamics 365"
          description="Integrate with Microsoft Dynamics 365 for comprehensive supply chain visibility."
          icon="fa-cogs"
          status="available"
          category="erp"
          onConnect={handleConnect}
        />
        
        <IntegrationCard
          title="NetSuite"
          description="Connect to NetSuite to centralize your ERP and inventory management."
          icon="fa-boxes"
          status="available"
          category="erp"
          onConnect={handleConnect}
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-4">Warehouse Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IntegrationCard
          title="RFID Systems"
          description="Connect your RFID scanning infrastructure to HandReceipt for automated tracking."
          icon="fa-broadcast-tower"
          status="connected"
          category="warehouse"
          onConfigure={handleConfigure}
        />
        
        <IntegrationCard
          title="Barcode Scanners"
          description="Use your existing barcode scanners with HandReceipt for physical inventory management."
          icon="fa-qrcode"
          status="connected"
          category="scanner"
          onConfigure={handleConfigure}
        />
        
        <IntegrationCard
          title="Warehouse Management System"
          description="Integrate with your WMS for comprehensive warehouse operations."
          icon="fa-warehouse"
          status="available"
          category="warehouse"
          onConnect={handleConnect}
        />
        
        <IntegrationCard
          title="IoT Sensors"
          description="Connect IoT sensors to track environmental conditions for sensitive inventory."
          icon="fa-microchip"
          status="coming-soon"
          category="warehouse"
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-4">Payment & Blockchain</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          title="USDC Payment Gateway"
          description="Connect to Circle's USDC infrastructure for stablecoin payments with 1:1 USD backing."
          icon="fa-dollar-sign"
          status="connected"
          category="payment"
          onConfigure={handleConfigure}
        />
        
        <IntegrationCard
          title="Traditional Banking API"
          description="Connect to your bank for traditional wire transfers and reconciliation."
          icon="fa-university"
          status="available"
          category="payment"
          onConnect={handleConnect}
        />
        
        <IntegrationCard
          title="HandReceipt Shells (SHL)"
          description="Use HandReceipt's native token for ecosystem payments with reduced transaction fees."
          icon="fa-coins"
          status="connected"
          category="blockchain"
          onConfigure={handleConfigure}
        />
        
        <IntegrationCard
          title="Solana Blockchain"
          description="Leverage Solana's high-speed, low-cost blockchain for enterprise-grade smart contracts."
          icon="fa-link"
          status="connected"
          category="blockchain"
          onConfigure={handleConfigure}
        />
      </div>
    </PageContainer>
  );
};

export default Integrations;
