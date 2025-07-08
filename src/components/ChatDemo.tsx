import React from 'react';
import { ChatInterface } from './ChatInterface';

export function ChatDemo() {
  // Sample initial messages
  const initialMessages = [
    {
      id: '1',
      text: "Hi there! I'm your writing buddy. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      text: "I'm trying to write a story about a dragon, but I'm stuck. Can you help me?",
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
    },
    {
      id: '3',
      text: "That sounds like a fun story! What kind of dragon is it? Is it friendly or scary? Maybe you could start by describing what your dragon looks like!",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
    }
  ];

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // In a real app, you would send this message to your backend or API
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Chat with Your Writing Buddy!
      </h1>
      <ChatInterface 
        initialMessages={initialMessages} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}