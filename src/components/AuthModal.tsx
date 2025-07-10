import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Star, Heart, Smile } from 'lucide-react';
import { supabase, isEmailVerified } from '../lib/supabase';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode: initialMode,
  onClose,
  onSuccess,
  onSwitchMode
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'confirmation'>(initialMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string>('');
  const [verificationChecking, setVerificationChecking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Reset form when mode changes
  useEffect(() => {
    setMode(initialMode);
    setError('');
    setSuccess(false);
    setCurrentStep(1);
    
    // Try to get email from localStorage
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setConfirmationEmail(savedEmail);
    }
  }, [initialMode]);

  // Kid-friendly error messages
  const getKidFriendlyError = (error: string): string => {
    if (error.includes('Invalid login credentials') || error.includes('Invalid email or password')) {
      return "Oops! That email or password doesn't look right. Let's try again! 🤔";
    }
    if (error.includes('User already registered')) {
      return "Looks like you already have an account! Try signing in instead! 😊";
    }
    if (error.includes('Password should be at least 6 characters')) {
      return "Your password needs to be at least 6 characters long! Make it strong! 💪";
    }
    if (error.includes('Unable to validate email address')) {
      return "Hmm, that email doesn't look quite right. Can you double-check it? 📧";
    }
    if (error.includes('Email not confirmed')) {
      return "Please check your email and click the confirmation link first! 📬";
    }
    if (error.includes('Too many requests')) {
      return "Whoa there! You're going too fast. Please wait a moment and try again! ⏰";
    }
    return error || "Something went wrong. Let's try that again! 🔄";
  };

  const validateForm = (): boolean => {
    if (!email || !password) {
      setError("Please fill in all fields! 📝");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address! 📧");
      return false;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long! 💪");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords don't match! Please try again! 🔒");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        console.log('🔑 [AuthModal] Attempting sign in for:', email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (error) {
          console.error('❌ [AuthModal] Sign in error:', error);
          setError(getKidFriendlyError(error.message));
          return;
        }

        if (data.user) {
          console.log('✅ [AuthModal] Sign in successful:', data.user.email);
          localStorage.setItem('userEmail', data.user.email || '');
          setSuccess(true);
          
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }
      } else {
        console.log('📝 [AuthModal] Attempting sign up for:', email);
        
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password
        });

        if (error) {
          console.error('❌ [AuthModal] Sign up error:', error);
          setError(getKidFriendlyError(error.message));
          return;
        }

        if (data.user) {
          console.log('✅ [AuthModal] Sign up successful, confirmation needed:', data.user.email);
          localStorage.setItem('userEmail', data.user.email || '');
          setConfirmationEmail(data.user.email || '');
          setMode('confirmation');
          setCurrentStep(2);
        }
      }
    } catch (error: any) {
      console.error('💥 [AuthModal] Unexpected error:', error);
      setError(getKidFriendlyError(error.message || 'An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const checkEmailVerification = async () => {
    if (!confirmationEmail) return;
    
    setVerificationChecking(true);
    
    try {
      const verified = await isEmailVerified(confirmationEmail);
      
      if (verified) {
        console.log('✅ [AuthModal] Email verified successfully');
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setError("Email not verified yet. Please check your inbox and click the verification link! 📧");
      }
    } catch (error: any) {
      console.error('❌ [AuthModal] Verification check error:', error);
      setError("Couldn't check verification status. Please try again! 🔄");
    } finally {
      setVerificationChecking(false);
    }
  };

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setError('');
    setSuccess(false);
    setCurrentStep(1);
    onSwitchMode(newMode);
  };

  const renderSignInForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ready to continue your writing adventure?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📧 Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🔒 Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
            <p className="text-green-800 dark:text-green-200 text-sm">
              Welcome back! Redirecting you now... 🚀
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-2" />
              Signing you in...
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Success! 🎉
            </>
          ) : (
            <>
              <Star className="w-5 h-5 mr-2" />
              Sign In & Start Writing!
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Don't have an account yet?{' '}
          <button
            onClick={() => handleModeSwitch('signup')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Join the fun! 🎨
          </button>
        </p>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Join Our Writing Family! 🌟
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Start your amazing writing journey today!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📧 Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🔒 Password (at least 6 characters)
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Create a strong password"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🔒 Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-2" />
              Creating your account...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Create My Account! 🎨
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => handleModeSwitch('signin')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Sign in here! 🚀
          </button>
        </p>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Check Your Email! 📬
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We sent a confirmation link to:
        </p>
        <p className="text-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          {confirmationEmail}
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <Smile className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-yellow-800 dark:text-yellow-200 text-sm">
            <p className="font-medium mb-2">What to do next:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check your email inbox (and spam folder too!)</li>
              <li>Click the confirmation link in the email</li>
              <li>Come back here and click "I've confirmed my email!"</li>
            </ol>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
          <p className="text-green-800 dark:text-green-200 text-sm">
            Email confirmed! Welcome to the family! 🎉
          </p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={checkEmailVerification}
          disabled={verificationChecking || success}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {verificationChecking ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-2" />
              Checking...
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirmed! 🎉
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              I've confirmed my email!
            </>
          )}
        </button>

        <button
          onClick={() => handleModeSwitch('signin')}
          className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              {mode === 'confirmation' && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}>
                    1
                  </span>
                  <span className="w-8 h-0.5 bg-gray-300"></span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                  }`}>
                    2
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {mode === 'signin' && renderSignInForm()}
          {mode === 'signup' && renderSignUpForm()}
          {mode === 'confirmation' && renderConfirmationStep()}
        </div>
      </div>
    </div>
  );
};

