import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  ContactShadows, 
  Environment,
  Box,
  Cylinder,
  Sphere,
  Text,
  MeshWobbleMaterial,
  PresentationControls,
  Decal,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, RotateCcw, Zap, Box as BoxIcon, Layers, Palette, Printer, Sticker, Sparkles, Check, Camera, Download, Share2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';

const MATERIALS = [
  { id: 'matte', name: 'Matte Stealth', roughness: 0.8, metalness: 0.1 },
  { id: 'glossy', name: 'High Gloss', roughness: 0.1, metalness: 0.2 },
  { id: 'metallic', name: 'Liquid Metal', roughness: 0.2, metalness: 0.9 },
  { id: 'neon', name: 'Neon Pulse', roughness: 0.5, metalness: 0.5, emissive: true },
  { id: 'wood', name: 'Organic Grain', roughness: 0.9, metalness: 0.0, map: 'https://picsum.photos/seed/wood/512/512' },
  { id: 'brushed', name: 'Brushed Alloy', roughness: 0.3, metalness: 0.8 },
  { id: 'iridescent', name: 'Oil Slick', roughness: 0.1, metalness: 0.5, transmission: 0.5 },
];

const COLORS = [
  { id: 'cannabis', value: '#a3e635', name: 'Cannabis Green' },
  { id: 'gold', value: '#fbbf24', name: 'Money Gold' },
  { id: 'purple', value: '#8b5cf6', name: 'Curiosity Purple' },
  { id: 'crimson', value: '#ef4444', name: 'Hype Crimson' },
  { id: 'cyan', value: '#06b6d4', name: 'Cyber Cyan' },
];

const DECALS = [
  { id: 'socket', name: 'Socket Logo', icon: '⚡' },
  { id: 'leaf', name: 'Eco Leaf', icon: '🌿' },
  { id: 'guru', name: 'Guru Seal', icon: '🧘' },
];

