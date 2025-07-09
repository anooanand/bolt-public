/*
  # Fix Stripe Enum Types

  1. New Types
    - Safely creates `stripe_subscription_status` and `stripe_order_status` enum types
    - Uses DO blocks to check if types already exist before creating them
  2. Security
    - No destructive operations
    - Preserves existing data
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
END $$;

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
END $$;