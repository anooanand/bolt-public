import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Lightbulb, 
  Target,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SimplifiedLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export function SimplifiedLayout({ children, sidebarContent }: SimplifiedLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Compact Sidebar */}
      <div className={`
        transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-sm
        ${sidebarCollapsed ? 'w-16' : 'w-72'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!sidebarCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800">Writing Tools</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {sidebarCollapsed ? (
            /* Collapsed Sidebar Icons */
            <div className="p-2 space-y-2">
              <button className="w-full p-3 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                <BookOpen size={20} />
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-green-50 text-green-600 transition-colors">
                <Lightbulb size={20} />
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors">
                <Target size={20} />
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <Settings size={20} />
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-orange-50 text-orange-600 transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>
          ) : (
            /* Expanded Sidebar Content */
            <div className="p-4 space-y-4">
              {/* Writing Helpers Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Writing Helpers
                </h3>
                <button className="w-full p-3 text-left rounded-lg hover:bg-blue-50 text-blue-700 border border-blue-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpen size={18} />
                    <div>
                      <div className="font-medium">Check My Writing</div>
                      <div className="text-xs text-blue-600">Get instant feedback</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left rounded-lg hover:bg-green-50 text-green-700 border border-green-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Lightbulb size={18} />
                    <div>
                      <div className="font-medium">See Examples</div>
                      <div className="text-xs text-green-600">Learn from samples</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left rounded-lg hover:bg-purple-50 text-purple-700 border border-purple-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Target size={18} />
                    <div>
                      <div className="font-medium">Hear My Writing</div>
                      <div className="text-xs text-purple-600">Listen to your text</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Planning & Ideas Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Planning & Ideas
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Get organized and brainstorm brilliant ideas
                  </div>
                </div>
              </div>

              {/* Fun Tools Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Fun Tools
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Make writing even more enjoyable
                  </div>
                </div>
              </div>

              {/* Custom Sidebar Content */}
              {sidebarContent && (
                <div className="border-t border-gray-200 pt-4">
                  {sidebarContent}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
