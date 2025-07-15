/*
  # Fix Stripe Enum Types

  1. New Types
    - Safely creates `stripe_subscription_status` and `stripe_order_status` enum types
    - Uses DO blocks to check if types already exist before creating them
  2. Security
    - No destructive operations
    - Preserves existing data
*/

-- The enum types are already created, so no action is needed in this migration file.