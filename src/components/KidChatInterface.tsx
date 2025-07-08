import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile, Star, Sparkles, Heart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface KidChatInterfaceProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
}

export function KidChatInterface({ initialMessages = [], onSendMessage }: KidChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Call the callback if provided
      if (onSendMessage) {
        onSendMessage(inputValue);
      }
      
      // Simulate assistant response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me help you with that.",
          "I love your creativity! Here's what I think...",
          "Wow, that's interesting! Let's explore that together.",
          "Great job! You're doing amazing with your writing!",
          "I'm here to help! Let's figure this out together."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const assistantMessage: Message = {
          id: Date.now().toString(),
          text: randomResponse,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-300 dark:border-blue-700 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 border-b-4 border-blue-300 dark:border-blue-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Chat with Your Writing Buddy!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ask questions or get help with your writing
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages Container with Scrolling */}
      <div 
        ref={containerRef}
        className="h-80 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Smile className="h-12 w-12 text-blue-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No messages yet! Ask me anything about writing!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`relative mb-4 max-w-[85%] ${
                message.sender === 'user' 
                  ? 'ml-auto bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl' 
                  : 'mr-auto bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-t-2xl rounded-br-2xl border-2 border-purple-200 dark:border-purple-800'
              } p-4 shadow-md`}
            >
              {/* Close Button */}
              <button 
                onClick={() => handleRemoveMessage(message.id)}
                className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full shadow-md transition-all duration-300 transform hover:scale-110 ${
                  message.sender === 'user'
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
                aria-label="Remove message"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Message Content */}
              <p className="break-words">{message.text}</p>
              
              {/* Message Footer */}
              <div className={`text-xs mt-2 ${
                message.sender === 'user' 
                  ? 'text-blue-200' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {message.sender === 'assistant' && (
                  <span className="ml-2 inline-flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    Writing Buddy
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t-4 border-blue-300 dark:border-blue-700">
        <div className="flex items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border-3 border-blue-300 dark:border-blue-700 rounded-2xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-400 bg-blue-50 dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}