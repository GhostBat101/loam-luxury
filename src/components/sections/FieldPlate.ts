/**
 * Field Plate Visual Section Component.
 * Implements 21:9 panoramic visual break, dynamic sillage ring indicators, and wave title.
 * Communicates with: src/components/sections/Radius.ts and src/main.ts.
 */

export function renderFieldPlate(): string {
  return `
    <section aria-label="Field Plate Visual" class="relative w-full aspect-[21/9] min-h-[60vh] max-h-[82vh] overflow-hidden hairline-border-b bg-[#071D31] group">
      <img alt="THALASSA Extrait de Parfum flacon resting in Aegean tidal sea water on pure white coastal rocks" class="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16,1,0.3,1) group-hover:scale-[1.03]" src="/images/field-plate.jpg" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#071D31]/90 via-[#071D31]/30 to-transparent pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#071D31]/60 via-transparent to-[#071D31]/40 pointer-events-none"></div>
      <div aria-hidden="true" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="sillage-ring-pulse rounded-full border border-[#0EA5E9]/60 absolute transition-all duration-700 ease-out" id="specimen-sillage-halo" style="width: 240px; height: 240px;"></div>
        <div class="rounded-full border border-[#CFE2FE]/40 absolute transition-all duration-700 ease-out" id="specimen-sillage-core" style="width: 180px; height: 180px; box-shadow: 0 0 45px rgba(14,165,233,0.25);"></div>
      </div>
      <div class="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:px-16 lg:py-14 pointer-events-none select-none">
        <div class="font-mono text-[10px] text-[#CFE2FE] uppercase tracking-[0.3em] font-semibold">
          <span>// SURFACE CHROMATOGRAPHY &amp; HARVEST SPECIMEN</span>
        </div>
        <div class="my-auto">
          <h2 class="font-display italic text-6xl sm:text-8xl lg:text-[10vw] text-[#FAFCFF] leading-none tracking-normal font-semibold drop-shadow-md plate-wave-title">
            SALT · WATER · SUN
          </h2>
        </div>
        <div class="flex justify-between items-end">
          <div class="font-mono text-[10px] text-[#CFE2FE] uppercase tracking-[0.2em] bg-[#071D31]/80 backdrop-blur-sm px-3.5 py-1.5 border border-[#CFE2FE]/40 font-semibold">
            INTERACTIVE PROJECTION OVERLAY ACTIVE
          </div>
          <div class="font-mono text-xs text-[#CFE2FE] uppercase tracking-[0.3em] flex flex-col items-end gap-1.5 bg-[#071D31]/90 backdrop-blur-md px-5 py-3 border border-[#CFE2FE]/40 group-hover:border-[#38bdf8]/70 transition-colors duration-500">
            <span class="text-[#38bdf8] font-bold">[FIELD PLATE // 02]</span>
            <span class="text-[9px] text-[#CFE2FE] font-medium">AEGEAN BASIN RECONNAISSANCE</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
