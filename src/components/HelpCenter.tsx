import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Book, Info, Search, Volume2, Keyboard, Save, X, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

type HelpSection = 'glossary' | 'keyboard' | 'guides' | 'accessibility';

// Writing terms glossary
const glossaryTerms = [
  {
    term: 'Narrative',
    definition: 'A story that includes characters, setting, plot, conflict, and resolution.',
    example: 'Example: "The old wooden door creaked as Sarah pushed it open, revealing a hidden garden that hadn\'t been touched in decades."'
  },
  {
    term: 'Persuasive',
    definition: 'Writing that tries to convince the reader to agree with your opinion or take a specific action.',
    example: 'Example: "Schools should provide free healthy lunches because proper nutrition is essential for learning."'
  },
  {
    term: 'Expository',
    definition: 'Writing that explains or informs about a topic using facts and examples.',
    example: 'Example: "Photosynthesis is the process plants use to convert sunlight into energy."'
  },
  {
    term: 'Thesis Statement',
    definition: 'A sentence that states the main idea or argument of your essay.',
    example: 'Example: "Regular exercise improves both physical health and mental wellbeing."'
  },
  {
    term: 'Topic Sentence',
    definition: 'The first sentence of a paragraph that introduces the main idea of that paragraph.',
    example: 'Example: "One major benefit of recycling is the reduction of waste in landfills."'
  },
  {
    term: 'Supporting Evidence',
    definition: 'Facts, examples, statistics, or quotes that back up your main points.',
    example: 'Example: "According to a 2023 study by Sydney University, students who read daily scored 15% higher on comprehension tests."'
  },
  {
    term: 'Conclusion',
    definition: 'The final paragraph that summarizes your main points and restates your thesis.',
    example: 'Example: "In summary, reducing plastic use, recycling regularly, and supporting eco-friendly companies are three effective ways individuals can help protect our oceans."'
  },
  {
    term: 'Imagery',
    definition: 'Descriptive language that creates pictures in the reader\'s mind using the five senses.',
    example: 'Example: "The sticky, sweet smell of mangoes filled the kitchen as juice dribbled down my fingers."'
  },
  {
    term: 'Simile',
    definition: 'A comparison between two different things using "like" or "as".',
    example: 'Example: "Her explanation was as clear as glass."'
  },
  {
    term: 'Metaphor',
    definition: 'A comparison between two things that says one thing IS another thing.',
    example: 'Example: "Time is a thief, stealing our moments when we\'re not looking."'
  },
  {
    term: 'Personification',
    definition: 'Giving human qualities to non-human things.',
    example: 'Example: "The wind whispered through the trees."'
  },
  {
    term: 'Alliteration',
    definition: 'Repetition of the same sound at the beginning of nearby words.',
    example: 'Example: "She sells seashells by the seashore."'
  },
  {
    term: 'Onomatopoeia',
    definition: 'Words that sound like the noise they describe.',
    example: 'Example: "The bees buzzed around the flowers."'
  },
  {
    term: 'Foreshadowing',
    definition: 'Hints about what will happen later in the story.',
    example: 'Example: "Dark clouds gathered on the horizon as they set out on their journey."'
  },
  {
    term: 'Dialogue',
    definition: 'The words spoken by characters in a story, usually inside quotation marks.',
    example: 'Example: "I\'ve never seen anything like this before," whispered Sam.'
  }
];

