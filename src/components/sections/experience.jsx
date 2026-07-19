'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/section-wrapper';
import { EXPERIENCE } from '@/lib/constants';

function TimelineCard({ job }) {
  return (
    <article className="glass-card glow-hover border-l-4 border-l-primary p-6 text-left sm:p-7">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary-text">{job.period}</p>
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

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute inset-y-0 left-[15px] w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCE.map((job) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12"
              >
                <span className="gradient-primary absolute left-0 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-glow ring-4 ring-background">
                  <Briefcase className="h-4 w-4" />
                </span>
                <TimelineCard job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
