<div align="center">

# THALASSA // LOAM

### Creative Web Engineering & Sensory Design Demo

[![Showcase](https://img.shields.io/badge/Project%20Type-Skill%20Showcase%20Demo-053C6B?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Design System](https://img.shields.io/badge/Design%20System-Thalassa%20Aqua%20Substrate-285384?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-0EA5E9?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20%2F%20Zero%20Monolith-1C3B5E?style=flat-square)](https://github.com/GhostBat101/loam-luxury)
[![Status](https://img.shields.io/badge/Status-Prototype%20Demo-071D31?style=flat-square)](https://github.com/GhostBat101/loam-luxury)

<p align="center">
  <em>An interactive, high-craft digital monograph and technical demonstration exploring the intersection of artisanal perfumery, coastal bathymetry, and modern frontend architecture.</em>
</p>

---

</div>

> [!NOTE]
> **Showcase & Demonstration Prototype**:  
> This repository is an experimental creative technology demo and design showcase. All fragrances, chemical telemetry, batch registries, pricing, and provenance data are fictional concept elements designed to demonstrate advanced UI/UX execution, mathematical SVG modeling, and modular frontend engineering.

---

## 🌊 Showcase Concept

**Loam Luxury — THALASSA** is a technical showcase demo modeling a high-fashion luxury product reveal microsite. The project explores how web technologies can evoke physical materiality—cold sea spray, unrounded crystal glass flacons, and mineral evaporation—without relying on heavy 3D runtimes or generic component templates.

The project demonstrates:
1. **Bespoke Editorial Aesthetics**: Couture typographic pacing, unhurried negative space, and a locked architectural design system (*Thalassa Aqua Substrate*).
2. **Mathematical Data Modeling**: Interactive SVG Bézier curve simulations and real-time geometric sillage calculations.
3. **Hardware-Accelerated Visual Optics**: Native CSS caustics, dual-layer text shimmers, and dynamic background bathymetry running at 60 FPS.
4. **Universal Accessibility Standards**: Complete WCAG 2.1 AA compliance and an adaptive dual-layer reduced-motion engine.
5. **Ultra-Maintainable Code Architecture**: Deconstructing a monolithic 1,300-line prototype into pure, decoupled, testable modules.

---

## 🏛️ Design System: Thalassa Aqua Substrate

The visual direction rejects generic SaaS patterns in favor of an architectural, mineral-inspired luxury experience.

### Color Palette

| Token | Hex | Role in Demo |
|---|---|---|
| `--marine-deep` | `#053C6B` | Primary brand anchor, active indicators, high-contrast borders |
| `--ink` | `#071D31` | Deep slate ink, monumental headlines, primary text |
| `--marine-mid` | `#285384` | Secondary container wash, mineral hairline dividers |
| `--ink-muted` | `#1C3B5E` | Scientific telemetry readouts, batch labels, coordinate data |
| `--electric-cyan` | `#0EA5E9` | Interactive highlights, kinetic pulse nodes, focus rings |
| `--surface-dim` | `#CFE2FE` | Ice mist tints, translucent tags, glassmorphic strokes |
| `--surface-base` | `#F0F4F8` | Primary foundation wash |

### Dynamic Background Bathymetry
As the user scrolls through the demonstration, the viewport background seamlessly transitions across five coastal depth stages via an IntersectionObserver-driven CSS variable engine:
$$\text{Base } (\texttt{\#f3f6f9}) \longrightarrow \text{Origin } (\texttt{\#eef3f7}) \longrightarrow \text{Spectrum } (\texttt{\#e8eff6}) \longrightarrow \text{Radius } (\texttt{\#e1ebf5}) \longrightarrow \text{Acquisition } (\texttt{\#dbe6f2})$$

### Architectural Geometry & Styling
* **Strict 0px Sharp Geometry**: Structural cards, tags, buttons, and dialogs strictly feature unrounded 90-degree corners, echoing raw-cut crystal flacons and coastal monoliths.
* **Mineral Hairlines**: Structural borders sit flush at 1px thickness tinted in Deep Pelagic Navy at 16% opacity (`rgba(40, 83, 132, 0.16)`).
* **Submerged Glass Layers**: Floating navigational components utilize `backdrop-filter: blur(16px)` with translucent bases.

### Typography Hierarchy

```
Bodoni Moda        Editorial Couture Display & Monumental Headlines
Manrope            Mineral Precision Body & Technical Descriptions
IBM Plex Mono      Scientific Telemetry, Batch Codes & Coordinates
Syne               Brutalist Brand Monogram
```

---

## 🔬 Featured Technical Interactions

### 1. Kinetic Volatility Matrix (`#spectrum`)
* **Accessible ARIA Tablist**: Seamless switching across three fragrance strata (*Apex*, *Median*, and *Baseline*).
* **Dynamic SVG Bézier Plotter**: Re-renders cubic Bézier curves (`<path d="...">`), area fills, and telemetry nodes on the fly to simulate chemical volatility decay.
* **Live Chromatography Panel**: Dynamically updates active compounds, molecular mass ranges, and evaporation half-life data.

### 2. Interactive Sillage Calculator (`#radius`)
* **Dual-Feedback Slider Control**: Accessible range input ($0.5\text{m} \rightarrow 3.0\text{m}$) accompanied by discrete preset shortcuts.
* **Real-Time Geometric Engine**: Calculates projected sillage hemisphere coverage:
  $$\text{Volume} \approx \frac{2}{3} \pi r^3 \quad (\text{Surface Projection: } \sim 0.78\text{ m}^2 \text{ to } 28.27\text{ m}^2)$$
* **SVG Circular Progress Meter**: Calculates dynamic `stroke-dashoffset` against a 628-unit circumference to animate epidermal persistence ($24\text{h} \rightarrow 10\text{h}$).
* **Synchronized Sillage Rings**: Dynamically scales visual pulse rings overlaid on the product field plate.

### 3. Accessible Motion Control & Performance
* **60 FPS CSS Caustics**: Hardware-accelerated ambient shimmers and drift distortions using `transform: translate3d()` and `will-change`.
* **Universal Reduced Motion**: Automatically honors OS `prefers-reduced-motion` and provides an explicit user-facing **MOTION: ON / PAUSED** header switch for full WCAG 2.2.2 compliance.

---

## 📁 Modular Demo Architecture

The project decouples business logic, data models, and styling from the presentation layer:

```
loam-luxury/
├── public/                            # Static demo assets
│   ├── fonts/                         # Self-hosted web fonts
│   └── images/                        # Static textures & public assets
├── src/
│   ├── assets/                        # Bundled media & photography
│   │   ├── images/                    # Localized product imagery
│   │   └── vectors/                   # Static SVG glyphs
│   │
│   ├── components/                    # Modular UI components
│   │   ├── layout/                    # Header, Footer, ArchitecturalRail, TelemetryRibbon
│   │   ├── sections/                  # Hero, Origin, Spectrum, FieldPlate, Radius, Acquisition
│   │   └── ui/                        # Button, Crosshair, Watermark, HairlineDivider, RangeSlider, CircularProgress
│   │
│   ├── data/                          # Decoupled mock data & scientific configs
│   │   ├── spectrum.json              # Volatility tiers, curve vectors & chemistry
│   │   ├── sillage.json               # Radius tiers, volume & persistence formulas
│   │   └── telemetry.json             # Coordinates, salinity & batch notes
│   │
│   ├── modules/                       # Pure, testable calculation engines
│   │   ├── accessibility/             # Motion preference & screen reader management
│   │   ├── animation/                 # Scroll reveals, background shifts & counters
│   │   ├── spectrum/                  # SVG curve interpolation & tier state machine
│   │   └── sillage/                   # Sillage volume & radius calculations
│   │
│   ├── styles/                        # Modular CSS tokens matching DESIGN.md
│   │   ├── tokens.css                 # CSS Custom Properties
│   │   ├── base.css                   # Resets & smooth scrolling
│   │   ├── typography.css             # Font declarations & editorial styles
│   │   ├── animations.css             # Keyframe animations & reduced-motion
│   │   └── utilities.css              # Custom layout utilities & hairlines
│   │
│   ├── types/                         # TypeScript interfaces & contracts
│   └── utils/                         # Pure helper functions (math, DOM, formatters)
│
├── .gitignore                         # Project-wide ignore rules
└── README.md                          # Showcase overview & technical documentation
```

---

## 🛠️ Development & Local Run

### Prerequisites
- [Node.js](https://nodejs.org/) (`20.x` or higher)
- [npm](https://www.npmjs.com/) (`10.x` or higher)

### Engineering Standards
* **Zero Comments in Code**: The implementation is completely free of in-code comments, using self-documenting naming and concise top-of-file communication headers.
* **Pure Mathematical Modules**: Sillage calculations and volatility curves run as headless units independent of DOM manipulation.
* **Platform Native First**: Prioritizes standard browser APIs over bloated third-party dependencies.

---

## ⚖️ Disclaimer & Notice

This project is a design demonstration and creative engineering showcase created for educational and portfolio presentation purposes. It is not an active commercial storefront or production commerce platform. All brand names, visual assets, and product representations are concepts developed for this demonstration.
