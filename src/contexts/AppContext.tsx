import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the AppContext interface
interface AppState {
  writings: any[];
  currentWriting: any;
  // Add other state properties as needed
}

interface AppContextType {
  state: AppState;
  addWriting: (writing: any) => void;
  // Add other methods as needed
}

// Create the AppContext
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    writings: [],
    currentWriting: null,
  });

  const addWriting = (writing: any) => {
    setState(prevState => ({
      ...prevState,
      writings: [...prevState.writings, writing],
    }));
  };

  const value: AppContextType = {
    state,
    addWriting,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};