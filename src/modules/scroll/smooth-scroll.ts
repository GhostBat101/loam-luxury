/**
 * Inertia Momentum Smooth Scroll Engine.
 * Configures Lenis smooth scrolling for weighted, 60 FPS luxury navigation.
 * Communicates with: src/main.ts and Lenis library.
 */

import Lenis from 'lenis';

export interface SmoothScrollController {
  lenis: Lenis;
  destroy: () => void;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

export function initSmoothScroll(): SmoothScrollController {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    infinite: false
  });

  let rafId: number;

  function raf(time: number): void {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  const anchorClickListener = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest('a');
    if (!link) {
      return;
    }

    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const destination = document.querySelector(href);
      if (destination instanceof HTMLElement) {
        e.preventDefault();
        lenis.scrollTo(destination, { offset: -70 });
      }
    }
  };

  document.addEventListener('click', anchorClickListener);

  return {
    lenis,
    destroy: () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', anchorClickListener);
      lenis.destroy();
    },
    scrollTo: (target: string | HTMLElement, offset: number = -70) => {
      lenis.scrollTo(target, { offset });
    }
  };
}
