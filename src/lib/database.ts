import { supabase } from './supabase';
import { Writing, Feedback, UserProgress } from '../contexts/AppContext';

// Database operations for writings
export const writingOperations = {
  // Create a new writing
  async createWriting(writing: Omit<Writing, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('writings')
        .insert([{
          title: writing.title,
          content: writing.content,
          text_type: writing.text_type,
          word_count: writing.word_count,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating writing:', error);
      return { data: null, error };
    }
  },

  // Get all writings for current user
  async getUserWritings() {
    try {
      const { data, error } = await supabase
        .from('writings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching writings:', error);
      return { data: null, error };
    }
  },

  // Update a writing
  async updateWriting(id: string, updates: Partial<Writing>) {
    try {
      const { data, error } = await supabase
        .from('writings')
        .update({
          ...updates,
          word_count: updates.content ? updates.content.split(' ').length : undefined
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating writing:', error);
      return { data: null, error };
    }
  },

  // Delete a writing
  async deleteWriting(id: string) {
    try {
      const { error } = await supabase
        .from('writings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting writing:', error);
      return { error };
    }
  }
};

// Database operations for feedback
export const feedbackOperations = {
  // Create feedback for a writing
  async createFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert([{
          writing_id: feedback.writing_id,
          overall_score: feedback.overall_score,
          feedback_data: feedback.feedback_data,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating feedback:', error);
      return { data: null, error };
    }
  },

  // Get feedback for a specific writing
  async getWritingFeedback(writingId: string) {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('writing_id', writingId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return { data: null, error };
    }
  },

  // Get all feedback for current user
  async getUserFeedback() {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user feedback:', error);
      return { data: null, error };
    }
  }
};

// Database operations for user progress
export const progressOperations = {
  // Get user progress
  async getUserProgress() {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return { data: null, error };
    }
  },

  // Update user progress
  async updateUserProgress(updates: Partial<UserProgress>) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating user progress:', error);
      return { data: null, error };
    }
  },

  // Add completed lesson
  async addCompletedLesson(lessonId: string) {
    try {
      const { data: currentProgress } = await this.getUserProgress();
      
      if (currentProgress) {
        const completedLessons = currentProgress.completed_lessons || [];
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId);
          
          const { data, error } = await supabase
            .from('user_progress')
            .update({
              completed_lessons: completedLessons,
              total_points: (currentProgress.total_points || 0) + 10, // 10 points per lesson
              last_activity: new Date().toISOString()
            })
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
            .select()
            .single();

          if (error) throw error;
          return { data, error: null };
        }
      }
      
      return { data: currentProgress, error: null };
    } catch (error) {
      console.error('Error adding completed lesson:', error);
      return { data: null, error };
    }
  }
};

// Database operations for user profiles
export const profileOperations = {
  // Get user profile
  async getUserProfile() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { data: null, error };
    }
  },

  // Update user profile
  async updateUserProfile(updates: any) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { data: null, error };
    }
  },

  // Update payment status
  async updatePaymentStatus(paymentVerified: boolean, subscriptionPlan?: string) {
    try {
      const updates: any = {
        payment_verified: paymentVerified,
        payment_status: paymentVerified ? 'verified' : 'pending'
      };

      if (subscriptionPlan) {
        updates.subscription_plan = subscriptionPlan;
        updates.subscription_status = 'active';
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { data: null, error };
    }
  }
};

// Combined operations for easier use
export const dbOperations = {
  writings: writingOperations,
  feedback: feedbackOperations,
  progress: progressOperations,
  profile: profileOperations
};

