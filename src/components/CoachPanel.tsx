// CoachPanel.tsx - Key fixes needed

// 1. ADD MISSING STATE VARIABLE
// Around line 51, add this missing state variable:
const [question, setQuestion] = useState('');

// 2. REPLACE THE CHAT FUNCTIONALITY STATE SECTION
// Replace the existing chat state section with this unified version:
// Chat functionality state
const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
const [chatInput, setChatInput] = useState('');
const [isChatLoading, setIsChatLoading] = useState(false);
const [showPrompts, setShowPrompts] = useState(false);
const [question, setQuestion] = useState('');
const chatMessagesEndRef = useRef<HTMLDivElement>(null);

// 3. REPLACE THE ENTIRE handleChatSubmit FUNCTION
// Replace the existing handleChatSubmit function with this unified version:
const handleChatSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (chatInput.trim()) {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput.trim();
    setChatInput('');
    setIsChatLoading(true);
    setShowPrompts(false);

    try {
      const userQueryText = `Question about my ${textType} writing: ${currentInput}\n\nCurrent text: ${content}`;
      const response = await getWritingFeedback(userQueryText, textType, localAssistanceLevel, feedbackHistory);
      
      let botResponseText = '';
      if (response && response.feedbackItems && response.feedbackItems.length > 0) {
        botResponseText = response.feedbackItems[0].text;
      } else if (response && response.overallComment) {
        botResponseText = response.overallComment;
      } else {
        botResponseText = `Great question about ${textType} writing! Keep practicing and focus on the key elements like structure, vocabulary, and engaging your reader.`;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);

      // Also add to feedback if it's a substantial response
      if (response && response.feedbackItems) {
        const questionFeedbackItem: FeedbackItem = {
            type: 'question',
            area: 'Chat Question',
            text: `You asked: ${currentInput}`
        };
        const answerItems = response.feedbackItems.map(item => ({...item, area: `Answer: ${currentInput.substring(0, 30)}...`}));
        
        setFeedbackHistory(prevHistory => [...prevHistory, questionFeedbackItem, ...answerItems.filter(item => 
            !prevHistory.some(histItem => histItem.text === item.text && histItem.area === item.area)
          )]);
      }

    } catch (error) {
      const aiError = AIErrorHandler.handleError(error, 'chat processing');
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `I'm having trouble right now, but keep writing! Focus on making your ${textType} clear and engaging.`,
        isUser: false,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  }
};

// 4. REMOVE THE OLD handleQuestionSubmit FUNCTION
// Delete the entire handleQuestionSubmit function as it's now merged into handleChatSubmit
