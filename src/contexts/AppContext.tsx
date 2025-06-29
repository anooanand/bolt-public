import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from './AuthContext';

// Define the application state interface
interface AppState {
  user: User | null;
  writingContent: string;
  currentTextType: string;
  isLoading: boolean;
  currentPage: string;
  writings: Writing[];
  feedback: Feedback[];
  userProgress: UserProgress;
}

// Define types for writings and feedback
interface Writing {
  id: string;
  title: string;
  content: string;
  text_type: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

interface Feedback {
  id: string;
  writing_id: string;
  overall_score: number;
  feedback_data: any;
  created_at: string;
}

interface UserProgress {
  totalWritings: number;
  averageScore: number;
  completedLessons: string[];
  totalPoints: number;
}

// Define action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_WRITING_CONTENT'; payload: string }
  | { type: 'SET_TEXT_TYPE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'ADD_WRITING'; payload: Writing }
  | { type: 'UPDATE_WRITING'; payload: Writing }
  | { type: 'SET_WRITINGS'; payload: Writing[] }
  | { type: 'ADD_FEEDBACK'; payload: Feedback }
  | { type: 'SET_FEEDBACK'; payload: Feedback[] }
  | { type: 'UPDATE_USER_PROGRESS'; payload: Partial<UserProgress> }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState = {
  user: null,
  writingContent: '',
  currentTextType: '',
  isLoading: false,
  currentPage: 'home',
  writings: [],
  feedback: [],
  userProgress: {
    totalWritings: 0,
    averageScore: 0,
    completedLessons: [],
    totalPoints: 0
  }
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_WRITING_CONTENT':
      return { ...state, writingContent: action.payload };
    
    case 'SET_TEXT_TYPE':
      return { ...state, currentTextType: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'ADD_WRITING':
      return { 
        ...state, 
        writings: [...state.writings, action.payload],
        userProgress: {
          ...state.userProgress,
          totalWritings: state.userProgress.totalWritings + 1
        }
      };
    
    case 'UPDATE_WRITING':
      return {
        ...state,
        writings: state.writings.map(writing =>
          writing.id === action.payload.id ? action.payload : writing
        )
      };
    
    case 'SET_WRITINGS':
      return { 
        ...state, 
        writings: action.payload,
        userProgress: {
          ...state.userProgress,
          totalWritings: action.payload.length
        }
      };
    
    case 'ADD_FEEDBACK':
      const newFeedback = [...state.feedback, action.payload];
      const averageScore = newFeedback.reduce((sum, f) => sum + f.overall_score, 0) / newFeedback.length;
      
      return { 
        ...state, 
        feedback: newFeedback,
        userProgress: {
          ...state.userProgress,
          averageScore: Math.round(averageScore * 10) / 10
        }
      };
    
    case 'SET_FEEDBACK':
      const avgScore = action.payload.length > 0 
        ? action.payload.reduce((sum, f) => sum + f.overall_score, 0) / action.payload.length 
        : 0;
      
      return { 
        ...state, 
        feedback: action.payload,
        userProgress: {
          ...state.userProgress,
          averageScore: Math.round(avgScore * 10) / 10
        }
      };
    
    case 'UPDATE_USER_PROGRESS':
      return {
        ...state,
        userProgress: { ...state.userProgress, ...action.payload }
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Convenience methods
  setWritingContent: (content: string) => void;
  setTextType: (textType: string) => void;
  setCurrentPage: (page: string) => void;
  addWriting: (writing: Writing) => void;
  updateWriting: (writing: Writing) => void;
  addFeedback: (feedback: Feedback) => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  resetAppState: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// App provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user } = useAuth();

  // Sync user from AuthContext
  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: user });
  }, [user]);

  // Auto-save writing content to localStorage
  useEffect(() => {
    if (state.writingContent) {
      localStorage.setItem('draft_content', state.writingContent);
      localStorage.setItem('draft_text_type', state.currentTextType);
      localStorage.setItem('draft_timestamp', new Date().toISOString());
    }
  }, [state.writingContent, state.currentTextType]);

  // Load draft content on mount
  useEffect(() => {
    const draftContent = localStorage.getItem('draft_content');
    const draftTextType = localStorage.getItem('draft_text_type');
    
    if (draftContent) {
      dispatch({ type: 'SET_WRITING_CONTENT', payload: draftContent });
    }
    if (draftTextType) {
      dispatch({ type: 'SET_TEXT_TYPE', payload: draftTextType });
    }
  }, []);

  // Convenience methods
  const setWritingContent = (content: string) => {
    dispatch({ type: 'SET_WRITING_CONTENT', payload: content });
  };

  const setTextType = (textType: string) => {
    dispatch({ type: 'SET_TEXT_TYPE', payload: textType });
  };

  const setCurrentPage = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const addWriting = (writing: Writing) => {
    dispatch({ type: 'ADD_WRITING', payload: writing });
  };

  const updateWriting = (writing: Writing) => {
    dispatch({ type: 'UPDATE_WRITING', payload: writing });
  };

  const addFeedback = (feedback: Feedback) => {
    dispatch({ type: 'ADD_FEEDBACK', payload: feedback });
  };

  const updateUserProgress = (progress: Partial<UserProgress>) => {
    dispatch({ type: 'UPDATE_USER_PROGRESS', payload: progress });
  };

  const resetAppState = () => {
    dispatch({ type: 'RESET_STATE' });
    localStorage.removeItem('draft_content');
    localStorage.removeItem('draft_text_type');
    localStorage.removeItem('draft_timestamp');
  };

  const value: AppContextType = {
    state,
    dispatch,
    setWritingContent,
    setTextType,
    setCurrentPage,
    addWriting,
    updateWriting,
    addFeedback,
    updateUserProgress,
    resetAppState
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Export types for use in other components
export type { AppState, Writing, Feedback, UserProgress };