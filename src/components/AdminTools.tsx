import React, { useState } from 'react';
import { ManualVerificationTool } from './ManualVerificationTool';
import { Shield, Users, Key, Database } from 'lucide-react';

interface AdminToolsProps {
  onClose: () => void;
}

export function AdminTools({ onClose }: AdminToolsProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'verification' | 'payments' | 'system'>('verification');
  const [showVerificationTool, setShowVerificationTool] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-500" />
            Admin Tools
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="inline-block h-4 w-4 mr-1" />
            Users
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'verification'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('verification')}
          >
            <Key className="inline-block h-4 w-4 mr-1" />
            Verification
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'payments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('payments')}
          >
            <svg className="inline-block h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Payments
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'system'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('system')}
          >
            <Database className="inline-block h-4 w-4 mr-1" />
            System
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'verification' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Verification Tools</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Manual Email Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Manually verify a user's email address and grant them access to the platform.
                  </p>
                  <button
                    onClick={() => setShowVerificationTool(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Open Verification Tool
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Resend Verification Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Resend verification email to users who haven't verified their email address.
                  </p>
                  <button
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Resend Verification Email
                  </button>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Note</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Manual verification should only be used in exceptional cases when the normal verification process fails.
                  Always verify the user's identity before manually verifying their account.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                User management tools will be available here.
              </p>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Payment management tools will be available here.
              </p>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                System management tools will be available here.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {showVerificationTool && (
        <ManualVerificationTool onClose={() => setShowVerificationTool(false)} />
      )}
    </div>
  );
}