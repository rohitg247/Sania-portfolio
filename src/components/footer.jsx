'use client';

import { Download, Instagram, Linkedin } from 'lucide-react';
import { PROFILE, SOCIALS } from '@/lib/constants';

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram };

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-lg font-extrabold">
            Sania<span className="text-gradient"> Ansari</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{PROFILE.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, icon, href }) => {
            const Icon = SOCIAL_ICONS[icon];
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glow-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
          <a
            href={PROFILE.resume}
            download
            className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary-text"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="container text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
