import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Palette, Maximize2, RotateCcw, Zap, Printer, Sticker, Download, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';
import ARVisualizer from './ARVisualizer';

export default function DesignStudio() {
  const { plugIn, xp } = useSocketContext();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-8">
        <div className="text-left space-y-2">
          <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter">VibeDesign Studio v3.0</h3>
          <p className="text-sm text-white/40 font-mono uppercase tracking-[0.3em]">Neural-Link 3D Fabrication Engine</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 glass-morphism rounded-xl border border-cannabis-light/30 flex items-center gap-3">
            <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest">Printer Online</span>
          </div>
          <div className="px-4 py-2 glass-morphism rounded-xl border border-money-gold/30 flex items-center gap-3">
            <span className="text-[10px] font-mono text-money-gold uppercase tracking-widest">Level: {xp > 2000 ? 'Master' : 'Apprentice'}</span>
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="w-full aspect-video md:aspect-[21/9] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl relative">
        <ARVisualizer />
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-cannabis-light/50 transition-all group">
          <div className="w-12 h-12 bg-cannabis-light/20 rounded-2xl flex items-center justify-center text-cannabis-light group-hover:scale-110 transition-transform">
            <Printer size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">3D Print on Demand</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Export your custom brackets, bongs, and grow tools directly to our global network of hemp-filament printers.
          </p>
          <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-cannabis-light uppercase tracking-widest">
            <ShieldCheck size={14} /> Eco-Certified Filament
          </div>
        </div>

        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-money-gold/50 transition-all group">
          <div className="w-12 h-12 bg-money-gold/20 rounded-2xl flex items-center justify-center text-money-gold group-hover:scale-110 transition-transform">
            <Sticker size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">Sticker & Decal Lab</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Design high-fidelity decals and stickers. Virtually try them on your products in AR before ordering your custom pack.
          </p>
          <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-money-gold uppercase tracking-widest">
            <Globe size={14} /> Global Shipping
          </div>
        </div>

        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-curiosity-purple/50 transition-all group">
          <div className="w-12 h-12 bg-curiosity-purple/20 rounded-2xl flex items-center justify-center text-curiosity-purple group-hover:scale-110 transition-transform">
            <Download size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">Design Export</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Download your blueprints in industry-standard formats. Take your designs to the offline world or share them on the grid.
          </p>
          <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-curiosity-purple uppercase tracking-widest">
            <Zap size={14} /> Instant Generation
          </div>
        </div>
      </div>
    </div>
  );
}
