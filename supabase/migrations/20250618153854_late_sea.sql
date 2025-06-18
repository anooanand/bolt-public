/*
  # Fix user profiles table and constraints

  1. Changes
     - Add missing columns to user_profiles if they don't exist
     - Create indexes for faster lookups
     - Update handle_new_user function to properly handle both id and user_id
     - Fix foreign key constraint issues by checking existence first
*/

-- Ensure user_profiles table has all required columns
DO $$ 
BEGIN
  -- Add user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;

  -- Add role column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;

  -- Add temp_access_until column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'temp_access_until'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN temp_access_until TIMESTAMPTZ;
  END IF;

  -- Add payment_verified column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'payment_verified'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN payment_verified BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Create index on user_id column for faster lookups if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_user_profiles_user_id'
  ) THEN
    CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
  END IF;
END $$;

-- Create index on email column for faster lookups if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_user_profiles_email'
  ) THEN
    CREATE INDEX idx_user_profiles_email ON user_profiles(email);
  END IF;
END $$;

-- Update the handle_new_user function to set both id and user_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, user_id, email, subscription_status, payment_status, temp_access_until, role)
  VALUES (
    NEW.id,
    NEW.id,
    NEW.email,
    'free',
    'pending',
    NOW() + INTERVAL '24 hours',
    'user'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    user_id = EXCLUDED.user_id,
    email = EXCLUDED.email,
    temp_access_until = EXCLUDED.temp_access_until;
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();