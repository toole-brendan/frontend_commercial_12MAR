import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [generalForm, setGeneralForm] = useState({
    companyName: 'Your Company, Inc.',
    email: 'admin@yourcompany.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, City, State 12345',
    timezone: 'America/New_York',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    transferAlerts: true,
    paymentReceipts: true,
    inventoryAlerts: true,
    systemUpdates: false,
  });

  const [blockchainSettings, setBlockchainSettings] = useState({
    networkProvider: 'mainnet',
    transactionVisibility: 'business',
    autoVerification: true,
    defaultGas: 'medium',
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Updated",
      description: "Your general settings have been updated successfully.",
      variant: "default"
    });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved.",
      variant: "default"
    });
  };

  const handleBlockchainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Blockchain Settings Updated",
      description: "Your blockchain configuration has been updated.",
      variant: "default"
    });
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleBlockchainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlockchainSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageContainer title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              <a href="#general" className="flex items-center px-6 py-4 border-l-4 border-primary bg-blue-50 text-primary">
                <span className="material-icons mr-3">settings</span>
                <span>General Settings</span>
              </a>
              <a href="#notifications" className="flex items-center px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 text-gray-700">
                <span className="material-icons mr-3">notifications</span>
                <span>Notifications</span>
              </a>
              <a href="#blockchain" className="flex items-center px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 text-gray-700">
                <span className="material-icons mr-3">security</span>
                <span>Blockchain</span>
              </a>
              <a href="#team" className="flex items-center px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 text-gray-700">
                <span className="material-icons mr-3">people</span>
                <span>Team Management</span>
              </a>
              <a href="#billing" className="flex items-center px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 text-gray-700">
                <span className="material-icons mr-3">credit_card</span>
                <span>Billing & Plan</span>
              </a>
              <a href="#advanced" className="flex items-center px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 text-gray-700">
                <span className="material-icons mr-3">tune</span>
                <span>Advanced</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Right Content Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div id="general" className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">General Settings</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleGeneralSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      name="companyName" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={generalForm.companyName}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={generalForm.email}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={generalForm.phone}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                    <textarea 
                      name="address" 
                      rows={3} 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={generalForm.address}
                      onChange={handleGeneralChange}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select 
                      name="timezone" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={generalForm.timezone}
                      onChange={handleGeneralChange}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Notification Settings */}
          <div id="notifications" className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Notification Preferences</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                      <p className="text-xs text-gray-500">Receive system notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="emailNotifications" 
                        className="sr-only peer" 
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Transfer Alerts</h3>
                      <p className="text-xs text-gray-500">Notified when inventory transfers are initiated or completed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="transferAlerts" 
                        className="sr-only peer" 
                        checked={notificationSettings.transferAlerts}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Payment Receipts</h3>
                      <p className="text-xs text-gray-500">Notified about payment transactions and confirmations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="paymentReceipts" 
                        className="sr-only peer" 
                        checked={notificationSettings.paymentReceipts}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Inventory Alerts</h3>
                      <p className="text-xs text-gray-500">Notified when inventory levels fall below thresholds</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="inventoryAlerts" 
                        className="sr-only peer" 
                        checked={notificationSettings.inventoryAlerts}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">System Updates</h3>
                      <p className="text-xs text-gray-500">Receive updates about new features and improvements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="systemUpdates" 
                        className="sr-only peer" 
                        checked={notificationSettings.systemUpdates}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Blockchain Settings */}
          <div id="blockchain" className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Blockchain Configuration</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleBlockchainSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
                    <select 
                      name="networkProvider" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={blockchainSettings.networkProvider}
                      onChange={handleBlockchainChange}
                    >
                      <option value="mainnet">Mainnet (Production)</option>
                      <option value="testnet">Testnet (Testing)</option>
                      <option value="private">Private Network</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Visibility</label>
                    <select 
                      name="transactionVisibility" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={blockchainSettings.transactionVisibility}
                      onChange={handleBlockchainChange}
                    >
                      <option value="business">Business Only (Private)</option>
                      <option value="partners">Business & Partners</option>
                      <option value="public">Public (Transparent)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Automatic Verification</h3>
                      <p className="text-xs text-gray-500">Automatically verify transactions on the blockchain</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="autoVerification" 
                        className="sr-only peer" 
                        checked={blockchainSettings.autoVerification}
                        onChange={(e) => setBlockchainSettings(prev => ({
                          ...prev,
                          autoVerification: e.target.checked
                        }))}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Gas Price</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="gas-low" 
                          name="defaultGas" 
                          value="low" 
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          checked={blockchainSettings.defaultGas === 'low'}
                          onChange={handleBlockchainChange}
                        />
                        <label htmlFor="gas-low" className="ml-2 block text-sm text-gray-700">Low (Slower)</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="gas-medium" 
                          name="defaultGas" 
                          value="medium" 
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          checked={blockchainSettings.defaultGas === 'medium'}
                          onChange={handleBlockchainChange}
                        />
                        <label htmlFor="gas-medium" className="ml-2 block text-sm text-gray-700">Medium</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="gas-high" 
                          name="defaultGas" 
                          value="high" 
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          checked={blockchainSettings.defaultGas === 'high'}
                          onChange={handleBlockchainChange}
                        />
                        <label htmlFor="gas-high" className="ml-2 block text-sm text-gray-700">High (Faster)</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                      Save Configuration
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* API Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">API Access</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">API Key</h3>
                  <button className="text-primary text-sm hover:underline">Generate New Key</button>
                </div>
                <div className="mt-2 flex items-center">
                  <input 
                    type="password" 
                    value="••••••••••••••••••••••••••••••" 
                    className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    readOnly
                  />
                  <button className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg px-3 py-2 text-gray-700">
                    <span className="material-icons text-sm">visibility</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Last used: 2 hours ago • Created: June 15, 2023
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Webhook URL</h3>
                  <button className="text-primary text-sm hover:underline">Edit URL</button>
                </div>
                <div className="mt-2">
                  <input 
                    type="text" 
                    value="https://your-server.com/api/handreceipt/webhook" 
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    readOnly
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Status: Active • Last triggered: 45 minutes ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
