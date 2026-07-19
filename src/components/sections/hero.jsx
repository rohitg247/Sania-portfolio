'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsDesktop, useReducedMotion } from '@/hooks/use-media-query';
import { PROFILE, TYPEWRITER_PHRASES } from '@/lib/constants';

function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[index % phrases.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === '';

    const delay = done ? 1600 : cleared ? 200 : deleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reducedMotion]);

  return (
    <span className="text-gradient">
      {text || ' '}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-primary align-middle" style={{ height: '1em' }} />
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
  const animate = isDesktop && !reducedMotion;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {visible.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-40 blur-3xl dark:opacity-25 ${orb.className} ${animate ? 'animate-float' : ''}`}
          style={{
            background: `radial-gradient(circle, ${orb.from} 0%, transparent 70%)`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 min-h-[2.5em] text-xl font-bold sm:text-2xl md:text-4xl"
        >
          <Typewriter phrases={TYPEWRITER_PHRASES} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          5+ years driving lead generation for real estate and consumer brands — paid ads, hyper-local
          SEO and in-house creative.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Button variant="outline" size="lg" onClick={() => scrollTo('#work')}>
            View My Work
          </Button>
          <Button variant="gradient" size="lg" onClick={() => scrollTo('#contact')}>
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Button>
          <a
            href={PROFILE.resume}
            download
            className="gradient-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function scrollTo(hash) {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
}
