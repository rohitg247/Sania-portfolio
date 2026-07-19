'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { ABOUT_BIO, LANGUAGES } from '@/lib/constants';

function LanguageBar({ name, rating, delay }) {
  const percent = (rating / 5) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm tracking-widest text-primary" aria-hidden>
          {'★'.repeat(rating)}
          <span className="text-muted-foreground/40">{'★'.repeat(5 - rating)}</span>
        </span>
        <span className="sr-only">{rating} out of 5</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-primary h-full rounded-full"
        />
      </div>
    </div>
  );
}

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
              <h3 className="mb-5 text-lg font-bold">Languages</h3>
              <div className="space-y-5">
                {LANGUAGES.map((language, i) => (
                  <LanguageBar key={language.name} {...language} delay={i * 0.1} />
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
