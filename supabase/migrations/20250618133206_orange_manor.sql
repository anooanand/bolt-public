/*
  # Fix payment verification fields and triggers
  
  1. Changes
    - Add payment verification fields to user_profiles if not exists
    - Add verification fields to user_payments if not exists
    - Create function to update user profile when payment is verified
    - Create trigger for payment verification with IF NOT EXISTS
  
  2. Security
    - Uses IF NOT EXISTS to prevent errors with existing objects
*/

-- Add payment verification fields to user_profiles
ALTER TABLE IF EXISTS user_profiles 
ADD COLUMN IF NOT EXISTS temp_access_until timestamptz,
ADD COLUMN IF NOT EXISTS payment_verified boolean DEFAULT false;

-- Add verification fields to user_payments
ALTER TABLE IF EXISTS user_payments
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verification_date timestamptz;

-- Create function to update user on payment verification
CREATE OR REPLACE FUNCTION update_user_on_payment_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Update the user's plan type based on the payment
  UPDATE user_profiles
  SET 
    payment_status = 'verified',
    payment_verified = true,
    plan_type = NEW.plan_type,
    updated_at = now()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_payment_verification ON user_profiles;

-- Create trigger for payment verification
CREATE TRIGGER on_payment_verification
  AFTER UPDATE OF payment_verified ON user_profiles
  FOR EACH ROW
  WHEN ((NEW.payment_verified = true) AND ((OLD.payment_verified IS NULL) OR (OLD.payment_verified = false)))
  EXECUTE FUNCTION update_user_on_payment_verification();