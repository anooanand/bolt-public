import React, { useState } from 'react';
import { Bot, RefreshCw, Sparkles, Wand, Star } from 'lucide-react';
import { CoachPanel } from './CoachPanel';
import { ParaphrasePanel } from './ParaphrasePanel';
import './improved-layout.css';

interface TabbedCoachPanelProps {
  content: string;
  textType: string;
  assistanceLevel: string;
  selectedText: string;
  onNavigate?: (page: string) => void;
}

type TabType = 'coach' | 'paraphrase';

export function TabbedCoachPanel({ 
  content, 
  textType, 
  assistanceLevel, 
  selectedText, 
  onNavigate 
}: TabbedCoachPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('coach');

  const tabs = [
    {
      id: 'coach' as TabType,
      label: 'Writing Buddy',
      icon: Bot,
      description: 'Get help with your writing'
    },
    {
      id: 'paraphrase' as TabType,
      label: 'Word Magic',
      icon: RefreshCw,
      description: 'Make your words sound amazing'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Tab Navigation */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-1 bg-gray-50 dark:bg-gray-700 p-1 rounded-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title={tab.description}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'coach' ? (
          <CoachPanel 
            content={content}
            textType={textType}
            assistanceLevel={assistanceLevel}
          />
        ) : (
          <ParaphrasePanel 
            selectedText={selectedText}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
}

