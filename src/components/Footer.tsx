import React from 'react';
import { PenTool, Mail, Twitter, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Fallback for scroll-to navigation
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section - Enhanced spacing and typography */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                InstaChat AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              AI-powered writing coach for NSW Selective School exam preparation. 
              Master essay writing with personalized feedback and guidance.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Product Links - Improved spacing and hierarchy */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation('features')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('writing')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Start Writing
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links - Enhanced visual hierarchy */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation('faq')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@instachatai.co"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium flex items-center group"
                >
                  <Mail className="h-5 w-5 mr-2 group-hover:text-indigo-600 transition-colors duration-300" />
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links - Consistent spacing */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation('about')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  About Us
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-300 font-medium"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Enhanced spacing and visual separation */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-300 font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-300 font-medium"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-300 font-medium"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-300 font-medium"
              >
                Accessibility
              </a>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              © {currentYear} InstaChat AI. All rights reserved.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section - Improved visual hierarchy and spacing */}
        <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left space-y-2">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-200">
                  Ready to improve your writing?
                </h4>
                <p className="text-base text-blue-700 dark:text-blue-300">
                  Join thousands of students preparing for NSW Selective School exams.
                </p>
              </div>
              <button
                onClick={() => handleNavigation('home')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
