-- First, check if user_profiles exists and fix its structure
DO $$
BEGIN
  -- Add user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
  
  -- Update existing records to set user_id = id for consistency
  UPDATE user_profiles SET user_id = id WHERE user_id IS NULL;
END
$$;

-- Create better indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Improve the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user profile already exists to prevent duplicates
  IF NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = NEW.id) THEN
    INSERT INTO public.user_profiles (
      id, 
      user_id,
      email, 
      subscription_status, 
      payment_status, 
      temp_access_until
    )
    VALUES (
      NEW.id,
      NEW.id,
      NEW.email,
      'free',
      'pending',
      NOW() + INTERVAL '24 hours'
    );
  END IF;
  
  -- Check if user progress already exists to prevent duplicates
  IF NOT EXISTS (SELECT 1 FROM public.user_progress WHERE user_id = NEW.id) THEN
    INSERT INTO public.user_progress (user_id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Improve the payment verification function with better error handling
CREATE OR REPLACE FUNCTION update_user_on_payment_verification()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the user's subscription status based on the payment
  UPDATE user_profiles
  SET 
    payment_status = 'verified',
    subscription_status = 'paid',
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE NOTICE 'Error in update_user_on_payment_verification: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix RLS policies to use user_id consistently
-- Note: Removed IF NOT EXISTS clause as it's not supported in this context
CREATE POLICY "Users can view own profile by user_id" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile by user_id" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile by user_id" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);