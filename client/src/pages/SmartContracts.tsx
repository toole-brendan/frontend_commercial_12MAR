import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { smartContracts as mockSmartContracts } from '@/lib/mockData';

export default function SmartContracts() {
  const [showNewContractForm, setShowNewContractForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    counterparty: '',
    paymentTerms: '',
    triggerConditions: '',
  });
  const { toast } = useToast();

  // Fetch smart contracts from API
  const { data: smartContracts, isLoading } = useQuery({
    queryKey: ['/api/smart-contracts'],
    staleTime: 60000, // 1 minute
  });

  // Fallback to mock data if API call fails
  const displayContracts = smartContracts || mockSmartContracts;

  const handleCreateContract = () => {
    setShowNewContractForm(true);
  };

  const handleCloseForm = () => {
    setShowNewContractForm(false);
    // Reset form data
    setFormData({
      name: '',
      counterparty: '',
      paymentTerms: '',
      triggerConditions: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitContract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/smart-contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create smart contract');
      }
      
      toast({
        title: "Success",
        description: "Smart contract created successfully",
      });
      
      handleCloseForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create smart contract",
        variant: "destructive",
      });
    }
  };

  const handleDeployToBlockchain = (id: number) => {
    toast({
      title: "Deploying to Blockchain",
      description: `Smart Contract #${id} is being deployed to the blockchain`,
    });
  };

  const handleViewContract = (id: number) => {
    toast({
      title: "View Contract",
      description: `Viewing details for contract ID: ${id}`,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Smart Contracts</h1>
        <button 
          className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm"
          onClick={handleCreateContract}
        >
          <i className="fas fa-plus"></i>
          <span>Create Contract</span>
        </button>
      </div>

      {/* New Contract Form */}
      {showNewContractForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full m-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Create Smart Contract</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitContract} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Supply Agreement with..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="counterparty" className="block text-sm font-medium text-gray-700 mb-1">
                  Counterparty
                </label>
                <input
                  type="text"
                  id="counterparty"
                  name="counterparty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Company Name"
                  value={formData.counterparty}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <textarea
                  id="paymentTerms"
                  name="paymentTerms"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Net 30, automated payment on delivery..."
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="triggerConditions" className="block text-sm font-medium text-gray-700 mb-1">
                  Trigger Conditions
                </label>
                <textarea
                  id="triggerConditions"
                  name="triggerConditions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Payment triggered when..."
                  value={formData.triggerConditions}
                  onChange={handleInputChange}
                  required
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
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contracts List */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
            <p className="text-gray-600">Loading smart contracts...</p>
          </div>
        ) : displayContracts.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-file-contract text-gray-400 text-2xl mb-2"></i>
            <p className="text-gray-600">No smart contracts found</p>
            <button 
              className="mt-4 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleCreateContract}
            >
              Create Your First Contract
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counterparty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-file-contract text-indigo-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                          <div className="text-xs text-gray-500">#{contract.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.counterparty}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contract.paymentTerms}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        contract.status === 'active' ? 'bg-green-100 text-green-800' :
                        contract.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.status?.charAt(0).toUpperCase() + contract.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contract.blockchainDeployed ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <i className="fas fa-check-circle mr-1"></i> Deployed
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          <i className="fas fa-clock mr-1"></i> Not Deployed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-primary hover:text-primary-dark mr-3"
                        onClick={() => handleViewContract(contract.id!)}
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      {!contract.blockchainDeployed && (
                        <button 
                          className="text-primary hover:text-primary-dark"
                          onClick={() => handleDeployToBlockchain(contract.id!)}
                        >
                          <i className="fas fa-upload"></i> Deploy
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About Smart Contracts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">What are Smart Contracts?</h3>
            <p className="text-sm text-gray-600">
              Smart contracts are self-executing agreements with the terms directly written into code. 
              They automatically enforce and execute the terms when predefined conditions are met, 
              without the need for intermediaries.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Benefits for Supply Chain</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Automated payments when goods are received</li>
              <li>Transparent record of all transactions</li>
              <li>Reduced paperwork and administrative costs</li>
              <li>Faster settlement times</li>
              <li>Immutable records for audit purposes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
