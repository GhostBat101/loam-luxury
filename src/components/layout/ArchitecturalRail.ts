/**
 * Desktop Architectural Rail Component.
 * Renders the fixed vertical telemetry spine on the 2xl viewport edge with coordinate datum.
 * Communicates with: src/main.ts and index.html.
 */

export function renderArchitecturalRail(): string {
  return `
    <aside aria-hidden="true" class="fixed left-0 top-0 bottom-0 w-14 hidden 2xl:flex flex-col justify-between items-center py-10 z-40 hairline-border-r select-none pointer-events-none bg-[#f1f5f9]/80 backdrop-blur-md">
      <span class="vertical-rl font-mono text-[9px] tracking-[0.3em] uppercase text-[#1C3B5E] font-medium">[SPECIMEN // 001] · THALASSA MATRIX</span>
      <div class="crosshair w-3 h-3 text-[#053C6B] opacity-80 animate-pulse"></div>
      <span class="font-mono text-[9px] text-[#071D31] font-bold tracking-widest">36.8433°N</span>
      <div class="crosshair w-3 h-3 text-[#053C6B] opacity-80 animate-pulse"></div>
      <span class="vertical-rl font-mono text-[9px] tracking-[0.3em] uppercase text-[#1C3B5E] font-medium">// SALINITY INDEX 38.5 PSU</span>
    </aside>
  `;
}
