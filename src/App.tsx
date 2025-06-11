import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { WritingStudio } from './components/WritingStudio';
import { ParaphrasePanel } from './components/ParaphrasePanel';
import { BrainstormingTools } from './components/BrainstormingTools';
import { LearningHub } from './components/LearningHub';
import { ExamSimulator } from './components/ExamSimulator';

// Additional page components
interface PageProps {
  onNavigate: (page: string) => void;
}

const PricingPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="text-3xl font-bold text-blue-600 mb-4">$0/month</p>
          <ul className="text-left space-y-2 mb-6">
            <li>✓ Basic writing tools</li>
            <li>✓ Limited AI suggestions</li>
            <li>✓ 3 documents per month</li>
          </ul>
          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded">Current Plan</button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
          <p className="text-3xl font-bold text-blue-600 mb-4">$19/month</p>
          <ul className="text-left space-y-2 mb-6">
            <li>✓ All writing tools</li>
            <li>✓ Unlimited AI suggestions</li>
            <li>✓ Unlimited documents</li>
            <li>✓ Advanced paraphrasing</li>
            <li>✓ Exam simulator</li>
            <li>✓ Learning courses</li>
          </ul>
          <button 
            onClick={() => {
              // Simulate payment success
              localStorage.setItem('payment_status', 'paid');
              localStorage.setItem('plan_type', 'standard');
              localStorage.setItem('payment_date', new Date().toISOString());
              alert('Payment successful! Pro features unlocked.');
              onNavigate('dashboard');
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Writing Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Empowering students and writers with AI-powered tools
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We believe that every student deserves access to high-quality writing assistance. Our platform combines 
          cutting-edge AI technology with proven educational methods to help students improve their writing skills, 
          prepare for exams, and achieve their academic goals.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Writing Assistant</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get intelligent suggestions, grammar corrections, and style improvements as you write.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">NSW Selective Exam Prep</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Specialized tools and practice materials for NSW Selective School entrance exams.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Advanced Paraphrasing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Transform your text with sophisticated paraphrasing tools and multiple writing styles.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Learning Modules</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Comprehensive courses covering everything from basic grammar to advanced writing techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CollaborationSpace: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Collaboration Space</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Share your work, get feedback, and collaborate with teachers and peers
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We're working on exciting collaboration features including:
        </p>
        <ul className="text-left mt-4 space-y-2">
          <li>• Real-time document sharing</li>
          <li>• Peer review system</li>
          <li>• Teacher feedback tools</li>
          <li>• Group writing projects</li>
          <li>• Discussion forums</li>
        </ul>
      </div>
    </div>
  </div>
);

const PracticeArea: React.FC<PageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Practice Area</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Interactive exercises and practice sessions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Writing Exercises</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Practice with guided writing prompts and exercises
          </p>
          <button 
            onClick={() => onNavigate('write')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Writing
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Exam Simulation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Take practice exams under realistic conditions
          </p>
          <button 
            onClick={() => onNavigate('exam')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const handleNavigation = (page: string) => {
    if (page === 'auth') {
      setShowAuthModal(true);
    } else {
      setCurrentPage(page);
      setShowAuthModal(false);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'write':
        return <WritingStudio onNavigate={handleNavigation} />;
      case 'paraphrase':
        return <ParaphrasePanel onNavigate={handleNavigation} />;
      case 'brainstorm':
        return <BrainstormingTools onNavigate={handleNavigation} />;
      case 'learn':
        return <LearningHub onNavigate={handleNavigation} />;
      case 'practice':
        return <PracticeArea onNavigate={handleNavigation} />;
      case 'exam':
        return <ExamSimulator onNavigate={handleNavigation} />;
      case 'collaborate':
        return <CollaborationSpace onNavigate={handleNavigation} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigation} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <NavBar 
            currentPage={currentPage} 
            onNavigate={handleNavigation}
          />
          {renderCurrentPage()}
          {showAuthModal && (
            <AuthModal 
              onClose={() => setShowAuthModal(false)}
              onNavigate={handleNavigation}
            />
          )}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

