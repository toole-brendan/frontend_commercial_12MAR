import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/mockData';
import { PageHeader } from '@/components/ui/page-header';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: 'michael.chen@company.com',
    role: currentUser.role,
    department: 'Supply Chain Management',
    phone: '+1 (555) 123-4567',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    transferRequests: true,
    inventoryAlerts: true,
    paymentConfirmations: true,
    systemUpdates: false,
  });
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [integrationKeys, setIntegrationKeys] = useState({
    apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
    webhookUrl: 'https://api.yourcompany.com/handreceipt/webhook',
  });
  const { toast } = useToast();

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
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

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIntegrationKeys(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully"
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved"
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully"
    });
    
    // Reset form
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleSaveIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Integration Settings Saved",
      description: "Your API keys and webhook settings have been updated"
    });
  };

  const generateNewApiKey = () => {
    const newKey = 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setIntegrationKeys(prev => ({
      ...prev,
      apiKey: newKey
    }));
    
    toast({
      title: "New API Key Generated",
      description: "Your new API key has been generated. Be sure to save it!"
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account preferences and application settings"
      />

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow">
        <div className="sm:hidden p-4">
          <select
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="profile">Profile</option>
            <option value="notifications">Notifications</option>
            <option value="security">Security</option>
            <option value="integrations">Integrations</option>
          </select>
        </div>

        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'profile' 
                  ? 'border-primary text-primary dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'notifications' 
                  ? 'border-primary text-primary dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'security' 
                  ? 'border-primary text-primary dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'integrations' 
                  ? 'border-primary text-primary dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('integrations')}
            >
              Integrations
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div 
                        className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-medium"
                      >
                        {currentUser.profileImage}
                      </div>
                      <button 
                        type="button"
                        className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-600"
                        onClick={() => toast({
                          title: "Photo Upload",
                          description: "This would open a file picker dialog"
                        })}
                      >
                        <i className="fas fa-camera text-gray-600 dark:text-gray-300"></i>
                      </button>
                    </div>
                    <button 
                      type="button"
                      className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={profileForm.role}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={profileForm.department}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveNotifications} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Notifications</h3>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable or disable all email notifications. Individual settings below will be ignored if email notifications are turned off.</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notification Types</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Transfer Requests</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when you receive a new transfer request</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="transferRequests"
                      checked={notificationSettings.transferRequests}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Inventory Alerts</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when inventory items are running low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="inventoryAlerts"
                      checked={notificationSettings.inventoryAlerts}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Confirmations</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when payments are sent or received</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="paymentConfirmations"
                      checked={notificationSettings.paymentConfirmations}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">System Updates</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about HandReceipt platform updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <form onSubmit={handleSaveSecurity} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={securityForm.currentPassword}
                    onChange={handleSecurityChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={securityForm.newPassword}
                    onChange={handleSecurityChange}
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Password must be at least a 8 characters long and include upper and lowercase letters, numbers, and symbols.</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityChange}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Two-Factor Authentication</h3>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-shield-alt text-yellow-600 dark:text-yellow-400"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Not enabled</h3>
                      <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                        <p>Two-factor authentication adds an extra layer of security to your account.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => toast({
                    title: "2FA Setup",
                    description: "This would start the two-factor authentication setup process"
                  })}
                >
                  Enable Two-Factor Authentication
                </button>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}

          {/* Integration Settings */}
          {activeTab === 'integrations' && (
            <form onSubmit={handleSaveIntegration} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">API Access</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Connect your existing systems with HandReceipt using our API</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    API Key
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="apiKey"
                      name="apiKey"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      value={integrationKeys.apiKey}
                      onChange={handleIntegrationChange}
                      readOnly
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-md bg-gray-50 dark:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                      onClick={() => {
                        navigator.clipboard.writeText(integrationKeys.apiKey);
                        toast({
                          title: "Copied!",
                          description: "API key copied to clipboard"
                        });
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                      onClick={generateNewApiKey}
                    >
                      Generate New Key
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    id="webhookUrl"
                    name="webhookUrl"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    value={integrationKeys.webhookUrl}
                    onChange={handleIntegrationChange}
                    placeholder="https://your-company.com/api/webhook"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter the URL where HandReceipt should send event notifications</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Available Integrations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-primary dark:hover:border-primary-dark hover:shadow-sm cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">ERP Systems</h4>
                      <i className="fas fa-plug text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect with your existing ERP systems like SAP, Oracle, or NetSuite</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-primary dark:hover:border-primary-dark hover:shadow-sm cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Warehouse Management</h4>
                      <i className="fas fa-warehouse text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Integrate with WMS systems to sync inventory levels automatically</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-primary dark:hover:border-primary-dark hover:shadow-sm cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Payment Gateways</h4>
                      <i className="fas fa-credit-card text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect with payment processors for fiat currency transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  Save Integration Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
