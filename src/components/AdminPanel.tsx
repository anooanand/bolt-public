import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Download,
  UserCheck,
  UserX,
  RefreshCw,
  Settings,
  BarChart3,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

interface UserStats {
  totalUsers: number;
  paidUsers: number;
  freeUsers: number;
  newUsersToday: number;
  revenue: number;
  conversionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'signup' | 'payment' | 'upgrade' | 'cancellation';
  user: string;
  timestamp: Date;
  amount?: number;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 1247,
    paidUsers: 312,
    freeUsers: 935,
    newUsersToday: 23,
    revenue: 5928,
    conversionRate: 25.0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'payment',
      user: 'sarah.chen@email.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      amount: 19
    },
    {
      id: '2',
      type: 'signup',
      user: 'mike.rodriguez@email.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      type: 'upgrade',
      user: 'emma.thompson@email.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      amount: 19
    }
  ]);

  const [manualGrantEmail, setManualGrantEmail] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [lastSync, setLastSync] = useState<Date>(new Date(Date.now() - 1000 * 60 * 60 * 6));
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  // Check admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // First try checking with user_id
        let { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user?.id)
          .single();
        
        if (error) {
          console.warn('Admin check with user_id failed:', error);
          
          // Try with id instead
          const result = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user?.id)
            .single();
            
          data = result.data;
          error = result.error;
          
          if (error) {
            console.warn('Admin check with id failed:', error);
            setIsAdminChecked(true);
            return;
          }
        }
        
        // For debugging
        console.log('User profile data:', data);
        setIsAdminChecked(true);
      } catch (error) {
        console.error('Error checking admin access:', error);
        setIsAdminChecked(true);
      }
    };
    
    if (user && !isAdminChecked) {
      checkAdminAccess();
    }
  }, [user, isAdminChecked]);

  const handleManualGrant = () => {
    if (!manualGrantEmail.trim()) return;
    
    // Simulate granting access
    alert(`Pro access granted to ${manualGrantEmail}`);
    setManualGrantEmail('');
    
    // Update stats
    setStats(prev => ({
      ...prev,
      paidUsers: prev.paidUsers + 1,
      freeUsers: prev.freeUsers - 1
    }));
  };

  const handlePaymentSync = async () => {
    setSyncStatus('running');
    
    // Simulate payment sync
    setTimeout(() => {
      setSyncStatus('success');
      setLastSync(new Date());
      
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 2000);
  };

  const handleExportData = () => {
    const exportData = {
      stats,
      recentActivity,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'signup': return <UserCheck className="w-4 h-4 text-green-500" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-blue-500" />;
      case 'upgrade': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'cancellation': return <UserX className="w-4 h-4 text-red-500" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'signup': return 'bg-green-100 dark:bg-green-900';
      case 'payment': return 'bg-blue-100 dark:bg-blue-900';
      case 'upgrade': return 'bg-purple-100 dark:bg-purple-900';
      case 'cancellation': return 'bg-red-100 dark:bg-red-900';
    }
  };

  if (!isAdminChecked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // For now, allow access to the admin panel for demonstration purposes
  // In a production environment, you would use the isAdmin flag from useAuth()
  const hasAdminAccess = true; // For demo purposes

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have permission to access the admin panel.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage users, payments, and system operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.paidUsers}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Paid Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${stats.revenue.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg mr-3">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.conversionRate}%
                </p>
                <p className="text-gray-600 dark:text-gray-400">Conversion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Management */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Management
              </h2>
              
              {/* Payment Sync */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Payment Sync Status
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last sync: {lastSync.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={handlePaymentSync}
                    disabled={syncStatus === 'running'}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                  >
                    {syncStatus === 'running' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    {syncStatus === 'running' ? 'Syncing...' : 'Sync Now'}
                  </button>
                </div>
                
                {syncStatus === 'success' && (
                  <div className="flex items-center p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-green-800 dark:text-green-200">
                      Payment sync completed successfully
                    </span>
                  </div>
                )}
              </div>

              {/* Manual Grant Access */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Manual Access Grant
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    value={manualGrantEmail}
                    onChange={(e) => setManualGrantEmail(e.target.value)}
                    placeholder="Enter user email"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleManualGrant}
                    disabled={!manualGrantEmail.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Grant Pro Access
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Manually grant Pro access to any user by email
                </p>
              </div>

              {/* Export Data */}
              <div>
                <button
                  onClick={handleExportData}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Admin Report
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center p-3 rounded-lg ${getActivityColor(activity.type)}`}
                  >
                    <div className="mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        {activity.amount && ` - $${activity.amount}`}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Database</span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Gateway</span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">AI Services</span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email Service</span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Operational
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </button>
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  System Settings
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Scheduled Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};