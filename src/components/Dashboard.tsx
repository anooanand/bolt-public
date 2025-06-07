import React from 'react';
import { User } from '@supabase/supabase-js';

interface DashboardProps {
  user: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
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
            <p className="text-gray-600 dark:text-gray-300">
              You haven't created any documents yet. Start writing to see them here.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
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
                Status: <span className="font-medium text-green-600 dark:text-green-400">Active</span>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Plan: <span className="font-medium">{user?.user_metadata?.plan_type || 'Standard'}</span>
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Manage Subscription
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Writing Stats
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No writing activity yet. Start using the writing tools to see your stats.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Go to Writing Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

