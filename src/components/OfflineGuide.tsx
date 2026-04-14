import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Code, Download, Zap, ShieldCheck } from 'lucide-react';

interface OfflineGuideProps {
  onClose: () => void;
}

export default function OfflineGuide({ onClose }: OfflineGuideProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl glass-morphism rounded-[48px] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
            {/* Sidebar Info */}
            <div className="w-full md:w-72 bg-cannabis-light p-8 flex flex-col justify-between text-cannabis-dark">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-cannabis-dark/20 rounded-2xl flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-3xl font-display font-black uppercase leading-none">The Offline Blueprint</h3>
                <p className="text-sm font-medium opacity-80">Take the grid with you. Develop, design, and grow anywhere.</p>
              </div>
              
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} /> Encrypted Sync
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest">
                  <Zap size={14} /> Instant Load
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 space-y-8 overflow-y-auto max-h-[80vh] scrollbar-hide">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-2xl font-display font-bold uppercase">Installation Guide</h4>
                  <p className="text-sm text-white/40 font-mono uppercase tracking-widest">v1.0.42-STABLE</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-money-gold">
                    <Smartphone size={20} />
                    <h5 className="font-bold uppercase">PWA Mode</h5>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Install the Socket as a native app on your Android. Works perfectly in airplane mode with full AR support.
                  </p>
                  <ol className="text-xs text-white/40 space-y-2 list-decimal list-inside">
                    <li>Open in Chrome</li>
                    <li>Tap Menu (3 dots)</li>
                    <li>Add to Home Screen</li>
                  </ol>
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-curiosity-purple">
                    <Code size={20} />
                    <h5 className="font-bold uppercase">Dev Environment</h5>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Run the full stack on Termux + Acode. Edit blueprints and see changes live without a laptop.
                  </p>
                  <button className="text-[10px] font-mono text-curiosity-purple uppercase tracking-widest hover:underline">
                    View Termux Commands
                  </button>
                </div>
              </div>

              <div className="p-8 bg-cannabis-light/10 rounded-[32px] border border-cannabis-light/20 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-cannabis-light/20 rounded-2xl flex items-center justify-center text-cannabis-light shrink-0">
                  <Download size={32} />
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold uppercase">Download Offline Bundle</h5>
                  <p className="text-sm text-white/60">Get the full project ZIP including the single-file build engine.</p>
                </div>
                <button className="px-6 py-3 bg-cannabis-light text-cannabis-dark font-bold rounded-xl hover:scale-105 transition-transform ml-auto">
                  DOWNLOAD
                </button>
              </div>
            </div>
          </motion.div>
        </div>
  );
}
