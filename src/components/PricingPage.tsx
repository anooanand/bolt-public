// FINAL FIX: Remove hasCompletedPayment import entirely
// Copy-paste this to replace the import section in PricingPage.tsx

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { isEmailVerified, supabase } from '../lib/supabase';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ADD this function inside the PricingPage component (after the useState declarations):
const checkPaymentStatus = async (userId: string): Promise<boolean> => {
  try {
    // Check for temporary access first
    const tempAccess = localStorage.getItem('temp_access_granted');
    const tempUntil = localStorage.getItem('temp_access_until');
    
    if (tempAccess === 'true' && tempUntil) {
      const tempDate = new Date(tempUntil);
      if (tempDate > new Date()) {
        return true; // Has valid temporary access
      }
    }
    
    // Check database for payment verification
    const { data } = await supabase
      .from('user_profiles')
      .select('payment_verified, subscription_status')
      .eq('user_id', userId)
      .single();
    
    return data?.payment_verified === true || data?.subscription_status === 'active';
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
};

