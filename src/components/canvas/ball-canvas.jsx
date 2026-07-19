'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import { useIsDesktop, useReducedMotion } from '@/hooks/use-media-query';

function Ball({ icon, lowPower }) {
  const [texture] = useTexture([`/icons/${icon}.svg`]);

  return (
    <Float speed={lowPower ? 1 : 1.75} rotationIntensity={lowPower ? 0.4 : 1} floatIntensity={lowPower ? 0.8 : 2}>
      <ambientLight intensity={1.6} />
      {/* Kept on mobile too: a directional light is cheap shading maths, whereas
          shadow *mapping* (gated below) is the actual cost. Without it the facets
          flatten into a grey blob. It must sit well outside the sphere — a position
          near the origin gives a degenerate direction and shades every face flat. */}
      <directionalLight position={[3, 4, 6]} intensity={1.8} />
      <mesh castShadow={!lowPower} receiveShadow={!lowPower} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff5f8"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1}>
          {/* Transparent so only the glyph lands on the sphere, not a square patch. */}
          <meshStandardMaterial
            map={texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
          />
        </Decal>
      </mesh>
    </Float>
  );
}

export default function BallCanvas({ icon }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const lowPower = !isDesktop || reducedMotion;

  // The frustum must stay wide: at scale 2.75 the sphere spans 5.5 units, and a
  // narrow fov clips it into a flat square patch instead of a ball.
  return (
    <Canvas
      frameloop={reducedMotion ? 'demand' : 'always'}
      dpr={lowPower ? 1 : [1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: !lowPower }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <Suspense fallback={null}>
        {/* Drag-to-rotate is desktop-only; zoom and pan are always off. */}
        <OrbitControls enableZoom={false} enablePan={false} enabled={!lowPower} />
        <Ball icon={icon} lowPower={lowPower} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
