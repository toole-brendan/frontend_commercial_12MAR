import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import IntegrationCard from '@/components/shared/IntegrationCard';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, Settings, Layers, CheckCircle, Plus, PlusCircle } from 'lucide-react';

export default function Integrations() {
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
  
  const handleAddIntegration = () => {
    toast({
      title: "Add Custom Integration",
      description: "Opening form to configure a custom integration.",
    });
  };
  
  // 8VC style action buttons
  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <button 
        className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleAddIntegration}
      >
        <Plus className="h-4 w-4 mr-1" />
        <span>Add Integration</span>
      </button>
    </div>
  );
  
  return (
    <PageWrapper
      className="space-y-6 pt-4"
      actions={actionButtons}
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Integration Hub</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">External Service Connections</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Connect and manage external services and data sources for your supply chain</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      {/* Introduction Card - 8VC Style */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6 mb-6">
        <div className="flex items-start">
          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center mr-4 bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-gray-500 dark:text-gray-400">Enterprise Ready</div>
            <h2 className="heading-medium mb-2 text-gray-900 dark:text-white text-xl font-medium">Commercial Integrations</h2>
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
            <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-purple-600 dark:text-purple-400">Featured Integration</div>
            <h3 className="heading-medium mb-2 text-gray-900 dark:text-white text-xl font-medium">USDC Stablecoin Integration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-light">
              HandReceipt's commercial version features deep integration with Circle's USDC infrastructure, enabling instant settlements, 
              automated payments via smart contracts, and immutable payment records on the blockchain.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm">
                <ExternalLink className="h-4 w-4 mr-1" /> Documentation
              </button>
              <button className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm">
                <Settings className="h-4 w-4 mr-1" /> Configure Settings
              </button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="border border-purple-500/20 dark:border-purple-500/30 p-4">
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
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-gray-500 dark:text-gray-400">Enterprise Resource Planning</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium">ERP Systems</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full">
            <IntegrationCard
              title="SAP"
              description="Connect to your SAP ERP system to synchronize inventory, orders, and transfers."
              icon="business"
              status="available"
              category="erp"
              onConnect={handleConnect}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="Oracle ERP Cloud"
              description="Pull data from Oracle ERP Cloud for seamless inventory management."
              icon="cloud"
              status="connected"
              category="erp"
              onConfigure={handleConfigure}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="Microsoft Dynamics 365"
              description="Integrate with Microsoft Dynamics 365 for comprehensive supply chain visibility."
              icon="business"
              status="available"
              category="erp"
              onConnect={handleConnect}
            />
          </div>
          
          <div className="h-full">
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
      </div>
      
      {/* Warehouse Management - 8VC Style */}
      <div className="mb-8">
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-gray-500 dark:text-gray-400">Physical Assets</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium">Warehouse Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full">
            <IntegrationCard
              title="RFID Systems"
              description="Connect your RFID scanning infrastructure to HandReceipt for automated tracking."
              icon="warehouse"
              status="connected"
              category="warehouse"
              onConfigure={handleConfigure}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="Barcode Scanners"
              description="Use your existing barcode scanners with HandReceipt for physical inventory management."
              icon="qr_code_scanner"
              status="connected"
              category="scanner"
              onConfigure={handleConfigure}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="Warehouse Management System"
              description="Integrate with your WMS for comprehensive warehouse operations."
              icon="warehouse"
              status="available"
              category="warehouse"
              onConnect={handleConnect}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="IoT Sensors"
              description="Connect IoT sensors to track environmental conditions for sensitive inventory."
              icon="sensors"
              status="coming-soon"
              category="warehouse"
            />
          </div>
        </div>
      </div>
      
      {/* Payment & Blockchain - 8VC Style */}
      <div className="mb-8">
        <div className="category-tag mb-1.5 uppercase text-xs tracking-wider font-medium text-gray-500 dark:text-gray-400">Financial Infrastructure</div>
        <h3 className="heading-medium mb-4 text-gray-900 dark:text-white text-lg font-medium">Payment & Blockchain</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full">
            <IntegrationCard
              title="USDC Payment Gateway"
              description="Connect to Circle's USDC infrastructure for stablecoin payments with 1:1 USD backing."
              icon="payments"
              status="connected"
              category="payment"
              onConfigure={handleConfigure}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="Traditional Banking API"
              description="Connect to your bank for traditional wire transfers and reconciliation."
              icon="account_balance"
              status="available"
              category="payment"
              onConnect={handleConnect}
            />
          </div>
          
          <div className="h-full">
            <IntegrationCard
              title="HandReceipt Shells (SHL)"
              description="Use HandReceipt's native token for ecosystem payments with reduced transaction fees."
              icon="toll"
              status="connected"
              category="blockchain"
              onConfigure={handleConfigure}
            />
          </div>
          
          <div className="h-full">
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
      </div>
      
      {/* Additional Custom Integration Section */}
      <div className="mb-8">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500/30 dark:hover:border-purple-500/50 transition-colors"
             onClick={handleAddIntegration}>
          <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center mb-4 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full">
            <PlusCircle className="h-6 w-6" />
          </div>
          <h3 className="heading-medium mb-2 text-gray-900 dark:text-white text-lg font-medium">Add Custom Integration</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-light max-w-md">
            Connect to any service with a REST API or webhook support. Our flexible integration platform allows for customized data flows.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
