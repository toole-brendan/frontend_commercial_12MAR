import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { transferRequests as mockTransfers } from '@/lib/mockData';
import QRScannerModal from '@/components/shared/QRScannerModal';
import PageWrapper from '@/components/layout/PageWrapper';
import { ArrowUp, ArrowDown, Eye, CheckCircle, Clock, Scan, Plus } from 'lucide-react';

export default function Transfers() {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Fetch transfers from API
  const { data: transfers, isLoading } = useQuery({
    queryKey: ['/api/transfers'],
    staleTime: 60000, // 1 minute
  });

  // Fallback to mock data if API call fails
  const displayTransfers = transfers || mockTransfers;

  // Filter transfers based on active tab
  const filteredTransfers = displayTransfers.filter(transfer => {
    if (activeTab === 'all') return true;
    if (activeTab === 'incoming') return transfer.type === 'incoming';
    if (activeTab === 'outgoing') return transfer.type === 'outgoing';
    if (activeTab === 'pending') return transfer.status === 'pending';
    if (activeTab === 'completed') return transfer.status === 'completed';
    return true;
  });

  const handleNewTransfer = () => {
    toast({
      title: "New Transfer",
      description: "This would open a form to create a new transfer"
    });
  };

  const handleScanQRCode = () => {
    setIsQRScannerOpen(true);
  };

  const handleQRCodeScanned = (data: string) => {
    toast({
      title: "QR Code Scanned",
      description: `Scanned data: ${data}`
    });
  };

  const handleAcceptTransfer = async (id: number) => {
    try {
      await fetch(`/api/transfers/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });
      
      toast({
        title: "Transfer Accepted",
        description: "The transfer has been accepted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept transfer",
        variant: "destructive"
      });
    }
  };

  const handleDeclineTransfer = async (id: number) => {
    try {
      await fetch(`/api/transfers/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'declined' }),
      });
      
      toast({
        title: "Transfer Declined",
        description: "The transfer has been declined"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline transfer",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    // 8VC style badges with square borders instead of rounded
    switch(status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">Completed</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">Pending</span>;
      case 'accepted':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-blue-500/30 text-blue-600 dark:text-blue-400">Accepted</span>;
      case 'declined':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-red-500/30 text-red-600 dark:text-red-400">Declined</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">In Transit</span>;
      default:
        return <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-500/30 text-gray-600 dark:text-gray-400">{status}</span>;
    }
  };

  // 8VC style action buttons
  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-3">
      <button 
        className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleScanQRCode}
      >
        <Scan className="h-4 w-4 mr-1" />
        <span>Scan QR</span>
      </button>
      <button 
        className="btn-8vc flex items-center space-x-2 py-1.5 px-3 text-sm"
        onClick={handleNewTransfer}
      >
        <Plus className="h-4 w-4 mr-1" />
        <span>New Transfer</span>
      </button>
    </div>
  );

  return (
    <PageWrapper
      className="space-y-4 pt-4"
      actions={actionButtons}
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Transfer Management</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Manage inventory transfers</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Track and manage inventory transfers between locations and suppliers</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      {/* Tabs - 8VC Style with bottom border instead of rounded tabs */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 mb-4">
        <div className="border-b border-gray-200 dark:border-white/10">
          <nav className="flex overflow-x-auto">
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'all' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Transfers
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'incoming' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('incoming')}
            >
              Incoming
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'outgoing' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('outgoing')}
            >
              Outgoing
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'pending' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button 
              className={`whitespace-nowrap py-3 px-6 border-b-2 text-xs uppercase tracking-wider font-medium ${
                activeTab === 'completed' 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </nav>
        </div>

        {/* Transfers List */}
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading transfers...</p>
          </div>
        ) : filteredTransfers.length === 0 ? (
          <div className="p-8 text-center">
            <div className="h-6 w-6 text-gray-400 mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-4 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">No transfers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr className="border-b border-gray-300 dark:border-white/10">
                  <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID/Item</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">From/To</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="py-2 pl-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150">
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                          {transfer.type === 'incoming' ? (
                            <ArrowDown size={16} className="text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowUp size={16} className="text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-normal text-gray-900 dark:text-white">#{transfer.id}</div>
                          <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">{transfer.itemName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{transfer.type === 'incoming' ? 'From:' : 'To:'}</div>
                      <div className="text-sm font-normal text-gray-900 dark:text-white">{transfer.type === 'incoming' ? transfer.fromParty : transfer.toParty}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">{transfer.quantity}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(transfer.status)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {transfer.blockchainVerified ? (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1.5" /> Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-500/30 text-gray-600 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-4 whitespace-nowrap text-sm font-medium">
                      {transfer.status === 'pending' && transfer.type === 'incoming' && (
                        <div className="flex space-x-2">
                          <button 
                            className="btn-8vc-primary py-1 px-3 text-xs"
                            onClick={() => handleAcceptTransfer(transfer.id)}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn-8vc py-1 px-3 text-xs"
                            onClick={() => handleDeclineTransfer(transfer.id)}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {(transfer.status !== 'pending' || transfer.type !== 'incoming') && (
                        <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center">
                          <Eye className="h-4 w-4 mr-1" /> 
                          <span className="text-xs uppercase tracking-wider">Details</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
