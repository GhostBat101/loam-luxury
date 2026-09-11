/**
 * Inertia Momentum Smooth Scroll Engine.
 * Configures Lenis smooth scrolling for weighted, 60 FPS luxury navigation with acceleration and deceleration physics.
 * Communicates with: src/main.ts and Lenis library.
 */

import Lenis from 'lenis';

export interface SmoothScrollController {
  lenis: Lenis;
  destroy: () => void;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

export const DEFAULT_ANCHOR_OFFSET = -70;
export const ANCHOR_SCROLL_DURATION = 1.35;
export const WHEEL_MULTIPLIER = 1.0;
export const TOUCH_MULTIPLIER = 1.2;
export const SCROLL_LERP = 0.078;

export const cubicEaseInOut = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function initSmoothScroll(): SmoothScrollController {
  const lenis = new Lenis({
    lerp: SCROLL_LERP,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: WHEEL_MULTIPLIER,
    touchMultiplier: TOUCH_MULTIPLIER,
    infinite: false
  });

  let rafId: number;

  function raf(time: number): void {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  const anchorClickListener = (e: MouseEvent): void => {
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
        lenis.scrollTo(destination, {
          offset: DEFAULT_ANCHOR_OFFSET,
          duration: ANCHOR_SCROLL_DURATION,
          easing: cubicEaseInOut
        });
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
    scrollTo: (target: string | HTMLElement, offset: number = DEFAULT_ANCHOR_OFFSET) => {
      lenis.scrollTo(target, {
        offset,
        duration: ANCHOR_SCROLL_DURATION,
        easing: cubicEaseInOut
      });
    }
  };
}

