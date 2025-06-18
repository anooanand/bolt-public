/*
  # Fix user_profiles table unique constraint

  This migration ensures that the `id` column in the `user_profiles` table has a unique constraint.
  This is necessary for the `ON CONFLICT (id) DO UPDATE` clause in the `handle_new_user` function to work correctly.
  It also ensures the `email` column is unique.
*/

-- Add a unique constraint to the `id` column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_profiles_pkey' AND conrelid = 'public.user_profiles'::regclass
  ) THEN
    ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);
  END IF;
END $$;

-- Add a unique constraint to the `email` column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_profiles_email_key' AND conrelid = 'public.user_profiles'::regclass
  ) THEN
    ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_email_key UNIQUE (email);
  END IF;
END $$;

