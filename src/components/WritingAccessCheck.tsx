import React, { useState, useEffect } from 'react';
import { hasCompletedPayment, hasTemporaryAccess } from '../lib/supabase';
import { Loader, AlertTriangle, Lock } from 'lucide-react';

interface WritingAccessCheckProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export function WritingAccessCheck({ children, onNavigate }: WritingAccessCheckProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempAccessExpiry, setTempAccessExpiry] = useState<Date | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      
      try {
        // First check for temporary access
        const tempAccess = await hasTemporaryAccess();
        
        if (tempAccess) {
          const expiryDate = new Date(localStorage.getItem('temp_access_until') || '');
          setTempAccessExpiry(expiryDate);
          setHasAccess(true);
          setIsLoading(false);
          return;
        }
        
        // Then check for permanent access
        const paymentCompleted = await hasCompletedPayment();
        setHasAccess(paymentCompleted);
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
  }, []);

  const formatTimeRemaining = () => {
    if (!tempAccessExpiry) return '';
    
    const now = new Date();
    const diff = tempAccessExpiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking access...</p>
        </div>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900 p-3">
              <Lock className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Feature
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This feature requires a subscription. Please upgrade your plan to access all writing features.
          </p>
          <button
            onClick={() => onNavigate('pricing')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            View Pricing Plans
          </button>
        </div>
      </div>
    );
  }

  if (tempAccessExpiry) {
    return (
      <div>
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Temporary Access
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  You have temporary access while your payment is being processed. {formatTimeRemaining()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}