'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook. Always returns `false` on the server and on the
 * first client render so markup matches and hydration never mismatches; the
 * real value lands in the effect.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
