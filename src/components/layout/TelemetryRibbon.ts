/**
 * Telemetry Ribbon Layout Component.
 * Displays archival project telemetry, live extraction concentration, and status indicators.
 * Communicates with: src/data/telemetry.json and src/main.ts.
 */

import telemetryData from '../../data/telemetry.json';

export function renderTelemetryRibbon(): string {
  return `
    <div aria-label="Archival Project Telemetry" class="w-full px-6 sm:px-10 lg:px-16 py-3 flex justify-between items-baseline text-[#1C3B5E] font-mono text-[10px] tracking-widest uppercase hairline-border-b bg-[#e9f0f7]/80 backdrop-blur-sm" role="region">
      <div class="flex items-center gap-2.5">
        <span aria-hidden="true" class="inline-block w-1.5 h-1.5 rounded-full bg-[#053C6B] animate-ping"></span>
        <span class="font-bold text-[#071D31]">${telemetryData.extractionTitle}</span>
      </div>
      <div class="hidden md:block font-mono text-[10px] text-[#053C6B] font-bold scanline-pulse">// ${telemetryData.concentration}</div>
      <div class="flex items-center gap-2 font-bold text-[#071D31]">[${telemetryData.status}]</div>
    </div>
  `;
}
