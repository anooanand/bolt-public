import React, { useRef, useState } from 'react';
import { Volume2, X } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  children?: React.ReactNode;
  buttonClassName?: string;
  iconClassName?: string;
}

export function TextToSpeech({ 
  text, 
  children, 
  buttonClassName = "text-gray-500 hover:text-gray-700", 
  iconClassName = "h-4 w-4" 
}: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech synthesis if not already done
  if (typeof window !== 'undefined' && !speechSynthesisRef.current) {
    speechSynthesisRef.current = window.speechSynthesis;
  }

  // Text-to-speech function
  const speakText = () => {
    if (speechSynthesisRef.current) {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();
      
      // If we were already speaking, just stop
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      
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

  return (
    <>
      {children ? (
        <div className="flex items-start">
          <div className="flex-1">{children}</div>
          <button 
            onClick={speakText}
            className={buttonClassName}
            aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
            title={isSpeaking ? "Stop speaking" : "Read text aloud"}
          >
            {isSpeaking ? (
              <X className={iconClassName} />
            ) : (
              <Volume2 className={iconClassName} />
            )}
          </button>
        </div>
      ) : (
        <button 
          onClick={speakText}
          className={buttonClassName}
          aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
          title={isSpeaking ? "Stop speaking" : "Read text aloud"}
        >
          {isSpeaking ? (
            <X className={iconClassName} />
          ) : (
            <Volume2 className={iconClassName} />
          )}
        </button>
      )}
    </>
  );
}