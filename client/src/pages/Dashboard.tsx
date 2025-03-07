import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

import StatCard from '@/components/dashboard/StatCard';
import TransferRequestsList from '@/components/dashboard/TransferRequestsList';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import LowStockItems from '@/components/dashboard/LowStockItems';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import QRScannerModal from '@/components/shared/QRScannerModal';
import PageWrapper from '@/components/layout/PageWrapper';

// Import mock data for initial development
import { 
  dashboardStats, 
  transferRequests, 
  activities, 
  lowStockItems, 
  mockTransactions 
} from '@/lib/mockData';

export default function Dashboard() {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch dashboard stats from API
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    staleTime: 60000, // 1 minute
  });

  // Fall back to mock data if API call fails
  const displayStats = stats || dashboardStats;

  const handleScanQRCode = () => {
    setIsQRScannerOpen(true);
  };

  const handleNewTransfer = () => {
    toast({
      title: "New Transfer",
      description: "This would open the transfer creation form"
    });
  };

  const handleQRCodeScanned = (data: string) => {
    toast({
      title: "QR Code Scanned",
      description: `Scanned data: ${data}`
    });
  };

  const handleReorderItem = (id: number) => {
    toast({
      title: "Reorder Item",
      description: `Reordering item ID: ${id}`
    });
  };

  const actionButtons = (
    <div className="flex space-x-2">
      <button 
        className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
        onClick={handleScanQRCode}
      >
        <i className="fas fa-qrcode"></i>
        <span className="hidden sm:inline">Scan QR Code</span>
      </button>
      <button 
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
        onClick={handleNewTransfer}
      >
        <i className="fas fa-plus"></i>
        <span className="hidden sm:inline">New Transfer</span>
      </button>
    </div>
  );

  return (
    <PageWrapper
      title="Dashboard" 
      description="Overview of your inventory, transfers, and transactions"
      actions={actionButtons}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Inventory"
          value={statsLoading ? "Loading..." : displayStats.totalInventory}
          icon="fa-boxes"
          trend={{ value: 3.2, isPositive: true, text: "from last month" }}
          iconBgColor="bg-primary-100"
          iconColor="text-primary"
        />
        
        <StatCard
          label="Pending Transfers"
          value={statsLoading ? "Loading..." : displayStats.pendingTransfers}
          icon="fa-exchange-alt"
          trend={{ value: 8.1, isPositive: false, text: "from last week" }}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
        />
        
        <StatCard
          label="Completed Today"
          value={statsLoading ? "Loading..." : displayStats.completedToday}
          icon="fa-check-circle"
          trend={{ value: 12.4, isPositive: true, text: "from yesterday" }}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
        
        <StatCard
          label="Shell Balance"
          value={`${displayStats.shellBalance} SHL`}
          icon="fa-coins"
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-500"
          trend={undefined}
        />
      </div>

      {/* Recent Transfer Requests & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransferRequestsList 
          requests={transferRequests}
        />
        
        <ActivityTimeline 
          activities={activities}
        />
      </div>

      {/* Low Stock & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LowStockItems 
            items={lowStockItems}
            onReorder={handleReorderItem}
          />
        </div>
        
        <div className="lg:col-span-2">
          <TransactionsTable 
            transactions={mockTransactions}
          />
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal 
        isOpen={isQRScannerOpen} 
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRCodeScanned}
      />
    </PageWrapper>
  );
}
