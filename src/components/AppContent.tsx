<Route path="/writing" element={
  <WritingAccessCheck onNavigate={handleNavigation}>
    <div className="flex flex-col h-screen">
      <EnhancedHeader 
        textType={textType}
        assistanceLevel={assistanceLevel}
        onTextTypeChange={setTextType}
        onAssistanceLevelChange={setAssistanceLevel}
        onTimerStart={() => setTimerStarted(true)}
      />
      
      <WritingToolbar 
        content={content}
        textType={textType}
        onShowHelpCenter={() => setShowHelpCenter(true)}
        onShowPlanningTool={() => setShowPlanningTool(true)}
        onTimerStart={() => setTimerStarted(true)}
      />
      
      {showExamMode ? (
        <ExamSimulationMode 
          onExit={() => setShowExamMode(false)}
        />
      ) : (
        <>
          <div className="flex-1 container mx-auto px-4">
            <SplitScreen>
              <WritingArea 
                content={content}
                onChange={setContent}
                textType={textType}
                onTimerStart={setTimerStarted}
                onSubmit={handleSubmit}
              />
              {activePanel === 'coach' ? (
                <CoachPanel 
                  content={content}
                  textType={textType}
                  assistanceLevel={assistanceLevel}
                />
              ) : (
                <ParaphrasePanel 
                  selectedText={selectedText}
                  onNavigate={handleNavigation}
                />
              )}
            </SplitScreen>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center items-center space-x-4">
            <button
              onClick={() => setActivePanel('coach')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activePanel === 'coach' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Coach
            </button>
            <button
              onClick={() => setActivePanel('paraphrase')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activePanel === 'paraphrase' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Paraphrase
            </button>
          </div>
        </>
      )}
    </div>
  </WritingAccessCheck>
} />