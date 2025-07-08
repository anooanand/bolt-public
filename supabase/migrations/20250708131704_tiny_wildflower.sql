/*
# Add Stripe Subscription Status Enum Type

1. New Types
  - `stripe_subscription_status` enum type with all possible Stripe subscription statuses
  - `stripe_order_status` enum type for order processing statuses

2. Changes
  - No changes to existing tables, only adding new enum types
  - These types can be used in future tables or columns

3. Security
  - No security changes in this migration
*/

-- Create enum type for Stripe subscription statuses
CREATE TYPE public.stripe_subscription_status AS ENUM (
  'not_started',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'active',
  'past_due',
  'canceled',
  'unpaid',
  'paused'
);

-- Create enum type for Stripe order statuses
CREATE TYPE public.stripe_order_status AS ENUM (
  'pending',
  'completed',
  'canceled'
);