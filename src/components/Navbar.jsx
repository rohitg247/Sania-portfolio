'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { NAV_LINKS, PROFILE } from '@/lib/constants';
import { cn } from '@/lib/utils';

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      // A thin band around the viewport centre decides the active section.
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and inert the page behind the drawer while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const page = [document.querySelector('main'), document.querySelector('footer')];
    page.forEach((el) => el && (open ? el.setAttribute('inert', '') : el.removeAttribute('inert')));
    return () => {
      document.body.style.overflow = '';
      page.forEach((el) => el && el.removeAttribute('inert'));
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-border bg-background/80 backdrop-blur-lg shadow-soft' : 'bg-transparent'
        )}
      >
        <nav className="container flex h-20 items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center font-display text-lg font-extrabold tracking-tight sm:text-xl"
          >
            Sania&nbsp;<span className="text-gradient">Ansari</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors',
                  active === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 backdrop-blur lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="gradient-primary h-0.5 origin-left"
        />
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(20rem,85vw)] flex-col gap-2 border-l border-border bg-card p-6 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mb-4 inline-flex h-11 w-11 items-center justify-center self-end rounded-full border border-border"
              >
                <X className="h-5 w-5" />
              </button>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex min-h-11 items-center rounded-xl px-4 text-base font-semibold transition-colors',
                    active === link.href
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              ))}

              <a
                href={PROFILE.resume}
                download
                onClick={() => setOpen(false)}
                className="gradient-primary mt-4 flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-white"
              >
                Download Resume
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
