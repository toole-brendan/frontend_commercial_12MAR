import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { smartContracts as mockSmartContracts } from '@/lib/mockData';
import { ActionButton } from '@/components/ui/action-button';
import PageWrapper from '@/components/layout/PageWrapper';

export default function SmartContracts() {
  const [showNewContractForm, setShowNewContractForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    counterparty: '',
    paymentTerms: '',
    triggerConditions: '',
    paymentMethod: 'usdc',
    amount: '',
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
      paymentMethod: 'usdc',
      amount: '',
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

  const actionButtons = (
    <ActionButton 
      variant="primary"
      onClick={handleCreateContract}
      icon={<i className="fas fa-plus"></i>}
    >
      Create Contract
    </ActionButton>
  );

  return (
    <PageWrapper
      title="Smart Contracts" 
      description="Automate payments and agreements with blockchain-based smart contracts"
      actions={actionButtons}
      className="space-y-6"
    >

      {/* New Contract Form */}
      {showNewContractForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full m-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Create Smart Contract</h3>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" onClick={handleCloseForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitContract} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contract Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Supply Agreement with..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="counterparty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Counterparty
                </label>
                <input
                  type="text"
                  id="counterparty"
                  name="counterparty"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Company Name"
                  value={formData.counterparty}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Terms
                </label>
                <textarea
                  id="paymentTerms"
                  name="paymentTerms"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Net 30, automated payment on delivery..."
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="triggerConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trigger Conditions
                </label>
                <textarea
                  id="triggerConditions"
                  name="triggerConditions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Payment triggered when..."
                  value={formData.triggerConditions}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md">
                    USD
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'usdc' ? 'bg-green-50 dark:bg-green-900/30 border-green-500' : 'border-gray-300 dark:border-gray-600'} rounded-md cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'usdc' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${formData.paymentMethod === 'usdc' ? 'bg-green-500' : 'border border-gray-400'}`}>
                        {formData.paymentMethod === 'usdc' && <i className="fas fa-check text-white text-xs"></i>}
                      </div>
                      <span className="text-sm">USDC</span>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'shells' ? 'bg-indigo-50 border-indigo-500' : 'border-gray-300'} rounded-md cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'shells' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${formData.paymentMethod === 'shells' ? 'bg-indigo-500' : 'border border-gray-400'}`}>
                        {formData.paymentMethod === 'shells' && <i className="fas fa-check text-white text-xs"></i>}
                      </div>
                      <span className="text-sm">Shells</span>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'traditional' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'traditional' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${formData.paymentMethod === 'traditional' ? 'bg-blue-500' : 'border border-gray-400'}`}>
                        {formData.paymentMethod === 'traditional' && <i className="fas fa-check text-white text-xs"></i>}
                      </div>
                      <span className="text-sm">Traditional</span>
                    </div>
                  </div>
                </div>
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
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
            <p className="text-gray-600 dark:text-gray-400">Loading smart contracts...</p>
          </div>
        ) : displayContracts.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-file-contract text-gray-400 dark:text-gray-500 text-2xl mb-2"></i>
            <p className="text-gray-600 dark:text-gray-400">No smart contracts found</p>
            <button 
              className="mt-4 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleCreateContract}
            >
              Create Your First Contract
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contract</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Counterparty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Terms</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                          <i className="fas fa-file-contract text-indigo-600 dark:text-indigo-400"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{contract.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">#{contract.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{contract.counterparty}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{contract.paymentTerms}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        contract.status === 'active' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                        contract.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {contract.status?.charAt(0).toUpperCase() + contract.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contract.blockchainDeployed ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
                          <i className="fas fa-check-circle mr-1"></i> Deployed
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          <i className="fas fa-clock mr-1"></i> Not Deployed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                        onClick={() => handleViewContract(contract.id!)}
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      {!contract.blockchainDeployed && (
                        <button 
                          className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300"
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

      {/* Payment Options Section */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Payment Options</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                <i className="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
              </div>
              <h3 className="font-medium dark:text-gray-100">USDC Stablecoin</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use USDC for immediate settlement with stable 1:1 USD value. Ideal for international transactions with no exchange rate volatility.
            </p>
            <span className="text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">Recommended</span>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-2 rounded-full mr-3">
                <i className="fas fa-coins text-indigo-600 dark:text-indigo-400"></i>
              </div>
              <h3 className="font-medium dark:text-gray-100">HandReceipt Shells (SHL)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use our native token for reduced fees within the HandReceipt ecosystem. Perfect for recurring business relationships.
            </p>
            <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-full">Platform Token</span>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                <i className="fas fa-university text-blue-600 dark:text-blue-400"></i>
              </div>
              <h3 className="font-medium dark:text-gray-100">Traditional Payments</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Connect with traditional banking systems for wire transfers and ACH payments when crypto settlement is not preferred.
            </p>
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">Legacy Option</span>
          </div>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">About Smart Contracts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">What are Smart Contracts?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Smart contracts are self-executing agreements with the terms directly written into code. 
              They automatically enforce and execute the terms when predefined conditions are met, 
              without the need for intermediaries.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-start">
                <div className="text-blue-500 dark:text-blue-400 mr-3">
                  <i className="fas fa-info-circle text-lg"></i>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  All HandReceipt smart contracts are deployed on secure blockchain infrastructure with SOC 2 compliance and enterprise-grade security.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Commercial Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2"><i className="fas fa-check-circle"></i></span>
                <span>Immediate payment settlement when goods are received and verified</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2"><i className="fas fa-check-circle"></i></span>
                <span>Create custom payment conditions (receipt of goods, sales levels, inventory thresholds)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2"><i className="fas fa-check-circle"></i></span>
                <span>Transparent, immutable transaction record for audit and compliance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2"><i className="fas fa-check-circle"></i></span>
                <span>Reduced administrative overhead and paperwork</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2"><i className="fas fa-check-circle"></i></span>
                <span>Integration with existing ERP and accounting systems</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
