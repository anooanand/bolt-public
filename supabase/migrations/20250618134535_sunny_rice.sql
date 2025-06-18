/*
  # Fix User Profiles Schema

  1. Changes
    - Add user_id column to user_profiles if it doesn't exist
    - Add role column to user_profiles if it doesn't exist
    - Add foreign key constraint for user_id referencing auth.users(id)
    - Create indexes for faster lookups
  2. Security
    - Ensure RLS policies work with both id and user_id fields
*/

-- Add user_id column to user_profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- Add role column to user_profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Create index on user_id column for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Create index on email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

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
  ON CONFLICT (id) DO NOTHING;
  
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