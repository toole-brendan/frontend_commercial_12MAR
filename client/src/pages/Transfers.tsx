import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { transferRequests as mockTransfers } from '@/lib/mockData';
import QRScannerModal from '@/components/shared/QRScannerModal';
import { PageHeader } from '@/components/ui/page-header';
import { ActionButton } from '@/components/ui/action-button';

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
    switch(status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'accepted':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Accepted</span>;
      case 'declined':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Declined</span>;
      case 'in_transit':
      case 'in transit':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">In Transit</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-2">
      <ActionButton 
        variant="primary"
        onClick={handleScanQRCode}
        icon={<i className="fas fa-qrcode"></i>}
      >
        Scan QR Code
      </ActionButton>
      <ActionButton 
        variant="secondary"
        onClick={handleNewTransfer}
        icon={<i className="fas fa-plus"></i>}
      >
        New Transfer
      </ActionButton>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader 
        title="Transfers" 
        description="Manage transfers between locations and suppliers"
        actions={actionButtons}
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'all' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Transfers
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'incoming' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('incoming')}
            >
              Incoming
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'outgoing' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('outgoing')}
            >
              Outgoing
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'pending' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'completed' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            <i className="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
            <p className="text-gray-600">Loading transfers...</p>
          </div>
        ) : filteredTransfers.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-exchange-alt text-gray-400 text-2xl mb-2"></i>
            <p className="text-gray-600">No transfers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID/Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From/To</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <i className={`fas ${transfer.type === 'incoming' ? 'fa-arrow-down text-green-500' : 'fa-arrow-up text-blue-500'}`}></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">#{transfer.id}</div>
                          <div className="text-xs text-gray-500">{transfer.itemName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transfer.type === 'incoming' ? 'From:' : 'To:'}</div>
                      <div className="text-sm text-gray-500">{transfer.type === 'incoming' ? transfer.fromParty : transfer.toParty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transfer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transfer.blockchainVerified ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <i className="fas fa-check-circle mr-1"></i> Verified
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          <i className="fas fa-clock mr-1"></i> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transfer.status === 'pending' && transfer.type === 'incoming' && (
                        <div className="flex space-x-2">
                          <button 
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                            onClick={() => handleAcceptTransfer(transfer.id)}
                          >
                            Accept
                          </button>
                          <button 
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-xs"
                            onClick={() => handleDeclineTransfer(transfer.id)}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {(transfer.status !== 'pending' || transfer.type !== 'incoming') && (
                        <button className="text-primary hover:text-primary-dark">
                          <i className="fas fa-eye"></i> Details
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
    </div>
  );
}
