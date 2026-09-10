/**
 * Viewport Scroll Reveal & Divider Observer.
 * Orchestrates hardware-accelerated entrance transforms, expanding dividers, and metric counters.
 * Communicates with: src/modules/animation/counter-animator.ts, src/modules/accessibility/motion-controller.ts, and main.ts.
 */

import { animateCounter } from './counter-animator';
import type { MotionController } from '../accessibility/motion-controller';

const OBSERVER_CONFIG: IntersectionObserverInit = {
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1
};

export function initScrollReveal(motionController?: MotionController): () => void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal-item, .watermark-float, .expand-divider');
  if (elements.length === 0) {
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        target.classList.add('is-revealed');

        if (target.classList.contains('expand-divider')) {
          target.classList.add('is-visible');
        }

        const counter = target.querySelector<HTMLElement>('.counter-display') 
          || (target.classList.contains('counter-display') ? target : null);

        const isReduced = motionController ? motionController.isReducedMotion() : false;
        if (counter && !counter.dataset.counted && !isReduced) {
          counter.dataset.counted = 'true';
          animateCounter(counter);
        } else if (counter && isReduced) {
          const targetNum = counter.getAttribute('data-target') || '24';
          counter.textContent = targetNum;
        }

        observer.unobserve(target);
      }
    }
  }, OBSERVER_CONFIG);

  elements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}
