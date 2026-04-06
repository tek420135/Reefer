import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, Volume2, Music, Radio, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function LofiRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks = [
    { title: "Midnight Haze", artist: "Guru Beats", duration: "4:20" },
    { title: "Sticky Fingers", artist: "The Socket", duration: "3:15" },
    { title: "Digital Resin", artist: "Code Red", duration: "5:00" },
    { title: "Gravity Gone", artist: "Meta Flow", duration: "4:04" }
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % tracks.length);

  return (
    <div className="fixed bottom-8 left-32 z-50">
      <motion.div
        layout
        className={cn(
          "glass-morphism rounded-3xl border border-cannabis-light/20 shadow-2xl overflow-hidden flex items-center transition-all",
          isExpanded ? "p-4 gap-4 w-72" : "p-2 w-16 h-16 justify-center"
        )}
      >
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-2xl bg-cannabis-light/10 flex items-center justify-center shrink-0 hover:bg-cannabis-light/20 transition-colors"
        >
          {isExpanded ? <Radio size={20} className="text-cannabis-light" /> : <Music size={20} className="text-cannabis-light" />}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 min-w-0"
            >
              <div className="mb-2">
                <p className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest mb-0.5">Now Playing</p>
                <h4 className="text-sm font-bold truncate">{tracks[currentTrack].title}</h4>
                <p className="text-[10px] text-white/40 truncate">{tracks[currentTrack].artist}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button onClick={nextTrack} className="p-2 hover:text-cannabis-light transition-colors">
                  <SkipForward size={16} />
                </button>
                
                {/* Visualizer */}
                <div className="flex items-end gap-0.5 h-4 flex-1 justify-end">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isPlaying ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 bg-cannabis-light/40 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  animate={isPlaying ? { width: '100%' } : { width: '30%' }}
                  transition={{ duration: 260, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cannabis-light to-money-gold"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating "Vibe" Particles */}
      {isPlaying && (
        <div className="absolute -top-4 left-0 w-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={{ y: -40, opacity: [0, 0.5, 0], scale: [0.5, 1.2, 0.8] }}
              transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <Music size={12} className="text-cannabis-light/30" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
