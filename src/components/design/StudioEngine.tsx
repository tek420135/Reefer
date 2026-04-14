import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  ContactShadows, 
  Environment,
  Text,
  MeshWobbleMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { Material, Color, Decal } from './types';

interface StudioEngineProps {
  activeTab: 'tent' | 'plant' | 'grid';
  selectedColor: Color;
  selectedMaterial: Material;
  selectedDecals: Decal[];
  environment: string;
  isARMode: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

function GrowTent({ color, material, decals }: { color: string, material: Material, decals: Decal[] }) {
  return (
    <group>
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
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3.1, 3.1, 3.1]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={material.id !== 'neon'}
          emissive={material.emissive ? color : '#000'}
          emissiveIntensity={material.emissive ? 2 : 0}
        />
      </mesh>
      
      {decals.map((decal, i) => (
        <Text
          key={decal.id}
          position={[0, 1.5 + (i * 0.6) - (decals.length * 0.3), 1.51]}
          fontSize={0.5}
          color={color}
        >
          {decal.icon}
        </Text>
      ))}

      <pointLight position={[0, 2.8, 0]} intensity={2} color={color} />
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Plant({ position = [0, 0, 0], scale = 1, color, material }: { position?: [number, number, number], scale?: number, color: string, material: Material }) {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.4, 32]} />
        <meshStandardMaterial 
          color="#333" 
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.05, 1, 8]} />
        <meshStandardMaterial color="#4d7c0f" />
      </mesh>
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

export default function StudioEngine({ 
  activeTab, 
  selectedColor, 
  selectedMaterial, 
  selectedDecals, 
  environment,
  isARMode,
  videoRef 
}: StudioEngineProps) {
  return (
    <div className="w-full h-full relative">
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
          maxDistance={15}
          autoRotate={activeTab === 'grid'}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <group position={[0, -1, 0]}>
          {activeTab === 'tent' && (
            <GrowTent 
              color={selectedColor.value} 
              material={selectedMaterial} 
              decals={selectedDecals}
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
              <Plant position={[-2, 0, -2]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[2, 0, -2]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[-2, 0, 2]} color={selectedColor.value} material={selectedMaterial} />
              <Plant position={[2, 0, 2]} color={selectedColor.value} material={selectedMaterial} />
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#050505" />
              </mesh>
              <gridHelper args={[20, 40, '#333', '#111']} />
            </group>
          )}
        </group>

        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={15} blur={2} far={4.5} />
        <Environment preset={environment as any} />
      </Canvas>
    </div>
  );
}
