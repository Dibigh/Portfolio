import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import git from '../../assets/git.png';
import dart from '../../assets/dart.png';
import js from '../../assets/js.png';
import ts from '../../assets/ts.png';
import python from '../../assets/python.png';
import csharp from '../../assets/cs.png';

const TECHS = [
  { name: 'GitHub', img: git },
  { name: 'Dart', img: dart },
  { name: 'JavaScript', img: js },
  { name: 'TypeScript', img: ts },
  { name: 'Python', img: python },
  { name: 'C#', img: csharp },
];

function OrbitRings() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function HoloRoundedCube() {
  const textures = useTexture(TECHS.map((t) => t.img));

  // Configure textures after loading
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      // We do NOT set flipY = false, so they appear straight
    });
  }, [textures]);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.08;
  });

  const size = 2.6;
  const inset = 0.2; // Inset logos to avoid rounded edges
  const logoSize = size - inset * 2; // slightly smaller than face

  // Each face position & rotation
  const faces = [
    { pos: [0, 0, size / 2 + 0.01], rot: [0, 0, 0] },       // front
    { pos: [0, 0, -size / 2 - 0.01], rot: [0, Math.PI, 0] }, // back
    { pos: [-size / 2 - 0.01, 0, 0], rot: [0, -Math.PI / 2, 0] }, // left
    { pos: [size / 2 + 0.01, 0, 0], rot: [0, Math.PI / 2, 0] },   // right
    { pos: [0, size / 2 + 0.01, 0], rot: [-Math.PI / 2, 0, 0] },  // top (corrected to -Math.PI/2)
    { pos: [0, -size / 2 - 0.01, 0], rot: [Math.PI / 2, 0, 0] },  // bottom (corrected to Math.PI/2)
  ];

  return (
    <group ref={ref}>
      {/* Rounded cube */}
      <RoundedBox args={[size, size, size]} radius={0.25} smoothness={6}>
        <meshStandardMaterial color="#222" roughness={0.2} metalness={0.6} />
      </RoundedBox>

      {/* Logo planes with white background for visibility */}
      {faces.map((f, i) => (
        <group key={i} position={f.pos} rotation={f.rot}>
          {/* White background */}
          <mesh position={[0, 0, -0.005]}>
            <planeGeometry args={[logoSize, logoSize]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
          {/* Transparent logo */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[logoSize, logoSize]} />
            <meshStandardMaterial map={textures[i]} transparent alphaTest={0.05} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SkillSphere3D() {

  return (
    <div className="w-full h-[480px] md:h-[560px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ antialias: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} />

        <Suspense fallback={null}>
          <HoloRoundedCube />
          <OrbitRings />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.25}
          enableDamping
          dampingFactor={0.06}
        />
      </Canvas>

      <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
        {TECHS.map((t) => (
          <span
            key={t.name}
            className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
            style={{
              color: '#fff',
              background: '#22222280',
              border: `1px solid #ffffff40`,
            }}
          >
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}