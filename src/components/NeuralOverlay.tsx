import React from 'react';
import { motion } from 'motion/react';
import { useSocketContext } from '../context/SocketContext';

export default function NeuralOverlay() {
  const { vibe, isWarping } = useSocketContext();

  const colors = {
    willie: 'rgba(251, 191, 36, 0.05)',
    snoop: 'rgba(163, 230, 53, 0.05)',
    bruce: 'rgba(239, 68, 68, 0.05)',
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Vibe Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: isWarping ? 1.2 : 1
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: colors[vibe] }}
      />

      {/* Glitch Artifacts (Randomly appearing) */}
      {isWarping && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 0.8, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white/10 backdrop-invert"
        />
      )}

      {/* Neural Grid Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cannabis-light/20 to-transparent animate-scan" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-money-gold/20 to-transparent animate-scan-reverse" />
    </div>
  );
}
