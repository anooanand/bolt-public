-- Function to manually verify a user's email and payment
CREATE OR REPLACE FUNCTION public.manually_verify_user(
  p_email TEXT,
  p_admin_notes TEXT DEFAULT 'Manual verification by admin'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_count INT;
BEGIN
  -- Find the user by email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', p_email;
  END IF;
  
  -- Update auth.users to mark email as confirmed
  UPDATE auth.users
  SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      updated_at = NOW(),
      raw_app_meta_data = 
        jsonb_set(
          raw_app_meta_data,
          '{email_confirmed}',
          'true'
        )
  WHERE id = v_user_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  IF v_count = 0 THEN
    RAISE EXCEPTION 'Failed to update auth.users for %', p_email;
  END IF;
  
  -- Update user_profiles to mark payment as verified
  UPDATE public.user_profiles
  SET 
    payment_verified = TRUE,
    payment_status = 'verified',
    subscription_status = 'active',
    subscription_plan = 'base-plan',
    temp_access_until = NOW() + INTERVAL '1 year',
    updated_at = NOW(),
    manual_override = TRUE,
    manual_override_date = NOW(),
    manual_override_admin = p_admin_notes
  WHERE id = v_user_id OR user_id = v_user_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  IF v_count = 0 THEN
    RAISE EXCEPTION 'Failed to update user_profiles for %', p_email;
  END IF;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error in manually_verify_user: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Function to check if a user exists by email
CREATE OR REPLACE FUNCTION public.user_exists_by_email(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE email = p_email
  );
END;
$$;

-- Function to grant access to a specific user
CREATE OR REPLACE FUNCTION public.grant_user_access(
  p_email TEXT,
  p_plan_type TEXT DEFAULT 'base-plan',
  p_duration_days INT DEFAULT 365,
  p_admin_notes TEXT DEFAULT 'Manual access grant'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_count INT;
BEGIN
  -- Find the user by email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', p_email;
  END IF;
  
  -- Update user_profiles to grant access
  UPDATE public.user_profiles
  SET 
    payment_verified = TRUE,
    payment_status = 'verified',
    subscription_status = 'active',
    subscription_plan = p_plan_type,
    temp_access_until = NOW() + (p_duration_days || ' days')::INTERVAL,
    updated_at = NOW(),
    manual_override = TRUE,
    manual_override_date = NOW(),
    manual_override_admin = p_admin_notes
  WHERE id = v_user_id OR user_id = v_user_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  IF v_count = 0 THEN
    RAISE EXCEPTION 'Failed to update user_profiles for %', p_email;
  END IF;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error in grant_user_access: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Add missing columns to user_profiles if they don't exist
DO $$ 
BEGIN
  -- Add manual_override column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'manual_override'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN manual_override BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add manual_override_date column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'manual_override_date'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN manual_override_date TIMESTAMPTZ;
  END IF;

  -- Add manual_override_admin column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'manual_override_admin'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN manual_override_admin TEXT;
  END IF;
  
  -- Add stripe_customer_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN stripe_customer_id TEXT;
  END IF;
  
  -- Add stripe_subscription_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'stripe_subscription_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN stripe_subscription_id TEXT;
  END IF;
  
  -- Add payment_method column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN payment_method TEXT;
  END IF;
  
  -- Add current_period_start column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'current_period_start'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN current_period_start TIMESTAMPTZ;
  END IF;
  
  -- Add current_period_end column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'current_period_end'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN current_period_end TIMESTAMPTZ;
  END IF;
  
  -- Add last_payment_date column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'last_payment_date'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN last_payment_date TIMESTAMPTZ;
  END IF;
  
  -- Add temporary_access_granted column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'temporary_access_granted'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN temporary_access_granted BOOLEAN DEFAULT FALSE;
  END IF;
  
  -- Add temporary_access_expires column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'temporary_access_expires'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN temporary_access_expires TIMESTAMPTZ;
  END IF;
END $$;

-- Manually verify the specific user
SELECT manually_verify_user('anoo.anand@gmail.com', 'Manual verification after payment issue');