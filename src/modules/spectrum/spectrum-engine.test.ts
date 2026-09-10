/**
 * Spectrum Volatility Engine Unit Test Suite.
 * Verifies tier state navigation, cyclical indexing, and telemetry curve definitions.
 * Communicates with: src/modules/spectrum/spectrum-engine.ts and vitest.
 */

import { describe, it, expect } from 'vitest';
import {
  getAllTiers,
  getTierByIndex,
  getTierById,
  getNextTierIndex,
  getPreviousTierIndex
} from './spectrum-engine';

describe('spectrum-engine', () => {
  describe('getAllTiers', () => {
    it('returns all three defined volatility tiers', () => {
      const tiers = getAllTiers();
      expect(tiers).toHaveLength(3);
      expect(tiers[0].id).toBe('apex');
      expect(tiers[1].id).toBe('median');
      expect(tiers[2].id).toBe('baseline');
    });
  });

  describe('getTierByIndex', () => {
    it('returns apex tier for index 0', () => {
      const tier = getTierByIndex(0);
      expect(tier.id).toBe('apex');
      expect(tier.noteTitle).toBe('SEA SALT & SUNLIT OZONE');
    });

    it('returns median tier for index 1', () => {
      const tier = getTierByIndex(1);
      expect(tier.id).toBe('median');
      expect(tier.noteTitle).toBe('DRIFTWOOD & BERGAMOT');
    });

    it('returns baseline tier for index 2', () => {
      const tier = getTierByIndex(2);
      expect(tier.id).toBe('baseline');
      expect(tier.noteTitle).toBe('DEEP AMBER & MARINE MINERAL');
    });

    it('falls back to index 0 when given out-of-bounds index', () => {
      expect(getTierByIndex(-1).id).toBe('apex');
      expect(getTierByIndex(99).id).toBe('apex');
    });
  });

  describe('getTierById', () => {
    it('finds tier by valid id', () => {
      const tier = getTierById('median');
      expect(tier).toBeDefined();
      expect(tier?.index).toBe(1);
    });

    it('returns undefined for nonexistent id', () => {
      expect(getTierById('unknown')).toBeUndefined();
    });
  });

  describe('cyclical indexing for keyboard navigation', () => {
    it('cycles next tier index sequentially and wraps around', () => {
      expect(getNextTierIndex(0)).toBe(1);
      expect(getNextTierIndex(1)).toBe(2);
      expect(getNextTierIndex(2)).toBe(0);
    });

    it('cycles previous tier index sequentially and wraps around', () => {
      expect(getPreviousTierIndex(0)).toBe(2);
      expect(getPreviousTierIndex(1)).toBe(0);
      expect(getPreviousTierIndex(2)).toBe(1);
    });
  });
});
