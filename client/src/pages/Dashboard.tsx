import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Scan, ArrowUpDown, Plus } from 'lucide-react';

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
  transferRequests as mockTransferRequests, 
  activities as mockActivities, 
  lowStockItems, 
  mockTransactions as rawTransactions 
} from '@/lib/mockData';

// Define interfaces to match our component props
interface TransferRequest {
  id: number;
  itemName: string;
  fromParty: string;
  toParty: string;
  status: string;
  type: 'incoming' | 'outgoing';
}

interface Activity {
  id: number;
  description: string;
  details: string;
  timestamp: Date;
  type: 'contract' | 'receipt' | 'transfer' | 'inventory';
  blockchainVerified: boolean;
}

interface Transaction {
  id: number;
  type: 'incoming' | 'outgoing' | 'transfer';
  description: string;
  reference: string;
  date: Date;
  amount: number;
  amountUSD: number;
  currency: string;
  status: string;
}

// Cast the mock data to match our interfaces
const transferRequests = mockTransferRequests.map(item => ({
  ...item,
  type: item.type as 'incoming' | 'outgoing'
})) as TransferRequest[];

const activities = mockActivities.map(item => ({
  ...item,
  type: item.type as 'contract' | 'receipt' | 'transfer' | 'inventory'
})) as Activity[];

const mockTransactions = rawTransactions.map(item => ({
  ...item,
  id: typeof item.id === 'string' ? parseInt(item.id.replace('TR-', '')) : item.id,
  type: item.type as 'incoming' | 'outgoing' | 'transfer'
})) as Transaction[];

export default function Dashboard() {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch dashboard stats from API
  const { data: stats, isLoading: statsLoading } = useQuery<typeof dashboardStats>({
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

  // 8VC style action buttons
  const actionButtons = (
    <div className="flex space-x-4">
      <button 
        className="btn-8vc-primary flex items-center space-x-2"
        onClick={handleScanQRCode}
      >
        <Scan className="h-4 w-4 mr-2" />
        <span>Scan QR</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2"
        onClick={handleNewTransfer}
      >
        <Plus className="h-4 w-4 mr-2" />
        <span>New Transfer</span>
      </button>
    </div>
  );

  return (
    <>
      
      {/* Main Dashboard Content */}
      <PageWrapper
        className="space-y-8 pt-8"
        actions={actionButtons}
      >
        {/* 8VC Style Section Header */}
        <div className="mb-8">
          <div className="category-tag mb-2">Dashboard Overview</div>
          <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Real-time inventory metrics</h2>
          <div className="horizontal-divider border-gray-200 dark:border-gray-800"></div>
        </div>
      
        <div className="grid grid-flow-row gap-8">
          {/* Summary Cards - 8VC Style with no border radius */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Inventory"
              value={statsLoading ? "Loading..." : displayStats.totalInventory}
              icon="fa-boxes"
              trend={{ value: 3.2, isPositive: true, text: "from last month" }}
              iconBgColor="bg-primary/10"
              iconColor="text-purple-400"
            />
            
            <StatCard
              label="Pending Transfers"
              value={statsLoading ? "Loading..." : displayStats.pendingTransfers}
              icon="fa-exchange-alt"
              trend={{ value: 8.1, isPositive: false, text: "from last week" }}
              iconBgColor="bg-yellow-500/10"
              iconColor="text-yellow-400"
            />
            
            <StatCard
              label="Completed Today"
              value={statsLoading ? "Loading..." : displayStats.completedToday}
              icon="fa-check-circle"
              trend={{ value: 12.4, isPositive: true, text: "from yesterday" }}
              iconBgColor="bg-green-500/10"
              iconColor="text-green-400"
            />
            
            <StatCard
              label="Shell Balance"
              value={`${displayStats.shellBalance} SHL`}
              icon="fa-coins"
              iconBgColor="bg-indigo-500/10"
              iconColor="text-indigo-400"
              trend={undefined}
            />
          </div>

          {/* Recent Transfer Requests & Activity - 8VC Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6">
              <div className="category-tag mb-2">Active Transfers</div>
              <h3 className="heading-medium mb-4 text-gray-900 dark:text-white">Recent transfer requests</h3>
              <TransferRequestsList 
                requests={transferRequests}
              />
            </div>
            
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6">
              <div className="category-tag mb-2">Activity Log</div>
              <h3 className="heading-medium mb-4 text-gray-900 dark:text-white">Recent blockchain activity</h3>
              <ActivityTimeline 
                activities={activities}
              />
            </div>
          </div>

          {/* 8VC Style Section Header */}
          <div className="mt-14 mb-10">
            <div className="category-tag mb-2">Operations</div>
            <h2 className="heading-large mb-3 text-gray-900 dark:text-white">Inventory & transactions</h2>
            <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
          </div>
          
          {/* Low Stock & Latest Transactions - 8VC Style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6">
              <div className="category-tag mb-2">Inventory Alert</div>
              <h3 className="heading-medium mb-6 text-gray-900 dark:text-white">Low stock items</h3>
              <LowStockItems 
                items={lowStockItems}
                onReorder={handleReorderItem}
              />
            </div>
            
            <div className="lg:col-span-2 bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-6">
              <div className="category-tag mb-2">Financial</div>
              <h3 className="heading-medium mb-6 text-gray-900 dark:text-white">Latest transactions</h3>
              <TransactionsTable 
                transactions={mockTransactions}
              />
            </div>
          </div>
        </div>

        {/* QR Scanner Modal */}
        <QRScannerModal 
          isOpen={isQRScannerOpen} 
          onClose={() => setIsQRScannerOpen(false)}
          onScan={handleQRCodeScanned}
        />
      </PageWrapper>
    </>
  );
}
