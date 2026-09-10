/**
 * Tailwind CSS Design System Configuration.
 * Defines brutalist design tokens, oceanic typography, and palette values from DESIGN.md.
 * Communicates with: postcss.config.js, src/styles/tokens.css, and all rendered markup.
 */

import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,js,html}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface': '#F0F4F8',
        'surface-sub': '#E5EEF7',
        'surface-dim': '#CFE2FE',
        'surface-light': '#FAFCFF',
        'ink': '#071D31',
        'ink-muted': '#1C3B5E',
        'marine-deep': '#053C6B',
        'marine-mid': '#285384',
        'electric-cyan': '#0EA5E9',
        'sky-highlight': '#38BDF8',
        'ice-border': 'rgba(40, 83, 132, 0.16)',
        'primary': '#053C6B',
        'primary-container': '#285384'
      },
      fontFamily: {
        'display': ['"Bodoni Moda"', 'serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'sans': ['"Manrope"', 'sans-serif'],
        'brutalist': ['"Syne"', 'sans-serif']
      },
      letterSpacing: {
        'caps': '0.18em',
        'archival': '0.24em',
        'pelagic': '0.3em'
      },
      borderRadius: {
        'none': '0px'
      }
    }
  },
  plugins: []
};

export default tailwindConfig;
