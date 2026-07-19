'use client';

import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';

const PLACEHOLDER_COUNT = 4;

function ShimmerBlock({ className }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-background/70 to-transparent" />
    </div>
  );
}

function SkeletonCard() {
  return (
    // Gradient border via a padded gradient wrapper around a solid inner card.
    <div className="gradient-primary rounded-[calc(var(--radius)+2px)] p-[2px] shadow-soft">
      <div className="flex h-full flex-col gap-5 rounded-lg bg-card p-6">
        <ShimmerBlock className="h-40 w-full" />
        <div className="space-y-3">
          <ShimmerBlock className="h-5 w-2/3" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-4/5" />
        </div>
        <div className="mt-auto flex gap-2">
          <ShimmerBlock className="h-7 w-20 rounded-full" />
          <ShimmerBlock className="h-7 w-16 rounded-full" />
        </div>
        <Button variant="outline" disabled className="w-full">
          View Project
        </Button>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <SectionWrapper id="work" className="bg-muted/30">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="My Work — Coming Soon"
          subtitle="Projects coming soon — check back shortly!"
        />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <SkeletonCard />
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
