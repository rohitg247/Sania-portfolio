'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scroll-reveal wrapper applied to every section. */
export function SectionWrapper({ id, className, children }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className={cn('relative w-full py-20 md:py-28', className)}
    >
      {children}
    </motion.section>
  );
}

/** Staggered child reveal, for grids and lists inside a section. */
export function FadeIn({ delay = 0, className, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, className }) {
  return (
    <div className={cn('mb-14 max-w-2xl', className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-text">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
