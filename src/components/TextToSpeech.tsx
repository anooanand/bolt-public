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
      
      if (!isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        speechSynthesisRef.current.speak(utterance);
        setIsSpeaking(true);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  return (
    <button
      onClick={speakText}
      className={buttonClassName}
      aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
    >
      {children || (
        isSpeaking ? (
          <X className={iconClassName} />
        ) : (
          <Volume2 className={iconClassName} />
        )
      )}
    </button>
  );
}
