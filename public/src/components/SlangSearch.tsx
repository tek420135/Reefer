import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Zap, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function SlangSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const suggestions = [
    'How to optimize my eco-grid?',
    'Best 3D printed grow tools?',
    'Eco-friendly sustainable sourcing',
    'Neural sync activation',
    'Automated grow room design',
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-32 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              className="w-full max-w-2xl glass-morphism rounded-3xl border border-white/20 p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-white/40" size={20} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask the AI Consultant... (Press ESC to close)"
                  className="w-full bg-white/5 border-none rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-cannabis-light text-lg font-sans"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Trending in the Cipher</p>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(s)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl hover:bg-cannabis-light hover:text-cannabis-dark transition-all flex items-center justify-between group"
                    )}
                  >
                    <span className="text-sm font-medium">{s}</span>
                    <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Hint */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 glass-morphism rounded-full border border-white/10 text-[10px] font-mono text-white/40 z-40 pointer-events-none"
        >
          PRESS <span className="text-cannabis-light font-bold">/</span> TO SEARCH THE GRID
        </motion.div>
      )}
    </>
  );
}
