/**
 * Archival Telemetry & Environmental Provenance Types.
 * Declares data models for geographic coordinates, salinity indices, and extraction specimens.
 * Communicates with: src/data/telemetry.json and layout components.
 */

export interface ProvenanceDatum {
  readonly label: string;
  readonly value: string;
}

export interface SpecimenTelemetry {
  readonly specimenId: string;
  readonly matrixName: string;
  readonly coordinates: string;
  readonly salinityIndex: string;
  readonly extractionTitle: string;
  readonly concentration: string;
  readonly status: string;
  readonly provenanceData: readonly ProvenanceDatum[];
}
