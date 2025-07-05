import React, { useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
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
      label: 'AI Coach',
      icon: Bot,
      description: 'Get writing feedback and guidance'
    },
    {
      id: 'paraphrase' as TabType,
      label: 'Paraphrase',
      icon: RefreshCw,
      description: 'Rephrase and improve text'
    }
  ];

  return (
    <div className="h-full coach-panel-container">
      {/* Tab Navigation */}
      <div className="coach-panel-header border-b-0">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                title={tab.description}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
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

