/**
 * RAF Numerical Counter Animator.
 * Animates numeric text content using cubic-bezier easing curve for scientific telemetry metrics.
 * Communicates with: src/modules/animation/scroll-reveal.ts and metric display elements.
 */

const DEFAULT_DURATION: number = 1000;

export function animateCounter(element: HTMLElement, duration: number = DEFAULT_DURATION): void {
  const target = parseInt(element.getAttribute('data-target') || element.textContent || '0', 10);
  if (isNaN(target)) {
    return;
  }

  const startTime = performance.now();

  function step(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * target);

    element.textContent = currentVal < 10 ? `0${currentVal}` : currentVal.toString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target < 10 ? `0${target}` : target.toString();
    }
  }

  requestAnimationFrame(step);
}
