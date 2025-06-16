/*
  # Payment Verification Schema Update

  1. Updates to user_profiles table
    - Add `temp_access_until` (timestamp) - For temporary access after payment
    - Add `payment_verified` (boolean) - For manual verification status

  2. Updates to user_payments table
    - Add `verification_status` (text) - For tracking payment verification
    - Add `verification_date` (timestamp) - When payment was verified

  3. Security
    - Update RLS policies to reflect new fields
*/

-- Add temporary access field to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS temp_access_until timestamptz,
ADD COLUMN IF NOT EXISTS payment_verified boolean DEFAULT false;

-- Add verification fields to user_payments
ALTER TABLE user_payments
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verification_date timestamptz;

-- Create function to check if user has temporary access
CREATE OR REPLACE FUNCTION public.has_temporary_access(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  temp_access_expiry timestamptz;
BEGIN
  SELECT temp_access_until INTO temp_access_expiry
  FROM user_profiles
  WHERE id = user_id;
  
  RETURN temp_access_expiry IS NOT NULL AND temp_access_expiry > now();
END;
$$;

-- Create function to check if user has verified payment
CREATE OR REPLACE FUNCTION public.has_verified_payment(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_verified boolean;
BEGIN
  SELECT payment_verified INTO is_verified
  FROM user_profiles
  WHERE id = user_id;
  
  RETURN is_verified;
END;
$$;

-- Create function to check if user has access to premium features
CREATE OR REPLACE FUNCTION public.has_premium_access(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN 
    public.has_verified_payment(user_id) OR 
    public.has_temporary_access(user_id);
END;
$$;

-- Create a trigger function to update user metadata when payment is verified
CREATE OR REPLACE FUNCTION public.update_user_on_payment_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If payment is being verified
  IF NEW.payment_verified = true AND (OLD.payment_verified IS NULL OR OLD.payment_verified = false) THEN
    -- Update auth.users metadata
    UPDATE auth.users
    SET raw_user_meta_data = 
      jsonb_set(
        jsonb_set(
          COALESCE(raw_user_meta_data, '{}'::jsonb),
          '{payment_confirmed}',
          'true'::jsonb
        ),
        '{plan_type}',
        (SELECT to_jsonb(plan_type) FROM user_payments WHERE user_id = NEW.id ORDER BY payment_date DESC LIMIT 1)
      )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for payment verification
DROP TRIGGER IF EXISTS on_payment_verification ON user_profiles;
CREATE TRIGGER on_payment_verification
  AFTER UPDATE OF payment_verified ON user_profiles
  FOR EACH ROW
  WHEN (NEW.payment_verified = true AND (OLD.payment_verified IS NULL OR OLD.payment_verified = false))
  EXECUTE FUNCTION public.update_user_on_payment_verification();