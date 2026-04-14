import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SmokeCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: string; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add new smoke particle
      const newParticle = {
        id: crypto.randomUUID(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main Cursor Dot */}
      <motion.div
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="w-4 h-4 bg-cannabis-light rounded-full shadow-[0_0_15px_rgba(163,230,53,0.8)]"
      />

      {/* Smoke Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.4, scale: 0.5, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: 2, 
              y: p.y - 50,
              x: p.x + (Math.random() - 0.5) * 30
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-6 h-6 bg-white/10 rounded-full blur-xl"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
