import React from 'react';
import PageContainer from '@/components/layout/PageContainer';

const IntegrationCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  status: 'connected' | 'available' | 'coming-soon';
}> = ({ title, description, icon, status }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <span className="material-icons text-primary">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {status === 'connected' && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Connected</span>
            )}
            {status === 'coming-soon' && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Coming Soon</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <div className="mt-4">
            {status === 'connected' ? (
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                Configure
              </button>
            ) : status === 'available' ? (
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                Connect
              </button>
            ) : (
              <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  return (
    <PageContainer title="Integrations">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <span className="material-icons text-primary">integration_instructions</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Connect Your Existing Systems</h2>
            <p className="text-sm text-gray-500 mt-1">
              HandReceipt integrates with your existing enterprise software to streamline inventory and supply chain management. 
              Use the connections below to sync your data and processes.
            </p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-4">ERP Systems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IntegrationCard
          title="SAP"
          description="Connect to your SAP ERP system to synchronize inventory, orders, and transfers."
          icon="inventory"
          status="available"
        />
        
        <IntegrationCard
          title="Oracle ERP Cloud"
          description="Pull data from Oracle ERP Cloud for seamless inventory management."
          icon="cloud_sync"
          status="connected"
        />
        
        <IntegrationCard
          title="Microsoft Dynamics 365"
          description="Integrate with Microsoft Dynamics 365 for comprehensive supply chain visibility."
          icon="settings_applications"
          status="available"
        />
        
        <IntegrationCard
          title="NetSuite"
          description="Connect to NetSuite to centralize your ERP and inventory management."
          icon="all_inbox"
          status="available"
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-4">Warehouse Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IntegrationCard
          title="RFID Systems"
          description="Connect your RFID scanning infrastructure to HandReceipt for automated tracking."
          icon="rss_feed"
          status="connected"
        />
        
        <IntegrationCard
          title="Barcode Scanners"
          description="Use your existing barcode scanners with HandReceipt for physical inventory management."
          icon="qr_code_scanner"
          status="connected"
        />
        
        <IntegrationCard
          title="Warehouse Management System"
          description="Integrate with your WMS for comprehensive warehouse operations."
          icon="warehouse"
          status="available"
        />
        
        <IntegrationCard
          title="IoT Sensors"
          description="Connect IoT sensors to track environmental conditions for sensitive inventory."
          icon="sensors"
          status="coming-soon"
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-4">Payment Systems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          title="USDC Payment Gateway"
          description="Connect to Circle's USDC infrastructure for stablecoin payments."
          icon="account_balance_wallet"
          status="connected"
        />
        
        <IntegrationCard
          title="Traditional Banking API"
          description="Connect to your bank for traditional wire transfers and reconciliation."
          icon="account_balance"
          status="available"
        />
        
        <IntegrationCard
          title="Shells (SHL) Wallet"
          description="Use HandReceipt's native token for ecosystem payments."
          icon="toll"
          status="connected"
        />
        
        <IntegrationCard
          title="Multi-currency Support"
          description="Support for additional cryptocurrencies and stablecoins."
          icon="currency_exchange"
          status="coming-soon"
        />
      </div>
    </PageContainer>
  );
};

export default Integrations;
