import React, { useState } from 'react';
import { SimplifiedLayout } from './SimplifiedLayout';
import { ImprovedWritingArea } from './ImprovedWritingArea';
import { CoachPanel } from './CoachPanel';
import { ParaphrasePanel } from './ParaphrasePanel';
import { EnhancedHeader } from './EnhancedHeader';
import '../improved-layout.css';

interface ImprovedWritingInterfaceProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (type: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: (started: boolean) => void;
  onSubmit: () => void;
  selectedText: string;
  onNavigate: (page: string) => void;
}

export function ImprovedWritingInterface({
  content,
  onChange,
  textType,
  assistanceLevel,
  onTextTypeChange,
  onAssistanceLevelChange,
  onTimerStart,
  onSubmit,
  selectedText,
  onNavigate
}: ImprovedWritingInterfaceProps) {
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');

  const sidebarContent = (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Quick Actions
        </h4>
        <button
          onClick={() => setActivePanel('coach')}
          className={`w-full p-3 text-left rounded-lg transition-colors ${
            activePanel === 'coach' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="font-medium">Writing Coach</div>
          <div className="text-xs text-gray-600">Get personalized guidance</div>
        </button>
        
        <button
          onClick={() => setActivePanel('paraphrase')}
          className={`w-full p-3 text-left rounded-lg transition-colors ${
            activePanel === 'paraphrase' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="font-medium">Paraphrase Tool</div>
          <div className="text-xs text-gray-600">Improve your sentences</div>
        </button>
      </div>

      {/* Writing Settings */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Settings
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Type
            </label>
            <select
              value={textType}
              onChange={(e) => onTextTypeChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="narrative">Narrative Writing</option>
              <option value="persuasive">Persuasive Writing</option>
              <option value="creative">Creative Writing</option>
              <option value="informative">Informative Writing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assistance Level
            </label>
            <select
              value={assistanceLevel}
              onChange={(e) => onAssistanceLevelChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimal">Minimal Assistance</option>
              <option value="moderate">Moderate Assistance</option>
              <option value="detailed">Detailed Assistance</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50">
      {/* Enhanced Header */}
      <EnhancedHeader 
        textType={textType}
        assistanceLevel={assistanceLevel}
        onTextTypeChange={onTextTypeChange}
        onAssistanceLevelChange={onAssistanceLevelChange}
        onTimerStart={onTimerStart}
      />

      {/* Main Layout */}
      <div className="h-[calc(100vh-64px)]">
        <SimplifiedLayout sidebarContent={sidebarContent}>
          <div className="flex h-full">
            {/* Main Writing Area */}
            <div className="flex-1">
              <ImprovedWritingArea
                content={content}
                onChange={onChange}
                textType={textType}
                onTimerStart={onTimerStart}
                onSubmit={onSubmit}
              />
            </div>

            {/* Right Panel - Coach or Paraphrase */}
            <div className="w-80 bg-white border-l border-gray-200">
              {activePanel === 'coach' ? (
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
        </SimplifiedLayout>
      </div>
    </div>
  );
}
