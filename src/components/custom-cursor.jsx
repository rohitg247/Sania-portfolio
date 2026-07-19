'use client';

import { useEffect, useState } from 'react';
import { useHasFinePointer, useReducedMotion } from '@/hooks/use-media-query';

/** Desktop-only glow dot. Renders nothing on touch devices or under reduced motion. */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] h-64 w-64 rounded-full opacity-60 blur-3xl"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate3d(-50%, -50%, 0)',
        background: 'radial-gradient(circle, var(--glow) 0%, transparent 65%)',
      }}
    />
  );
}
