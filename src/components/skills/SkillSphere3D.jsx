import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Tech logo data ──────────────────────────────────────── */
const TECHS = [
  { name: 'GitHub', color: '#ffffff', bg: '#24292e', symbol: 'GH', accent: '#6e40c9' },
  { name: 'JavaScript', color: '#F7DF1E', bg: '#1a1500', symbol: 'JS', accent: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6', bg: '#001233', symbol: 'TS', accent: '#3178C6' },
  { name: 'Python', color: '#4B8BBE', bg: '#0a1628', symbol: 'Py', accent: '#FFD43B' },
  { name: 'C#', color: '#9B4F96', bg: '#1a0033', symbol: 'C#', accent: '#9B4F96' },
  { name: 'Dart', color: '#00B4AB', bg: '#001a19', symbol: '◆', accent: '#00B4AB' },
];

/* ─── Draw a logo face onto a canvas ─────────────────────── */
function buildFaceTexture(tech) {
  const S = 512;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const ctx = cv.getContext('2d');

  // Background gradient
  const g = ctx.createLinearGradient(0, 0, S, S);
  g.addColorStop(0, tech.bg);
  g.addColorStop(1, '#050505');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  // Glow border (multi-pass for stronger glow)
  for (let pass = 0; pass < 3; pass++) {
    ctx.save();
    ctx.shadowColor = tech.color;
    ctx.shadowBlur = 40 - pass * 10;
    ctx.strokeStyle = tech.color;
    ctx.lineWidth = 10 - pass * 2;
    ctx.strokeRect(16, 16, S - 32, S - 32);
    ctx.restore();
  }

  // Corner accents
  const len = 60;
  [[[16, 16], [16 + len, 16], [16, 16 + len]],
  [[S - 16, 16], [S - 16 - len, 16], [S - 16, 16 + len]],
  [[16, S - 16], [16 + len, S - 16], [16, S - 16 - len]],
  [[S - 16, S - 16], [S - 16 - len, S - 16], [S - 16, S - 16 - len]]].forEach(pts => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.lineTo(pts[1][0], pts[1][1]);
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.lineTo(pts[2][0], pts[2][1]);
    ctx.strokeStyle = tech.accent;
    ctx.lineWidth = 6;
    ctx.stroke();
  });

  // Central glow circle (brighter)
  const radGrad = ctx.createRadialGradient(S / 2, S / 2, 10, S / 2, S / 2, 180);
  radGrad.addColorStop(0, tech.color + '55');
  radGrad.addColorStop(0.5, tech.color + '22');
  radGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, 180, 0, Math.PI * 2);
  ctx.fill();

  // Symbol text
  ctx.save();
  ctx.shadowColor = tech.color;
  ctx.shadowBlur = 30;
  ctx.fillStyle = tech.color;
  ctx.font = `900 ${S * 0.28}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tech.symbol, S / 2, S * 0.42);
  ctx.restore();

  // Name label
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${S * 0.09}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tech.name, S / 2, S * 0.76);

  // Scan line decoration
  for (let y = 0; y < S; y += 6) {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, y, S, 1);
  }

  return new THREE.CanvasTexture(cv);
}

/* ─── Rotating Cube ───────────────────────────────────────── */
function HoloCube({ textures }) {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0.4, y: 0.3 });

  useEffect(() => {
    const handler = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.04;
    targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.04;
    // Slow auto-rotation + mouse influence
    meshRef.current.rotation.y = t * 0.25 + targetRef.current.x;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.3 + targetRef.current.y;
    meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.08;
  });

  const materials = textures.map(
    (tex) => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.1, metalness: 0.8 })
  );

  return (
    <mesh ref={meshRef} material={materials}>
      <boxGeometry args={[2.4, 2.4, 2.4]} />
    </mesh>
  );
}

/* ─── Orbiting Ring ───────────────────────────────────────── */
function OrbitRing({ radius, speed, color, tiltX = 0, tiltZ = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * speed;
    ref.current.rotation.x = tiltX;
    ref.current.rotation.z = tiltZ;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 8, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.55} />
    </mesh>
  );
}

/* ─── Floating particle dots ─────────────────────────────── */
function Particles({ count = 60 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  const geomRef = useRef();
  useFrame(({ clock }) => {
    if (geomRef.current) {
      geomRef.current.rotateY(0.002);
    }
  });

  return (
    <points ref={geomRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00D9FF" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ─── Scene ───────────────────────────────────────────────── */
function Scene({ textures }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={6} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={4} color="#ccddff" />
      <pointLight position={[0, 4, 0]} intensity={4} color="#ffffff" />
      <pointLight position={[0, -4, 4]} intensity={3} color="#eeeeff" />

      <HoloCube textures={textures} />
      <OrbitRing radius={2.1} speed={0.5} color="#00D9FF" tiltX={0.4} />
      <OrbitRing radius={2.5} speed={-0.35} color="#7B61FF" tiltZ={0.6} />
      <OrbitRing radius={2.85} speed={0.25} color="#5EE6FF" tiltX={-0.3} tiltZ={0.3} />
      <Particles count={70} />
    </>
  );
}

/* ─── Exported component ──────────────────────────────────── */
export default function SkillSphere3D() {
  // Build textures once on mount (useMemo with empty deps)
  const textures = useMemo(() => TECHS.map(buildFaceTexture), []);

  return (
    <div className="w-full h-[480px] md:h-[560px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Scene textures={textures} />
      </Canvas>
      {/* HUD labels */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
        {TECHS.map((t) => (
          <span
            key={t.name}
            className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
            style={{ color: t.color, background: t.color + '18', border: `1px solid ${t.color}40` }}
          >
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
