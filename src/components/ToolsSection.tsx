import React, { useState } from 'react';
import { TextTypeGuideModal } from './TextTypeGuideModal';
import { BookOpen, FileText, PenTool, Lightbulb } from 'lucide-react';

interface ToolsSectionProps {
  onOpenTool: (tool: string) => void;
}

export function ToolsSection({ onOpenTool }: ToolsSectionProps) {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Essential Writing Tools</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access a suite of specialized tools designed to enhance different aspects of your writing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                  <BookOpen className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Text Type Guide</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn the specific structure and style requirements for each NSW Selective writing text type.
              </p>
              <button 
                onClick={() => setShowGuideModal(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center group"
              >
                Open Guide
                <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-lg mr-4">
                  <PenTool className="text-violet-600 dark:text-violet-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Planning Tool</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create structured outlines for your essays with guided prompts and organization tips.
              </p>
              <button 
                onClick={() => onOpenTool('planning-tool')}
                className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium flex items-center group"
              >
                Start Planning
                <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mr-4">
                  <FileText className="text-amber-600 dark:text-amber-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Model Responses</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Study high-quality example essays that demonstrate excellence in NSW Selective writing.
              </p>
              <button 
                onClick={() => onOpenTool('model-responses')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium flex items-center group"
              >
                View Examples
                <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <Lightbulb className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vocabulary Helper</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Enhance your essays with sophisticated vocabulary organized by themes and contexts.
              </p>
              <button 
                onClick={() => onOpenTool('vocabulary-helper')}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium flex items-center group"
              >
                Explore Words
                <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showGuideModal && (
          <TextTypeGuideModal onClose={() => setShowGuideModal(false)} />
        )}
      </div>
    </section>
  );
}