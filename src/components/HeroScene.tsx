import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// ─── Planet catalogue ──────────────────────────────────────────────────────────
const CATALOGUE = [
  {
    name: 'Mercury',
    radius: 0.10, orbit: 2.5, speed: 2.0, tilt: 0.034,
    color: '#b0aaa0', emissive: '#251c18', rough: 0.95, metal: 0.05,
    atmo: null,
  },
  {
    name: 'Venus',
    radius: 0.22, orbit: 3.6, speed: 1.40, tilt: 0.052,
    color: '#e8c870', emissive: '#6b4c0a', rough: 0.65, metal: 0.0,
    atmo: { color: '#d4941a', opacity: 0.10, scale: 1.14 },
  },
  {
    name: 'Earth',
    radius: 0.24, orbit: 4.9, speed: 1.00, tilt: 0.409,
    color: '#2e6db4', emissive: '#0a2545', rough: 0.55, metal: 0.10,
    atmo: { color: '#4499ff', opacity: 0.12, scale: 1.18 },
    hasMoon: true,
  },
  {
    name: 'Mars',
    radius: 0.15, orbit: 6.4, speed: 0.70, tilt: 0.439,
    color: '#c14a28', emissive: '#430e00', rough: 0.92, metal: 0.0,
    atmo: { color: '#e08050', opacity: 0.06, scale: 1.12 },
  },
  {
    name: 'Jupiter',
    radius: 0.65, orbit: 9.2, speed: 0.30, tilt: 0.054,
    color: '#c4854a', emissive: '#3d1800', rough: 0.55, metal: 0.0,
    atmo: null,
    isBanded: true,
  },
  {
    name: 'Saturn',
    radius: 0.52, orbit: 12.5, speed: 0.20, tilt: 0.467,
    color: '#e8d585', emissive: '#4a3800', rough: 0.60, metal: 0.0,
    atmo: null,
    hasRings: true,
  },
  {
    name: 'Uranus',
    radius: 0.36, orbit: 16.0, speed: 0.12, tilt: 1.706,
    color: '#7ecfda', emissive: '#0a3040', rough: 0.50, metal: 0.10,
    atmo: { color: '#55ccdd', opacity: 0.08, scale: 1.14 },
  },
  {
    name: 'Neptune',
    radius: 0.34, orbit: 19.5, speed: 0.09, tilt: 0.494,
    color: '#2255cc', emissive: '#080f40', rough: 0.50, metal: 0.10,
    atmo: { color: '#3366ff', opacity: 0.10, scale: 1.15 },
  },
] as const;

// ─── Jupiter banded shader ────────────────────────────────────────────────────
const JUP_VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv    = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const JUP_FRAG = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;

  vec3 band(float y, float freq, vec3 a, vec3 b) {
    float t = sin(y * freq + uTime * 0.1) * 0.5 + 0.5;
    return mix(a, b, smoothstep(0.35, 0.65, t));
  }

  void main() {
    float y    = vUv.y;
    vec3  c1   = band(y, 18.0, vec3(0.76, 0.52, 0.28), vec3(0.92, 0.78, 0.58));
    vec3  c2   = band(y, 42.0, c1,                      vec3(0.58, 0.34, 0.18));
    vec3  c3   = band(y,  9.0, c2,                      vec3(0.84, 0.68, 0.46));

    // Diffuse lighting approximation
    vec3  light = normalize(vec3(-1.0, 0.5, 1.0));
    float diff  = max(dot(vNormal, light), 0.0) * 0.6 + 0.4;
    gl_FragColor = vec4(c3 * diff, 1.0);
  }
