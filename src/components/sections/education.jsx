'use client';

import { GraduationCap } from 'lucide-react';
import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { EDUCATION } from '@/lib/constants';

export function Education() {
  return (
    <SectionWrapper id="education">
      <div className="container">
        <SectionHeading eyebrow="Education" title="Where I trained" />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {EDUCATION.map((item, i) => (
            <FadeIn key={item.degree} delay={i * 0.08}>
              <Card className="glow-hover h-full">
                <CardContent className="flex gap-4 p-6 pt-6">
                  <span className="gradient-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-primary-text">
                      {item.year}
                    </span>
                    <h3 className="mt-3 text-base font-bold leading-snug sm:text-lg">{item.degree}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.institution}</p>
                    {item.note ? (
                      <p className="mt-1 text-sm font-semibold text-primary-text">{item.note}</p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
