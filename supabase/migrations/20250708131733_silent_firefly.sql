/*
  # Add Stripe Enum Types If Not Exist

  1. New Types
    - Conditionally creates `stripe_subscription_status` enum if it doesn't exist
    - Conditionally creates `stripe_order_status` enum if it doesn't exist
  
  2. Changes
    - Uses DO blocks with IF NOT EXISTS checks to prevent errors when types already exist
*/

-- Create enum type for Stripe subscription statuses if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stripe_subscription_status') THEN
    CREATE TYPE public.stripe_subscription_status AS ENUM (
      'not_started',
      'incomplete',
      'incomplete_expired',
      'trialing',
      'active',
      'past_due',
      'canceled',
      'unpaid',
      'paused'
    );
  END IF;
END$$;

-- Create enum type for Stripe order statuses if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stripe_order_status') THEN
    CREATE TYPE public.stripe_order_status AS ENUM (
      'pending',
      'completed',
      'canceled'
    );
  END IF;
END$$;