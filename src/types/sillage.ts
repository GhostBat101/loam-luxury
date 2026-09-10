/**
 * Sillage & Projection Metrics Types.
 * Declares interfaces for radius levels, hemisphere volume calculations, and epidermal persistence.
 * Communicates with: src/data/sillage.json, src/modules/sillage/sillage-math.ts, and src/components/sections/Radius.ts.
 */

export interface SillagePreset {
  readonly radiusMeters: number;
  readonly buttonLabel: string;
  readonly auraTitle: string;
  readonly headline: string;
  readonly persistenceHours: number;
  readonly strokeDashoffset: number;
  readonly haloDiameterPx: number;
  readonly coreDiameterPx: number;
  readonly estimatedVolumeSqm: number;
}

export interface SillageCalculationResult {
  readonly radiusMeters: number;
  readonly projectionLabel: string;
  readonly headline: string;
  readonly persistenceHours: number;
  readonly strokeDashoffset: number;
  readonly haloDiameterPx: number;
  readonly coreDiameterPx: number;
  readonly estimatedFootprintAreaSqm: number;
  readonly estimatedHemisphereVolumeCubicMeters: number;
}
