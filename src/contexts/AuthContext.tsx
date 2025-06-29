// Example snippet (verify against your actual AuthContext.tsx)
// project-bolt-new-2/project/src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ... (other imports and interfaces)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const checkUserAndStatus = useCallback(async () => {
    setLoading(true);
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    setUser(supabaseUser);

    if (supabaseUser) {
      // Check email verification status
      setEmailVerified(!!supabaseUser.email_confirmed_at);

      // Check payment status (example - adapt to your actual payment logic)
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('payment_completed')
        .eq('user_id', supabaseUser.id)
        .single();

      if (profile && profile.payment_completed) {
        setPaymentCompleted(true);
      } else {
        setPaymentCompleted(false);
      }
    } else {
      setEmailVerified(false);
      setPaymentCompleted(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUserAndStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change:', _event);
      // Re-check user and status on auth state changes
      checkUserAndStatus();
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [checkUserAndStatus]);

  const forceRefreshVerification = useCallback(() => {
    console.log('Force refreshing verification status...');
    checkUserAndStatus();
  }, [checkUserAndStatus]);

  // ... (rest of your AuthContext)

  return (
    <AuthContext.Provider value={{
      user, loading, emailVerified, paymentCompleted,
      authSignIn: async (email, password) => { /* ... */ },
      authSignUp: async (email, password) => { /* ... */ },
      authSignOut: async () => { /* ... */ },
      forceRefreshVerification // Make this available
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};