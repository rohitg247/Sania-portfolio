'use client';

import { ArrowRight, FolderOpen } from 'lucide-react';
import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';

export function Projects() {
  return (
    <SectionWrapper id="work" className="bg-muted/30">
      <div className="container">
        <SectionHeading eyebrow="Portfolio" title="Case studies in progress" />

        <FadeIn>
          <div className="glass-card mx-auto flex max-w-3xl flex-col items-start gap-5 p-8 sm:p-10">
            <span className="gradient-primary flex h-12 w-12 items-center justify-center rounded-full text-white">
              <FolderOpen className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-bold sm:text-2xl">
              The campaigns are live — the write-ups are on the way.
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Detailed case studies of the work behind the numbers above are being prepared. Want
              samples or campaign walk-throughs in the meantime? Just ask.
            </p>
            <Button variant="gradient" onClick={() => scrollTo('#contact')}>
              Request samples <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}

function scrollTo(hash) {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
}
