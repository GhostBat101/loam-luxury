/**
 * Hero Panoramic Waterline Monolith Section.
 * Implements 3-layer parallax depth: background, text shadow, reef rock, shimmering typography, and foreground flacon.
 * Communicates with: src/main.ts, src/modules/animation/fluid-shimmer.ts, and index.html.
 */

export function renderHero(): string {
  return `
    <section aria-labelledby="hero-title" class="relative w-full overflow-hidden hairline-border-b min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-[#071D31]">
      <div aria-hidden="true" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
        <picture>
          <source srcset="/images/hero-bg.webp" type="image/webp" />
          <img alt="Aegean coastal background view" class="w-full h-full object-cover object-center scale-[1.01]" src="/images/hero-bg.jpg" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-[#071D31]/75 via-[#071D31]/20 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#071D31]/50 via-transparent to-[#071D31]/30"></div>
        <div aria-hidden="true" class="caustic-1 absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-gradient-to-tr from-[#0EA5E9]/20 via-[#7dd3fc]/15 to-transparent blur-3xl pointer-events-none"></div>
        <div aria-hidden="true" class="caustic-2 absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-bl from-[#38bdf8]/15 via-[#CFE2FE]/10 to-transparent blur-3xl pointer-events-none"></div>
        <div aria-hidden="true" class="caustic-3 absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-[#0284c7]/20 to-transparent blur-2xl pointer-events-none"></div>
      </div>

      <div aria-hidden="true" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[2]">
        <div class="relative w-full px-6 sm:px-10 lg:px-16 pb-12 pt-28">
          <div class="font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-4 opacity-0 pointer-events-none">
            <span class="px-2.5 py-1 border">[SPECIMEN // 001]</span>
            <span>CALCITE SEDIMENTATION · LOT 25</span>
          </div>
          <div class="relative w-full select-none">
            <div id="hero-title-shadow" class="font-display text-[16vw] lg:text-[15vw] leading-none tracking-tight uppercase font-semibold text-[#001020] opacity-65 blur-[6px] transform translate-x-3 sm:translate-x-5 translate-y-3 sm:translate-y-5 select-none pointer-events-none mix-blend-multiply">
              THALASSA
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[3]">
        <picture>
          <source srcset="/images/hero-reef.webp" type="image/webp" />
          <img alt="Aegean coastal reef rocks" class="w-full h-full object-cover object-center scale-[1.01]" src="/images/hero-reef.png" />
        </picture>
      </div>

      <div class="relative w-full px-6 sm:px-10 lg:px-16 pb-12 pt-28 z-[4]">
        <div class="reveal-item font-mono text-[10px] uppercase tracking-[0.3em] text-[#CFE2FE] flex items-center gap-3 mb-4" style="transition-delay: 200ms;">
          <span class="px-2.5 py-1 border border-[#CFE2FE]/50 bg-[#071D31]/80 backdrop-blur-sm font-bold">[SPECIMEN // 001]</span>
          <span class="font-semibold text-white/90">CALCITE SEDIMENTATION · LOT 25</span>
        </div>
        <div class="relative w-full select-none">
          <div aria-hidden="true" class="hero-glint-1 absolute -top-4 left-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] pointer-events-none"></div>
          <div aria-hidden="true" class="hero-glint-2 absolute top-1/2 left-3/5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] pointer-events-none"></div>
          <div aria-hidden="true" class="hero-glint-3 absolute -bottom-2 right-1/3 w-2.5 h-2.5 rounded-full bg-sky-200 shadow-[0_0_14px_#38bdf8] pointer-events-none"></div>
          <h1 class="reveal-item relative font-display text-[16vw] lg:text-[15vw] leading-none tracking-tight hero-water-shimmer uppercase font-semibold select-none cursor-pointer" data-fluid-shimmer="true" id="hero-title" style="transition-delay: 300ms;">
            THALASSA
          </h1>
          <p class="reveal-item font-mono text-xs sm:text-sm lg:text-base text-white tracking-[0.25em] uppercase font-medium mt-4 flex items-center gap-3" style="transition-delay: 450ms;">
            <span aria-hidden="true" class="text-[#38bdf8] font-bold animate-pulse">//</span> NOT A PERFUME. CAPTURED SEA BREEZE.
          </p>
        </div>
        <div class="reveal-item flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-12 pt-6 border-t border-[#CFE2FE]/30 text-[#CFE2FE] font-mono text-[10px] tracking-widest uppercase font-semibold" style="transition-delay: 550ms;">
          <span class="px-3.5 py-1.5 bg-[#071D31]/90 backdrop-blur-sm border border-[#CFE2FE]/40">[ 100 ML · 3.4 FL OZ · 34% VOL ]</span>
          <a class="nav-magnetic flex items-center gap-3 text-[#FAFCFF] hover:text-[#38bdf8] transition-all duration-300 pb-1 font-bold group" href="#spectrum">
            <span class="tracking-[0.25em]">EXPLORE SPECTRUM MATRIX</span>
            <span aria-hidden="true" class="group-hover:translate-y-1.5 transition-transform duration-300 font-bold">↓</span>
          </a>
        </div>
      </div>

      <div aria-hidden="true" class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[5]">
        <picture>
          <source srcset="/images/hero-product.webp" type="image/webp" />
          <img alt="THALASSA LOAM crystal flacon bottle" class="w-full h-full object-cover object-center scale-[1.01]" src="/images/hero-product.png" />
        </picture>
      </div>

      <div aria-hidden="true" class="absolute top-0 left-0 right-0 z-[10] w-full px-6 sm:px-10 lg:px-16 pt-8 flex justify-between items-start select-none pointer-events-none">
        <div class="reveal-item flex items-center gap-3 bg-[#071D31]/85 backdrop-blur-md px-4 py-2 border border-[#CFE2FE]/40 text-[#FAFCFF] font-mono text-[9px] tracking-widest uppercase pointer-events-auto">
          <span class="crosshair w-2.5 h-2.5 text-[#38bdf8]"></span>
          <span class="font-semibold">DATUM // 36°50'35.9"N 25°53'29.8"E</span>
        </div>
        <div class="reveal-item flex items-center gap-3 bg-[#071D31]/85 backdrop-blur-md px-4 py-2 border border-[#CFE2FE]/40 text-[#FAFCFF] font-mono text-[9px] tracking-widest uppercase pointer-events-auto" style="transition-delay: 150ms;">
          <span class="font-semibold">SALINITY // 38.5 PSU</span>
          <span class="text-[#38bdf8] animate-ping">●</span>
        </div>
      </div>
    </section>
  `;
}
