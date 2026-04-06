import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WarpPortalProps {
  active: boolean;
}

export default function WarpPortal({ active }: WarpPortalProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Warp Rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: '200vw', height: '200vw', opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className="absolute rounded-full border-[20px] border-cannabis-light/30"
            />
          ))}
          
          {/* Glitch Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white/20 backdrop-invert"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
