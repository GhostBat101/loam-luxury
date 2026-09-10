<div align="center">

# THALASSA // LOAM

### Extrait de Parfum · Archival Product Monograph

[![Design System](https://img.shields.io/badge/Design%20System-Thalassa%20Aqua%20Substrate-053C6B?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-0EA5E9?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Geometry](https://img.shields.io/badge/Geometry-0px%20Sharp-1C3B5E?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![License](https://img.shields.io/badge/License-Archival%20Monograph-071D31?style=flat-square)](https://github.com/GhostBat101/loam-luxury)

<p align="center">
  <em>An architectural, sensory product reveal microsite and digital monograph for artisanal maritime perfumery.</em>
</p>

---

</div>

## 🌊 Overview

**LOAM — THALASSA** is a luxury product reveal microsite and sensory digital catalog. The project translates the physical materiality of artisanal high perfumery and deep coastal bathymetry into an unhurried, monumental web experience.

Centering on the limited archival release of **THALASSA Extrait de Parfum** (34% concentration, direct waterline extraction from the Cyclades basin), the interface balances editorial couture pacing with responsive scientific telemetry.

---

## 🏛️ Design System: Thalassa Aqua Substrate

The site is built upon the **Thalassa Aqua Substrate** design language—an aesthetic philosophy of ultra-minimalist luxury, liquid glassmorphic layers, and monumental negative space.

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `--marine-deep` | `#053C6B` | Primary focal points, active state highlights, borders |
| `--ink` | `#071D31` | Dark ink slate, primary typography, high-contrast surfaces |
| `--marine-mid` | `#285384` | Secondary container fills, structural hair lines |
| `--ink-muted` | `#1C3B5E` | Scientific telemetry readouts, micro-labels, metadata |
| `--electric-cyan` | `#0EA5E9` | Kinetic accents, active indicators, focus rings |
| `--surface-dim` | `#CFE2FE` | Ice mist tints, badges, translucent glass borders |
| `--surface-base` | `#F0F4F8` | Chilled mineral foundation wash |

### Dynamic Surface Bathymetry
As the user traverses the monograph, the viewport background seamlessly shifts through five subtle saline mist tones using an IntersectionObserver-driven CSS variable engine:
$$\text{Base } (\texttt{\#f3f6f9}) \longrightarrow \text{Origin } (\texttt{\#eef3f7}) \longrightarrow \text{Spectrum } (\texttt{\#e8eff6}) \longrightarrow \text{Radius } (\texttt{\#e1ebf5}) \longrightarrow \text{Acquisition } (\texttt{\#dbe6f2})$$

### Architectural Geometry
* **Strict Sharp (0px) Corners**: Buttons, cards, olfactory tags, and dialogs strictly feature unrounded 90-degree corners, echoing raw-cut crystal flacons, extraction monoliths, and coastal cliffs.
* **Mineral Hairlines**: Structural borders sit flush at 1px thickness tinted in Deep Pelagic Navy at 16% opacity (`rgba(40, 83, 132, 0.16)`).
* **Submerged Glass Layers**: Floating navigational components utilize `backdrop-filter: blur(16px)` with translucent bases.

### Typography Hierarchy

```
Bodoni Moda        Editorial Couture & Monumental Headlines (72px / 44px)
Manrope            Mineral Precision Body & Technical Descriptions (15px / 13px)
IBM Plex Mono      Scientific Telemetry, Batch Codes & Coordinates (11px / 9px)
Syne               Brutalist Brand Monogram (24px)
```

---

## ✨ Core Interactive Systems

- **Kinetic Volatility Matrix (`#spectrum`)**:
  - Accessible ARIA Tablist navigating three fragrance volatility tiers: *Apex Tier* (Sea Salt & Ozone), *Median Tier* (Driftwood & Bergamot), and *Baseline Tier* (Deep Amber & Mineral).
  - Dynamic SVG Bézier curve telemetry recalculating dissipation curves and coordinate points in real time.
  - Live chemical chromatography specifications (molecular mass, active compounds, diffusion half-life).

- **Sillage Radius Calculator (`#radius`)**:
  - Accessible range slider and preset selectors modeling projection radius from $0.5\text{m}$ (Skin Aura) to $3.0\text{m}$ (Scent Trail).
  - Real-time hemisphere volume formula calculating active sillage space ($0.78\text{ m}^2 \rightarrow 28.27\text{ m}^2$).
  - Animated SVG circular progress dial displaying calibrated epidermal persistence ($24\text{h} \rightarrow 10\text{h}$).
  - Dynamic resizing of the concentric sillage rings over the flacon field plate.

- **Fluid Caustics & Shimmer FX**:
  - Hardware-accelerated 60FPS CSS keyframe animations rendering ambient water shimmers, drifting tidal outlines, and light glints without heavy WebGL overhead.

- **Universal Accessibility & Motion Control**:
  - Full WCAG 2.1 AA compliant contrast ratios and focus-visible indicators.
  - Dual-layer motion engine supporting both system-level `prefers-reduced-motion` and an explicit user-facing **MOTION: ON / PAUSED** header switch.

---

## 📁 Repository Architecture

The codebase enforces strict separation of concerns across presentation, layout, data, and headless state engines:

```
loam-luxury/
├── public/                            # Static, uncompiled public assets
│   ├── fonts/                         # Self-hosted web fonts
│   └── images/                        # Static textures & public assets
├── src/
│   ├── assets/                        # Bundled media & photography
│   │   ├── images/                    # Localized product & editorial photography
│   │   └── vectors/                   # Static SVG icons and glyphs
│   │
│   ├── components/                    # Modular UI components
│   │   ├── layout/                    # Persistent structural chrome
│   │   │   ├── Header/                # Navigation, motion toggle, cart indicator
│   │   │   ├── Footer/                # Monograph links, lab locations, legal
│   │   │   ├── ArchitecturalRail/     # Desktop vertical telemetry spine
│   │   │   └── TelemetryRibbon/       # Real-time archival ticker
│   │   │
│   │   ├── sections/                  # Numbered editorial sections
│   │   │   ├── Hero/                  # Monolith title, caustics, water drift
│   │   │   ├── Origin/                # Environmental provenance & specs
│   │   │   ├── Spectrum/              # Volatility matrix & telemetry plot
│   │   │   ├── FieldPlate/            # Full-bleed flacon visual & sillage halo
│   │   │   ├── Radius/                # Projection slider & circular progress
│   │   │   └── Acquisition/           # Pricing, edition & kinetic CTA
│   │   │
│   │   └── ui/                        # Atomic primitives (0px sharp geometry)
│   │       ├── Button/                # Kinetic sheen & ghost buttons
│   │       ├── Crosshair/             # Coordinate targeting glyphs
│   │       ├── Watermark/             # Ghosted Roman numeral backgrounds
│   │       ├── HairlineDivider/       # Animated expanding divider rules
│   │       ├── RangeSlider/           # Accessible custom styled slider
│   │       └── CircularProgress/      # SVG radial progress gauge
│   │
│   ├── data/                          # Pure decoupled content & configuration
│   │   ├── spectrum.json              # Volatility tiers, curve vectors & chemistry
│   │   ├── sillage.json               # Radius tiers, volume & persistence formulas
│   │   └── telemetry.json             # Coordinates, salinity & batch notes
│   │
│   ├── modules/                       # Headless, 100% testable controllers
│   │   ├── accessibility/             # Motion preference & screen reader management
│   │   ├── animation/                 # Scroll reveals, background shifts & counters
│   │   ├── spectrum/                  # SVG curve interpolation & tier state machine
│   │   └── sillage/                   # Sillage volume & radius calculations
│   │
│   ├── styles/                        # Modular design token layer
│   │   ├── tokens.css                 # CSS Custom Properties matching DESIGN.md
│   │   ├── base.css                   # Resets, defaults & smooth scrolling
│   │   ├── typography.css             # Font declarations & editorial styles
│   │   ├── animations.css             # 60FPS keyframe animations & reduced-motion
│   │   └── utilities.css              # Custom layout utilities & hairlines
│   │
│   ├── types/                         # Shared TypeScript interfaces & contracts
│   └── utils/                         # Stateless helper functions (math, DOM, formatters)
│
├── .gitignore                         # Project-wide ignore rules
└── README.md                          # Project documentation & reference
```

---

## 🛠️ Development & Tooling

### Prerequisites
- [Node.js](https://nodejs.org/) (version `20.x` or higher recommended)
- [npm](https://www.npmjs.com/) (version `10.x` or higher)

### Architecture Principles
1. **Zero Magic Numbers in Views**: All volatile rates, molecular weights, and coordinates reside in `src/data/`.
2. **Decoupled State Machines**: Interactive calculators (Sillage, Spectrum) run as pure modules in `src/modules/` independent of DOM rendering.
3. **Hardware Acceleration**: Transitions use `transform: translate3d()` and `opacity` with `will-change` hints for smooth 60FPS execution.
4. **Token Integrity**: Colors and typography derive directly from `src/styles/tokens.css` without ad-hoc hardcoded styling.

---

## 📜 Archival Monograph Notice

© 2026 LOAM Archival Monograph. All rights reserved.  
Formulated and documented across Aegean Labs, Basel, and Athens.
