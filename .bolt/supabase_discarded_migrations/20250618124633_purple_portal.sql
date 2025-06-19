/*
  # Complete Database Schema for NSW Selective Writing Assistant

  1. New Tables
    - `user_profiles`: Stores user profile information and subscription details
    - `writings`: Stores user writing content and metadata
    - `feedback`: Stores AI feedback on user writings
    - `user_progress`: Tracks user learning progress

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Create triggers for automatic data management
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  payment_status TEXT DEFAULT 'pending',
  temp_access_until TIMESTAMPTZ,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create writings table
CREATE TABLE IF NOT EXISTS writings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  text_type TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writing_id UUID REFERENCES writings(id),
  user_id UUID REFERENCES auth.users(id),
  overall_score INTEGER,
  feedback_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_progress table for tracking learning progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  completed_lessons TEXT[] DEFAULT '{}',
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_writings_user_id ON writings(user_id);
CREATE INDEX IF NOT EXISTS idx_writings_created_at ON writings(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_writing_id ON feedback(writing_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writings ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for writings
CREATE POLICY "Users can view own writings" 
  ON writings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own writings" 
  ON writings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own writings" 
  ON writings FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own writings" 
  ON writings FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for feedback
CREATE POLICY "Users can view own feedback" 
  ON feedback FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" 
  ON feedback FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_progress
CREATE POLICY "Users can view own progress" 
  ON user_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" 
  ON user_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
  ON user_progress FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, subscription_status, payment_status, temp_access_until)
  VALUES (
    NEW.id,
    NEW.email,
    'free',
    'pending',
    NOW() + INTERVAL '24 hours'
  );
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_writings_updated_at ON writings;
CREATE TRIGGER update_writings_updated_at
  BEFORE UPDATE ON writings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update user profile when payment is verified
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for payment verification
DROP TRIGGER IF EXISTS on_payment_verification ON user_profiles;
CREATE TRIGGER on_payment_verification
  AFTER UPDATE OF payment_verified ON user_profiles
  FOR EACH ROW
  WHEN (NEW.payment_verified = true AND (OLD.payment_verified IS NULL OR OLD.payment_verified = false))
  EXECUTE FUNCTION update_user_on_payment_verification();