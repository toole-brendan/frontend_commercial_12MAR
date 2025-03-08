import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { smartContracts as mockSmartContracts } from '@/lib/mockData';
import PageWrapper from '@/components/layout/PageWrapper';
import { Plus, X, Check, Clock, Eye, Upload, DollarSign, Coins, Building, FileText, Info, CheckCircle } from 'lucide-react';

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
    <button 
      className="btn-8vc-primary flex items-center space-x-2 py-1.5 px-3 text-sm"
      onClick={handleCreateContract}
    >
      <Plus className="h-4 w-4 mr-1" />
      <span>Create Contract</span>
    </button>
  );

  return (
    <PageWrapper
      className="space-y-4 pt-4"
      actions={actionButtons}
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Blockchain</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Smart Contract Management</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Automate payments and agreements with blockchain-based smart contracts</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      {/* New Contract Form - 8VC Style */}
      {showNewContractForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-lg max-w-md w-full m-4">
            <div className="p-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <div>
                <div className="category-tag mb-1.5">New Contract</div>
                <h3 className="heading-medium text-gray-900 dark:text-white">Create Smart Contract</h3>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" onClick={handleCloseForm}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitContract} className="p-5 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Contract Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                  placeholder="Supply Agreement with..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="counterparty" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Counterparty
                </label>
                <input
                  type="text"
                  id="counterparty"
                  name="counterparty"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                  placeholder="Company Name"
                  value={formData.counterparty}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="paymentTerms" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Payment Terms
                </label>
                <textarea
                  id="paymentTerms"
                  name="paymentTerms"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                  placeholder="Net 30, automated payment on delivery..."
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="triggerConditions" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Trigger Conditions
                </label>
                <textarea
                  id="triggerConditions"
                  name="triggerConditions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                  placeholder="Payment triggered when..."
                  value={formData.triggerConditions}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Amount
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-white/10">
                    USD
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'usdc' ? 'border-green-500 dark:border-green-400' : 'border-gray-300 dark:border-white/10'} cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'usdc' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 flex items-center justify-center ${formData.paymentMethod === 'usdc' ? 'text-green-500 dark:text-green-400' : 'text-gray-400'}`}>
                        {formData.paymentMethod === 'usdc' && <Check className="h-3 w-3" />}
                      </div>
                      <span className="text-sm">USDC</span>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'shells' ? 'border-purple-500 dark:border-purple-400' : 'border-gray-300 dark:border-white/10'} cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'shells' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 flex items-center justify-center ${formData.paymentMethod === 'shells' ? 'text-purple-500 dark:text-purple-400' : 'text-gray-400'}`}>
                        {formData.paymentMethod === 'shells' && <Check className="h-3 w-3" />}
                      </div>
                      <span className="text-sm">Shells</span>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center justify-center px-3 py-2 border ${formData.paymentMethod === 'traditional' ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-white/10'} cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'traditional' }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 mr-2 flex items-center justify-center ${formData.paymentMethod === 'traditional' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400'}`}>
                        {formData.paymentMethod === 'traditional' && <Check className="h-3 w-3" />}
                      </div>
                      <span className="text-sm">Traditional</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-white/10 mt-6">
                <button
                  type="button"
                  className="btn-8vc py-1.5 px-3 text-sm"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-8vc-primary py-1.5 px-3 text-sm"
                >
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8VC Style Contracts List */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
        <div className="category-tag mb-1.5">Contracts</div>
        <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Active smart contracts</h3>
        
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-600 border-r-transparent dark:border-purple-400 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading smart contracts...</p>
          </div>
        ) : displayContracts.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-1">No smart contracts found</p>
            <button 
              className="mt-4 btn-8vc-primary py-1.5 px-3 text-sm inline-flex items-center"
              onClick={handleCreateContract}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Your First Contract
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr className="border-b border-gray-300 dark:border-white/10">
                  <th scope="col" className="py-2 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contract</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Counterparty</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Terms</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="py-2 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Blockchain</th>
                  <th scope="col" className="py-2 pl-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {displayContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150">
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20">
                          <FileText size={18} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-normal text-gray-900 dark:text-white">{contract.name}</div>
                          <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">#{contract.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap text-sm font-light text-gray-500 dark:text-gray-400">{contract.counterparty}</td>
                    <td className="py-2.5 px-4 text-sm font-light text-gray-500 dark:text-gray-400 max-w-xs truncate">{contract.paymentTerms}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border ${
                        contract.status === 'active' ? 'border-green-500/30 text-green-600 dark:text-green-400' :
                        contract.status === 'draft' ? 'border-yellow-500/30 text-yellow-600 dark:text-yellow-400' :
                        'border-gray-500/30 text-gray-600 dark:text-gray-400'
                      }`}>
                        {contract.status?.charAt(0).toUpperCase() + contract.status?.slice(1)}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      {contract.blockchainDeployed ? (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1.5" /> Deployed
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-gray-500/30 text-gray-600 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1.5" /> Not Deployed
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pl-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button 
                          className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                          onClick={() => handleViewContract(contract.id!)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {!contract.blockchainDeployed && (
                          <button 
                            className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                            onClick={() => handleDeployToBlockchain(contract.id!)}
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 8VC Style Section Header */}
      <div className="mt-8 mb-4">
        <div className="category-tag mb-1.5">Payment Options</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Contract Payment Methods</h2>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      {/* Payment Options Section */}
      <div className="grid md:grid-cols-3 gap-3 mt-2">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 dark:bg-green-500/20">
              <DollarSign size={18} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-normal text-gray-900 dark:text-white">USDC Stablecoin</div>
              <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">1:1 USD Backed</div>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-3">
            Use USDC for immediate settlement with stable 1:1 USD value. Ideal for international transactions with no exchange rate volatility.
          </p>
          <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-green-500/30 text-green-600 dark:text-green-400">
            Recommended
          </span>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 dark:bg-purple-500/20">
              <Coins size={18} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-normal text-gray-900 dark:text-white">HandReceipt Shells (SHL)</div>
              <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">Platform Token</div>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-3">
            Use our native token for reduced fees within the HandReceipt ecosystem. Perfect for recurring business relationships.
          </p>
          <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-purple-500/30 text-purple-600 dark:text-purple-400">
            Platform Token
          </span>
        </div>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/20">
              <Building size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-normal text-gray-900 dark:text-white">Traditional Payments</div>
              <div className="text-xs font-light text-gray-500 dark:text-gray-400 font-mono">Wire / ACH</div>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-3">
            Connect with traditional banking systems for wire transfers and ACH payments when crypto settlement is not preferred.
          </p>
          <span className="px-2.5 py-0.5 inline-flex text-xs uppercase tracking-wider font-medium border border-blue-500/30 text-blue-600 dark:text-blue-400">
            Legacy Option
          </span>
        </div>
      </div>
      
      {/* 8VC Style Section Header */}
      <div className="mt-8 mb-4">
        <div className="category-tag mb-1.5">Information</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">About Smart Contracts</h2>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>
      
      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="category-tag mb-1.5">Overview</div>
          <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">What are Smart Contracts?</h3>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-3">
            Smart contracts are self-executing agreements with the terms directly written into code. 
            They automatically enforce and execute the terms when predefined conditions are met, 
            without the need for intermediaries.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-3 border border-blue-100 dark:border-blue-900/20">
            <div className="flex items-start">
              <div className="text-blue-500 dark:text-blue-400 mr-3">
                <Info className="h-4 w-4" />
              </div>
              <p className="text-xs font-light text-blue-600 dark:text-blue-400">
                All HandReceipt smart contracts are deployed on secure blockchain infrastructure with SOC 2 compliance and enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-5">
          <div className="category-tag mb-1.5">Benefits</div>
          <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">Commercial Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Immediate payment settlement when goods are received and verified</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Create custom payment conditions (receipt of goods, sales levels, inventory thresholds)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Transparent, immutable transaction record for audit and compliance</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Reduced administrative overhead and paperwork</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Integration with existing ERP and accounting systems</span>
            </li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
}
