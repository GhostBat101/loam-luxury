/**
 * Dynamic Scroll Surface Background Engine.
 * Modulates CSS custom property --page-bg across viewport intersections for seamless palette transitions.
 * Communicates with: src/styles/tokens.css, src/main.ts, and section container markup.
 */

const OBSERVER_CONFIG: IntersectionObserverInit = {
  rootMargin: '-15% 0px -25% 0px',
  threshold: [0.25, 0.5, 0.75]
};

export function initScrollBackground(selector: string = 'section[data-bg]'): () => void {
  const sections = document.querySelectorAll<HTMLElement>(selector);
  if (sections.length === 0) {
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        const newBg = entry.target.getAttribute('data-bg');
        if (newBg) {
          document.documentElement.style.setProperty('--page-bg', newBg);
          document.body.style.backgroundColor = newBg;
        }
      }
    }
  }, OBSERVER_CONFIG);

  sections.forEach((section) => observer.observe(section));

  return () => {
    observer.disconnect();
  };
}
