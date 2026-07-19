'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-wrapper';
import { EXPERIENCE } from '@/lib/constants';

function TimelineCard({ job }) {
  return (
    <article className="glass-card glow-hover border-l-4 border-l-primary p-6 text-left sm:p-7">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">{job.period}</p>
      <h3 className="text-lg font-bold sm:text-xl">{job.title}</h3>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        {job.company} · {job.location}
      </p>
      <ul className="mt-4 space-y-2.5">
        {job.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="container">
        <SectionHeading eyebrow="Experience" title="Where I've done the work" />

        <div className="relative mx-auto max-w-5xl">
          {/* Spine: left-aligned on mobile, centred once the layout alternates. */}
          <div className="absolute inset-y-0 left-[15px] w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-14">
            {EXPERIENCE.map((job, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0"
                >
                  {/* Node marker */}
                  <span className="gradient-primary absolute left-0 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-glow ring-4 ring-background md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <Briefcase className="h-4 w-4" />
                  </span>

                  {isLeft ? (
                    <>
                      <div className="md:pr-2">
                        <TimelineCard job={job} />
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div className="md:pl-2">
                        <TimelineCard job={job} />
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
