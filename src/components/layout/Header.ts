/**
 * Global Header Navigation Component.
 * Implements accessible brand masthead, magnetic link indicators, motion toggle, and cart triggers.
 * Communicates with: src/modules/accessibility/motion-controller.ts, src/components/ui/CartDrawer.ts, and src/main.ts.
 */

import type { MotionController } from '../../modules/accessibility/motion-controller';

export function renderHeader(): string {
  return `
    <header class="fixed top-0 left-0 w-full z-50 bg-[#f1f5f9]/85 backdrop-blur-md hairline-border-b transition-all duration-300">
      <div class="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        <div class="flex items-baseline gap-3 group">
          <a aria-label="THALASSA Home" class="font-brutalist text-xl lg:text-2xl font-extrabold tracking-tight text-[#071D31] uppercase hover:text-[#053C6B] transition-all duration-300 focus-visible:outline-none" href="#">THALASSA</a>
          <span class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#053C6B] font-bold transition-opacity duration-300 group-hover:opacity-80">· LOAM</span>
        </div>
        <nav aria-label="Main Navigation" class="hidden lg:flex items-center gap-8 xl:gap-12">
          <a aria-current="page" class="nav-magnetic font-mono text-[11px] uppercase tracking-[0.22em] text-[#071D31] font-bold py-1 hover:text-[#053C6B]" href="#origin">ORIGIN</a>
          <a class="nav-magnetic font-mono text-[11px] uppercase tracking-[0.22em] text-[#1C3B5E] font-bold hover:text-[#053C6B] py-1" href="#spectrum">NOTES</a>
          <a class="nav-magnetic font-mono text-[11px] uppercase tracking-[0.22em] text-[#1C3B5E] font-bold hover:text-[#053C6B] py-1" href="#radius">HOW IT WEARS</a>
          <a class="nav-magnetic font-mono text-[11px] uppercase tracking-[0.22em] text-[#1C3B5E] font-bold hover:text-[#053C6B] py-1" href="#allocation">ORDER</a>
        </nav>
        <div class="flex items-center gap-4 sm:gap-6">
          <button aria-pressed="false" class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#071D31] px-3.5 py-1.5 border border-[#285384]/20 hover:border-[#053C6B] bg-white/60 backdrop-blur-sm font-semibold transition-all hover:bg-white/80 focus-visible:outline-none cursor-pointer" id="motion-toggle-btn" title="Toggle animation motion" type="button">
            <span aria-hidden="true" class="inline-block w-2 h-2 rounded-full bg-[#053C6B]" id="motion-dot"></span>
            <span id="motion-btn-text">MOTION: ON</span>
          </button>
          <button aria-label="Shopping bag with 0 items" class="cart-btn-hover flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#071D31] px-3.5 py-1.5 border border-[#285384]/20 hover:border-[#053C6B] hover:text-[#053C6B] bg-white/60 backdrop-blur-sm font-bold active:scale-95 transition-all cursor-pointer focus-visible:outline-none" id="cart-header-btn" type="button">
            <span>BAG</span>
            <span class="font-bold text-[#053C6B]" id="header-cart-count">(0)</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function setupHeader(
  motionController: MotionController,
  onCartOpen: () => void
): { updateCartBadge: (count: number) => void } {
  const toggleBtn = document.getElementById('motion-toggle-btn');
  const btnText = document.getElementById('motion-btn-text');
  const dot = document.getElementById('motion-dot');
  const cartBtn = document.getElementById('cart-header-btn');
  const cartCountEl = document.getElementById('header-cart-count');

  function updateMotionUI(isReduced: boolean): void {
    if (!toggleBtn || !btnText || !dot) {
      return;
    }
    toggleBtn.setAttribute('aria-pressed', isReduced ? 'true' : 'false');
    btnText.textContent = isReduced ? 'MOTION: PAUSED' : 'MOTION: ON';
    if (isReduced) {
      dot.className = 'inline-block w-2 h-2 rounded-full bg-[#BA1A1A]';
    } else {
      dot.className = 'inline-block w-2 h-2 rounded-full bg-[#053C6B]';
    }
  }

  updateMotionUI(motionController.isReducedMotion());
  motionController.subscribe(updateMotionUI);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      motionController.toggle();
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onCartOpen();
    });
  }

  return {
    updateCartBadge: (count: number) => {
      if (cartCountEl) {
        cartCountEl.textContent = `(${count})`;
      }
      if (cartBtn) {
        cartBtn.setAttribute('aria-label', `Cart with ${count} items`);
      }
    }
  };
}
