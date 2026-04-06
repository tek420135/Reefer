import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Palette, Maximize2, RotateCcw, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';

export default function DesignStudio() {
  const [color, setColor] = useState('#a3e635');
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const { plugIn } = useSocketContext();

  const colors = [
    { name: 'Cannabis Green', hex: '#a3e635' },
    { name: 'Money Gold', hex: '#fbbf24' },
    { name: 'Purple Haze', hex: '#7c3aed' },
    { name: 'Midnight Black', hex: '#1a1a1a' },
    { name: 'Frosty White', hex: '#f8fafc' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-8 glass-morphism rounded-[40px] border-4 border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-cannabis-light/20 rounded-full border border-cannabis-light/30">
          <span className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-cannabis-light uppercase">3DPoD Engine v4.2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Preview Area */}
        <div className="relative aspect-square glass-morphism rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden bg-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1)_0%,transparent_70%)]" />
          
          <motion.div
            animate={{ 
              rotateY: rotation,
              scale: scale,
            }}
            transition={{ type: 'spring', stiffness: 50 }}
            style={{ color }}
            className="relative z-10 drop-shadow-[0_0_30px_currentColor]"
          >
            <Box size={200} strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Zap size={100} className="animate-pulse" />
            </div>
          </motion.div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={() => setRotation(r => r + 90)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <RotateCcw size={16} />
            </button>
            <button onClick={() => setScale(s => s === 1 ? 1.5 : 1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Controls Area */}
        <div className="space-y-8 text-left">
          <div>
            <h3 className="text-3xl font-display font-bold mb-2 text-money-gold">CUSTOM BRACKET v1</h3>
            <p className="text-sm text-white/50 font-mono italic">"Design it. Print it. Plug it in."</p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Palette size={14} /> Select Material Vibe
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  className={cn(
                    "w-12 h-12 rounded-xl border-2 transition-all transform hover:scale-110",
                    color === c.hex 
                      ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                      : "border-transparent opacity-60"
                  )}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono">PRINT TIME</span>
              <span className="text-xs font-mono text-cannabis-light">2h 42m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono">MATERIAL</span>
              <span className="text-xs font-mono text-money-gold">Hemp-Based Filament</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono">COST</span>
              <span className="text-xs font-mono text-curiosity-purple">0.42 SEEDS</span>
            </div>
          </div>

          <button 
            onClick={() => plugIn('3D Design Print')}
            className="w-full py-4 bg-cannabis-light text-cannabis-dark font-black rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Zap size={20} /> SEND TO PRINTER
          </button>
        </div>
      </div>
    </div>
  );
}
