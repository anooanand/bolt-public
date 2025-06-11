import React, { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  isPaidUser: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Check if user has paid status (from localStorage or database)
  const isPaidUser = React.useMemo(() => {
    if (!user) return false;
    
    // Check localStorage first (for demo/testing)
    const paymentStatus = localStorage.getItem('payment_status');
    if (paymentStatus === 'paid') return true;
    
    // In production, check user metadata or database
    return user.user_metadata?.payment_status === 'paid' || false;
  }, [user]);

  // Check if user is admin
  const isAdmin = React.useMemo(() => {
    if (!user) return false;
    
    const adminEmails = [
      'admin@writingassistant.com',
      'admin@example.com',
      // Add your admin emails here
    ];
    
    return adminEmails.includes(user.email || '');
  }, [user]);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isPaidUser,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

