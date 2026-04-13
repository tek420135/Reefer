import React from 'react';
import { motion } from 'motion/react';
import { Palette, Sparkles, Sticker, Globe, Printer, Download, Check, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Material, Color, Decal } from './types';
import { MATERIALS, COLORS, DECALS, ENVIRONMENTS } from './constants';

interface StudioSidebarProps {
  selectedColor: Color;
  setSelectedColor: (c: Color) => void;
  selectedMaterial: Material;
  setSelectedMaterial: (m: Material) => void;
  selectedDecals: Decal[];
  setSelectedDecals: (d: Decal[]) => void;
  environment: string;
  setEnvironment: (e: string) => void;
  onPrint: () => void;
  onExport: () => void;
}

export default function StudioSidebar({
  selectedColor,
  setSelectedColor,
  selectedMaterial,
  setSelectedMaterial,
  selectedDecals,
  setSelectedDecals,
  environment,
  setEnvironment,
  onPrint,
  onExport
}: StudioSidebarProps) {
  const toggleDecal = (decal: Decal) => {
    if (selectedDecals.find(d => d.id === decal.id)) {
      setSelectedDecals(selectedDecals.filter(d => d.id !== decal.id));
    } else {
      setSelectedDecals([...selectedDecals, decal]);
    }
  };

  return (
    <div className="w-80 h-full glass-morphism border-l border-white/10 p-6 overflow-y-auto scrollbar-hide space-y-8">
      {/* Environment */}
      <section>
        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Globe size={12} /> Environment
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {ENVIRONMENTS.map(env => (
            <button
              key={env.id}
              onClick={() => setEnvironment(env.id)}
              className={cn(
                "aspect-square rounded-lg border transition-all flex items-center justify-center text-lg",
                environment === env.id ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
              )}
              title={env.name}
            >
              {env.icon}
            </button>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section>
        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Palette size={12} /> Color Palette
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map(color => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-full aspect-square rounded-lg border-2 transition-all",
                selectedColor.id === color.id ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Materials */}
      <section>
        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Sparkles size={12} /> Material Finish
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {MATERIALS.map(mat => (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={cn(
                "w-full p-3 rounded-xl border text-[10px] font-mono font-bold uppercase text-left transition-all flex items-center justify-between",
                selectedMaterial.id === mat.id ? "bg-white/20 border-white text-white" : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              {mat.name}
              {selectedMaterial.id === mat.id && <Check size={12} />}
            </button>
          ))}
        </div>
      </section>

      {/* Decals */}
      <section>
        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Sticker size={12} /> Decal Layers
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {DECALS.map(dec => {
            const isActive = selectedDecals.find(d => d.id === dec.id);
            return (
              <button
                key={dec.id}
                onClick={() => toggleDecal(dec)}
                className={cn(
                  "p-3 rounded-xl border text-xl transition-all flex flex-col items-center gap-1",
                  isActive ? "bg-cannabis-light/20 border-cannabis-light" : "bg-white/5 border-white/5 hover:bg-white/10"
                )}
              >
                {dec.icon}
                <span className="text-[8px] font-mono uppercase text-white/40">{dec.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Actions */}
      <section className="pt-4 border-t border-white/10 space-y-4">
        <button
          onClick={onPrint}
          className="w-full p-4 bg-cannabis-light text-cannabis-dark rounded-2xl font-bold text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
        >
          <Printer size={16} /> 3D Print Model
        </button>
        <button
          onClick={onExport}
          className="w-full p-4 bg-white/10 text-white rounded-2xl font-bold text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
        >
          <Download size={16} /> Export Blueprint
        </button>
      </section>
    </div>
  );
}
