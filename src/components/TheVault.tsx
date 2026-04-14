import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Box, Zap, Trash2, Package, Star, Calendar, Clock, Leaf, Recycle, Wind } from 'lucide-react';
import { useSocketContext } from '../context/SocketContext';
import { cn } from '@/src/lib/utils';

export default function TheVault() {
  const { inventory, xp } = useSocketContext();

  const rarityColors = {
    common: 'text-white/40 border-white/10',
    rare: 'text-cannabis-light border-cannabis-light/30 shadow-[0_0_10px_rgba(163,230,53,0.2)]',
    epic: 'text-curiosity-purple border-curiosity-purple/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]',
    legendary: 'text-money-gold border-money-gold/30 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Vault Header */}
      <div className="p-8 glass-morphism rounded-[40px] border border-money-gold/20 bg-gradient-to-br from-money-gold/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-money-gold/20 rounded-3xl flex items-center justify-center relative group">
            <ShieldCheck size={40} className="text-money-gold group-hover:scale-110 transition-transform" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-money-gold/30 rounded-3xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">The <span className="text-money-gold">Vault</span></h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-white/40" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{inventory.length} Blueprints Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-money-gold" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Rank: {xp > 2000 ? 'Eco-Master' : 'Seedling'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-mono uppercase tracking-widest transition-all">
            Export Manifest
          </button>
          <button className="px-6 py-3 bg-money-gold text-money-green font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            Sync Grid
          </button>
        </div>
      </div>

      {/* Eco-Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'HEMP FILAMENT SAVED', value: '42.5kg', icon: <Leaf />, color: 'text-cannabis-light', bg: 'bg-cannabis-light/10' },
          { label: 'CARBON OFFSET', value: '128kg CO2', icon: <Wind />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'PLASTIC ELIMINATED', value: '15.2kg', icon: <Recycle />, color: 'text-money-gold', bg: 'bg-money-gold/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className={cn("p-6 glass-morphism rounded-3xl border border-white/10 flex items-center gap-6", stat.bg)}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color, "bg-white/5")}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {inventory.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center space-y-4 opacity-40"
            >
              <Package size={64} className="mx-auto" />
              <p className="font-mono text-sm uppercase tracking-widest">The Vault is currently empty.</p>
              <p className="text-xs">Acquire blueprints or 3D designs in the Marketplace to secure them here.</p>
            </motion.div>
          ) : (
            inventory.map((item, i) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "p-6 glass-morphism rounded-3xl border flex flex-col gap-4 group relative overflow-hidden",
                    rarityColors[item.rarity]
                  )}
                >
                  {/* Rarity Glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-current opacity-5 blur-3xl group-hover:opacity-20 transition-opacity" />
                  
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-2xl">
                      <Package size={24} />
                    </div>
                    <div className="text-[8px] font-mono uppercase px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                      {item.rarity}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-tight group-hover:text-white transition-colors">{item.name}</h4>
                    <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mt-1">{item.type}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[8px] font-mono opacity-40">
                      <Clock size={10} />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                        <Zap size={14} />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/40 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="mt-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    Deploy to Eco-Grid
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
