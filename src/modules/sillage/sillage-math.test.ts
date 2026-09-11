/**
 * Sillage Math Engine Unit Test Suite.
 * Verifies sillage volume calculations, epidermal decay persistence, and boundary handling.
 * Communicates with: src/modules/sillage/sillage-math.ts and vitest.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateFootprintArea,
  calculateHemisphereVolume,
  calculatePersistenceHours,
  calculateStrokeDashoffset,
  calculateSillageMetrics,
  clampRadius
} from './sillage-math';

describe('sillage-math', () => {
  describe('clampRadius', () => {
    it('clamps values below 0.5 to 0.5', () => {
      expect(clampRadius(0.1)).toBe(0.5);
      expect(clampRadius(-1)).toBe(0.5);
    });

    it('clamps values above 3.0 to 3.0', () => {
      expect(clampRadius(3.5)).toBe(3.0);
      expect(clampRadius(10)).toBe(3.0);
    });

    it('preserves values within range', () => {
      expect(clampRadius(1.5)).toBe(1.5);
      expect(clampRadius(2.0)).toBe(2.0);
    });
  });

  describe('calculateFootprintArea', () => {
    it('calculates circle area correctly for given radii', () => {
      expect(calculateFootprintArea(0.5)).toBe(0.79);
      expect(calculateFootprintArea(1.5)).toBe(7.07);
      expect(calculateFootprintArea(3.0)).toBe(28.27);
    });
  });

  describe('calculateHemisphereVolume', () => {
    it('calculates hemisphere volume (2/3 * PI * r^3)', () => {
      expect(calculateHemisphereVolume(0.5)).toBe(0.26);
      expect(calculateHemisphereVolume(1.5)).toBe(7.07);
      expect(calculateHemisphereVolume(3.0)).toBe(56.55);
    });
  });

  describe('calculatePersistenceHours', () => {
    it('returns 24 hours for intimate radius (<= 0.5m)', () => {
      expect(calculatePersistenceHours(0.5)).toBe(24);
      expect(calculatePersistenceHours(0.4)).toBe(24);
    });

    it('returns 16 hours for conversation radius (<= 1.5m)', () => {
      expect(calculatePersistenceHours(1.0)).toBe(16);
      expect(calculatePersistenceHours(1.5)).toBe(16);
    });

    it('returns 10 hours for scent trail radius (> 1.5m)', () => {
      expect(calculatePersistenceHours(2.0)).toBe(10);
      expect(calculatePersistenceHours(3.0)).toBe(10);
    });
  });

  describe('calculateStrokeDashoffset', () => {
    it('returns 0 offset for 24 hours on 628 circumference', () => {
      expect(calculateStrokeDashoffset(24)).toBe(0);
    });

    it('returns approximately 209 offset for 16 hours', () => {
      expect(calculateStrokeDashoffset(16)).toBe(209);
    });

    it('returns approximately 366 offset for 10 hours', () => {
      expect(calculateStrokeDashoffset(10)).toBe(366);
    });
  });

  describe('calculateSillageMetrics', () => {
    it('computes complete sillage bundle for 0.5m close presence', () => {
      const result = calculateSillageMetrics(0.5);
      expect(result.radiusMeters).toBe(0.5);
      expect(result.projectionLabel).toBe('0.5M · CLOSE & PERSONAL');
      expect(result.headline).toBe('CLOSE & PERSONAL · STAYS ALL DAY');
      expect(result.persistenceHours).toBe(24);
      expect(result.strokeDashoffset).toBe(0);
      expect(result.haloDiameterPx).toBe(240);
      expect(result.coreDiameterPx).toBe(180);
      expect(result.estimatedFootprintAreaSqm).toBe(0.79);
    });

    it('computes complete sillage bundle for 1.5m arm\'s length projection', () => {
      const result = calculateSillageMetrics(1.5);
      expect(result.radiusMeters).toBe(1.5);
      expect(result.projectionLabel).toBe('1.5M · ARM\'S LENGTH');
      expect(result.headline).toBe('NATURAL CONVERSATION · NOTICEABLE NEARBY');
      expect(result.persistenceHours).toBe(16);
      expect(result.strokeDashoffset).toBe(209);
      expect(result.haloDiameterPx).toBe(380);
      expect(result.coreDiameterPx).toBe(290);
    });

    it('computes complete sillage bundle for 3.0m expansive trail', () => {
      const result = calculateSillageMetrics(3.0);
      expect(result.radiusMeters).toBe(3.0);
      expect(result.projectionLabel).toBe('3.0M · SCENT TRAIL');
      expect(result.headline).toBe('SCENT TRAIL · TURNS HEADS AS YOU WALK BY');
      expect(result.persistenceHours).toBe(10);
      expect(result.strokeDashoffset).toBe(366);
      expect(result.haloDiameterPx).toBe(520);
      expect(result.coreDiameterPx).toBe(420);
    });
  });
});
