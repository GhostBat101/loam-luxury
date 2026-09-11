/**
 * Smooth Scroll Engine Unit Test Suite.
 * Tests acceleration and deceleration easing mathematical curves, symmetry, and inertial damping bounds.
 * Communicates with: src/modules/scroll/smooth-scroll.ts and vitest.
 */

import { describe, it, expect } from 'vitest';
import {
  cubicEaseInOut,
  SCROLL_LERP,
  WHEEL_MULTIPLIER,
  ANCHOR_SCROLL_DURATION,
  DEFAULT_ANCHOR_OFFSET
} from './smooth-scroll';

describe('smooth-scroll physics', () => {
  it('anchors at bounds 0 and 1', () => {
    expect(cubicEaseInOut(0)).toBe(0);
    expect(cubicEaseInOut(1)).toBe(1);
  });

  it('passes through the exact midpoint at t = 0.5', () => {
    expect(cubicEaseInOut(0.5)).toBe(0.5);
  });

  it('is strictly symmetric across the midpoint', () => {
    const samplePoints = [0.05, 0.1, 0.2, 0.35, 0.45];
    for (const t of samplePoints) {
      const sum = cubicEaseInOut(t) + cubicEaseInOut(1 - t);
      expect(sum).toBeCloseTo(1, 6);
    }
  });

  it('demonstrates smooth physical acceleration from rest', () => {
    const earlyValue = cubicEaseInOut(0.1);
    expect(earlyValue).toBeLessThan(0.01);
    expect(earlyValue).toBeCloseTo(0.004, 5);
  });

  it('demonstrates smooth physical deceleration into destination', () => {
    const lateDistanceRemaining = 1 - cubicEaseInOut(0.9);
    expect(lateDistanceRemaining).toBeLessThan(0.01);
    expect(lateDistanceRemaining).toBeCloseTo(0.004, 5);
  });

  it('is monotonically increasing across the entire unit interval', () => {
    let previousValue = -1;
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const value = cubicEaseInOut(t);
      expect(value).toBeGreaterThanOrEqual(previousValue);
      previousValue = value;
    }
  });

  it('configures inertial damping lerp within luxury editorial bounds', () => {
    expect(SCROLL_LERP).toBeGreaterThanOrEqual(0.06);
    expect(SCROLL_LERP).toBeLessThanOrEqual(0.09);
    expect(SCROLL_LERP).toBe(0.078);
  });

  it('maintains 1-to-1 wheel translation multiplier', () => {
    expect(WHEEL_MULTIPLIER).toBe(1.0);
  });

  it('configures anchor transition duration for cinematic pacing', () => {
    expect(ANCHOR_SCROLL_DURATION).toBeGreaterThanOrEqual(1.2);
    expect(ANCHOR_SCROLL_DURATION).toBeLessThanOrEqual(1.6);
    expect(DEFAULT_ANCHOR_OFFSET).toBe(-70);
  });
});
