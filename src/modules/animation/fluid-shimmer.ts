/**
 * Fluid Cursor-Responsive Shimmer Animation Engine.
 * Computes fluid spring physics, cursor velocity ripples, and ambient sine wave sweeps for metallic gradients.
 * Communicates with: src/main.ts, src/styles/typography.css, and src/modules/accessibility/motion-controller.ts.
 */

export interface FluidPhysicsState {
  current: number;
  velocity: number;
  target: number;
}

export interface FluidShimmerItem {
  element: HTMLElement;
  state: FluidPhysicsState;
  isHovered: boolean;
  ambientPhase: number;
}

export const FLUID_CONFIG = {
  SPRING_K: 0.12,
  DAMPING: 0.82,
  AMBIENT_SPEED: 0.02,
  GRADIENT_OFFSET_START: -30,
  GRADIENT_SPAN: 160
} as const;

export function calculateNormalizedCursorPosition(clientX: number, rect: DOMRect): number {
  if (!rect || rect.width <= 0) {
    return 50;
  }
  const relativeX = clientX - rect.left;
  const clampedX = Math.max(0, Math.min(rect.width, relativeX));
  return (clampedX / rect.width) * 100;
}

export function stepFluidPhysics(
  state: FluidPhysicsState,
  springK: number = FLUID_CONFIG.SPRING_K,
  damping: number = FLUID_CONFIG.DAMPING
): FluidPhysicsState {
  const displacement = state.target - state.current;
  const force = displacement * springK;
  const newVelocity = (state.velocity + force) * damping;
  const newCurrent = state.current + newVelocity;

  return {
    current: newCurrent,
    velocity: newVelocity,
    target: state.target
  };
}

export function calculateShimmerBackgroundPosition(normalizedPercent: number): number {
  const clamped = Math.max(0, Math.min(100, normalizedPercent));
  return FLUID_CONFIG.GRADIENT_OFFSET_START + (clamped / 100) * FLUID_CONFIG.GRADIENT_SPAN;
}

export function calculateAmbientSinePosition(phase: number): number {
  return 50 + Math.sin(phase) * 45;
}

export function calculateFluidRipple(velocity: number, time: number): number {
  if (Math.abs(velocity) < 0.001) {
    return 0;
  }
  return Math.sin(time * 6) * Math.min(5, velocity * 0.35);
}

export function initFluidShimmer(): () => void {
  const selector = '[data-fluid-shimmer="true"], .hero-water-shimmer, .header-caustic-shimmer, .metallic-liquid-shimmer';
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

  if (elements.length === 0) {
    return () => {};
  }

  const items: FluidShimmerItem[] = elements.map((element, index) => ({
    element,
    state: { current: 50, velocity: 0, target: 50 },
    isHovered: false,
    ambientPhase: index * (Math.PI / 3)
  }));

  const cleanups: Array<() => void> = [];

  items.forEach((item) => {
    const onPointerEnter = (event: PointerEvent) => {
      item.isHovered = true;
      const rect = item.element.getBoundingClientRect();
      item.state.target = calculateNormalizedCursorPosition(event.clientX, rect);
    };

    const onPointerMove = (event: PointerEvent) => {
      item.isHovered = true;
      const rect = item.element.getBoundingClientRect();
      item.state.target = calculateNormalizedCursorPosition(event.clientX, rect);
    };

    const onPointerLeave = () => {
      item.isHovered = false;
    };

    item.element.addEventListener('pointerenter', onPointerEnter);
    item.element.addEventListener('pointermove', onPointerMove);
    item.element.addEventListener('pointerleave', onPointerLeave);

    cleanups.push(() => {
      item.element.removeEventListener('pointerenter', onPointerEnter);
      item.element.removeEventListener('pointermove', onPointerMove);
      item.element.removeEventListener('pointerleave', onPointerLeave);
    });
  });

  let animationFrameId = 0;
  let lastTimestamp = performance.now();

  const tick = (now: number) => {
    const deltaMs = Math.min(64, now - lastTimestamp);
    lastTimestamp = now;
    const timeSec = now / 1000;

    const isReduced = document.body.classList.contains('reduced-motion');

    items.forEach((item) => {
      if (isReduced) {
        item.element.style.setProperty('--fluid-shimmer-pos', '50%');
        return;
      }

      if (!item.isHovered) {
        item.ambientPhase += FLUID_CONFIG.AMBIENT_SPEED * (deltaMs / 16.666);
        item.state.target = calculateAmbientSinePosition(item.ambientPhase);
      }

      item.state = stepFluidPhysics(item.state);
      const ripple = calculateFluidRipple(item.state.velocity, timeSec);
      const visualPercent = item.state.current + ripple;
      const bgPositionPercent = calculateShimmerBackgroundPosition(visualPercent);

      item.element.style.setProperty('--fluid-shimmer-pos', `${bgPositionPercent.toFixed(2)}%`);
    });

    animationFrameId = requestAnimationFrame(tick);
  };

  animationFrameId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(animationFrameId);
    cleanups.forEach((fn) => fn());
  };
}
