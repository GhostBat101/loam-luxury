/**
 * Sillage Projection & Epidermal Decay Math Engine.
 * Computes projected hemisphere volumes, footprint area, persistence hours, and SVG progress metrics.
 * Communicates with: src/types/sillage.ts, src/components/sections/Radius.ts, and src/modules/sillage/sillage-math.test.ts.
 */

import type { SillageCalculationResult } from '../../types/sillage';

const MIN_RADIUS: number = 0.5;
const MAX_RADIUS: number = 3.0;
const TOTAL_CIRCUMFERENCE: number = 628;
const MAX_PERSISTENCE_HOURS: number = 24;

export function clampRadius(radius: number): number {
  return Math.min(Math.max(radius, MIN_RADIUS), MAX_RADIUS);
}

export function calculateFootprintArea(radius: number): number {
  const area = Math.PI * radius * radius;
  return Math.round(area * 100) / 100;
}

export function calculateHemisphereVolume(radius: number): number {
  const volume = (2 / 3) * Math.PI * Math.pow(radius, 3);
  return Math.round(volume * 100) / 100;
}

export function calculatePersistenceHours(radius: number): number {
  if (radius <= 0.5) {
    return 24;
  }
  if (radius <= 1.5) {
    return 16;
  }
  return 10;
}

export function calculateStrokeDashoffset(hours: number): number {
  const clampedHours = Math.min(Math.max(hours, 0), MAX_PERSISTENCE_HOURS);
  const ratio = 1 - clampedHours / MAX_PERSISTENCE_HOURS;
  return Math.round(TOTAL_CIRCUMFERENCE * ratio);
}

export function calculateSillageMetrics(rawRadius: number): SillageCalculationResult {
  const radius = clampRadius(rawRadius);
  const footprintArea = calculateFootprintArea(radius);
  const hemisphereVolume = calculateHemisphereVolume(radius);
  const persistenceHours = calculatePersistenceHours(radius);
  const strokeDashoffset = calculateStrokeDashoffset(persistenceHours);

  let projectionLabel = '0.5 M [INTIMATE AURA]';
  let headline = 'INTIMATE COASTAL AURA · 24 HR PERSISTENCE';
  let haloDiameterPx = 240;
  let coreDiameterPx = 180;

  if (radius <= 0.5) {
    projectionLabel = '0.5 M [INTIMATE AURA]';
    headline = 'INTIMATE COASTAL AURA · 24 HR PERSISTENCE';
    haloDiameterPx = 240;
    coreDiameterPx = 180;
  } else if (radius <= 1.5) {
    projectionLabel = '1.5 M [CONVERSATION PROJECTION]';
    headline = 'CONVERSATION PROJECTION · 16 HR PROJECTION';
    haloDiameterPx = 380;
    coreDiameterPx = 290;
  } else {
    projectionLabel = '3.0 M [EXPANSIVE SCENT TRAIL]';
    headline = 'EXPANSIVE RADIUS · 8-12 HR BROAD SILLAGE';
    haloDiameterPx = 520;
    coreDiameterPx = 420;
  }

  return {
    radiusMeters: radius,
    projectionLabel,
    headline,
    persistenceHours,
    strokeDashoffset,
    haloDiameterPx,
    coreDiameterPx,
    estimatedFootprintAreaSqm: footprintArea,
    estimatedHemisphereVolumeCubicMeters: hemisphereVolume
  };
}
