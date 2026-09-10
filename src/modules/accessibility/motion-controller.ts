/**
 * Motion Accessibility Controller.
 * Manages reduced-motion states, localStorage preferences, and body class synchronization.
 * Communicates with: src/modules/accessibility/motion-controller.test.ts and src/components/layout/Header.ts.
 */

const STORAGE_KEY: string = 'thalassa_motion_preference';
const REDUCED_CLASS: string = 'reduced-motion';

export type MotionListener = (reduced: boolean) => void;

export class MotionController {
  private reduced: boolean;
  private listeners: Set<MotionListener> = new Set();

  constructor(systemPrefersReduced: boolean = false) {
    const storedPreference = typeof localStorage !== 'undefined' 
      ? localStorage.getItem(STORAGE_KEY) 
      : null;

    if (storedPreference === 'reduced') {
      this.reduced = true;
    } else if (storedPreference === 'full') {
      this.reduced = false;
    } else {
      this.reduced = systemPrefersReduced;
    }
  }

  public isReducedMotion(): boolean {
    return this.reduced;
  }

  public setReducedMotion(reduced: boolean): void {
    this.reduced = reduced;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, reduced ? 'reduced' : 'full');
    }
    this.notifyListeners();
  }

  public toggle(): boolean {
    const nextState = !this.reduced;
    this.setReducedMotion(nextState);
    return nextState;
  }

  public subscribe(listener: MotionListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public applyToDom(targetElement?: HTMLElement): void {
    const el = targetElement || (typeof document !== 'undefined' ? document.body : null);
    if (!el) {
      return;
    }

    if (this.reduced) {
      el.classList.add(REDUCED_CLASS);
    } else {
      el.classList.remove(REDUCED_CLASS);
    }
  }

  private notifyListeners(): void {
    this.applyToDom();
    for (const listener of this.listeners) {
      listener(this.reduced);
    }
  }
}
