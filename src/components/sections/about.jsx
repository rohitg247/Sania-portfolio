'use client';

import Image from 'next/image';
import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { ABOUT_BIO, LANGUAGES } from '@/lib/constants';

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="container">
        <SectionHeading eyebrow="About Me" title="Marketing that ships with its own creative" />

        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <FadeIn>
            <div className="space-y-5">
              {ABOUT_BIO.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold">Languages</h3>
              <div className="flex flex-wrap gap-2.5">
                {LANGUAGES.map((language) => (
                  <span
                    key={language.name}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
                  >
                    {language.name} <span className="text-muted-foreground">· {language.level}</span>
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="glow-hover relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border bg-card shadow-soft">
              <div className="gradient-primary absolute inset-x-0 top-0 h-1.5" />
              <Image
                src="/profile-placeholder.svg"
                alt="Profile photo placeholder"
                width={640}
                height={800}
                className="h-auto w-full"
                priority={false}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
