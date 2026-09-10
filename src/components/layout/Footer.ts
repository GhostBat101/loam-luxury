/**
 * Global Footer Component.
 * Declares semantic landmark, laboratory credentials, archival monograph copyright, and index links.
 * Communicates with: src/main.ts and index.html.
 */

export function renderFooter(): string {
  return `
    <footer class="w-full bg-[#d3dfed]/95 hairline-border-t pt-24 pb-16 px-6 sm:px-10 lg:px-16 relative z-10" role="contentinfo">
      <div class="max-w-[1720px] mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-8 pb-14 hairline-border-b">
          <div class="space-y-2">
            <div class="font-brutalist text-2xl font-extrabold tracking-tight text-[#071D31] uppercase hover:text-[#053C6B] transition-colors cursor-default">THALASSA // LOAM</div>
            <div class="font-mono text-[10px] text-[#053C6B] uppercase tracking-[0.24em] font-extrabold">// COASTAL BOTANICAL &amp; SALINE EXTRACTION</div>
          </div>
          <div class="font-mono text-[10px] text-[#1C3B5E] uppercase tracking-widest font-bold">
            [AEGEAN LABS · BASEL · ATHENS]
          </div>
        </div>
        <div class="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#1C3B5E] font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
          <span>© 2025 LOAM ARCHIVAL MONOGRAPH. ALL RIGHTS RESERVED.</span>
          <div class="flex items-center gap-8 font-extrabold">
            <a class="footer-link-underline hover:text-[#053C6B] transition-colors focus-visible:outline-none" href="#origin">[ARCHIVE]</a>
            <a class="footer-link-underline hover:text-[#053C6B] transition-colors focus-visible:outline-none" href="#spectrum">[INDEX]</a>
            <a class="footer-link-underline hover:text-[#053C6B] transition-colors focus-visible:outline-none" href="#allocation">[TERMS]</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
