import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/mockData';
import { PageHeader } from '@/components/ui/page-header';
import PageWrapper from '@/components/layout/PageWrapper';
import { usePageLayout } from '@/hooks/use-page-layout';
import { cn } from '@/lib/utils';
import { Camera, Building2, DollarSign, KeyRound, BellRing, ShieldCheck, Workflow, User, Key } from 'lucide-react';

export default function Settings() {
  const { layoutClasses } = usePageLayout({
    containerClasses: 'space-y-6'
  });
  
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
    <PageWrapper
      className="space-y-6"
    >
      {/* 8VC Style Section Header */}
      <div className="mb-4">
        <div className="category-tag mb-1.5">Settings</div>
        <h2 className="heading-large mb-2 text-gray-900 dark:text-white">Account Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Manage your account preferences and application settings</p>
        <div className="horizontal-divider border-gray-200 dark:border-white/10"></div>
      </div>

      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="sm:hidden p-4 border-b border-gray-200 dark:border-white/10">
          <select
            className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="profile">Profile</option>
            <option value="notifications">Notifications</option>
            <option value="security">Security</option>
            <option value="integrations">Integrations</option>
          </select>
        </div>

        <div className="hidden sm:block border-b border-gray-200 dark:border-white/10">
          <nav className="flex -mb-px overflow-x-auto" aria-label="Settings tabs">
            <button 
              className={cn(
                "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm uppercase tracking-wider transition-colors",
                activeTab === 'profile' 
                  ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              )}
              onClick={() => setActiveTab('profile')}
              aria-current={activeTab === 'profile' ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Profile</span>
              </div>
            </button>
            <button 
              className={cn(
                "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm uppercase tracking-wider transition-colors",
                activeTab === 'notifications' 
                  ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              )}
              onClick={() => setActiveTab('notifications')}
              aria-current={activeTab === 'notifications' ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <BellRing size={16} />
                <span>Notifications</span>
              </div>
            </button>
            <button 
              className={cn(
                "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm uppercase tracking-wider transition-colors",
                activeTab === 'security' 
                  ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              )}
              onClick={() => setActiveTab('security')}
              aria-current={activeTab === 'security' ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Security</span>
              </div>
            </button>
            <button 
              className={cn(
                "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm uppercase tracking-wider transition-colors",
                activeTab === 'integrations' 
                  ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              )}
              onClick={() => setActiveTab('integrations')}
              aria-current={activeTab === 'integrations' ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <Workflow size={16} />
                <span>Integrations</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-8">
              <div className="mb-4">
                <div className="category-tag mb-1.5">Account Information</div>
                <h3 className="heading-medium mb-3 text-gray-900 dark:text-white">User Profile</h3>
              </div>
              
              <div className="split-layout">
                <div className="split-layout-left flex flex-col items-center space-y-6 md:border-r border-gray-200 dark:border-white/10">
                  <div className="relative">
                    <div 
                      className="w-32 h-32 rounded-full bg-purple-600 dark:bg-purple-800 flex items-center justify-center text-white text-4xl font-light tracking-wide"
                    >
                      {currentUser.profileImage}
                    </div>
                    <button 
                      type="button"
                      className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md border border-gray-200 dark:border-white/10"
                      onClick={() => toast({
                        title: "Photo Upload",
                        description: "This would open a file picker dialog"
                      })}
                    >
                      <Camera size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <button 
                    type="button"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm uppercase tracking-wider font-medium transition-colors"
                  >
                    Change Photo
                  </button>
                </div>
                <div className="split-layout-right">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={profileForm.role}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={profileForm.department}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-divider"></div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-8vc-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveNotifications} className="space-y-8">
              <div className="border-b border-border pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="heading-medium text-purple-600 dark:text-purple-400">Email Notifications</h3>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 dark:peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-400"></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable or disable all email notifications. Individual settings below will be ignored if email notifications are turned off.</p>
              </div>
              
              <div className="space-y-6">
                <h3 className="category-tag">Notification Types</h3>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
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
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 dark:peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-400"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Inventory Alerts</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive alerts when inventory items are running low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="inventoryAlerts"
                      checked={notificationSettings.inventoryAlerts}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 dark:peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-400"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Confirmations</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when payments are processed or received</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="paymentConfirmations"
                      checked={notificationSettings.paymentConfirmations}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 dark:peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-400"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">System Updates</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications about system updates and maintenance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      name="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 dark:peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-400"></div>
                  </label>
                </div>
              </div>
              
              <div className="horizontal-divider"></div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="btn-8vc-primary"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <form onSubmit={handleSaveSecurity} className="space-y-8">
              <div>
                <h3 className="heading-medium text-purple-600 dark:text-purple-400 mb-6">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                      value={securityForm.currentPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                      value={securityForm.newPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                      value={securityForm.confirmPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="horizontal-divider"></div>
              
              <div>
                <h3 className="heading-medium text-purple-600 dark:text-purple-400 mb-6">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.</p>
                  </div>
                  <button
                    type="button"
                    className="btn-8vc"
                    onClick={() => toast({
                      title: "Setup 2FA",
                      description: "This would initiate the 2FA setup process"
                    })}
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
              
              <div className="horizontal-divider"></div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="btn-8vc-primary"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}

          {/* Integration Settings */}
          {activeTab === 'integrations' && (
            <form onSubmit={handleSaveIntegration} className="space-y-8">
              <div>
                <h3 className="heading-medium text-purple-600 dark:text-purple-400 mb-6">API Keys</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                      API Key
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        id="apiKey"
                        name="apiKey"
                        className="flex-grow px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                        value={integrationKeys.apiKey}
                        onChange={handleIntegrationChange}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn-8vc"
                        onClick={generateNewApiKey}
                      >
                        <div className="flex items-center gap-2">
                          <Key size={16} />
                          <span>Generate New</span>
                        </div>
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your API key provides full access to your account. Keep it secure and never share it publicly.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="webhookUrl" className="block text-sm uppercase tracking-wider font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Webhook URL
                    </label>
                    <input
                      type="text"
                      id="webhookUrl"
                      name="webhookUrl"
                      className="w-full px-3 py-2 border border-border bg-input-background dark:bg-input-background text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                      value={integrationKeys.webhookUrl}
                      onChange={handleIntegrationChange}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      We'll send event notifications to this URL.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="horizontal-divider"></div>
              
              <div>
                <h3 className="heading-medium text-purple-600 dark:text-purple-400 mb-6">Connected Services</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Connect your account with these third-party services to enable additional features.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Building2 size={20} className="text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">ERP System</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-8vc"
                      onClick={() => toast({
                        title: "Connect ERP",
                        description: "This would initiate the ERP connection process"
                      })}
                    >
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <DollarSign size={20} className="text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Gateway</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Connected</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-8vc"
                      onClick={() => toast({
                        title: "Payment Gateway",
                        description: "This would open the payment gateway settings"
                      })}
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="horizontal-divider"></div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="btn-8vc-primary"
                >
                  Save Integration Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}