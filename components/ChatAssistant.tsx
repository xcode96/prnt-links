import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, SendIcon, LogoIcon } from './icons';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => Promise<string>;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'bot', text: "Hello! I'm your CyberSec assistant. How can I help you today?" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponse = await onSendMessage(input);
    const botMessage: Message = { text: botResponse, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black/50" onClick={onClose}>
      <div 
        className="flex flex-col w-full max-w-md h-[70vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <LogoIcon className="w-6 h-6 text-cyan-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">AI Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0"><LogoIcon className="w-5 h-5"/></div>}
              <div className={`p-3 rounded-xl max-w-sm ${msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0"><LogoIcon className="w-5 h-5"/></div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 rounded-bl-none">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about cybersecurity..."
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-3 pl-4 pr-12 text-sm"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-slate-400">
                <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatAssistant;
