import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { KidDashboard } from './KidDashboard';

// Mock user data for demo
const mockUser = {
  id: 'demo-user-123',
  email: 'little.writer@example.com',
  email_confirmed_at: new Date().toISOString()
};

// Mock AuthContext for demo
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockAuthValue = {
    user: mockUser,
    signIn: () => Promise.resolve({ user: mockUser, session: null }),
    signUp: () => Promise.resolve({ user: mockUser, session: null }),
    signOut: () => Promise.resolve(),
    loading: false
  };

  return (
    <div>
      {React.cloneElement(children as React.ReactElement, { 
        // Provide mock context through props
      })}
    </div>
  );
};

export function KidDashboardDemo() {
  return (
    <Router>
      <MockAuthProvider>
        <div className="min-h-screen">
          <KidDashboard user={mockUser} />
        </div>
      </MockAuthProvider>
    </Router>
  );
}

export default KidDashboardDemo;

