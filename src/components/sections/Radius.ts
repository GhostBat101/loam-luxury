/**
 * Sillage Radius Section Component.
 * Implements accessible range slider, preset selectors, SVG circular progress gauge, and dynamic halo synchronization.
 * Communicates with: src/modules/sillage/sillage-math.ts, src/types/sillage.ts, and src/main.ts.
 */

import { calculateSillageMetrics } from '../../modules/sillage/sillage-math';

export function renderRadius(): string {
  const initial = calculateSillageMetrics(0.5);

  return `
    <section aria-labelledby="heading-radius" class="relative w-full px-6 sm:px-10 lg:px-16 py-28 lg:py-36 hairline-border-b bg-[#e1ebf5]/90 backdrop-blur-sm overflow-hidden" data-bg="#e1ebf5" id="radius">
      <div aria-hidden="true" class="watermark-float absolute -top-12 sm:-top-20 -left-6 lg:left-8 font-display text-[32vw] lg:text-[24vw] leading-none text-[#071D31] select-none pointer-events-none font-medium">
        03
      </div>
      <div class="relative z-10 max-w-[1720px] mx-auto">
        <div class="expand-divider w-full flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-20 pb-6 hairline-border-b reveal-item">
          <div class="flex items-baseline gap-6 lg:gap-10">
            <span aria-hidden="true" class="font-display text-5xl lg:text-7xl text-[#071D31] font-semibold leading-none tracking-tight tidal-drift-text">03</span>
            <h2 class="font-mono text-xs lg:text-sm uppercase tracking-[0.28em] text-[#053C6B] font-extrabold m-0" id="heading-radius">[RADIUS // SILLAGE METRIC]</h2>
          </div>
          <span class="font-mono text-[10px] text-[#1C3B5E] uppercase tracking-[0.22em] font-bold mt-2 sm:mt-0">// INTERACTIVE PROJECTION DISPERSION CALCULATOR</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 space-y-8 reveal-item" style="transition-delay: 150ms;">
            <h3 class="font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[1.1] font-medium tidal-drift-text text-[#071D31]" id="sillage-title-text">
              ${initial.headline}
            </h3>
            <p class="font-mono text-xs uppercase tracking-widest text-[#1C3B5E] flex items-center gap-2 pt-2 font-bold">
              <span class="text-[#053C6B] font-extrabold">[CLINICAL]</span> EPIDERMALLY TESTED · DIRECT APPLICATION EXTRAIT DE PARFUM
            </p>
            <div class="pt-4 space-y-4">
              <div class="flex justify-between items-baseline font-mono text-xs text-[#071D31] tracking-wider uppercase font-bold">
                <label class="text-[#053C6B] cursor-pointer" for="sillage-slider">// DRAG PROJECTION RADIUS:</label>
                <span class="text-sm font-extrabold text-[#071D31]" id="projection-label">${initial.projectionLabel}</span>
              </div>
              <div class="w-full">
                <input aria-label="Sillage projection radius in meters" aria-valuemax="3.0" aria-valuemin="0.5" aria-valuenow="${initial.radiusMeters}" aria-valuetext="0.5 meters, intimate aura" class="w-full h-1.5 bg-[#b8cfeb] appearance-none cursor-pointer accent-[#053C6B] focus-visible:outline-none" id="sillage-slider" max="3.0" min="0.5" role="slider" step="0.5" type="range" value="${initial.radiusMeters}" />
                <div aria-hidden="true" class="flex justify-between font-mono text-[9px] text-[#1C3B5E] tracking-widest uppercase mt-2 font-bold">
                  <span>0.5M INTIMATE</span>
                  <span>1.5M PROJECTION</span>
                  <span>3.0M SCENT TRAIL</span>
                </div>
              </div>
              <div aria-label="Sillage Preset Shortcuts" class="flex flex-wrap gap-2 pt-2" role="group">
                <button aria-pressed="true" class="radius-btn px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border border-[#053C6B] bg-[#053C6B] text-[#FAFCFF] font-bold focus-visible:outline-none transition-all shadow-sm cursor-pointer" data-rad="0.5" type="button">0.5M · SKIN AURA</button>
                <button aria-pressed="false" class="radius-btn px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border border-[#285384]/25 bg-white/50 backdrop-blur-sm hover:border-[#053C6B] text-[#1C3B5E] font-bold focus-visible:outline-none transition-all cursor-pointer" data-rad="1.5" type="button">1.5M · CONVERSATION</button>
                <button aria-pressed="false" class="radius-btn px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border border-[#285384]/25 bg-white/50 backdrop-blur-sm hover:border-[#053C6B] text-[#1C3B5E] font-bold focus-visible:outline-none transition-all cursor-pointer" data-rad="3.0" type="button">3.0M · SCENT TRAIL</button>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 text-left lg:text-right lg:hairline-border-l lg:pl-12 reveal-item relative flex flex-col items-start lg:items-end justify-center" style="transition-delay: 250ms;">
            <div class="relative flex items-center justify-center p-6">
              <svg aria-hidden="true" class="w-64 h-64 sm:w-72 sm:h-72 -rotate-90 transform" viewBox="0 0 240 240">
                <circle cx="120" cy="120" fill="none" opacity="0.6" r="100" stroke="#b8cfeb" stroke-width="2"></circle>
                <circle class="transition-all duration-700 ease-out" cx="120" cy="120" fill="none" id="persistence-circle" r="100" stroke="#053C6B" stroke-dasharray="628" stroke-dashoffset="${initial.strokeDashoffset}" stroke-linecap="round" stroke-width="4"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center select-none">
                <div class="flex items-baseline">
                  <span class="counter-display font-display text-7xl sm:text-8xl text-[#071D31] font-semibold leading-none tracking-tighter" data-target="${initial.persistenceHours}" id="persistence-val">${initial.persistenceHours}</span>
                  <span class="font-mono text-2xl sm:text-3xl text-[#053C6B] ml-2 font-extrabold">HR</span>
                </div>
                <div class="font-mono text-[9px] uppercase tracking-widest text-[#1C3B5E] font-bold mt-2" id="decay-mode-text">
                  [CALIBRATED EPIDERMAL DECAY]
                </div>
              </div>
            </div>
            <div class="font-mono text-xs text-[#053C6B] uppercase tracking-wider mt-2 font-bold" id="coverage-sqm">
              EST. SILLAGE VOLUME: ~${initial.estimatedFootprintAreaSqm} M² HEMISPHERE
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupRadius(): void {
  const slider = document.getElementById('sillage-slider') as HTMLInputElement | null;
  const projectionLabel = document.getElementById('projection-label');
  const sillageTitleText = document.getElementById('sillage-title-text');
  const coverageSqm = document.getElementById('coverage-sqm');
  const persistenceVal = document.getElementById('persistence-val');
  const persistenceCircle = document.getElementById('persistence-circle');
  const specimenHalo = document.getElementById('specimen-sillage-halo');
  const specimenCore = document.getElementById('specimen-sillage-core');
  const radiusButtons = document.querySelectorAll<HTMLButtonElement>('.radius-btn');

  function update(rawVal: number | string): void {
    const numeric = typeof rawVal === 'string' ? parseFloat(rawVal) : rawVal;
    const metrics = calculateSillageMetrics(numeric);

    if (slider) {
      slider.value = metrics.radiusMeters.toString();
      slider.setAttribute('aria-valuenow', metrics.radiusMeters.toString());
      slider.setAttribute('aria-valuetext', `${metrics.radiusMeters} meters, ${metrics.projectionLabel}`);
    }

    if (projectionLabel) {
      projectionLabel.textContent = metrics.projectionLabel;
    }
    if (sillageTitleText) {
      sillageTitleText.textContent = metrics.headline;
    }
    if (coverageSqm) {
      coverageSqm.textContent = `EST. SILLAGE VOLUME: ~${metrics.estimatedFootprintAreaSqm} M² HEMISPHERE`;
    }
    if (persistenceVal) {
      persistenceVal.textContent = metrics.persistenceHours.toString();
    }
    if (persistenceCircle) {
      persistenceCircle.style.strokeDashoffset = metrics.strokeDashoffset.toString();
    }
    if (specimenHalo) {
      specimenHalo.style.width = `${metrics.haloDiameterPx}px`;
      specimenHalo.style.height = `${metrics.haloDiameterPx}px`;
    }
    if (specimenCore) {
      specimenCore.style.width = `${metrics.coreDiameterPx}px`;
      specimenCore.style.height = `${metrics.coreDiameterPx}px`;
    }

    radiusButtons.forEach((btn) => {
      const bRad = parseFloat(btn.getAttribute('data-rad') || '0');
      const isCurrent = Math.abs(bRad - metrics.radiusMeters) < 0.1;
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      if (isCurrent) {
        btn.classList.add('bg-[#053C6B]', 'text-[#FAFCFF]', 'border-[#053C6B]', 'shadow-sm');
        btn.classList.remove('text-[#1C3B5E]', 'bg-white/50');
      } else {
        btn.classList.remove('bg-[#053C6B]', 'text-[#FAFCFF]', 'border-[#053C6B]', 'shadow-sm');
        btn.classList.add('text-[#1C3B5E]', 'bg-white/50');
      }
    });
  }

  if (slider) {
    slider.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      update(target.value);
    });
  }

  radiusButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const rad = btn.getAttribute('data-rad');
      if (rad) {
        update(rad);
      }
    });
  });
}
