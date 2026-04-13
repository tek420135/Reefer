import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Paperclip, X, FileText, Loader2, Leaf, Zap, Sparkles } from 'lucide-react';
import { chatWithGanjaGuru } from '@/src/lib/gemini';
import { Message } from '@/src/types';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/src/lib/utils';

export default function GanjaGuruChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: string; data: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Yo, your browser doesn't support voice recognition yet, fam.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim() && !attachedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      file: attachedFile ? { ...attachedFile } : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const fileData = userMessage.file ? {
      data: userMessage.file.data.split(',')[1],
      mimeType: userMessage.file.type
    } : undefined;

    let response = "";
    if (!isOnline) {
      response = "Yo, the Socket's neural link is offline. I'm currently meditating in the digital ether. Plug back into the grid to chat, fam.";
    } else {
      response = await chatWithGanjaGuru(userMessage.content, history, fileData) || "Yo, my frequency got jammed. Say that again?";
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: response,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedFile({
        name: file.name,
        type: file.type || 'text/plain',
        size: file.size,
        data: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto glass-morphism rounded-3xl overflow-hidden wacky-border shadow-2xl relative z-10">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cannabis-dark/20 relative overflow-hidden">
        {/* Neural Link Animation */}
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cannabis-light to-transparent opacity-30"
        />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-cannabis-light rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)] relative">
            <Leaf className="text-cannabis-dark" size={24} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-cannabis-light"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-cannabis-light text-lg">AI Consultant</h3>
            <p className="text-xs text-white/50 font-mono">Eco-Grid Sync: Active • {messages.length} Packets Synced</p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10">
          <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-money-gold rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-curiosity-purple rounded-full animate-pulse delay-150" />
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
            <Sparkles className="text-money-gold w-12 h-12 animate-bounce" />
            <h4 className="text-2xl font-jazzy italic">"How can I optimize your eco-grid today?"</h4>
            <p className="max-w-xs text-sm">Upload blueprints, ask about sustainable grow designs, or consult on automated cultivation.</p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl shadow-lg",
                msg.role === 'user' 
                  ? "bg-curiosity-purple text-white rounded-tr-none" 
                  : "bg-white/10 text-white rounded-tl-none border border-white/10"
              )}>
                {msg.file && (
                  <div className="mb-3 p-2 bg-black/30 rounded-lg flex items-center gap-3 border border-white/10">
                    <FileText className="text-cannabis-light" size={20} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono truncate">{msg.file.name}</p>
                      <p className="text-[10px] text-white/40">{(msg.file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                )}
                <div className="prose prose-invert prose-sm max-w-none font-sans">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              <span className="text-[10px] text-white/30 mt-1 font-mono">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-cannabis-light font-mono text-[10px] uppercase tracking-widest"
          >
            <div className="flex gap-1">
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 h-3 bg-cannabis-light" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-1 h-3 bg-cannabis-light" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }} className="w-1 h-3 bg-cannabis-light" />
            </div>
            <span>Deciphering the eco-frequency...</span>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        {attachedFile && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-3 p-2 bg-cannabis-dark/30 rounded-xl flex items-center justify-between border border-cannabis-light/30"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="text-cannabis-light shrink-0" size={16} />
              <span className="text-xs truncate font-mono">{attachedFile.name}</span>
            </div>
            <button 
              onClick={() => setAttachedFile(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
        
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Consult the AI or upload a blueprint..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-12 focus:outline-none focus:border-cannabis-light transition-all resize-none max-h-32 min-h-[56px] font-sans text-sm"
              rows={1}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 bottom-3 p-1.5 text-white/40 hover:text-cannabis-light transition-colors"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".txt,.pdf,.csv,.json,.md,.sh,.py,.html,.css,.js"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={startListening}
              className={cn(
                "p-3 rounded-xl transition-all border border-white/10",
                isListening ? "bg-cannabis-light text-cannabis-dark animate-pulse" : "bg-white/5 text-white/60 hover:text-curiosity-purple"
              )}
              title="Voice Input"
            >
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim() && !attachedFile}
              className={cn(
                "p-3 rounded-xl transition-all shadow-lg",
                input.trim() || attachedFile 
                  ? "bg-cannabis-light text-cannabis-dark hover:scale-105" 
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              )}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
