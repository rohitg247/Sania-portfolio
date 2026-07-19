'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glow-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Both icons render until mounted, so the server and client markup agree. */}
      <Sun className={`h-5 w-5 transition-opacity ${mounted && isDark ? 'hidden' : 'block'}`} />
      <Moon className={`h-5 w-5 transition-opacity ${mounted && isDark ? 'block' : 'hidden'}`} />
    </button>
  );
}
