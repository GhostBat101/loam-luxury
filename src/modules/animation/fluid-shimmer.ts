/**
 * Fluid Cursor-Responsive Shimmer Animation Engine.
 * Computes calibrated spring physics, velocity wake damping, and seamless phase-synchronized ambient sweeps.
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
  leaveTimer: number | null;
}

export const FLUID_CONFIG = {
  SPRING_K: 0.065,
  DAMPING: 0.70,
  MAX_VELOCITY: 3.2,
  AMBIENT_SPEED: 0.018,
  GRADIENT_OFFSET_START: -30,
  GRADIENT_SPAN: 160,
  PROXIMITY_PADDING_X: 80,
  PROXIMITY_PADDING_Y: 140,
  HOVER_GRACE_MS: 200
} as const;

export function calculateNormalizedCursorPosition(clientX: number, rect: DOMRect): number {
  if (!rect || rect.width <= 0) {
    return 50;
  }
  const relativeX = clientX - rect.left;
  const clampedX = Math.max(0, Math.min(rect.width, relativeX));
  return (clampedX / rect.width) * 100;
}

export function isPointerWithinShimmerBounds(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  paddingX: number = FLUID_CONFIG.PROXIMITY_PADDING_X,
  paddingY: number = FLUID_CONFIG.PROXIMITY_PADDING_Y
): boolean {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return false;
  }
  return (
    clientX >= rect.left - paddingX &&
    clientX <= rect.right + paddingX &&
    clientY >= rect.top - paddingY &&
    clientY <= rect.bottom + paddingY
  );
}

export function syncAmbientPhaseWithPosition(current: number, velocity: number = 0): number {
  const normalized = Math.max(-1, Math.min(1, (current - 50) / 45));
  const basePhase = Math.asin(normalized);
  if (velocity < 0) {
    return Math.PI - basePhase;
  }
  return basePhase;
}

export function stepFluidPhysics(
  state: FluidPhysicsState,
  springK: number = FLUID_CONFIG.SPRING_K,
  damping: number = FLUID_CONFIG.DAMPING,
  maxVelocity: number = Infinity
): FluidPhysicsState {
  const displacement = state.target - state.current;
  const force = displacement * springK;
  let newVelocity = (state.velocity + force) * damping;

  if (Math.abs(newVelocity) > maxVelocity) {
    newVelocity = Math.sign(newVelocity) * maxVelocity;
  }

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

export function calculateFluidRipple(velocity: number, _time: number = 0): number {
  if (Math.abs(velocity) < 0.02) {
    return 0;
  }
  return -Math.sign(velocity) * Math.min(0.5, Math.abs(velocity) * 0.08);
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
    ambientPhase: index * (Math.PI / 3),
    leaveTimer: null
  }));

  const onGlobalPointerMove = (event: PointerEvent) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    items.forEach((item) => {
      const rect = item.element.getBoundingClientRect();
      const inProximity = isPointerWithinShimmerBounds(clientX, clientY, rect);

      if (inProximity) {
        if (item.leaveTimer !== null) {
          window.clearTimeout(item.leaveTimer);
          item.leaveTimer = null;
        }
        item.isHovered = true;
        item.element.classList.add('is-shimmer-hovered');
        item.state.target = calculateNormalizedCursorPosition(clientX, rect);
      } else if (item.isHovered && item.leaveTimer === null) {
        item.leaveTimer = window.setTimeout(() => {
          item.isHovered = false;
          item.element.classList.remove('is-shimmer-hovered');
          item.ambientPhase = syncAmbientPhaseWithPosition(item.state.current, item.state.velocity);
          item.leaveTimer = null;
        }, FLUID_CONFIG.HOVER_GRACE_MS);
      }
    });
  };

  const onGlobalPointerLeave = () => {
    items.forEach((item) => {
      if (item.leaveTimer !== null) {
        window.clearTimeout(item.leaveTimer);
        item.leaveTimer = null;
      }
      if (item.isHovered) {
        item.isHovered = false;
        item.element.classList.remove('is-shimmer-hovered');
        item.ambientPhase = syncAmbientPhaseWithPosition(item.state.current, item.state.velocity);
      }
    });
  };

  window.addEventListener('pointermove', onGlobalPointerMove, { passive: true });
  document.addEventListener('pointerleave', onGlobalPointerLeave);

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

      item.state = stepFluidPhysics(
        item.state,
        FLUID_CONFIG.SPRING_K,
        FLUID_CONFIG.DAMPING,
        FLUID_CONFIG.MAX_VELOCITY
      );
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
    window.removeEventListener('pointermove', onGlobalPointerMove);
    document.removeEventListener('pointerleave', onGlobalPointerLeave);
    items.forEach((item) => {
      if (item.leaveTimer !== null) {
        window.clearTimeout(item.leaveTimer);
      }
    });
  };
}
