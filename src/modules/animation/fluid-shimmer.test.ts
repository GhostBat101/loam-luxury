/**
 * Fluid Shimmer Animation Engine Test Suite.
 * Verifies cursor tracking math, spring physics, boundary clamping, and ambient sine wave oscillation.
 * Communicates with: src/modules/animation/fluid-shimmer.ts and vitest.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateNormalizedCursorPosition,
  stepFluidPhysics,
  calculateShimmerBackgroundPosition,
  calculateAmbientSinePosition,
  calculateFluidRipple,
  type FluidPhysicsState
} from './fluid-shimmer';

describe('FluidShimmer Engine', () => {
  it('calculates normalized cursor percentage within bounding rect', () => {
    const rect = { left: 100, width: 200 } as DOMRect;
    
    expect(calculateNormalizedCursorPosition(100, rect)).toBe(0);
    expect(calculateNormalizedCursorPosition(200, rect)).toBe(50);
    expect(calculateNormalizedCursorPosition(300, rect)).toBe(100);
  });

  it('clamps cursor positions beyond bounding rect edges', () => {
    const rect = { left: 100, width: 200 } as DOMRect;
    
    expect(calculateNormalizedCursorPosition(50, rect)).toBe(0);
    expect(calculateNormalizedCursorPosition(350, rect)).toBe(100);
  });

  it('handles zero or negative rect width gracefully without throwing', () => {
    const rect = { left: 100, width: 0 } as DOMRect;
    expect(calculateNormalizedCursorPosition(150, rect)).toBe(50);
  });

  it('steps fluid spring physics toward target position with damping', () => {
    const initialState: FluidPhysicsState = {
      current: 0,
      velocity: 0,
      target: 100
    };

    const step1 = stepFluidPhysics(initialState, 0.1, 0.8);
    expect(step1.velocity).toBeCloseTo(8, 2);
    expect(step1.current).toBeCloseTo(8, 2);

    const step2 = stepFluidPhysics(step1, 0.1, 0.8);
    expect(step2.current).toBeGreaterThan(step1.current);
    expect(step2.current).toBeLessThanOrEqual(100);
  });

  it('maps normalized percentage to CSS background-position percentage for a 260% gradient', () => {
    expect(calculateShimmerBackgroundPosition(0)).toBeCloseTo(-30, 1);
    expect(calculateShimmerBackgroundPosition(50)).toBeCloseTo(50, 1);
    expect(calculateShimmerBackgroundPosition(100)).toBeCloseTo(130, 1);
  });

  it('calculates smooth ambient harmonic sine wave position over time', () => {
    const posAt0 = calculateAmbientSinePosition(0);
    const posAtQuarter = calculateAmbientSinePosition(Math.PI / 2);
    const posAtHalf = calculateAmbientSinePosition(Math.PI);
    const posAtThreeQuarter = calculateAmbientSinePosition((3 * Math.PI) / 2);

    expect(posAt0).toBeCloseTo(50, 1);
    expect(posAtQuarter).toBeCloseTo(95, 1);
    expect(posAtHalf).toBeCloseTo(50, 1);
    expect(posAtThreeQuarter).toBeCloseTo(5, 1);
  });

  it('calculates velocity-induced fluid ripple oscillation', () => {
    const staticRipple = calculateFluidRipple(0, 10);
    expect(staticRipple).toBe(0);

    const activeRipple = calculateFluidRipple(10, 0);
    expect(Math.abs(activeRipple)).toBeLessThanOrEqual(5);
  });
});
