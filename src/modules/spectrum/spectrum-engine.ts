/**
 * Spectrum Volatility Strata Engine.
 * Manages olfactory phase state transitions, Bezier curve coordinates, and chromatography specs.
 * Communicates with: src/types/spectrum.ts, src/data/spectrum.json, and src/components/sections/Spectrum.ts.
 */

import type { VolatilityTier } from '../../types/spectrum';
import rawSpectrumData from '../../data/spectrum.json';

const tiers: readonly VolatilityTier[] = rawSpectrumData as readonly VolatilityTier[];

export function getAllTiers(): readonly VolatilityTier[] {
  return tiers;
}

export function getTierByIndex(index: number): VolatilityTier {
  if (index >= 0 && index < tiers.length) {
    return tiers[index];
  }
  return tiers[0];
}

export function getTierById(id: string): VolatilityTier | undefined {
  return tiers.find(tier => tier.id === id);
}

export function getNextTierIndex(currentIndex: number): number {
  return (currentIndex + 1) % tiers.length;
}

export function getPreviousTierIndex(currentIndex: number): number {
  return (currentIndex - 1 + tiers.length) % tiers.length;
}
