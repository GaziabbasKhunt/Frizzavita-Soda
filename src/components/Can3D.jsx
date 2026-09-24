import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { createCanTexture, createCondensationBumpMap } from '../utils/textureGenerator';
import { FLAVORS } from '../data/flavors';

// Realistic 3D Aluminum Soda Can Mesh
function SodaCan({ 
  flavor = FLAVORS[0], 
  autoRotate = true, 
  rotationSpeed = 0.8, 
  interactive = true,
  enableDroplets = true,
  scale = 1.0,
  scrollInfluence = 0,
  mousePos = { x: 0, y: 0 }
}) {
  const groupRef = useRef();
  const bodyMeshRef = useRef();

  // Generate or fetch textures
  const labelTexture = useMemo(() => {
    return createCanTexture(flavor);
  }, [flavor]);

  const bumpTexture = useMemo(() => {
    return enableDroplets ? createCondensationBumpMap() : null;
  }, [enableDroplets]);

  // Metallic Aluminum Materials
  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xDDDDDD,
      metalness: 0.95,
      roughness: 0.2,
      envMapIntensity: 1.2,
    });
  }, []);

  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xCCCCCC,
      metalness: 0.92,
      roughness: 0.25,
    });
  }, []);

  const labelMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      metalness: 0.65,
      roughness: 0.28,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.0,
    });
    if (bumpTexture) {
      mat.bumpMap = bumpTexture;
      mat.bumpScale = 0.008;
    }
    return mat;
  }, [labelTexture, bumpTexture]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Ambient rotation
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.4 * rotationSpeed;
    }

    // Scroll influence
    if (scrollInfluence !== 0) {
      groupRef.current.rotation.y += scrollInfluence * 0.002;
    }

    // Gentle parallax lean towards mouse
    if (interactive && mousePos) {
      const targetRotX = (mousePos.y * 0.25);
      const targetRotZ = -(mousePos.x * 0.2);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      {/* Main Printed Cylinder Body (Height: 3.2, Radius: 1.05) */}
      <mesh ref={bodyMeshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 3.1, 64, 1, true]} />
        <primitive object={labelMaterial} attach="material" />
      </mesh>

      {/* Top Taper & Rim */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <cylinderGeometry args={[0.88, 1.05, 0.14, 64]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 1.72, 0]} castShadow>
        <cylinderGeometry args={[0.92, 0.88, 0.06, 64]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>
      {/* Aluminum Lid (Countersink) */}
      <mesh position={[0, 1.71, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.02, 64]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>

      {/* Pull Tab */}
      <group position={[0.2, 1.73, 0]} rotation={[-0.05, 0.3, 0]}>
        {/* Tab body */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.02, 0.26]} />
          <primitive object={aluminumMaterial} attach="material" />
        </mesh>
        {/* Tab ring hole */}
        <mesh position={[0.12, 0.015, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        {/* Center rivet */}
        <mesh position={[-0.15, 0.015, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.025, 16]} />
          <primitive object={aluminumMaterial} attach="material" />
        </mesh>
      </group>

      {/* Bottom Taper & Inset Dome */}
      <mesh position={[0, -1.6, 0]} castShadow>
        <cylinderGeometry args={[1.05, 0.88, 0.14, 64]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -1.7, 0]} castShadow>
        <cylinderGeometry args={[0.88, 0.92, 0.06, 64]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -1.71, 0]}>
        <sphereGeometry args={[0.82, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>
    </group>
  );
}

// Floating Carbonation Bubbles in 3D
function CarbonationParticles({ count = 28, color = '#FFFFFF' }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      sc[i] = 0.03 + Math.random() * 0.08;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += delta * (0.4 + (i % 5) * 0.1);
      if (array[i * 3 + 1] > 3) {
        array[i * 3 + 1] = -3;
        array[i * 3 + 0] = (Math.random() - 0.5) * 3.5;
        array[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Fallback 2D Canvas Renderer for when WebGL is unavailable or fails
function FallbackCanvasCan({ flavor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 400, 600);
    const grad = ctx.createLinearGradient(100, 100, 300, 500);
    grad.addColorStop(0, flavor.color);
    grad.addColorStop(1, flavor.accentColor);

    // Can body
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(120, 120, 160, 360, [16, 16, 24, 24]);
    ctx.fill();

    // Top Rim
    ctx.fillStyle = '#E5E7EB';
    ctx.beginPath();
    ctx.roundRect(130, 95, 140, 25, 6);
    ctx.fill();

    // Typography
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('FRIZZAVITA', 200, 260);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(flavor.name, 200, 300);

    ctx.fillStyle = '#FFD166';
    ctx.font = 'italic 14px serif';
    ctx.fillText(flavor.italianTitle, 200, 330);
  }, [flavor]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <canvas ref={canvasRef} width={400} height={600} className="max-w-full h-auto drop-shadow-2xl" />
      <span className="text-xs uppercase tracking-widest text-espresso-muted mt-2">
        {flavor.name} • 330ml
      </span>
    </div>
  );
}

// Master Export Component
export default function InteractiveCanCanvas({
  flavor = FLAVORS[0],
  autoRotate = true,
  rotationSpeed = 0.8,
  enableOrbit = true,
  enableDroplets = true,
  className = "w-full h-full min-h-[450px]",
  interactiveParallax = true,
  scale = 1.0,
}) {
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollDelta, setScrollDelta] = useState(0);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebGlSupported(supported);
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  // Track mouse movement for subtle 3D parallax
  const handleMouseMove = (e) => {
    if (!interactiveParallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Track scroll influence
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollDelta(current - lastScroll);
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!webGlSupported) {
    return <FallbackCanvasCan flavor={flavor} />;
  }

  return (
    <div 
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 2]} // Crisp rendering across high DPI displays
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.8} />
        {/* Key Light (Warm Mediterranean Sun) */}
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#FFF8E7" castShadow />
        {/* Fill Light (Soft Ivory) */}
        <directionalLight position={[-4, 2, 3]} intensity={1.2} color="#FBF8F2" />
        {/* Rim Light (Crisp Sky Blue / Silver Sheen) */}
        <directionalLight position={[0, 4, -5]} intensity={2.6} color="#BEE3F8" />
        {/* Bottom Bounce Light */}
        <pointLight position={[0, -3, 2]} intensity={0.9} color={flavor.accentColor || '#E63946'} />

        <Float
          speed={autoRotate ? 1.6 : 0.8}
          rotationIntensity={0.2}
          floatIntensity={0.5}
          floatingRange={[-0.1, 0.1]}
        >
          <SodaCan
            flavor={flavor}
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            interactive={interactiveParallax}
            enableDroplets={enableDroplets}
            scale={scale}
            scrollInfluence={scrollDelta}
            mousePos={mousePos}
          />
        </Float>

        {/* Carbonation Sparkles */}
        <CarbonationParticles count={24} color={flavor.accentColor} />

        {/* Realistic Floor Shadow */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.45}
          scale={5.5}
          blur={2.4}
          far={3.8}
          color="#181412"
        />

        {enableOrbit && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.7}
            dampingFactor={0.08}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        )}
      </Canvas>
    </div>
  );
}
