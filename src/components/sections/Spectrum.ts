/**
 * Spectrum Section Component.
 * Implements WCAG 2.1 AA tablist for olfactory tiers, animated SVG Bezier telemetry curves, and chromatography readouts.
 * Communicates with: src/modules/spectrum/spectrum-engine.ts, src/types/spectrum.ts, and src/main.ts.
 */

import { getAllTiers, getTierByIndex, getNextTierIndex, getPreviousTierIndex } from '../../modules/spectrum/spectrum-engine';

export function renderSpectrum(): string {
  const tiers = getAllTiers();

  const tabButtons = tiers.map((tier, index) => {
    const isActive = index === 0;
    const activeClass = isActive ? 'active-phase' : '';
    const borderStyle = isActive ? 'border-[#053C6B]' : 'border-[#285384]/20';
    const bgStyle = isActive ? 'bg-white/65' : 'bg-white/55';
    const titleColor = isActive ? 'text-[#053C6B]' : 'text-[#071D31]';
    const pillText = isActive ? 'ACTIVE' : 'SELECT';
    const pillBorder = isActive ? 'border-[#053C6B]' : 'border-[#285384]/30';

    return `
      <button aria-controls="spectrum-panel" aria-selected="${isActive}" class="spectrum-tab spectrum-btn ${activeClass} text-left p-5 border ${borderStyle} ${bgStyle} backdrop-blur-md flex flex-col justify-between gap-3 group focus-visible:outline-none cursor-pointer" data-phase="${index}" id="tab-phase-${index}" role="tab" tabindex="${isActive ? '0' : '-1'}" type="button">
        <div class="flex justify-between items-center w-full font-mono text-xs tracking-widest text-[#1C3B5E]">
          <span class="font-extrabold text-[#053C6B]">${tier.tabLabel}</span>
          <span class="pill-tag px-2 py-0.5 text-[9px] uppercase tracking-wider border ${pillBorder} font-bold transition-colors">${pillText}</span>
        </div>
        <div class="note-title font-display text-2xl lg:text-3xl ${titleColor} font-medium transition-colors">${tier.noteTitle}</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-[#1C3B5E] font-semibold">${tier.durationLabel}</div>
      </button>
    `;
  }).join('');

  const initialTier = tiers[0];

  return `
    <section aria-labelledby="heading-spectrum" class="relative w-full px-6 sm:px-10 lg:px-16 py-28 lg:py-36 hairline-border-b bg-[#e8eff6]/90 backdrop-blur-sm overflow-hidden" data-bg="#e8eff6" id="spectrum">
      <div aria-hidden="true" class="watermark-float absolute -top-12 sm:-top-20 -left-6 lg:left-8 font-display text-[32vw] lg:text-[24vw] leading-none text-[#071D31] select-none pointer-events-none font-medium">
        02
      </div>
      <div class="relative z-10 max-w-[1720px] mx-auto">
        <div class="expand-divider w-full flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-16 pb-6 hairline-border-b reveal-item">
          <div class="flex items-baseline gap-6 lg:gap-10">
            <span aria-hidden="true" class="font-display text-5xl lg:text-7xl text-[#071D31] font-semibold leading-none tracking-tight tidal-drift-text">02</span>
            <h2 class="font-mono text-xs lg:text-sm uppercase text-[#053C6B] font-extrabold telemetry-phased-glow m-0" id="heading-spectrum">[SPECTRUM // KINETIC MATRIX]</h2>
          </div>
          <span class="font-mono text-[10px] text-[#1C3B5E] uppercase tracking-[0.22em] font-bold mt-2 sm:mt-0 scanline-pulse">// INTERACTIVE VOLATILITY &amp; CHROMATOGRAPHY</span>
        </div>
        <div aria-label="Fragrance Volatility Strata Tiers" class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 pb-4 hairline-border-b reveal-item" role="tablist">
          ${tabButtons}
        </div>
        <div aria-labelledby="tab-phase-0" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4 items-start reveal-item" id="spectrum-panel" role="tabpanel">
          <div class="lg:col-span-7 flex flex-col justify-between">
            <div class="flex justify-between items-baseline mb-4 font-mono text-[11px] uppercase tracking-widest text-[#1C3B5E]">
              <div class="flex items-center gap-2 font-extrabold text-[#053C6B]">
                <span aria-hidden="true" class="w-2.5 h-2.5 rounded-full bg-[#053C6B] animate-pulse"></span>
                <span class="scanline-pulse" id="spectrum-phase-header">${initialTier.header}</span>
              </div>
              <span class="font-mono text-[10px] text-[#071D31] font-bold" id="spectrum-dispersion-rate">${initialTier.dispersion}</span>
            </div>
            <div class="relative w-full h-72 border border-[#285384]/20 p-4 bg-gradient-to-b from-[#eaf2fb]/90 to-[#dde8f4]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(5,60,107,0.07)] rounded-none">
              <div aria-hidden="true" class="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-40">
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-r border-[#285384]/20"></div>
                <div class="border-b border-[#285384]/20"></div>
              </div>
              <svg aria-label="Kinetic Volatility Curve diagram showing dissipation over time" class="w-full h-full overflow-visible relative z-10" id="volatility-svg" preserveaspectratio="none" role="img" viewbox="0 0 600 240">
                <defs>
                  <lineargradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stop-color="#053C6B" stop-opacity="1"></stop>
                    <stop offset="60%" stop-color="#285384" stop-opacity="0.9"></stop>
                    <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.4"></stop>
                  </lineargradient>
                  <lineargradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#053C6B" stop-opacity="0.25"></stop>
                    <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.02"></stop>
                  </lineargradient>
                </defs>
                <path class="transition-all duration-700 ease-out" d="${initialTier.areaD}" fill="url(#areaGradient)" id="telemetry-area"></path>
                <path class="telemetry-curve-path" d="${initialTier.pathD}" fill="none" id="telemetry-curve" stroke="url(#curveGradient)" stroke-linecap="round" stroke-width="3.5"></path>
                <circle class="shadow-lg transition-all duration-700 ease-out" cx="${initialTier.point.cx}" cy="${initialTier.point.cy}" fill="#053C6B" id="telemetry-point" r="6" stroke="#FFFFFF" stroke-width="2.5"></circle>
              </svg>
              <div aria-hidden="true" class="absolute bottom-2 left-4 font-mono text-[9px] uppercase tracking-widest text-[#1C3B5E] font-bold">00:00 (TIDAL BURST)</div>
              <div aria-hidden="true" class="absolute bottom-2 right-4 font-mono text-[9px] uppercase tracking-widest text-[#1C3B5E] font-bold">24:00 (EPIDERMAL EQUILIBRIUM)</div>
            </div>
            <div class="mt-4 flex justify-between font-mono text-[10px] text-[#1C3B5E] tracking-widest uppercase font-semibold">
              <span>KINETIC VOLATILITY COEFFICIENT: <span class="text-[#071D31] font-extrabold" id="volatility-val">${initialTier.volatilityVal}</span></span>
              <span>CALIBRATION: DIRECT MACERATION</span>
            </div>
          </div>
          <div aria-live="polite" class="lg:col-span-5 space-y-6 lg:hairline-border-l lg:pl-10 font-mono text-xs">
            <div>
              <span class="text-[#053C6B] font-extrabold tracking-widest uppercase text-[10px] scanline-pulse">// CHROMATOGRAPHY SPECIFICATION</span>
              <h3 class="font-display text-3xl text-[#071D31] font-semibold mt-1 uppercase tracking-tight header-caustic-shimmer" id="chroma-title">${initialTier.chromatographyTitle}</h3>
              <p class="text-[#1C3B5E] tracking-normal font-sans text-sm mt-2 leading-relaxed font-medium" id="chroma-description">
                ${initialTier.chromatographyDescription}
              </p>
            </div>
            <div class="space-y-3 pt-2 text-[#071D31]">
              <div class="flex justify-between pb-2 hairline-border-b">
                <span class="text-[#1C3B5E] font-bold tracking-widest uppercase text-[10px]">MOLECULAR MASS RANGE</span>
                <span class="font-bold" id="chroma-mol">${initialTier.molecularMassRange}</span>
              </div>
              <div class="flex justify-between pb-2 hairline-border-b">
                <span class="text-[#1C3B5E] font-bold tracking-widest uppercase text-[10px]">ORGANOLEPTIC PURITY</span>
                <span class="font-bold" id="chroma-salinity">${initialTier.organolepticPurity}</span>
              </div>
              <div class="flex justify-between pb-2 hairline-border-b">
                <span class="text-[#1C3B5E] font-bold tracking-widest uppercase text-[10px]">ACTIVE COMPONENT</span>
                <span class="font-bold" id="chroma-compound">${initialTier.activeComponent}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-[#1C3B5E] font-bold tracking-widest uppercase text-[10px]">DIFFUSION HALFLIFE</span>
                <span class="font-extrabold text-[#053C6B]" id="chroma-halflife">${initialTier.diffusionHalflife}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupSpectrum(): void {
  const tabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.spectrum-tab'));
  const phaseHeader = document.getElementById('spectrum-phase-header');
  const dispersionRate = document.getElementById('spectrum-dispersion-rate');
  const curvePath = document.getElementById('telemetry-curve');
  const areaPath = document.getElementById('telemetry-area');
  const curvePoint = document.getElementById('telemetry-point');
  const volatilityVal = document.getElementById('volatility-val');
  const chromaTitle = document.getElementById('chroma-title');
  const chromaDesc = document.getElementById('chroma-description');
  const chromaMol = document.getElementById('chroma-mol');
  const chromaSalinity = document.getElementById('chroma-salinity');
  const chromaCompound = document.getElementById('chroma-compound');
  const chromaHalflife = document.getElementById('chroma-halflife');

  function selectTab(index: number): void {
    const tier = getTierByIndex(index);

    tabButtons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active-phase', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');

      const pill = btn.querySelector('.pill-tag');
      if (pill) {
        pill.textContent = isActive ? 'ACTIVE' : 'SELECT';
      }
    });

    if (phaseHeader) {
      phaseHeader.textContent = tier.header;
    }
    if (dispersionRate) {
      dispersionRate.textContent = tier.dispersion;
    }
    if (volatilityVal) {
      volatilityVal.textContent = tier.volatilityVal;
    }
    if (curvePath) {
      curvePath.setAttribute('d', tier.pathD);
    }
    if (areaPath) {
      areaPath.setAttribute('d', tier.areaD);
    }
    if (curvePoint) {
      curvePoint.setAttribute('cx', tier.point.cx.toString());
      curvePoint.setAttribute('cy', tier.point.cy.toString());
    }
    if (chromaTitle) {
      chromaTitle.textContent = tier.chromatographyTitle;
    }
    if (chromaDesc) {
      chromaDesc.textContent = tier.chromatographyDescription;
    }
    if (chromaMol) {
      chromaMol.textContent = tier.molecularMassRange;
    }
    if (chromaSalinity) {
      chromaSalinity.textContent = tier.organolepticPurity;
    }
    if (chromaCompound) {
      chromaCompound.textContent = tier.activeComponent;
    }
    if (chromaHalflife) {
      chromaHalflife.textContent = tier.diffusionHalflife;
    }
  }

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => selectTab(index));

    btn.addEventListener('keydown', (e: KeyboardEvent) => {
      let newIndex: number | null = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        newIndex = getNextTierIndex(index);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        newIndex = getPreviousTierIndex(index);
      } else if (e.key === 'Home') {
        newIndex = 0;
      } else if (e.key === 'End') {
        newIndex = tabButtons.length - 1;
      }

      if (newIndex !== null) {
        e.preventDefault();
        selectTab(newIndex);
        tabButtons[newIndex].focus();
      }
    });
  });
}
