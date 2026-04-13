import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, X } from 'lucide-react';

export default function FloatingGuru() {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState<string | null>(null);

  const tips = [
    "Check the Grow Analytics for real-time stats.",
    "Press '/' to search the grid's neural paths.",
    "Switch vibes to change the energy of the Socket.",
    "Remix community blueprints in the Social Forge.",
    "Track your eco-impact inside The Vault."
  ];

  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
    setTimeout(() => setTip(null), 5000);
  };

  return (
    <div className="fixed bottom-28 left-8 z-50">
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="absolute bottom-full left-0 mb-4 w-48 p-4 glass-morphism rounded-2xl border border-cannabis-light/30 shadow-2xl"
          >
            <p className="text-[10px] font-mono text-cannabis-light uppercase mb-2 flex items-center gap-1">
              <Sparkles size={10} /> Neural Tip
            </p>
            <p className="text-xs text-white/80 leading-relaxed">{tip}</p>
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-black/40 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={showTip}
        className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cannabis-light to-curiosity-purple p-1 shadow-[0_0_30px_rgba(163,230,53,0.3)] group"
      >
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
          <img 
            src="https://picsum.photos/seed/guru-avatar/100/100" 
            alt="AI Consultant" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cannabis-light/10 group-hover:bg-transparent transition-colors" />
        </div>
        
        {/* Status Ring */}
        <div className="absolute -inset-1 rounded-full border-2 border-cannabis-light/50 animate-spin-slow" />
        
        {/* Notification Dot */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-money-gold rounded-full border-2 border-black animate-pulse" />
      </motion.button>
    </div>
  );
}
