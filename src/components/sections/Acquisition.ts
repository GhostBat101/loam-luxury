/**
 * Acquisition Section Component.
 * Presents edition pricing, dispatch provenance, and conversion CTA button with kinetic sheen.
 * Communicates with: src/components/ui/CartDrawer.ts and src/main.ts.
 */

import type { CartDrawerController } from '../ui/CartDrawer';

export function renderAcquisition(): string {
  return `
    <section aria-labelledby="heading-allocation" class="relative w-full px-6 sm:px-10 lg:px-16 py-28 lg:py-36 bg-[#dbe6f2]/90 backdrop-blur-sm overflow-hidden" data-bg="#dbe6f2" id="allocation">
      <div aria-hidden="true" class="watermark-float absolute -top-12 sm:-top-20 -left-6 lg:left-8 font-display text-[32vw] lg:text-[24vw] leading-none text-[#071D31] select-none pointer-events-none font-medium">
        04
      </div>
      <div class="relative z-10 max-w-[1720px] mx-auto">
        <div class="expand-divider w-full flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-20 pb-6 hairline-border-b reveal-item">
          <div class="flex items-baseline gap-6 lg:gap-10">
            <span aria-hidden="true" class="font-display text-5xl lg:text-7xl text-[#071D31] font-semibold leading-none tracking-tight tidal-drift-text">04</span>
            <h2 class="font-mono text-xs lg:text-sm uppercase tracking-[0.28em] text-[#053C6B] font-extrabold m-0" id="heading-allocation">[ACQUISITION // ALLOCATION]</h2>
          </div>
          <span class="font-mono text-[10px] text-[#1C3B5E] uppercase tracking-[0.22em] font-bold mt-2 sm:mt-0">// DRAW 001 · ARCHIVE 2025</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div class="lg:col-span-7 space-y-6 reveal-item" style="transition-delay: 150ms;">
            <div class="font-mono text-xs uppercase tracking-widest text-[#053C6B] font-extrabold">
              [EDITION 001 // FIRST DRAW] · AEGEAN BASIN
            </div>
            <h3 class="font-display text-4xl sm:text-6xl lg:text-7xl uppercase font-semibold tracking-tight metallic-liquid-shimmer cursor-pointer" data-fluid-shimmer="true">
              THALASSA EXTRAIT DE PARFUM
            </h3>
            <p class="font-display text-3xl sm:text-5xl text-[#071D31] font-medium">
              $380 USD <span class="font-mono text-base text-[#1C3B5E] font-bold">/ €350 EUR</span>
            </p>
          </div>
          <div class="lg:col-span-5 flex flex-col items-stretch space-y-4 reveal-item" style="transition-delay: 250ms;">
            <button aria-label="Reserve Specimen of THALASSA Extrait de Parfum for $380 USD" class="btn-reserve-kinetic w-full h-20 bg-[#071D31] text-[#FAFCFF] hover:bg-[#053C6B] active:bg-[#021B30] font-mono text-xs uppercase tracking-[0.25em] flex items-center justify-between px-8 border-2 border-[#053C6B] group shadow-[0_6px_28px_rgba(5,60,107,0.22)] font-bold transition-all duration-300 focus-visible:outline-none cursor-pointer" id="btn-reserve-cta" type="button">
              <span class="tracking-[0.28em] group-hover:text-cyan-200 transition-colors">RESERVE SPECIMEN</span>
              <span aria-hidden="true" class="font-mono text-xl transform group-hover:translate-x-2 transition-transform duration-300 ease-out text-[#38bdf8] group-hover:text-white">→</span>
            </button>
            <div class="flex justify-between font-mono text-[9px] uppercase tracking-widest text-[#1C3B5E] font-bold px-1">
              <span>[SHIPS WORLDWIDE]</span>
              <span>[COMPLIMENTARY SECURE DISPATCH]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupAcquisition(cartController: CartDrawerController): void {
  const reserveBtn = document.getElementById('btn-reserve-cta');
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      cartController.addItem({
        id: 'specimen-001',
        title: 'THALASSA EXTRAIT DE PARFUM',
        lot: 'EDITION 001 // FIRST DRAW · 100 ML',
        priceUsd: 380
      });
      cartController.open();
    });
  }
}
