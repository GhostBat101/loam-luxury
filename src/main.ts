/**
 * Application Entrypoint & Modular Orchestrator.
 * Mounts layouts, sections, interactive state machines, 60 FPS Lenis scroll, and accessibility managers.
 * Communicates with: all src/components, src/modules, src/styles/main.css, and index.html.
 */

import './styles/main.css';
import { MotionController } from './modules/accessibility/motion-controller';
import { initSmoothScroll } from './modules/scroll/smooth-scroll';
import { initScrollBackground } from './modules/animation/scroll-background';
import { initScrollReveal } from './modules/animation/scroll-reveal';
import { initFluidShimmer } from './modules/animation/fluid-shimmer';
import { renderArchitecturalRail } from './components/layout/ArchitecturalRail';
import { renderTelemetryRibbon } from './components/layout/TelemetryRibbon';
import { renderHeader, setupHeader } from './components/layout/Header';
import { renderFooter } from './components/layout/Footer';
import { renderHero } from './components/sections/Hero';
import { renderOrigin } from './components/sections/Origin';
import { renderSpectrum, setupSpectrum } from './components/sections/Spectrum';
import { renderFieldPlate } from './components/sections/FieldPlate';
import { renderRadius, setupRadius } from './components/sections/Radius';
import { renderAcquisition, setupAcquisition } from './components/sections/Acquisition';
import { renderCartDrawer, setupCartDrawer } from './components/ui/CartDrawer';

function bootstrap(): void {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }

  const systemPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionController = new MotionController(systemPrefersReduced);
  motionController.applyToDom();

  app.innerHTML = `
    <div aria-hidden="true" class="ambient-scroll-canvas"></div>
    ${renderArchitecturalRail()}
    ${renderHeader()}
    <main class="w-full pt-20 relative z-10" id="main-content">
      ${renderTelemetryRibbon()}
      ${renderHero()}
      ${renderOrigin()}
      ${renderSpectrum()}
      ${renderFieldPlate()}
      ${renderRadius()}
      ${renderAcquisition()}
    </main>
    ${renderFooter()}
    ${renderCartDrawer()}
  `;

  const cartController = setupCartDrawer();
  const headerController = setupHeader(motionController, () => cartController.open());
  cartController.subscribe((count) => headerController.updateCartBadge(count));

  setupSpectrum();
  setupRadius();
  setupAcquisition(cartController);

  initSmoothScroll();
  initScrollBackground();
  initScrollReveal(motionController);
  initFluidShimmer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
