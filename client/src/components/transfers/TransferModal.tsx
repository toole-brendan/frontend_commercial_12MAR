import React, { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { mockRecipients } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const TransferModal: React.FC = () => {
  const { showTransferModal, closeTransferModal, scannedItem } = useContext(AppContext);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [notes, setNotes] = useState('');
  const [createContract, setCreateContract] = useState(false);

  if (!showTransferModal || !scannedItem) return null;

  const handleTransfer = () => {
    // Validate form
    if (!selectedRecipient) {
      toast({
        title: "Error",
        description: "Please select a recipient",
        variant: "destructive"
      });
      return;
    }

    if (!quantity || parseInt(quantity) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }

    if (!transferDate) {
      toast({
        title: "Error",
        description: "Please select a transfer date",
        variant: "destructive"
      });
      return;
    }

    // Process transfer
    toast({
      title: "Transfer Request Submitted",
      description: `Request to transfer ${quantity} units of ${scannedItem.id} to ${selectedRecipient} has been submitted.`,
      variant: "default"
    });

    // Close modal and reset form
    closeTransferModal();
    setQuantity('');
    setSelectedRecipient('');
    setTransferDate('');
    setNotes('');
    setCreateContract(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => closeTransferModal()}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">New Transfer Request</h2>
          <p className="text-gray-500 text-sm mt-1">Item successfully scanned</p>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium">Item Details</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-500">Item ID:</p>
              <p className="font-medium">{scannedItem.id}</p>
              <p className="text-gray-500">Description:</p>
              <p className="font-medium">{scannedItem.name}</p>
              <p className="text-gray-500">Location:</p>
              <p className="font-medium">{scannedItem.location}</p>
              <p className="text-gray-500">Current Quantity:</p>
              <p className="font-medium">{scannedItem.quantity}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">Select recipient...</option>
              {mockRecipients.map((recipient, index) => (
                <option key={index} value={recipient}>{recipient}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Transfer</label>
            <input 
              type="number" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={transferDate}
              onChange={(e) => setTransferDate(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              rows={3} 
              placeholder="Add any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="createContract" 
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={createContract}
                onChange={(e) => setCreateContract(e.target.checked)}
              />
              <label htmlFor="createContract" className="ml-2 block text-sm text-gray-700">Create smart contract</label>
            </div>
            <div className="flex items-center text-xs text-green-600">
              <span className="material-icons text-xs mr-1">shield</span>
              <span>Blockchain secured</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
            onClick={() => closeTransferModal()}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={handleTransfer}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
