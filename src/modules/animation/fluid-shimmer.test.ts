/**
 * Fluid Shimmer Animation Engine Test Suite.
 * Verifies cursor tracking math, spring physics, velocity clamping, ambient phase synchronization, proximity detection, and ripple wake.
 * Communicates with: src/modules/animation/fluid-shimmer.ts and vitest.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateNormalizedCursorPosition,
  isPointerWithinShimmerBounds,
  syncAmbientPhaseWithPosition,
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

  it('clamps velocity when maximum velocity limit is specified', () => {
    const initialState: FluidPhysicsState = {
      current: 0,
      velocity: 0,
      target: 100
    };

    const clampedStep = stepFluidPhysics(initialState, 0.1, 0.8, 3.2);
    expect(clampedStep.velocity).toBe(3.2);
    expect(clampedStep.current).toBe(3.2);
  });

  it('critically dampens motion without oscillatory ringing across multiple steps', () => {
    let state: FluidPhysicsState = {
      current: 10,
      velocity: 0,
      target: 90
    };

    let peakOvershoot = 0;
    for (let index = 0; index < 50; index++) {
      state = stepFluidPhysics(state, 0.065, 0.70, 3.2);
      if (state.current > 90) {
        peakOvershoot = Math.max(peakOvershoot, state.current - 90);
      }
    }

    expect(peakOvershoot).toBeLessThan(1.0);
    expect(state.current).toBeCloseTo(90, 0);
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

  it('synchronizes ambient phase to exact position with zero discontinuity', () => {
    const testPositions = [10, 25, 50, 72.5, 90, 95];

    testPositions.forEach((pos) => {
      const syncedPhase = syncAmbientPhaseWithPosition(pos);
      const recomputedPos = calculateAmbientSinePosition(syncedPhase);
      expect(recomputedPos).toBeCloseTo(pos, 4);
    });
  });

  it('synchronizes ambient phase with directional momentum', () => {
    const leftwardPhase = syncAmbientPhaseWithPosition(70, -1.5);
    const rightwardPhase = syncAmbientPhaseWithPosition(70, 1.5);

    const leftwardNext = calculateAmbientSinePosition(leftwardPhase + 0.02);
    const rightwardNext = calculateAmbientSinePosition(rightwardPhase + 0.02);

    expect(leftwardNext).toBeLessThan(70);
    expect(rightwardNext).toBeGreaterThan(70);
  });

  it('detects pointer proximity within expanded rectangular margin', () => {
    const rect = { left: 100, right: 300, top: 200, bottom: 400, width: 200, height: 200 } as DOMRect;

    expect(isPointerWithinShimmerBounds(200, 300, rect, 50, 100)).toBe(true);
    expect(isPointerWithinShimmerBounds(70, 300, rect, 50, 100)).toBe(true);
    expect(isPointerWithinShimmerBounds(40, 300, rect, 50, 100)).toBe(false);
    expect(isPointerWithinShimmerBounds(200, 120, rect, 50, 100)).toBe(true);
    expect(isPointerWithinShimmerBounds(200, 90, rect, 50, 100)).toBe(false);
  });

  it('produces bounded, smooth ripple wake without high-frequency stutter', () => {
    const staticRipple = calculateFluidRipple(0, 10);
    expect(staticRipple).toBe(0);

    const activeRipple = calculateFluidRipple(10, 0);
    expect(Math.abs(activeRipple)).toBeLessThanOrEqual(5);
    expect(Math.abs(activeRipple)).toBeLessThan(1.0);
  });
});
