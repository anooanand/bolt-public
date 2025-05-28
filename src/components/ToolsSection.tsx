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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <i className="fas fa-book-open text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold">Text Type Guide</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Learn the specific structure and style requirements for each NSW Selective writing text type.
            </p>
            <a 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center" 
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenTool('text-type-guide'); }}
            >
              Open Guide
              <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-violet-100 p-3 rounded-lg mr-4">
                <i className="fas fa-sitemap text-violet-600"></i>
              </div>
              <h3 className="text-lg font-semibold">Planning Tool</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Create structured outlines for your essays with guided prompts and organization tips.
            </p>
            <a 
              className="text-violet-600 hover:text-violet-800 font-medium flex items-center" 
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenTool('planning-tool'); }}
            >
              Start Planning
              <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <i className="fas fa-file-alt text-amber-600"></i>
              </div>
              <h3 className="text-lg font-semibold">Model Responses</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Study high-quality example essays that demonstrate excellence in NSW Selective writing.
            </p>
            <a 
              className="text-amber-600 hover:text-amber-800 font-medium flex items-center" 
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenTool('model-responses'); }}
            >
              View Examples
              <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                <i className="fas fa-language text-emerald-600"></i>
              </div>
              <h3 className="text-lg font-semibold">Vocabulary Helper</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Enhance your essays with sophisticated vocabulary organized by themes and contexts.
            </p>
            <a 
              className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center" 
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenTool('vocabulary-helper'); }}
            >
              Explore Words
              <i className="fas fa-chevron-right ml-1 text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