`;

// ─── Animated Sun ─────────────────────────────────────────────────────────────
function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) coreRef.current.rotation.y = t * 0.05;
    if (pulseRef.current) {
      const s = 1 + Math.sin(t * 0.9) * 0.04;
      pulseRef.current.scale.setScalar(s);
    }
    if (pulse2Ref.current) {
      const s = 1 + Math.sin(t * 0.6 + 1.2) * 0.06;
      pulse2Ref.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Photosphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#ffd060" emissive="#ff9900" emissiveIntensity={2.8}
          roughness={0.25} metalness={0} />
      </mesh>

      {/* Pulsing chromosphere */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[1.38, 32, 32]} />
        <meshBasicMaterial color="#ffcc44" transparent opacity={0.22}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Outer corona (slow pulse) */}
      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[1.72, 24, 24]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.07}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Very faint outer glow */}
      <mesh>
        <sphereGeometry args={[2.5, 18, 18]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.025}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Orbit ring ────────────────────────────────────────────────────────────────
function OrbitRing({ radius, opacity = 0.14 }: { radius: number; opacity?: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 4, 200]} />
      <meshBasicMaterial color="#3355aa" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

// ─── Jupiter (banded shader) ───────────────────────────────────────────────────
function JupiterMesh({ radius }: { radius: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial ref={matRef}
        vertexShader={JUP_VERT}
        fragmentShader={JUP_FRAG}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

// ─── Planet ────────────────────────────────────────────────────────────────────
type CatEntry = typeof CATALOGUE[number];

function Planet({ def, startAngle = 0 }: { def: CatEntry; startAngle: number }) {
  const pivotRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const moonPivot = useRef<THREE.Group>(null);
  const timeRef = useRef(startAngle / def.speed); // start at correct phase

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    const ang = t * def.speed;

    if (pivotRef.current) {
      // Slightly elliptical orbit using sin/cos with a small eccentricity
      const ecc = 0.06;
      pivotRef.current.position.x = Math.cos(ang) * def.orbit * (1 + ecc * 0.5);
      pivotRef.current.position.z = Math.sin(ang) * def.orbit;
    }
    if (bodyRef.current) bodyRef.current.rotation.y += delta * 0.8;
    if (moonPivot.current) moonPivot.current.rotation.y = t * 3.2;
  });

  const hasMoon = 'hasMoon' in def && def.hasMoon;
  const hasRings = 'hasRings' in def && def.hasRings;
  const isBanded = 'isBanded' in def && def.isBanded;

  return (
    <group rotation={[def.tilt, 0, 0]}>
      <group ref={pivotRef}>
        {/* Planet body */}
        {isBanded
          ? <JupiterMesh radius={def.radius} />
          : (
            <mesh ref={bodyRef}>
              <sphereGeometry args={[def.radius, 48, 48]} />
              <meshStandardMaterial
                color={def.color}
                emissive={def.emissive}
                emissiveIntensity={0.3}
                roughness={def.rough}
                metalness={def.metal}
              />
            </mesh>
          )}

        {/* Atmosphere halo */}
        {def.atmo && (
          <mesh>
            <sphereGeometry args={[def.radius * def.atmo.scale, 32, 32]} />
            <meshBasicMaterial
              color={def.atmo.color}
              transparent
              opacity={def.atmo.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Earth's Moon */}
        {hasMoon && (
          <group ref={moonPivot}>
            <mesh position={[def.radius * 3.0, 0, 0]}>
              <sphereGeometry args={[def.radius * 0.27, 16, 16]} />
              <meshStandardMaterial color="#cccccc" emissive="#222222"
                emissiveIntensity={0.1} roughness={0.97} metalness={0} />
            </mesh>
          </group>
        )}

        {/* Saturn's rings */}
        {hasRings && (
          <group rotation={[Math.PI / 2.1, 0.25, 0.1]}>
            {[
              { inner: def.radius * 1.35, outer: def.radius * 1.80, color: '#d4b45a', op: 0.72 },
              { inner: def.radius * 1.85, outer: def.radius * 2.25, color: '#c9a845', op: 0.55 },
              { inner: def.radius * 2.30, outer: def.radius * 2.65, color: '#b89032', op: 0.38 },
              { inner: def.radius * 2.68, outer: def.radius * 2.90, color: '#e8d090', op: 0.20 },
            ].map((r, i) => (
              <mesh key={i}>
                <ringGeometry args={[r.inner, r.outer, 90]} />
                <meshBasicMaterial color={r.color} side={THREE.DoubleSide}
                  transparent opacity={r.op} depthWrite={false} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </group>
  );
}

// ─── Asteroid belt (Mars ↔ Jupiter) ────────────────────────────────────────────
function AsteroidBelt() {
  const beltRef = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 7.5 + Math.random() * 1.2;  // between Mars(6.4) and Jupiter(9.2)
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.3;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: '#887755',
    size: 0.04,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
  }), []);

  useFrame((_, delta) => {
    if (beltRef.current) beltRef.current.rotation.y += delta * 0.012;
  });

  return <points ref={beltRef} geometry={geo} material={mat} />;
}

// ─── Starfield ─────────────────────────────────────────────────────────────────
function Stars() {
  const geo = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 32 + Math.random() * 90;
      const th = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: '#d0dff8',
    size: 0.10,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
  }), []);

  return <points geometry={geo} material={mat} />;
}

// ─── Cursor-driven tilt ────────────────────────────────────────────────────────
function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0.30, y: 0 });
  const current = useRef({ x: 0.30, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.y = nx * 0.28;
      target.current.x = 0.30 + ny * 0.14;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Frame-rate independent lerp: ~3.5% per frame at 60fps — very buttery
    const k = 1 - Math.pow(0.035, delta);
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;

    groupRef.current.rotation.x = current.current.x;
    groupRef.current.rotation.y += delta * 0.007;          // imperceptibly slow drift
    groupRef.current.rotation.z = current.current.y * 0.04;
  });

  const startAngles = useMemo(
    () => CATALOGUE.map(() => Math.random() * Math.PI * 2),
    []
  );

  return (
    <group ref={groupRef}>
      <Sun />
      {CATALOGUE.map((def, i) => (
        <group key={def.name}>
          <OrbitRing radius={def.orbit} opacity={0.12} />
          <Planet def={def} startAngle={startAngles[i]} />
        </group>
      ))}
      <AsteroidBelt />
    </group>
  );
}

// ─── Canvas ────────────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 5.5, 20], fov: 58, near: 0.1, far: 600 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.68,
        }}
      >
        <color attach="background" args={['#03050d']} />

        {/* Sun — primary point light */}
        <pointLight position={[0, 0, 0]} intensity={14} color="#fff4e0"
          decay={1.6} distance={100} />
        {/* Warm fill rim */}
        <pointLight position={[0, 0, 0]} intensity={5} color="#ffaa33"
          decay={1.3} distance={50} />
        {/* Very cold fill from opposite side (deep space ambient) */}
        <ambientLight intensity={0.025} color="#203060" />

        {/* Fixed starfield — not tilted with solar system */}
        <Stars />

        {/* Solar system + cursor interaction */}
        <SolarSystem />
      </Canvas>
    </div>
  );
}
