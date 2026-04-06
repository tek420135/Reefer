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
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Maximize2, RotateCcw, Zap, Box as BoxIcon, Layers } from 'lucide-react';
import { cn } from '@/src/lib/utils';

function GrowTent({ color = '#a3e635' }) {
  return (
    <group>
      {/* Tent Structure */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3.1, 3.1, 3.1]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      {/* Interior Light */}
      <pointLight position={[0, 2.8, 0]} intensity={2} color={color} />
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Plant({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
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
        <meshStandardMaterial color="#333" />
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
            <MeshDistortMaterial color="#a3e635" speed={2} distort={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ARVisualizer() {
  const [activeTab, setActiveTab] = useState<'tent' | 'plant' | 'grid'>('tent');

  return (
    <div className="w-full h-full relative group">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={10}
          autoRotate={activeTab === 'grid'}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <group position={[0, -1, 0]}>
          {activeTab === 'tent' && <GrowTent />}
          {activeTab === 'plant' && <Plant scale={2} />}
          {activeTab === 'grid' && (
            <group>
              <Plant position={[-1, 0, -1]} />
              <Plant position={[1, 0, -1]} />
              <Plant position={[-1, 0, 1]} />
              <Plant position={[1, 0, 1]} />
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

      {/* UI Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab('tent')}
          className={cn(
            "p-3 rounded-xl border transition-all flex items-center gap-2",
            activeTab === 'tent' ? "bg-cannabis-light text-cannabis-dark border-cannabis-light" : "bg-black/60 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <BoxIcon size={16} /> <span className="text-[10px] font-mono font-bold uppercase">Tent View</span>
        </button>
        <button 
          onClick={() => setActiveTab('plant')}
          className={cn(
            "p-3 rounded-xl border transition-all flex items-center gap-2",
            activeTab === 'plant' ? "bg-money-gold text-black border-money-gold" : "bg-black/60 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Layers size={16} /> <span className="text-[10px] font-mono font-bold uppercase">Plant Detail</span>
        </button>
        <button 
          onClick={() => setActiveTab('grid')}
          className={cn(
            "p-3 rounded-xl border transition-all flex items-center gap-2",
            activeTab === 'grid' ? "bg-curiosity-purple text-white border-curiosity-purple" : "bg-black/60 text-white border-white/10 hover:bg-white/10"
          )}
        >
          <Zap size={16} /> <span className="text-[10px] font-mono font-bold uppercase">Grid Sync</span>
        </button>
      </div>

      <div className="absolute bottom-4 right-4 p-4 glass-morphism rounded-2xl border border-white/10 text-right">
        <p className="text-[8px] font-mono text-white/40 uppercase mb-1">AR Visualization Engine</p>
        <p className="text-xs font-bold text-cannabis-light">RENDER STATUS: OPTIMAL</p>
      </div>
    </div>
  );
}
