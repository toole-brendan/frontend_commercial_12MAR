import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import IntegrationCard from '@/components/shared/IntegrationCard';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, Settings, Layers, CheckCircle } from 'lucide-react';

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
    <PageContainer title="Integrations" description="Connect and manage external services and data sources">
      {/* Introduction Card - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6 mb-6">
        <div className="flex items-start">
          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center mr-4 bg-primary/10 text-primary dark:text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-muted-foreground dark:text-theme-text-secondary">Enterprise Ready</div>
            <h2 className="heading-medium mb-2 text-gray-900 dark:text-white text-xl font-medium font-display">Commercial Integrations</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-light">
              HandReceipt's commercial version integrates with enterprise systems, payment networks, and blockchain infrastructure to streamline
              your supply chain operations. Connect your existing systems below.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Integration - 8VC Style */}
      <div className="mb-8 bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 dark:from-purple-900/30 dark:to-indigo-900/30 opacity-10 pointer-events-none"></div>
        <div className="md:flex items-start gap-8 relative z-10">
          <div className="md:w-3/5 mb-6 md:mb-0">
            <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-primary dark:text-purple-400">Featured Integration</div>
            <h3 className="heading-medium mb-2 text-gray-900 dark:text-white text-xl font-medium font-display">USDC Stablecoin Integration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-light">
              HandReceipt's commercial version features deep integration with Circle's USDC infrastructure, enabling instant settlements, 
              automated payments via smart contracts, and immutable payment records on the blockchain.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium text-gray-800 dark:text-white transition-colors">
                <ExternalLink className="h-4 w-4 mr-2" /> Documentation
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-purple-400 border border-primary/20 dark:border-primary/30 hover:bg-primary/20 dark:hover:bg-primary/30 text-sm font-medium transition-colors">
                <Settings className="h-4 w-4 mr-2" /> Configure Settings
              </button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="border border-primary/20 dark:border-primary/30 p-4">
              <h4 className="text-gray-900 dark:text-white font-medium mb-3 flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Integration Benefits
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  <span className="font-light">Instant global payments with no currency conversion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  <span className="font-light">Automated payments via smart contracts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  <span className="font-light">Immutable payment records on blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  <span className="font-light">Lower transaction fees than wire transfers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
      {/* ERP Systems - 8VC Style */}
      <div className="mb-8">
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-muted-foreground dark:text-theme-text-secondary">Enterprise Resource Planning</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium font-display">ERP Systems</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <IntegrationCard
            title="SAP"
            description="Connect to your SAP ERP system to synchronize inventory, orders, and transfers."
            icon="business"
            status="available"
            category="erp"
            onConnect={handleConnect}
          />
          
          <IntegrationCard
            title="Oracle ERP Cloud"
            description="Pull data from Oracle ERP Cloud for seamless inventory management."
            icon="cloud"
            status="connected"
            category="erp"
            onConfigure={handleConfigure}
          />
          
          <IntegrationCard
            title="Microsoft Dynamics 365"
            description="Integrate with Microsoft Dynamics 365 for comprehensive supply chain visibility."
            icon="business"
            status="available"
            category="erp"
            onConnect={handleConnect}
          />
          
          <IntegrationCard
            title="NetSuite"
            description="Connect to NetSuite to centralize your ERP and inventory management."
            icon="business"
            status="available"
            category="erp"
            onConnect={handleConnect}
          />
        </div>
      </div>
      
      {/* Warehouse Management - 8VC Style */}
      <div className="mb-8">
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-muted-foreground dark:text-theme-text-secondary">Physical Assets</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium font-display">Warehouse Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <IntegrationCard
            title="RFID Systems"
            description="Connect your RFID scanning infrastructure to HandReceipt for automated tracking."
            icon="warehouse"
            status="connected"
            category="warehouse"
            onConfigure={handleConfigure}
          />
          
          <IntegrationCard
            title="Barcode Scanners"
            description="Use your existing barcode scanners with HandReceipt for physical inventory management."
            icon="qr_code_scanner"
            status="connected"
            category="scanner"
            onConfigure={handleConfigure}
          />
          
          <IntegrationCard
            title="Warehouse Management System"
            description="Integrate with your WMS for comprehensive warehouse operations."
            icon="warehouse"
            status="available"
            category="warehouse"
            onConnect={handleConnect}
          />
          
          <IntegrationCard
            title="IoT Sensors"
            description="Connect IoT sensors to track environmental conditions for sensitive inventory."
            icon="sensors"
            status="coming-soon"
            category="warehouse"
          />
        </div>
      </div>
      
      {/* Payment & Blockchain - 8VC Style */}
      <div className="mb-8">
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-muted-foreground dark:text-theme-text-secondary">Financial Infrastructure</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium font-display">Payment & Blockchain</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <IntegrationCard
            title="USDC Payment Gateway"
            description="Connect to Circle's USDC infrastructure for stablecoin payments with 1:1 USD backing."
            icon="payments"
            status="connected"
            category="payment"
            onConfigure={handleConfigure}
          />
          
          <IntegrationCard
            title="Traditional Banking API"
            description="Connect to your bank for traditional wire transfers and reconciliation."
            icon="account_balance"
            status="available"
            category="payment"
            onConnect={handleConnect}
          />
          
          <IntegrationCard
            title="HandReceipt Shells (SHL)"
            description="Use HandReceipt's native token for ecosystem payments with reduced transaction fees."
            icon="toll"
            status="connected"
            category="blockchain"
            onConfigure={handleConfigure}
          />
          
          <IntegrationCard
            title="Solana Blockchain"
            description="Leverage Solana's high-speed, low-cost blockchain for enterprise-grade smart contracts."
            icon="lan"
            status="connected"
            category="blockchain"
            onConfigure={handleConfigure}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Integrations;
