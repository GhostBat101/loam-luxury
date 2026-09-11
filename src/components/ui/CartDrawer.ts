/**
 * Specimen Allocation & Cart Drawer UI Component.
 * Provides accessible slideover drawer for specimen acquisition, quantity management, and reservation simulation.
 * Communicates with: src/components/layout/Header.ts, src/components/sections/Acquisition.ts, and src/main.ts.
 */

export interface CartItem {
  readonly id: string;
  readonly title: string;
  readonly lot: string;
  readonly priceUsd: number;
}

export interface CartDrawerController {
  open: () => void;
  close: () => void;
  addItem: (item: CartItem) => void;
  getItemCount: () => number;
  subscribe: (callback: (count: number) => void) => () => void;
}

export function renderCartDrawer(): string {
  return `
    <div aria-hidden="true" class="fixed inset-0 z-50 pointer-events-none opacity-0 transition-opacity duration-300 ease-out" id="cart-drawer-overlay">
      <div class="absolute inset-0 bg-[#071D31]/60 backdrop-blur-sm" id="cart-backdrop"></div>
      <div aria-label="Shopping Bag" aria-modal="true" class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#eef4ff] shadow-2xl flex flex-col justify-between translate-x-full transition-transform duration-400 ease-out border-l border-[#053C6B]/20" id="cart-drawer-panel" role="dialog">
        <div class="p-6 sm:p-8 hairline-border-b flex justify-between items-center bg-[#f1f5f9]/80 backdrop-blur-md">
          <div>
            <span class="font-mono text-[9px] uppercase tracking-[0.25em] text-[#053C6B] font-bold">THALASSA · FIRST EDITION</span>
            <h3 class="font-display text-2xl text-[#071D31] font-semibold uppercase tracking-tight">YOUR BAG</h3>
          </div>
          <button aria-label="Close shopping bag" class="font-mono text-xs text-[#071D31] hover:text-[#053C6B] border border-[#285384]/20 px-3 py-1.5 hover:border-[#053C6B] transition-colors cursor-pointer focus-visible:outline-none" id="cart-close-btn" type="button">
            CLOSE (ESC)
          </button>
        </div>
        <div class="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6" id="cart-items-container">
          <div class="text-center py-12 text-[#1C3B5E] font-mono text-xs tracking-widest uppercase font-semibold" id="cart-empty-state">
            YOUR BAG IS CURRENTLY EMPTY.
          </div>
        </div>
        <div class="p-6 sm:p-8 hairline-border-t bg-[#e9f0f7]/90 space-y-4">
          <div class="flex justify-between font-mono text-xs uppercase tracking-widest text-[#1C3B5E] font-bold">
            <span>SUBTOTAL:</span>
            <span class="text-[#071D31] font-extrabold text-sm" id="cart-subtotal">$0 USD</span>
          </div>
          <div class="flex justify-between font-mono text-[9px] uppercase tracking-widest text-[#053C6B] font-bold pb-2">
            <span>SHIPPING:</span>
            <span>FREE EXPRESS DELIVERY</span>
          </div>
          <button class="btn-reserve-kinetic w-full h-14 bg-[#071D31] text-[#FAFCFF] hover:bg-[#053C6B] font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center border border-[#053C6B] font-bold cursor-pointer transition-all duration-300 focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none" id="cart-checkout-btn" type="button">
            <span>PROCEED TO CHECKOUT</span>
          </button>
          <div class="font-mono text-[9px] uppercase tracking-widest text-center text-[#1C3B5E] font-semibold" id="cart-confirmation-msg">
            INCLUDES 2 COMPLIMENTARY 2ML SAMPLES WITH EVERY BOTTLE
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupCartDrawer(): CartDrawerController {
  const overlay = document.getElementById('cart-drawer-overlay');
  const panel = document.getElementById('cart-drawer-panel');
  const backdrop = document.getElementById('cart-backdrop');
  const closeBtn = document.getElementById('cart-close-btn');
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const subtotalEl = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('cart-checkout-btn') as HTMLButtonElement | null;
  const confirmationMsg = document.getElementById('cart-confirmation-msg');

  let items: CartItem[] = [];
  const subscribers: Set<(count: number) => void> = new Set();

  function notify(): void {
    const count = items.length;
    for (const sub of subscribers) {
      sub(count);
    }
  }

  function renderItems(): void {
    if (!itemsContainer || !emptyState || !subtotalEl || !checkoutBtn) {
      return;
    }

    if (items.length === 0) {
      emptyState.style.display = 'block';
      itemsContainer.innerHTML = '';
      itemsContainer.appendChild(emptyState);
      subtotalEl.textContent = '$0 USD';
      checkoutBtn.disabled = true;
      return;
    }

    emptyState.style.display = 'none';
    const total = items.reduce((acc, curr) => acc + curr.priceUsd, 0);
    subtotalEl.textContent = `$${total} USD`;
    checkoutBtn.disabled = false;

    const cardsHtml = items.map((item, index) => {
      return `
        <div class="p-4 border border-[#285384]/20 bg-white/70 backdrop-blur-sm space-y-2">
          <div class="flex justify-between items-start">
            <div>
              <span class="font-mono text-[9px] text-[#053C6B] font-bold uppercase">BOTTLE 0${index + 1}</span>
              <h4 class="font-display text-lg text-[#071D31] font-semibold">${item.title}</h4>
            </div>
            <button class="cart-remove-item font-mono text-[10px] text-[#BA1A1A] font-bold p-1 hover:underline cursor-pointer" data-index="${index}" type="button">
              REMOVE
            </button>
          </div>
          <div class="flex justify-between items-baseline font-mono text-xs pt-1 border-t border-[#285384]/10">
            <span class="text-[#1C3B5E] text-[10px]">${item.lot}</span>
            <span class="font-bold text-[#071D31]">$${item.priceUsd} USD</span>
          </div>
        </div>
      `;
    }).join('');

    itemsContainer.innerHTML = cardsHtml;

    itemsContainer.querySelectorAll<HTMLButtonElement>('.cart-remove-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index') || '0', 10);
        items.splice(idx, 1);
        renderItems();
        notify();
      });
    });
  }

  function open(): void {
    if (!overlay || !panel) {
      return;
    }
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('pointer-events-auto', 'opacity-100');
    overlay.setAttribute('aria-hidden', 'false');
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
  }

  function close(): void {
    if (!overlay || !panel) {
      return;
    }
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    overlay.classList.remove('pointer-events-auto', 'opacity-100');
    overlay.classList.add('pointer-events-none', 'opacity-0');
    overlay.setAttribute('aria-hidden', 'true');
  }

  if (backdrop) {
    backdrop.addEventListener('click', close);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.getAttribute('aria-hidden') === 'false') {
      close();
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = '<span>ORDER CONFIRMED · THANK YOU</span>';
      if (confirmationMsg) {
        confirmationMsg.textContent = 'ORDER RECEIVED · CONFIRMATION SENT TO YOUR EMAIL';
        confirmationMsg.classList.add('text-[#053C6B]', 'font-bold');
      }
      setTimeout(() => {
        items = [];
        renderItems();
        notify();
        checkoutBtn.innerHTML = '<span>PROCEED TO CHECKOUT</span>';
        if (confirmationMsg) {
          confirmationMsg.textContent = 'INCLUDES 2 COMPLIMENTARY 2ML SAMPLES WITH EVERY BOTTLE';
          confirmationMsg.classList.remove('text-[#053C6B]', 'font-bold');
        }
        close();
      }, 2500);
    });
  }

  renderItems();

  return {
    open,
    close,
    addItem: (item: CartItem) => {
      items.push(item);
      renderItems();
      notify();
    },
    getItemCount: () => items.length,
    subscribe: (callback: (count: number) => void) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    }
  };
}
