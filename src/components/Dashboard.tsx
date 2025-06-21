// COMPLETE FILE: src/components/Dashboard.tsx
// Copy-paste this entire file into bolt.new (REPLACE existing)

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isEmailVerified, hasAnyAccess } from '../lib/supabase';
import { Mail, CheckCircle, Clock, FileText, PenTool, BarChart3, Settings } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [accessType, setAccessType] = useState<'none' | 'temporary' | 'permanent'>('none');
  const [tempAccessUntil, setTempAccessUntil] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (user) {
        console.log('🔍 Dashboard: Checking verification status...');
        setIsLoading(true);
        
        try {
          // Check for temporary access first
          const tempAccess = localStorage.getItem('temp_access_granted');
          const tempUntil = localStorage.getItem('temp_access_until');
          
          if (tempAccess === 'true' && tempUntil) {
            const tempDate = new Date(tempUntil);
            if (tempDate > new Date()) {
              setIsVerified(true);
              setAccessType('temporary');
              setTempAccessUntil(tempUntil);
              console.log('✅ Dashboard: Temporary access valid until:', tempDate);
              setIsLoading(false);
              return;
            } else {
              // Clean up expired temporary access
              localStorage.removeItem('temp_access_granted');
              localStorage.removeItem('temp_access_until');
              localStorage.removeItem('temp_access_plan');
            }
          }
          
          // Check for any access (temporary or permanent)
          const hasAccess = await hasAnyAccess(user.id);
          if (hasAccess) {
            setIsVerified(true);
            setAccessType('permanent');
            console.log('✅ Dashboard: Permanent access confirmed');
          } else {
            // Check basic email verification
            const verified = await isEmailVerified(user.id);
            setIsVerified(verified);
            setAccessType(verified ? 'permanent' : 'none');
            console.log('📊 Dashboard: Basic verification result:', verified);
          }
        } catch (error) {
          console.error('❌ Error checking verification status:', error);
          setIsVerified(false);
          setAccessType('none');
        }
        
        setIsLoading(false);
      }
    };

    checkVerificationStatus();
  }, [user]);

  const handleManualRefresh = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const hasAccess = await hasAnyAccess(user.id);
        const verified = await isEmailVerified(user.id);
        
        if (hasAccess) {
          setIsVerified(true);
          setAccessType('permanent');
        } else if (verified) {
          setIsVerified(true);
          setAccessType('permanent');
        } else {
          setIsVerified(false);
          setAccessType('none');
        }
      } catch (error) {
        console.error('❌ Error refreshing status:', error);
      }
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">Ready to continue your writing journey?</p>
        </div>

        {/* Verification Status */}
        {isLoading ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Checking access status...</h3>
                <p className="text-gray-600 mt-1">Please wait while we verify your account.</p>
              </div>
            </div>
          </div>
        ) : !isVerified ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-blue-900">Verify Your Email Address</h3>
                <p className="text-blue-700 mt-1">
                  We've sent a verification email to {user?.email}. Please check your inbox and click the verification link to activate your account.
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  After verifying your email, you'll need to complete payment to access all premium features.
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button 
                onClick={handleManualRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                I've Verified My Email
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Resend Verification Email
              </button>
            </div>
          </div>
        ) : accessType === 'temporary' ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-yellow-900">24-Hour Temporary Access Granted!</h3>
                <p className="text-yellow-700 mt-1">
                  Your payment is being processed. You have full access until {formatDateTime(tempAccessUntil!)} while we confirm your payment.
                </p>
                <p className="text-sm text-yellow-600 mt-2">
                  <strong>{getTimeRemaining(tempAccessUntil!)}</strong> - Your access will automatically become permanent once payment is confirmed.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={handleManualRefresh}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Check Payment Status
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-green-900">All Set! Welcome to Premium</h3>
                <p className="text-green-700 mt-1">
                  Great! Your email is verified and payment is confirmed. You have full access to all premium features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Documents</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <PenTool className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Words Written</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Time Spent</p>
                <p className="text-2xl font-bold text-gray-900">2h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => onNavigate('writing')}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <PenTool className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Start Writing</h3>
                    <p className="text-gray-600">Create a new document with AI assistance</p>
                  </div>
                </div>
                {!isVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-sm text-yellow-800">Payment required</p>
                  </div>
                )}
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Practice Exam</h3>
                    <p className="text-gray-600">Take a NSW Selective practice test</p>
                  </div>
                </div>
                {!isVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-sm text-yellow-800">Payment required</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity yet. Start writing to see your progress here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

