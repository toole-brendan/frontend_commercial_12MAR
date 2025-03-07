import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { recentTransactions as mockTransactions } from '@/lib/mockData';
import { PageHeader } from '@/components/ui/page-header';
import { ActionButton } from '@/components/ui/action-button';
import PageWrapper from '@/components/layout/PageWrapper';

export default function Payments() {
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'outgoing',
    recipient: '',
    description: '',
    amount: '',
    reference: '',
  });
  const { toast } = useToast();

  // Fetch transactions from API
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    staleTime: 60000, // 1 minute
  });

  // Fallback to mock data if API call fails
  const displayTransactions = transactions || mockTransactions;

  // Filter only payment transactions (not transfers)
  const paymentTransactions = displayTransactions.filter(
    transaction => transaction.type === 'incoming' || transaction.type === 'outgoing'
  );

  const handleCreatePayment = () => {
    setShowNewPaymentForm(true);
  };

  const handleCloseForm = () => {
    setShowNewPaymentForm(false);
    // Reset form data
    setFormData({
      type: 'outgoing',
      recipient: '',
      description: '',
      amount: '',
      reference: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const paymentData = {
        type: formData.type,
        description: formData.description,
        amount: parseFloat(formData.amount),
        amountUSD: parseFloat(formData.amount), // Assuming 1:1 conversion
        currency: 'SHL',
        fromParty: formData.type === 'outgoing' ? 'HandReceipt' : formData.recipient,
        toParty: formData.type === 'outgoing' ? formData.recipient : 'HandReceipt',
        reference: formData.reference,
        status: 'pending',
      };
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
      
      toast({
        title: "Success",
        description: "Payment created successfully",
      });
      
      handleCloseForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment",
        variant: "destructive",
      });
    }
  };

  const handleConvertToUSDC = () => {
    toast({
      title: "USDC Conversion",
      description: "Converting SHL to USDC would be processed here",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'failed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const actionButtons = (
    <div className="flex flex-col sm:flex-row gap-2">
      <ActionButton 
        variant="primary"
        onClick={handleCreatePayment}
        icon={<i className="fas fa-plus"></i>}
      >
        New Payment
      </ActionButton>
      <ActionButton 
        variant="secondary"
        onClick={handleConvertToUSDC}
        icon={<i className="fas fa-exchange-alt"></i>}
      >
        Convert to USDC
      </ActionButton>
    </div>
  );

  return (
    <PageWrapper
      title="Payments" 
      description="Manage shell payments and transactions" 
      actions={actionButtons}
      className="space-y-6"
    >

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Shell Balance</p>
              <p className="text-2xl font-semibold text-gray-800">1,245 SHL</p>
            </div>
            <div className="bg-indigo-100 text-indigo-500 p-3 rounded-full">
              <i className="fas fa-coins"></i>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">USDC Equivalent: $1,245.00</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <p className="text-2xl font-semibold text-gray-800">3</p>
            </div>
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full">
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">Awating confirmation</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">USDC Balance</p>
              <p className="text-2xl font-semibold text-gray-800">500 USDC</p>
            </div>
            <div className="bg-blue-100 text-blue-500 p-3 rounded-full">
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">Stable coin for external payments</span>
          </div>
        </div>
      </div>

      {/* New Payment Form */}
      {showNewPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full m-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Create New Payment</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitPayment} className="p-4 space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="outgoing">Send Payment</option>
                  <option value="incoming">Request Payment</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'outgoing' ? 'Recipient' : 'Sender'}
                </label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Company Name"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="What is this payment for?"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (SHL)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="0.01"
                  step="0.01"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">1 SHL = $1.00 USD</p>
              </div>
              
              <div>
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
                  Reference # (Optional)
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Invoice #, PO #, etc."
                  value={formData.reference}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  {formData.type === 'outgoing' ? 'Send Payment' : 'Request Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Recent Payments</h2>
        </div>
        {isLoading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
            <p className="text-gray-600">Loading payment data...</p>
          </div>
        ) : paymentTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-wallet text-gray-400 text-2xl mb-2"></i>
            <p className="text-gray-600">No payments found</p>
            <button 
              className="mt-4 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleCreatePayment}
            >
              Create Your First Payment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`${
                          transaction.type === 'incoming' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        } p-2 rounded`}>
                          <i className={`fas fa-arrow-${transaction.type === 'incoming' ? 'down' : 'up'}`}></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.amount} SHL</div>
                      <div className="text-xs text-gray-500">${transaction.amountUSD.toFixed(2)} USD</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary hover:text-primary-dark mr-3">
                        <i className="fas fa-receipt"></i> Receipt
                      </button>
                      {transaction.status === 'pending' && (
                        <button className="text-red-500 hover:text-red-700">
                          <i className="fas fa-times-circle"></i> Cancel
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

      {/* Info Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <i className="fas fa-coins text-indigo-600"></i>
              </div>
              <h3 className="font-medium text-gray-800">Shell (SHL)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              HandReceipt's native token for supply chain payments. Fast settlement within the platform.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 pl-2 space-y-1">
              <li>Instant settlement</li>
              <li>No transaction fees</li>
              <li>Blockchain verified</li>
              <li>1:1 with USD value</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <i className="fas fa-dollar-sign text-blue-600"></i>
              </div>
              <h3 className="font-medium text-gray-800">USDC Stablecoin</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              For external payments to parties outside the HandReceipt platform.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 pl-2 space-y-1">
              <li>Widely accepted</li>
              <li>Small network fees</li>
              <li>Easy conversion from SHL</li>
              <li>Stable 1:1 USD pegging</li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
