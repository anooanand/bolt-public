/*
  # Complete Database Schema for NSW Selective Writing Assistant

  1. New Tables
    - `user_profiles` - User profile information and subscription details
    - `writings` - User writing entries
    - `feedback` - AI feedback on writings
    - `user_progress` - Learning progress tracking
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
  
  3. Functions & Triggers
    - Auto-create user profile on signup
    - Auto-update timestamps
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  payment_status TEXT DEFAULT 'pending',
  temp_access_until TIMESTAMP,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create writings table
CREATE TABLE IF NOT EXISTS writings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  text_type TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writing_id UUID REFERENCES writings(id),
  user_id UUID REFERENCES auth.users(id),
  overall_score INTEGER,
  feedback_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_progress table for tracking learning progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  completed_lessons TEXT[] DEFAULT '{}',
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_activity TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
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

-- Create RLS policies for user_profiles (with safety checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile" ON user_profiles
      FOR SELECT USING (auth.uid() = id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" ON user_profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile" ON user_profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END
$$;

-- Create RLS policies for writings (with safety checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'writings' AND policyname = 'Users can view own writings'
  ) THEN
    CREATE POLICY "Users can view own writings" ON writings
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'writings' AND policyname = 'Users can insert own writings'
  ) THEN
    CREATE POLICY "Users can insert own writings" ON writings
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'writings' AND policyname = 'Users can update own writings'
  ) THEN
    CREATE POLICY "Users can update own writings" ON writings
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'writings' AND policyname = 'Users can delete own writings'
  ) THEN
    CREATE POLICY "Users can delete own writings" ON writings
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Create RLS policies for feedback (with safety checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'feedback' AND policyname = 'Users can view own feedback'
  ) THEN
    CREATE POLICY "Users can view own feedback" ON feedback
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'feedback' AND policyname = 'Users can insert own feedback'
  ) THEN
    CREATE POLICY "Users can insert own feedback" ON feedback
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

-- Create RLS policies for user_progress (with safety checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_progress' AND policyname = 'Users can view own progress'
  ) THEN
    CREATE POLICY "Users can view own progress" ON user_progress
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_progress' AND policyname = 'Users can insert own progress'
  ) THEN
    CREATE POLICY "Users can insert own progress" ON user_progress
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'user_progress' AND policyname = 'Users can update own progress'
  ) THEN
    CREATE POLICY "Users can update own progress" ON user_progress
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Create function to automatically create user profile on signup (with safety check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_proc WHERE proname = 'handle_new_user'
  ) THEN
    CREATE FUNCTION public.handle_new_user()
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
  ELSE
    -- Update the function if it already exists
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
  END IF;
END
$$;

-- Create trigger to call the function on user signup (with safety check)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp (with safety check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_proc WHERE proname = 'update_updated_at_column'
  ) THEN
    CREATE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  END IF;
END
$$;

-- Create triggers for updated_at (with safety checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_trigger WHERE tgname = 'update_writings_updated_at'
  ) THEN
    CREATE TRIGGER update_writings_updated_at
      BEFORE UPDATE ON writings
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_trigger WHERE tgname = 'update_user_progress_updated_at'
  ) THEN
    CREATE TRIGGER update_user_progress_updated_at
      BEFORE UPDATE ON user_progress
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;