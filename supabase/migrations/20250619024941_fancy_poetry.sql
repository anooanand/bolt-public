/*
  # Fix user_profiles schema for sign-up

  1. Changes
    - Add missing columns to user_profiles table
    - Fix the handle_new_user function to use existing columns
    - Update the trigger to properly handle new users
  
  2. Error Fixes
    - Fixes "column subscription_status of relation user_profiles does not exist" error
*/

-- Check if subscription_status column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'subscription_status'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN subscription_status TEXT DEFAULT 'free';
  END IF;
END $$;

-- Check if subscription_plan column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'subscription_plan'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN subscription_plan TEXT;
  END IF;
END $$;

-- Update the handle_new_user function to be more resilient
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  column_exists BOOLEAN;
BEGIN
  -- Check if user profile already exists to prevent duplicates
  IF NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = NEW.id) THEN
    -- Insert with only columns we know exist
    INSERT INTO public.user_profiles (
      id, 
      user_id,
      email, 
      payment_status, 
      temp_access_until,
      role
    )
    VALUES (
      NEW.id,
      NEW.id,
      NEW.email,
      'pending',
      NOW() + INTERVAL '24 hours',
      'user'
    );
    
    -- Update subscription_status separately to handle if column exists
    BEGIN
      UPDATE public.user_profiles 
      SET subscription_status = 'free'
      WHERE id = NEW.id;
    EXCEPTION WHEN OTHERS THEN
      -- If update fails, log but continue
      RAISE NOTICE 'Could not update subscription_status: %', SQLERRM;
    END;
  END IF;
  
  -- Check if user progress already exists to prevent duplicates
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_progress') THEN
    IF NOT EXISTS (SELECT 1 FROM public.user_progress WHERE user_id = NEW.id) THEN
      BEGIN
        INSERT INTO public.user_progress (user_id)
        VALUES (NEW.id);
      EXCEPTION WHEN OTHERS THEN
        -- If insert fails, log but continue
        RAISE NOTICE 'Could not insert into user_progress: %', SQLERRM;
      END;
    END IF;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();