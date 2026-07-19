'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useIsDesktop, useReducedMotion } from '@/hooks/use-media-query';
import { PROFILE, ROTATING_ROLES, STATS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function WordRotate({ phrases }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2600);
    return () => clearInterval(timer);
  }, [phrases.length, reducedMotion]);

  if (reducedMotion) {
    return <span className="text-gradient">{phrases[0]}</span>;
  }

  return (
    <span className="relative block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StatValue({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reducedMotion]);

  return (
    <span ref={ref} className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Orbs() {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  // Mobile gets fewer, static orbs — large animated blurs are expensive to composite.
  const orbs = [
    { className: 'left-[-8%] top-[12%] h-64 w-64 sm:h-96 sm:w-96', from: '#FF6B9D', delay: '0s' },
    { className: 'right-[-10%] top-[30%] h-56 w-56 sm:h-80 sm:w-80', from: '#FF8FA3', delay: '-5s' },
    { className: 'bottom-[6%] left-[35%] h-48 w-48 sm:h-72 sm:w-72', from: '#C44569', delay: '-9s' },
  ];
  const visible = isDesktop ? orbs : orbs.slice(0, 2);
  const animateOrbs = isDesktop && !reducedMotion;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {visible.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-40 blur-3xl dark:opacity-25 ${orb.className} ${animateOrbs ? 'animate-float' : ''}`}
          style={{
            background: `radial-gradient(circle, ${orb.from} 0%, transparent 70%)`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const nameWord = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      <Orbs />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur sm:text-sm"
        >
          {PROFILE.location.replace(' — 400074', '')}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={nameContainer}
          className="text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          {PROFILE.name.split(' ').map((word) => (
            <motion.span key={word} variants={nameWord} className="inline-block">
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 text-xl font-bold sm:text-2xl md:text-4xl"
        >
          <WordRotate phrases={ROTATING_ROLES} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          5+ years driving lead generation for real estate and consumer brands — paid ads, hyper-local
          SEO and in-house creative.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Button variant="gradient" size="lg" onClick={() => scrollTo('#contact')}>
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Button>
          <a
            href={PROFILE.resume}
            download
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <dd className="order-1">
                <StatValue {...stat} />
              </dd>
              <dt className="order-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

function scrollTo(hash) {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
}
