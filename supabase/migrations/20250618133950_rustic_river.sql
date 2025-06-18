/*
  # Add role column to user_profiles table

  1. New Columns
    - Add `role` column to user_profiles table if it doesn't exist

  2. Changes
    - Ensures the role column exists for admin status checks
*/

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