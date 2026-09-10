/**
 * Olfactory Volatility & Chromatography Types.
 * Declares interfaces for fragrance strata tiers, Bezier curve coordinates, and molecular specs.
 * Communicates with: src/data/spectrum.json, src/modules/spectrum/spectrum-engine.ts, and src/components/sections/Spectrum.ts.
 */

export interface CurvePoint {
  readonly cx: number;
  readonly cy: number;
}

export interface VolatilityTier {
  readonly id: string;
  readonly index: number;
  readonly tabLabel: string;
  readonly noteTitle: string;
  readonly durationLabel: string;
  readonly header: string;
  readonly dispersion: string;
  readonly volatilityVal: string;
  readonly pathD: string;
  readonly areaD: string;
  readonly point: CurvePoint;
  readonly chromatographyTitle: string;
  readonly chromatographyDescription: string;
  readonly molecularMassRange: string;
  readonly organolepticPurity: string;
  readonly activeComponent: string;
  readonly diffusionHalflife: string;
}
