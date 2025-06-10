import React from 'react';
import { User } from '@supabase/supabase-js';

interface DashboardProps {
  user: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // FIXED: Add proper click handlers for all buttons
  const handleCreateDocument = () => {
    console.log("[DEBUG] Create New Document clicked");
    alert("Create New Document feature coming soon!");
  };

  const handleManageSubscription = () => {
    console.log("[DEBUG] Manage Subscription clicked");
    alert("Manage Subscription feature coming soon!");
  };

  const handleGoToWritingTools = () => {
    console.log("[DEBUG] Go to Writing Tools clicked");
    alert("Writing Tools feature coming soon!");
  };

  // FIXED: Get payment plan from localStorage if not in user metadata
  const getPaymentPlan = () => {
    const userPlan = user?.user_metadata?.plan_type;
    const localPlan = localStorage.getItem('payment_plan');
    return userPlan || localPlan || 'Standard';
  };

  // FIXED: Get payment status from localStorage if not in user metadata
  const getPaymentStatus = () => {
    const userPaymentConfirmed = user?.user_metadata?.payment_confirmed;
    const localPaymentConfirmed = localStorage.getItem('payment_confirmed') === 'true';
    return userPaymentConfirmed || localPaymentConfirmed;
  };

  return (
    <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Your Dashboard
        </h1>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md mb-6">
          <p className="text-indigo-700 dark:text-indigo-300">
            Logged in as: <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recent Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't created any documents yet. Start writing to see them here.
            </p>
            {/* FIXED: Add proper click handler and ensure button is clickable */}
            <button 
              onClick={handleCreateDocument}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              type="button"
            >
              Create New Document
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Your Subscription
            </h2>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Status: <span className="font-medium text-green-600 dark:text-green-400">
                  {getPaymentStatus() ? 'Active' : 'Pending'}
                </span>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Plan: <span className="font-medium">{getPaymentPlan()}</span>
            </p>
            {/* FIXED: Add proper click handler and ensure button is clickable */}
            <button 
              onClick={handleManageSubscription}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              type="button"
            >
              Manage Subscription
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Writing Stats
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No writing activity yet. Start using the writing tools to see your stats.
            </p>
            {/* FIXED: Add proper click handler and ensure button is clickable */}
            <button 
              onClick={handleGoToWritingTools}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              type="button"
            >
              Go to Writing Tools
            </button>
          </div>
        </div>

        {/* FIXED: Add debug information for troubleshooting */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Debug Information
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p><strong>User Email:</strong> {user?.email || 'Not available'}</p>
            <p><strong>Payment Status (DB):</strong> {user?.user_metadata?.payment_confirmed ? 'Confirmed' : 'Not confirmed'}</p>
            <p><strong>Payment Status (Local):</strong> {localStorage.getItem('payment_confirmed') || 'Not set'}</p>
            <p><strong>Payment Plan (DB):</strong> {user?.user_metadata?.plan_type || 'Not set'}</p>
            <p><strong>Payment Plan (Local):</strong> {localStorage.getItem('payment_plan') || 'Not set'}</p>
            <p><strong>Payment Date (Local):</strong> {localStorage.getItem('payment_date') || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