// Keyboard shortcuts
const keyboardShortcuts = [
  { key: 'Ctrl + S', description: 'Save your work' },
  { key: 'Ctrl + Z', description: 'Undo last action' },
  { key: 'Ctrl + Y', description: 'Redo last action' },
  { key: 'Ctrl + B', description: 'Bold text' },
  { key: 'Ctrl + I', description: 'Italic text' },
  { key: 'Ctrl + U', description: 'Underline text' },
  { key: 'Tab', description: 'Move to next input field' },
  { key: 'Shift + Tab', description: 'Move to previous input field' },
  { key: 'Alt + H', description: 'Open Help Center' },
  { key: 'Esc', description: 'Close popup or cancel action' },
  { key: 'Ctrl + F', description: 'Find text in your writing' },
  { key: 'Ctrl + Home', description: 'Go to beginning of document' },
  { key: 'Ctrl + End', description: 'Go to end of document' },
  { key: 'Alt + C', description: 'Switch to Coach panel' },
  { key: 'Alt + P', description: 'Switch to Paraphrase panel' },
  { key: 'Alt + T', description: 'Start/stop timer' }
];

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
  const [activeSection, setActiveSection] = useState<HelpSection>('guides');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGlossary, setFilteredGlossary] = useState(glossaryTerms);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
    
    // Clean up any ongoing speech when component unmounts
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  // Filter glossary terms based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = glossaryTerms.filter(
        item => 
          item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGlossary(filtered);
    } else {
      setFilteredGlossary(glossaryTerms);
    }
  }, [searchTerm]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close help center on Escape key
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      
      // Alt+H to toggle help center
      if (e.altKey && e.key === 'h') {
        if (isOpen) {
          onClose();
        } else {
          // This would need to be handled by the parent component
          // as we can't directly open from here
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Text-to-speech function
  const speakText = (text: string) => {
    if (speechSynthesisRef.current) {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1;
      
      // Set voice to a child-friendly one if available
      const voices = speechSynthesisRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Kid') || 
        voice.name.includes('Child')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesisRef.current.speak(utterance);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Tour steps
  const tourSteps = [
    {
      title: "Welcome to NSW Selective Essay Coach!",
      content: "This guided tour will help you learn how to use all the features of this writing tool. Click 'Next' to continue.",
      target: "body", // General target
      position: "center"
    },
    {
      title: "Writing Area",
      content: "This is where you'll write your essay. The text area provides spell checking and formatting options.",
      target: ".writing-area", // Class name of the writing area
      position: "right"
    },
    {
      title: "Text Type Selector",
      content: "Choose what type of writing you're working on - narrative, persuasive, expository, and more.",
      target: ".text-type-selector", // Class name of the selector
      position: "bottom"
    },
    {
      title: "Coach Panel",
      content: "Get real-time feedback on your writing. The coach will suggest improvements for spelling, grammar, vocabulary, and structure.",
      target: ".coach-panel", // Class name of the coach panel
      position: "left"
    },
    {
      title: "Timer",
      content: "Practice writing under time constraints, just like in the real exam.",
      target: ".timer", // Class name of the timer
      position: "bottom"
    },
    {
      title: "Learning Resources",
      content: "Access writing guides, example essays, and exam strategies to improve your skills.",
      target: ".learning-nav", // Class name of the learning navigation
      position: "right"
    },
    {
      title: "Help Center",
      content: "You can always open this Help Center by clicking the help icon or pressing Alt+H on your keyboard.",
      target: ".help-button", // Class name of the help button
      position: "bottom"
    },
    {
      title: "You're Ready!",
      content: "Now you know how to use the NSW Selective Essay Coach. Happy writing!",
      target: "body", // General target
      position: "center"
    }
  ];

  // Render guided tour
  const renderTour = () => {
    if (!showTour) return null;
    
    const currentStep = tourSteps[currentTourStep];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{currentStep.title}</h3>
            <button 
              onClick={() => setShowTour(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">{currentStep.content}</p>
          
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (currentTourStep > 0) {
                  setCurrentTourStep(currentTourStep - 1);
                }
              }}
              disabled={currentTourStep === 0}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 inline mr-1" />
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentTourStep + 1} of {tourSteps.length}
            </div>
            
            {currentTourStep < tourSteps.length - 1 ? (
              <button
                onClick={() => setCurrentTourStep(currentTourStep + 1)}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
                <ChevronRight className="h-4 w-4 inline ml-1" />
              </button>
            ) : (
              <button
                onClick={() => setShowTour(false)}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render guides section
  const renderGuides = () => (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Writing Guides & Help</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Getting Started</h4>
          <div className="bg-blue-50 rounded-md p-4 mb-3">
            <p className="text-blue-800 mb-2">
              Welcome to the NSW Selective Essay Coach! This tool will help you prepare for the writing section of the NSW Selective School Test.
            </p>
            <button 
              onClick={() => {
                setShowTour(true);
                setCurrentTourStep(0);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <Info className="h-4 w-4 mr-1" />
              Start Guided Tour
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <h5 className="font-medium text-gray-700">How to Use the Writing Area</h5>
                <button 
                  onClick={() => speakText("The writing area is where you'll create your essay. Click inside the box and start typing. Use the toolbar above for formatting options.")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">
                  The writing area is where you'll create your essay. Click inside the box and start typing. Use the toolbar above for formatting options.
                </p>
                <img 
                  src="https://placehold.co/600x200?text=Writing+Area+Diagram" 
                  alt="Writing Area Diagram" 
                  className="w-full h-auto rounded-md border"
                />
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <h5 className="font-medium text-gray-700">Using the Coach Panel</h5>
                <button 
                  onClick={() => speakText("The Coach Panel provides real-time feedback on your writing. It will suggest improvements for spelling, grammar, vocabulary, and structure.")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">
                  The Coach Panel provides real-time feedback on your writing. It will suggest improvements for spelling, grammar, vocabulary, and structure.
                </p>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Green highlights indicate good writing</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Yellow highlights suggest possible improvements</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Red highlights indicate errors that need correction</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <h5 className="font-medium text-gray-700">Saving Your Work</h5>
                <button 
                  onClick={() => speakText("Your work is automatically saved every 30 seconds. You can also manually save by pressing Ctrl+S on your keyboard.")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <Save className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-sm">
                    Your work is automatically saved every 30 seconds. You can also manually save by pressing <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl+S</kbd> on your keyboard.
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                  <strong>Note:</strong> Your work is saved in your browser. If you clear your browser data or use a different device, you won't see your saved work.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Writing Tips</h4>
          <div className="space-y-3">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h5 className="font-medium text-gray-700">Planning Your Essay</h5>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  Always spend 5-7 minutes planning before you start writing. A good plan helps you organize your thoughts and write more effectively.
                </p>
                <img 
                  src="https://placehold.co/600x300?text=Essay+Planning+Diagram" 
                  alt="Essay Planning Diagram" 
                  className="w-full h-auto rounded-md border mb-2"
                />
                <p className="text-gray-600 text-sm">
                  Use the Planning Templates in the Exam Strategies section to help structure your ideas.
                </p>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h5 className="font-medium text-gray-700">Improving Vocabulary</h5>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  Using varied and precise vocabulary will make your writing more engaging and impressive.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-red-50 p-2 rounded-md">
                    <p className="text-sm font-medium text-red-700">Instead of:</p>
                    <ul className="text-sm text-red-600 list-disc list-inside">
                      <li>good</li>
                      <li>bad</li>
                      <li>happy</li>
                      <li>sad</li>
                      <li>said</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-2 rounded-md">
                    <p className="text-sm font-medium text-green-700">Try using:</p>
                    <ul className="text-sm text-green-600 list-disc list-inside">
                      <li>excellent, superb, outstanding</li>
                      <li>terrible, dreadful, appalling</li>
                      <li>delighted, ecstatic, overjoyed</li>
                      <li>miserable, dejected, despondent</li>
                      <li>exclaimed, whispered, muttered</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Use the Paraphrase feature to find alternative ways to express your ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render glossary section
  const renderGlossary = () => (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Writing Terms Glossary</h3>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a term..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {filteredGlossary.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No terms found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGlossary.map((item, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <h4 className="font-medium text-gray-900">{item.term}</h4>
                <button 
                  onClick={() => speakText(`${item.term}. ${item.definition} ${item.example}`)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-2">{item.definition}</p>
                <p className="text-sm text-blue-600 italic">{item.example}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render keyboard shortcuts section
  const renderKeyboardShortcuts = () => (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Keyboard Shortcuts</h3>
      
      <p className="text-gray-600 mb-4">
        Use these keyboard shortcuts to navigate and use the NSW Selective Essay Coach more efficiently.
      </p>
      
      <div className="border rounded-md overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shortcut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keyboardShortcuts.map((shortcut, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <kbd className="px-2 py-1 bg-gray-100 rounded border text-sm">{shortcut.key}</kbd>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shortcut.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-800 mb-2">Accessibility Navigation</h4>
        <p className="text-blue-700 mb-3">
          You can navigate through all elements of this application using just your keyboard:
        </p>
        <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
          <li>Use <kbd className="px-1 py-0.5 bg-blue-100 rounded border">Tab</kbd> to move forward through interactive elements</li>
          <li>Use <kbd className="px-1 py-0.5 bg-blue-100 rounded border">Shift+Tab</kbd> to move backward</li>
          <li>Use <kbd className="px-1 py-0.5 bg-blue-100 rounded border">Enter</kbd> or <kbd className="px-1 py-0.5 bg-blue-100 rounded border">Space</kbd> to activate buttons</li>
          <li>Use <kbd className="px-1 py-0.5 bg-blue-100 rounded border">Arrow keys</kbd> to navigate within components like dropdowns</li>
        </ul>
      </div>
    </div>
  );

  // Render accessibility section
  const renderAccessibility = () => (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility Features</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Text-to-Speech</h4>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4">
              <p className="text-gray-600 mb-3">
                The text-to-speech feature allows you to listen to instructions, examples, and your own writing.
              </p>
              
              <div className="bg-gray-50 p-3 rounded-md mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-1">How to use text-to-speech:</h5>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>Look for the <Volume2 className="h-4 w-4 inline mx-1" /> icon next to text</li>
                  <li>Click the icon to hear the text read aloud</li>
                  <li>Click again to stop the audio</li>
                </ol>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Try it out:</h5>
                  <p className="text-gray-600 text-sm">
                    Click the speaker icon to hear this paragraph read aloud.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    if (isSpeaking) {
                      stopSpeaking();
                    } else {
                      speakText("Click the speaker icon to hear this paragraph read aloud. The text-to-speech feature allows you to listen to instructions, examples, and your own writing.");
                    }
                  }}
                  className={`p-2 rounded-full ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80`}
                >
                  {isSpeaking ? <X className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Visual Aids</h4>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4">
              <p className="text-gray-600 mb-3">
                Visual aids help explain writing concepts through diagrams, illustrations, and color coding.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Essay Structure Diagram</h5>
                  <img 
                    src="https://placehold.co/400x300?text=Essay+Structure+Diagram" 
                    alt="Essay Structure Diagram" 
                    className="w-full h-auto rounded-md border"
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Paragraph Structure</h5>
                  <img 
                    src="https://placehold.co/400x300?text=Paragraph+Structure+Diagram" 
                    alt="Paragraph Structure Diagram" 
                
                    className="w-full h-auto rounded-md border"
                  />
                </div>
              </div>
              
              <p className="text-gray-600 text-sm">
                You'll find visual aids throughout the learning resources to help you understand writing concepts more easily.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Display Settings</h4>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Text Size</h5>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                      A<span className="text-xs">-</span>
                    </button>
                    <button className="p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                      A
                    </button>
                    <button className="p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                      A<span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Color Mode</h5>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50">
                      Light
                    </button>
                    <button className="px-3 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700">
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {renderTour()}
      
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40" onClick={onClose}></div>
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
            Help Center
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeSection === 'guides'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('guides')}
          >
            Guides
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeSection === 'glossary'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('glossary')}
          >
            Glossary
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeSection === 'keyboard'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('keyboard')}
          >
            Keyboard
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeSection === 'accessibility'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSection('accessibility')}
          >
            Accessibility
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === 'guides' && renderGuides()}
          {activeSection === 'glossary' && renderGlossary()}
          {activeSection === 'keyboard' && renderKeyboardShortcuts()}
          {activeSection === 'accessibility' && renderAccessibility()}
        </div>
        
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setShowTour(true);
                setCurrentTourStep(0);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <Info className="h-4 w-4 mr-1" />
              Start Guided Tour
            </button>
            
            <a 
              href="https://education.nsw.gov.au/public-schools/selective-high-schools-and-opportunity-classes/year-7/the-test" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              NSW Selective Test Info
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}