import React, { useState, useEffect } from 'react';
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
  const [localAssistanceLevel, setLocalAssistanceLevel] = useState<string>(assistanceLevel);

  // Update local assistance level when prop changes
  useEffect(() => {
    setLocalAssistanceLevel(assistanceLevel);
  }, [assistanceLevel]);

  const tabs = [
    {
      id: 'coach' as TabType,
      label: 'Writing Buddy',
      icon: Bot,
      description: 'Chat with your writing buddy and get instant feedback'
    },
    {
      id: 'paraphrase' as TabType,
      label: 'Word Magic',
      icon: RefreshCw,
      description: 'Make your words sound amazing'
    }
  ];

  return (
    <div className="h-full flex flex-col coach-panel-container" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Tab Navigation */}
      <div className="coach-panel-header border-b-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
        <div className="flex space-x-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700'
                }`}
                title={tab.description}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <Sparkles className="w-4 h-4 ml-1 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'coach' && (
          <div className="absolute top-2 right-2 z-10">
            <Star className="w-6 h-6 text-yellow-400 fill-current animate-pulse" />
          </div>
        )}
        {activeTab === 'paraphrase' && (
          <div className="absolute top-2 right-2 z-10">
            <Wand className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        )}
        {activeTab === 'coach' ? (
          <CoachPanel
            content={content}
            textType={textType}
            assistanceLevel={localAssistanceLevel}
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