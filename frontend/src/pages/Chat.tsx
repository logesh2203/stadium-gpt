import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Trash2, Bot, User, Sparkles, Mic, Square, Volume2, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { endpoints } from '../api/config';

// We rely on @types/dom-speech-recognition for Speech API types

const SUGGESTED_QUESTIONS = [
  "Where is Gate A?",
  "Where is the nearest restroom?",
  "Show food court.",
  "Which gate has less crowd?",
  "Translate this to Kannada."
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi there! I am your Stadium Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const initSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSpeechError('Speech recognition is not supported in this browser.');
      return null;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setSpeechError('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
      
      switch (event.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          setSpeechError('Microphone permission denied. Please allow access.');
          break;
        case 'no-speech':
          setSpeechError('No speech detected. Please try again.');
          break;
        case 'network':
          setSpeechError('Network error occurred during speech recognition.');
          break;
        default:
          setSpeechError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return recognition;
  }, []);

  const toggleRecording = () => {
    setSpeechError('');
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = initSpeechRecognition();
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error("Error starting recognition", error);
        }
      }
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeechError('Text-to-speech is not supported in this browser.');
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Connect to FastAPI Backend
      const response = await fetch(endpoints.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I am having trouble connecting to the server. Falling back to local responses..."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: '1', role: 'assistant', content: 'Chat history cleared. How can I help?' }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex items-center gap-2">
          <Bot className="text-blue-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Stadium AI</h2>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 relative group ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speakText(msg.content)}
                  className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800"
                  title="Read aloud"
                >
                  <Volume2 size={16} />
                </button>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <User size={16} className="text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="flex items-center gap-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors"
              >
                <Sparkles size={12} className="text-blue-500" />
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        
        {speechError && (
          <div className="mb-3 flex items-center justify-between gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{speechError}</span>
            </div>
            <button onClick={() => setSpeechError('')} className="text-red-400 hover:text-red-600 dark:hover:text-red-300">
              &times;
            </button>
          </div>
        )}

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-end gap-2 relative"
        >
          <button
            type="button"
            onClick={toggleRecording}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
            className={`p-3.5 rounded-xl transition-colors shrink-0 flex items-center justify-center ${
              isRecording 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isRecording ? <Square size={20} className="fill-current" /> : <Mic size={20} />}
          </button>

          <input
            type="text"
            aria-label="Chat input message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Listening..." : "Ask about gates, food, restrooms..."}
            className={`flex-1 bg-gray-50 dark:bg-gray-800 border-none outline-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white transition-colors ${
              isRecording ? 'bg-red-50/50 dark:bg-red-900/10 placeholder-red-400/70' : ''
            }`}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || isLoading}
            className="p-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl transition-colors shrink-0"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
