/*
  # Fix Payment Verification Fields and Trigger

  1. New Fields
    - Add `temp_access_until` and `payment_verified` to user_profiles
    - Add `verification_status` and `verification_date` to user_payments
  
  2. Functions
    - Create function to update user profile when payment is verified
  
  3. Triggers
    - Create trigger for payment verification with IF NOT EXISTS
*/

-- Add payment verification fields to user_profiles
ALTER TABLE IF EXISTS user_profiles 
ADD COLUMN IF NOT EXISTS temp_access_until timestamptz,
ADD COLUMN IF NOT EXISTS payment_verified boolean DEFAULT false;

-- Add verification fields to user_payments
ALTER TABLE IF EXISTS user_payments
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verification_date timestamptz;

-- Create function to update user profile when payment is verified
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

-- Drop the trigger if it exists to avoid the "already exists" error
DROP TRIGGER IF EXISTS on_payment_verification ON user_profiles;

-- Create trigger for payment verification
CREATE TRIGGER on_payment_verification
  AFTER UPDATE OF payment_verified ON user_profiles
  FOR EACH ROW
  WHEN ((NEW.payment_verified = true) AND ((OLD.payment_verified IS NULL) OR (OLD.payment_verified = false)))
  EXECUTE FUNCTION update_user_on_payment_verification();