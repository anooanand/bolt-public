import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface ManualVerificationToolProps {
  onClose: () => void;
}

export function ManualVerificationTool({ onClose }: ManualVerificationToolProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    if (!email) {
      setStatus('error');
      setMessage('Please enter an email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Call the RPC function to manually verify the user
      const { data, error } = await supabase.rpc('manually_verify_user', {
        p_email: email,
        p_admin_notes: 'Manual verification via admin tool'
      });

      if (error) {
        throw error;
      }

      if (data === true) {
        setStatus('success');
        setMessage(`User ${email} has been successfully verified and granted access.`);
      } else {
        setStatus('error');
        setMessage('Verification failed. Please check the email address and try again.');
      }
    } catch (error: any) {
      console.error('Error verifying user:', error);
      setStatus('error');
      setMessage(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Manual User Verification
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            User Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="user@example.com"
          />
        </div>

        {status === 'error' && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md flex items-start">
            <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={handleVerify}
            disabled={status === 'loading' || !email}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {status === 'loading' ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Verifying...
              </>
            ) : (
              'Verify User'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}