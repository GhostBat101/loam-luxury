/**
 * Motion Controller Unit Test Suite.
 * Verifies accessible motion toggle state, storage persistence, and class application.
 * Communicates with: src/modules/accessibility/motion-controller.ts and vitest.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MotionController } from './motion-controller';

describe('MotionController', () => {
  let storageMock: Record<string, string>;

  beforeEach(() => {
    storageMock = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storageMock[key] ?? null,
      setItem: (key: string, value: string) => { storageMock[key] = value; },
      removeItem: (key: string) => { delete storageMock[key]; }
    });
  });

  it('defaults to system preference when no stored preference exists', () => {
    const controller = new MotionController(false);
    expect(controller.isReducedMotion()).toBe(false);

    const reducedController = new MotionController(true);
    expect(reducedController.isReducedMotion()).toBe(true);
  });

  it('respects stored user preference over system preference', () => {
    storageMock['thalassa_motion_preference'] = 'reduced';
    const controller = new MotionController(false);
    expect(controller.isReducedMotion()).toBe(true);

    storageMock['thalassa_motion_preference'] = 'full';
    const controller2 = new MotionController(true);
    expect(controller2.isReducedMotion()).toBe(false);
  });

  it('toggles motion state and persists to storage', () => {
    const controller = new MotionController(false);
    expect(controller.isReducedMotion()).toBe(false);

    const newState = controller.toggle();
    expect(newState).toBe(true);
    expect(controller.isReducedMotion()).toBe(true);
    expect(storageMock['thalassa_motion_preference']).toBe('reduced');

    const revertedState = controller.toggle();
    expect(revertedState).toBe(false);
    expect(controller.isReducedMotion()).toBe(false);
    expect(storageMock['thalassa_motion_preference']).toBe('full');
  });

  it('notifies registered listeners upon state changes', () => {
    const controller = new MotionController(false);
    const listener = vi.fn();
    controller.subscribe(listener);

    controller.setReducedMotion(true);
    expect(listener).toHaveBeenCalledWith(true);

    controller.setReducedMotion(false);
    expect(listener).toHaveBeenCalledWith(false);
  });
});
