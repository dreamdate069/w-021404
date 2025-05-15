
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface CubeProps {
  color: string;
  autoRotate?: boolean;
}

const Cube: React.FC<CubeProps> = ({ color, autoRotate = true }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      // Auto-rotate the cube slightly when not being interacted with
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface Interactive3DViewerProps {
  showColorPicker?: boolean;
  autoRotate?: boolean;
  simple?: boolean;
}

const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({ 
  showColorPicker = true, 
  autoRotate = true,
  simple = false
}) => {
  const [cubeColor, setCubeColor] = useState<string>('#FF3B9A'); // Default to adam-pink
  
  const colors = [
    { name: 'Pink', value: '#FF3B9A' },
    { name: 'Blue', value: '#0EA5E9' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Orange', value: '#F97316' },
  ];

  return (
    <div className={`w-full ${simple ? '' : 'aspect-video'} flex flex-col rounded-lg overflow-hidden ${simple ? '' : 'bg-adam-darker/50 border border-slate-900/10'}`}>
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Cube color={cubeColor} autoRotate={autoRotate} />
          <OrbitControls enableZoom={false} />
        </Canvas>
        
        {showColorPicker && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-slate-900/10 backdrop-blur-sm px-3 py-2 rounded-full flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className="w-6 h-6 rounded-full transition-transform hover:scale-110 active:scale-95"
                  style={{ backgroundColor: color.value, outline: cubeColor === color.value ? '2px solid slate-900' : 'none' }}
                  onClick={() => setCubeColor(color.value)}
                  aria-label={`Set color to ${color.name}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {!simple && (
        <div className="p-3 text-center text-sm text-slate-900/70">
          Drag to rotate • Click colors to change
        </div>
      )}
    </div>
  );
};

export default Interactive3DViewer;
