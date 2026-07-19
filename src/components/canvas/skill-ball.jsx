'use client';

import dynamic from 'next/dynamic';
import { BallBoundary } from '@/components/canvas/ball-boundary';

// A WebGL canvas cannot be server-rendered.
const BallCanvas = dynamic(() => import('@/components/canvas/ball-canvas'), {
  ssr: false,
  loading: () => <BallFallback />,
});

/** Static stand-in used while loading, and permanently if the texture fails. */
function BallFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="gradient-primary h-20 w-20 animate-pulse rounded-full opacity-60 sm:h-24 sm:w-24" />
    </div>
  );
}

export function SkillBall({ name, icon }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        {/* Glow ring beneath the ball, tinted by the active theme. */}
        <div
          aria-hidden
          className="absolute inset-x-4 bottom-1 h-4 rounded-[100%] blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-70"
          style={{ background: 'radial-gradient(ellipse, var(--glow) 0%, transparent 70%)' }}
        />
        <BallBoundary name={name} fallback={<BallFallback />}>
          <BallCanvas icon={icon} />
        </BallBoundary>
      </div>
      <p className="text-center text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
        {name}
      </p>
    </div>
  );
}
