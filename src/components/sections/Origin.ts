/**
 * Origin Section Component.
 * Showcases environmental provenance, waterline direct extraction, 120-day maceration, and Aegean coordinates.
 * Communicates with: src/data/telemetry.json and src/main.ts.
 */

import telemetryData from '../../data/telemetry.json';

export function renderOrigin(): string {
  const provenanceRows = telemetryData.provenanceData.map((item, index) => {
    const isLast = index === telemetryData.provenanceData.length - 1;
    const borderClass = isLast ? 'pb-2' : 'hairline-border-b pb-4';
    return `
      <div class="flex justify-between ${borderClass} group hover:text-[#053C6B] transition-colors">
        <span class="text-[#053C6B] font-extrabold">${item.label}</span>
        <span class="text-[#071D31] font-bold">${item.value}</span>
      </div>
    `;
  }).join('');

  return `
    <section aria-labelledby="heading-origin" class="relative w-full px-6 sm:px-10 lg:px-16 py-28 lg:py-36 hairline-border-b bg-[#eef3f7]/90 backdrop-blur-sm overflow-hidden" data-bg="#eef3f7" id="origin">
      <div aria-hidden="true" class="watermark-float absolute -top-12 sm:-top-20 -left-6 lg:left-8 font-display text-[32vw] lg:text-[24vw] leading-none text-[#071D31] select-none pointer-events-none font-medium">
        01
      </div>
      <div class="relative z-10 max-w-[1720px] mx-auto">
        <div class="expand-divider w-full flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-20 pb-6 hairline-border-b reveal-item">
          <div class="flex items-baseline gap-6 lg:gap-10">
            <span aria-hidden="true" class="font-display text-5xl lg:text-7xl text-[#071D31] font-semibold leading-none tracking-tight tidal-drift-text">01</span>
            <span class="font-mono text-xs lg:text-sm uppercase tracking-[0.28em] text-[#053C6B] font-extrabold">[ORIGIN // CYCLADES]</span>
          </div>
          <span class="font-mono text-[10px] text-[#1C3B5E] uppercase tracking-[0.25em] font-bold mt-2 sm:mt-0">// COASTAL CHROMATOGRAPHY &amp; TIDAL AIR</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-8 reveal-item" style="transition-delay: 150ms;">
            <h2 class="font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[1.1] font-medium tracking-tight text-[#071D31] cursor-default" id="heading-origin">
              AEGEAN SEA SALT · SOLAR WINDS · WHITE SUN.
            </h2>
            <div class="mt-10 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest text-[#071D31] font-bold">
              <span class="px-3.5 py-1.5 border border-[#285384]/20 bg-white/70 backdrop-blur-sm hover:border-[#053C6B] hover:text-[#053C6B] hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 cursor-default">[WATERLINE DIRECT EXTRACTION]</span>
              <span class="px-3.5 py-1.5 border border-[#285384]/20 bg-white/70 backdrop-blur-sm hover:border-[#053C6B] hover:text-[#053C6B] hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 cursor-default">[ZERO SYNTHETIC FIXATIVE]</span>
              <span class="px-3.5 py-1.5 border border-[#285384]/20 bg-white/70 backdrop-blur-sm hover:border-[#053C6B] hover:text-[#053C6B] hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 cursor-default">[MACERATION 120 DAYS]</span>
            </div>
          </div>
          <div class="lg:col-span-4 font-mono text-xs text-[#1C3B5E] tracking-widest uppercase space-y-6 pt-2 lg:hairline-border-l lg:pl-12 reveal-item" style="transition-delay: 250ms;">
            ${provenanceRows}
          </div>
        </div>
      </div>
    </section>
  `;
}
