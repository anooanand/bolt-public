import React from 'react';

interface NavBarProps {
  onNavigate: (page: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  user: any;
}

export const NavBar: React.FC<NavBarProps> = ({ onNavigate, onSignIn, onSignUp, onSignOut, user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">InstaChat AI</div>
      <ul className="navbar-nav">
        <li className="nav-item"><button onClick={() => onNavigate('home')}>Home</button></li>
        <li className="nav-item"><button onClick={() => onNavigate('learning')}>My Learning</button></li>
        {user ? (
          <li className="nav-item"><button onClick={onSignOut}>Sign Out</button></li>
        ) : (
          <li className="nav-item"><button onClick={onSignIn}>Sign In</button></li>
        )}
        <li className="nav-item"><button onClick={() => onNavigate('dashboard')}>Dashboard</button></li>
      </ul>
    </nav>
  );
};
