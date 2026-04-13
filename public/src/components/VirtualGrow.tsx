import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Zap, Activity, Thermometer, Droplets, Wind, RefreshCw } from 'lucide-react';
import { useSocketContext } from '../context/SocketContext';

function CyberPlant() {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group>
      {/* Stem */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 2, 8]} />
        <meshStandardMaterial color="#a3e635" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Leaves (Procedural) */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh 
            position={[Math.sin(i) * 0.8, i * 0.4 - 0.5, Math.cos(i) * 0.8]} 
            rotation={[0, i * Math.PI / 3, 0.5]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <boxGeometry args={[0.4, 0.02, 0.2]} />
            <MeshWobbleMaterial 
              color={hovered ? "#fbbf24" : "#a3e635"} 
              factor={0.4} 
              speed={2} 
              roughness={0.1} 
              metalness={0.5} 
            />
          </mesh>
        </Float>
      ))}

      {/* Core Energy */}
      <Sphere args={[0.2, 16, 16]} position={[0, 1.2, 0]}>
        <MeshDistortMaterial 
          color="#fbbf24" 
          speed={5} 
          distort={0.4} 
          radius={1} 
          emissive="#fbbf24" 
          emissiveIntensity={2} 
        />
      </Sphere>
    </group>
  );
}

function ParticleField({ count = 500 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  return (
    <Points positions={points}>
      <PointMaterial
        transparent
        color="#a3e635"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function VirtualGrow() {
  const { plugIn } = useSocketContext();
  
  return (
    <div className="w-full h-[500px] glass-morphism rounded-3xl border border-white/10 overflow-hidden relative group">
      {/* 3D Canvas */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a3e635" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fbbf24" />
        
        <CyberPlant />
        <ParticleField />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false} 
        />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-cannabis-light/30 rounded-full">
              <div className="w-2 h-2 bg-cannabis-light rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest">Neural Link Active</span>
            </div>
            <h3 className="text-2xl font-display font-black text-white/90">VIRTUAL GROW ALPHA</h3>
          </div>
          
          <div className="text-right font-mono text-[10px] text-white/40">
            <p>LATENCY: 4.20ms</p>
            <p>UPTIME: 99.9%</p>
            <p>GRID: SOCKET_01</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'TEMP', value: '78.4°F', icon: <Thermometer size={14} />, color: 'text-orange-400' },
            { label: 'HUMID', value: '55.2%', icon: <Droplets size={14} />, color: 'text-blue-400' },
            { label: 'CO2', value: '1240ppm', icon: <Wind size={14} />, color: 'text-cannabis-light' },
            { label: 'LIGHT', value: '18/6', icon: <Zap size={14} />, color: 'text-money-gold' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col gap-2"
            >
              <div className={`flex items-center gap-2 ${stat.color}`}>
                {stat.icon}
                <span className="text-[10px] font-mono uppercase">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Controls Hint */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-4">
        <div className="p-4 glass-morphism rounded-2xl border border-white/10 text-center space-y-2">
          <Activity size={24} className="text-cannabis-light mx-auto animate-pulse" />
          <p className="text-[8px] font-mono text-white/40 uppercase">Drag to Rotate</p>
        </div>
        <button 
          onClick={() => plugIn('Grid Sync')}
          className="p-4 glass-morphism rounded-2xl border border-cannabis-light/30 hover:bg-cannabis-light hover:text-cannabis-dark transition-all group/btn"
        >
          <RefreshCw size={24} className="mx-auto group-hover/btn:rotate-180 transition-transform duration-500" />
          <p className="text-[8px] font-mono uppercase mt-2">Sync Grid</p>
        </button>
      </div>
    </div>
  );
}
