import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Palette, 
  Maximize2, 
  RotateCcw, 
  Zap, 
  Printer, 
  Sticker, 
  Download, 
  Globe, 
  ShieldCheck, 
  Camera, 
  Layers, 
  Cpu,
  History,
  Share2,
  Settings,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';
import StudioEngine from './design/StudioEngine';
import StudioSidebar from './design/StudioSidebar';
import { MATERIALS, COLORS, DECALS } from './design/constants';
import { Material, Color, Decal } from './design/types';

export default function DesignStudio() {
  const { notify, addXp, xp, addToInventory } = useSocketContext();
  const [activeTab, setActiveTab] = useState<'tent' | 'plant' | 'grid'>('tent');
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS[0]);
  const [selectedDecals, setSelectedDecals] = useState<Decal[]>([]);
  const [environment, setEnvironment] = useState('night');
  const [isARMode, setIsARMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Persistence
  useEffect(() => {
    const savedColor = localStorage.getItem('socket_design_color');
    const savedMaterial = localStorage.getItem('socket_design_material');
    if (savedColor) setSelectedColor(COLORS.find(c => c.id === savedColor) || COLORS[0]);
    if (savedMaterial) setSelectedMaterial(MATERIALS.find(m => m.id === savedMaterial) || MATERIALS[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem('socket_design_color', selectedColor.id);
    localStorage.setItem('socket_design_material', selectedMaterial.id);
  }, [selectedColor, selectedMaterial]);

  const toggleAR = async () => {
    if (!isARMode) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsARMode(true);
          notify("AR MODE ACTIVATED: SCANNING ENVIRONMENT...");
        }
      } catch (err) {
        notify("CAMERA PERMISSION DENIED.");
      }
    } else {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
      setIsARMode(false);
      notify("AR MODE DEACTIVATED.");
    }
  };

  const handleExport = () => {
    notify("GENERATING HIGH-RES BLUEPRINT... 🛠️");
    addXp(50);
  };

  const handlePrint = () => {
    notify("SENDING TO 3D PRINT NETWORK... 🚀");
    addXp(100);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4 md:px-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">3D Studio</h3>
            <span className="px-2 py-1 bg-cannabis-light/20 text-cannabis-light text-[10px] font-mono rounded border border-cannabis-light/30">3DPoD v4.2</span>
          </div>
          <p className="text-sm text-white/40 font-mono uppercase tracking-[0.3em]">Hemp-Based 3D Printing & AR Grow Room Design</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 glass-morphism rounded-xl border border-cannabis-light/30 flex items-center gap-3">
            <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest">Engine: Stable</span>
          </div>
          <div className="px-4 py-2 glass-morphism rounded-xl border border-money-gold/30 flex items-center gap-3">
            <Cpu size={14} className="text-money-gold" />
            <span className="text-[10px] font-mono text-money-gold uppercase tracking-widest">Level: {xp > 2000 ? 'Master' : 'Apprentice'}</span>
          </div>
        </div>
      </div>

      {/* Main Studio Interface */}
      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[48px] overflow-hidden border-8 border-white/5 shadow-2xl bg-black/40 flex">
        
        {/* Toolbar (Left) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {[
            { id: 'tent', icon: <Box size={20} />, label: 'Tent' },
            { id: 'plant', icon: <Layers size={20} />, label: 'Plant' },
            { id: 'grid', icon: <Globe size={20} />, label: 'Grid' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-14 h-14 rounded-2xl border transition-all flex items-center justify-center group relative",
                activeTab === tab.id ? "bg-cannabis-light text-cannabis-dark border-cannabis-light shadow-lg" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
              )}
            >
              {tab.icon}
              <span className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tab.label} Mode
              </span>
            </button>
          ))}
          <div className="w-full h-px bg-white/10 my-2" />
          <button
            onClick={toggleAR}
            className={cn(
              "w-14 h-14 rounded-2xl border transition-all flex items-center justify-center group relative",
              isARMode ? "bg-money-gold text-black border-money-gold" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
            )}
          >
            <Camera size={20} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              AR View
            </span>
          </button>
        </div>

        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <StudioEngine 
            activeTab={activeTab}
            selectedColor={selectedColor}
            selectedMaterial={selectedMaterial}
            selectedDecals={selectedDecals}
            environment={environment}
            isARMode={isARMode}
            videoRef={videoRef}
          />

          {/* Viewport Overlays */}
          <div className="absolute top-6 right-6 flex gap-3 z-20">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={cn(
                "px-4 py-2 rounded-xl border transition-all flex items-center gap-2 backdrop-blur-md",
                showSidebar ? "bg-white text-black border-white" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
              )}
            >
              <Settings size={16} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{showSidebar ? 'Hide Controls' : 'Show Controls'}</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-24 p-4 glass-morphism rounded-2xl border border-white/10 z-20">
            <p className="text-[8px] font-mono text-white/40 uppercase mb-1 tracking-[0.2em]">Active Configuration</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                {selectedMaterial.name} • {selectedColor.name} • {selectedDecals.length} Layers
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="z-30"
            >
              <StudioSidebar 
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                selectedDecals={selectedDecals}
                setSelectedDecals={setSelectedDecals}
                environment={environment}
                setEnvironment={setEnvironment}
                onPrint={handlePrint}
                onExport={handleExport}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Forge: Community Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-money-gold" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Social Forge <span className="text-white/40 font-mono text-xs ml-2">Trending Blueprints</span></h3>
          </div>
          <button className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest hover:underline">View All Designs</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'Stealth Cabinet v2', author: 'ARCHITECT_X', likes: 1240, views: '5.2k', image: 'https://picsum.photos/seed/design1/400/300', tag: 'HARDWARE' },
            { id: 2, name: 'Eco-Bong Pro', author: 'HEMP_MASTER', likes: 890, views: '3.1k', image: 'https://picsum.photos/seed/design2/400/300', tag: 'ACCESSORY' },
            { id: 3, name: 'Nano-Nute Injector', author: 'BIO_HACKER', likes: 2100, views: '12k', image: 'https://picsum.photos/seed/design3/400/300', tag: 'AUTOMATION' },
            { id: 4, name: 'Modular Scrog Grid', author: 'GRID_RUNNER', likes: 450, views: '1.8k', image: 'https://picsum.photos/seed/design4/400/300', tag: 'TOOLS' },
          ].map((design) => (
            <motion.div
              key={design.id}
              whileHover={{ y: -10 }}
              className="glass-morphism rounded-3xl border border-white/10 overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={design.image} 
                  alt={design.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <button 
                    onClick={() => {
                      addToInventory({
                        id: `remix-${Date.now()}-${design.id}`,
                        name: design.name,
                        type: 'blueprint',
                        rarity: 'rare'
                      });
                      notify(`REMIXED: ${design.name}`);
                    }}
                    className="w-full py-2 bg-cannabis-light text-cannabis-dark font-bold rounded-xl text-[10px] uppercase tracking-widest"
                  >
                    Remix Blueprint
                  </button>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[8px] font-mono text-white/60 uppercase">
                  {design.tag}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-sm uppercase truncate">{design.name}</h4>
                  <p className="text-[10px] font-mono text-white/40">BY {design.author}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                      <Heart size={10} className="text-red-500" /> {design.likes}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                      <Eye size={10} /> {design.views}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-cannabis-light">
                    <Download size={10} /> 3DPoD
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Grid (Compact) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-cannabis-light/50 transition-all group">
          <div className="w-12 h-12 bg-cannabis-light/20 rounded-2xl flex items-center justify-center text-cannabis-light group-hover:scale-110 transition-transform">
            <History size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">Blueprint History</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Access your library of 3D-printable grow tools. Re-print custom brackets, bongs, or stealth grow cabinets with zero waste.
          </p>
        </div>

        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-money-gold/50 transition-all group">
          <div className="w-12 h-12 bg-money-gold/20 rounded-2xl flex items-center justify-center text-money-gold group-hover:scale-110 transition-transform">
            <Share2 size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">Eco-Forge</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Share your sustainable 3D blueprints. Earn Digital Seeds when the community prints your eco-friendly grow room designs.
          </p>
        </div>

        <div className="p-8 glass-morphism rounded-[32px] border border-white/10 space-y-4 hover:border-curiosity-purple/50 transition-all group">
          <div className="w-12 h-12 bg-curiosity-purple/20 rounded-2xl flex items-center justify-center text-curiosity-purple group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h4 className="text-xl font-display font-bold uppercase">Eco-Verified</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            All designs are verified for structural integrity and eco-impact. We ensure 100% biodegradable manufacturing for every print.
          </p>
        </div>
      </div>
    </div>
  );
}
