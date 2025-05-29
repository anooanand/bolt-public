import React from 'react';

interface ToolsSectionProps {
  onOpenTool: (tool: string) => void;
}

export function ToolsSection({ onOpenTool }: ToolsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Essential Writing Tools</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a suite of specialized tools designed to enhance different aspects of your writing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-book-open text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Text Type Guide</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn the specific structure and style requirements for each NSW Selective writing text type.
              </p>
              <button 
                onClick={() => onOpenTool('text-type-guide')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
              >
                Open Guide
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-violet-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-sitemap text-violet-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Planning Tool</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Create structured outlines for your essays with guided prompts and organization tips.
              </p>
              <button 
                onClick={() => onOpenTool('planning-tool')}
                className="text-violet-600 hover:text-violet-800 font-medium flex items-center group"
              >
                Start Planning
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-file-alt text-amber-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Model Responses</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Study high-quality example essays that demonstrate excellence in NSW Selective writing.
              </p>
              <button 
                onClick={() => onOpenTool('model-responses')}
                className="text-amber-600 hover:text-amber-800 font-medium flex items-center group"
              >
                View Examples
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-language text-emerald-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Vocabulary Helper</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Enhance your essays with sophisticated vocabulary organized by themes and contexts.
              </p>
              <button 
                onClick={() => onOpenTool('vocabulary-helper')}
                className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center group"
              >
                Explore Words
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}