function GrowTent({ color = '#a3e635', material = MATERIALS[0], decal = null }) {
  return (
    <group>
      {/* Tent Structure */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3.1, 3.1, 3.1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={material.id !== 'neon'}
          emissive={material.emissive ? color : '#000'}
          emissiveIntensity={material.emissive ? 2 : 0}
        />
      </mesh>
      
      {/* Decal Placeholder */}
      {decal && (
        <Text
          position={[0, 1.5, 1.51]}
          fontSize={0.5}
          color={color}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        >
          {decal.icon}
        </Text>
      )}

      {/* Interior Light */}
      <pointLight position={[0, 2.8, 0]} intensity={2} color={color} />
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Plant({ position = [0, 0, 0] as [number, number, number], scale = 1, color = '#a3e635', material = MATERIALS[0] }) {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.4, 32]} />
        <meshStandardMaterial 
          color="#333" 
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.05, 1, 8]} />
        <meshStandardMaterial color="#4d7c0f" />
      </mesh>
      {/* Leaves (Abstract) */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[0, 0.8 + i * 0.2, 0]} rotation={[0.5, i * 1.2, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            {material.id === 'neon' ? (
              <MeshWobbleMaterial color={color} speed={1} factor={0.6} />
            ) : (
              <MeshDistortMaterial 
                color={color} 
                speed={2} 
                distort={0.4} 
                roughness={material.roughness}
                metalness={material.metalness}
              />
            )}
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ARVisualizer() {
  const { notify, addXp } = useSocketContext();
  const [activeTab, setActiveTab] = useState<'tent' | 'plant' | 'grid'>('tent');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedDecal, setSelectedDecal] = useState<any>(null);
  const [isDesigning, setIsDesigning] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        notify("CAMERA PERMISSION DENIED. CHECK SETTINGS.");
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      setIsARMode(false);
      notify("AR MODE DEACTIVATED.");
    }
  };

  const handleExport = () => {
    const designData = {
      material: selectedMaterial.name,
      color: selectedColor.name,
      decal: selectedDecal?.name || 'None',
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-${Date.now()}.json`;
    a.click();
    
    notify("DESIGN EXPORTED: READY FOR PRINTING 📤");
    addXp(50);
  };

  const handlePrintRequest = () => {
    notify(`PREPARING 3D PRINT: ${selectedMaterial.name} ${selectedColor.name}`);
    setTimeout(() => {
      notify("EXPORTING TO PRINTABLES... 🚀");
      addXp(100);
    }, 1500);
  };

  const handleStickerRequest = () => {
    notify(`GENERATING ${selectedDecal?.name || 'CUSTOM'} STICKER PACK... 🎨`);
    addXp(50);
  };

  return (
    <div className="w-full h-full relative group bg-black/20 rounded-[40px] overflow-hidden border border-white/5">
      {isARMode && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: isARMode }}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={10}
          autoRotate={activeTab === 'grid' && !isDesigning}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <group position={[0, -1, 0]}>
          {activeTab === 'tent' && (
            <GrowTent 
              color={selectedColor.value} 
              material={selectedMaterial} 
              decal={selectedDecal}
            />
          )}
          {activeTab === 'plant' && (
            <Plant 
              scale={2} 
              color={selectedColor.value} 
              material={selectedMaterial} 
            />
          )}
          {activeTab === 'grid' && (
            <group>
              <Plant position={[-1, 0, -1]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[1, 0, -1]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[-1, 0, 1]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[1, 0, 1]} color={selectedColor.value} material={selectedMaterial} />
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#050505" />
              </mesh>
              <gridHelper args={[10, 20, '#333', '#111']} />
            </group>
          )}
        </group>

        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        <Environment preset="night" />
      </Canvas>

      {/* Main Navigation */}
      <div className="absolute top-6 left-6 flex flex-col gap-3">
        <button 
          onClick={() => setActiveTab('tent')}
          className={cn(
            "p-4 rounded-2xl border transition-all flex items-center gap-3 backdrop-blur-md",
            activeTab === 'tent' ? "bg-cannabis-light text-cannabis-dark border-cannabis-light shadow-[0_0_20px_rgba(163,230,53,0.3)]" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <BoxIcon size={18} /> <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Tent Studio</span>
        </button>
        <button 
          onClick={() => setActiveTab('plant')}
          className={cn(
            "p-4 rounded-2xl border transition-all flex items-center gap-3 backdrop-blur-md",
            activeTab === 'plant' ? "bg-money-gold text-black border-money-gold shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Layers size={18} /> <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Plant Lab</span>
        </button>
        <button 
          onClick={() => setActiveTab('grid')}
          className={cn(
            "p-4 rounded-2xl border transition-all flex items-center gap-3 backdrop-blur-md",
            activeTab === 'grid' ? "bg-curiosity-purple text-white border-curiosity-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Zap size={18} /> <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Grid Sync</span>
        </button>
      </div>

      {/* Design Studio Toggle */}
      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <button
          onClick={toggleAR}
          className={cn(
            "p-4 rounded-2xl border transition-all flex items-center gap-3 backdrop-blur-md",
            isARMode ? "bg-cannabis-light text-cannabis-dark border-cannabis-light" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Camera size={18} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden md:inline">
            {isARMode ? 'Exit AR' : 'Try in AR'}
          </span>
        </button>
        <button
          onClick={() => setIsDesigning(!isDesigning)}
          className={cn(
            "p-4 rounded-2xl border transition-all flex items-center gap-3 backdrop-blur-md",
            isDesigning ? "bg-white text-black border-white" : "bg-black/40 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Palette size={18} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
            {isDesigning ? 'Close Studio' : 'Design Studio'}
          </span>
        </button>
      </div>

      {/* Design Panel */}
      <AnimatePresence>
        {isDesigning && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-24 right-6 bottom-24 w-72 glass-morphism rounded-3xl border border-white/10 p-6 overflow-y-auto scrollbar-hide z-10 space-y-8"
          >
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
                      selectedColor.id === color.id ? "border-white scale-110" : "border-transparent hover:scale-105"
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
              <div className="space-y-2">
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
                <Sticker size={12} /> Decals & Branding
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {DECALS.map(dec => (
                  <button
                    key={dec.id}
                    onClick={() => setSelectedDecal(selectedDecal?.id === dec.id ? null : dec)}
                    className={cn(
                      "p-3 rounded-xl border text-xl transition-all flex flex-col items-center gap-1",
                      selectedDecal?.id === dec.id ? "bg-cannabis-light/20 border-cannabis-light" : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}
                  >
                    {dec.icon}
                    <span className="text-[8px] font-mono uppercase text-white/40">{dec.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Print on Demand */}
            <section className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handlePrintRequest}
                className="w-full p-4 bg-cannabis-light text-cannabis-dark rounded-2xl font-bold text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              >
                <Printer size={16} /> 3D Print Model
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleStickerRequest}
                  className="p-4 bg-white/10 text-white rounded-2xl font-bold text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
                >
                  <Sticker size={16} /> Stickers
                </button>
                <button
                  onClick={handleExport}
                  className="p-4 bg-white/10 text-white rounded-2xl font-bold text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
                >
                  <Download size={16} /> Export
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 p-4 glass-morphism rounded-2xl border border-white/10">
        <p className="text-[8px] font-mono text-white/40 uppercase mb-1 tracking-[0.2em]">Design Studio v2.0</p>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
          <p className="text-[10px] font-bold text-white uppercase tracking-widest">
            {selectedMaterial.name} • {selectedColor.name}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-4">
        <div className="text-right">
          <p className="text-[8px] font-mono text-white/40 uppercase mb-1 tracking-[0.2em]">Render Engine</p>
          <p className="text-xs font-bold text-cannabis-light tracking-widest">ULTRA-FIDELITY</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
          <Maximize2 size={20} />
        </div>
      </div>
    </div>
  );
}
