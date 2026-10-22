import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-architecture-blueprint',
  name: 'Full-Stack Web & Edge Architecture Blueprint',
  category: 'hero',
  note: 'Interactive 3-tier system blueprint showing Astro/React UI, Edge CDN, AEO Graph, and WooCommerce core.',
  tags: ['hero', 'architecture', 'astro', 'fullstack'],
  cols: 72,
  rows: 18,
  fps: 24,
  size: '3.8 KB',
  palette: palette([
    '#e6edf3',
    '#8b949e',
    '#7ee787',
    '#79c0ff',
    '#ffa657',
    '#ff7b72',
    '#d2a8ff',
    '#484f58',
    '#30363d',
    '#2ea043',
  ]),
};

export default function create() {
  const g = new Grid(meta.cols, meta.rows);

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      72,
      18,
      'round',
      '8',
      ' /ARCHITECTURE · Full-Stack Web & Edge Topology ',
      '0',
      ' TTFB 14ms ',
      '2'
    );

    const pulse = Math.floor(t * 6) % 3;

    // Tier 1: Frontend & Multilingual Layer (rows 2..5)
    g.box(2, 2, 20, 4, 'single', pulse === 0 ? '2' : '3', ' [01] ASTRO 5 SSR ', '2');
    g.text(4, 3, 'Zero-JS Islands', '0');
    g.text(4, 4, 'LCP 0.78s · AVIF', '1');

    g.text(22, 4, '══►', '2');

    g.box(25, 2, 21, 4, 'single', pulse === 1 ? '2' : '3', ' [02] REACT 19 UI ', '3');
    g.text(27, 3, 'Interactive Tools', '0');
    g.text(27, 4, 'INP 22ms · WCAG AA', '1');

    g.text(46, 4, '══►', '2');

    g.box(49, 2, 21, 4, 'single', pulse === 2 ? '2' : '6', ' [03] RTL/LTR BIDI ', '6');
    g.text(51, 3, 'EN · FA · AR Sync', '0');
    g.text(51, 4, 'Hreflang + Schema', '1');

    // Vertical flow arrows from Tier 1 to Tier 2 (row 6)
    g.text(11, 6, '│', '3');
    g.text(35, 6, '▼', '2');
    g.text(59, 6, '│', '6');

    // Tier 2: Edge, Security & AI Discovery Layer (rows 7..10)
    g.box(2, 7, 20, 4, 'single', '4', ' [04] HTTP/3 EDGE ', '4');
    g.text(4, 8, 'Brotli-11 + WAF', '0');
    g.text(4, 9, '99.99% Uptime SLA', '1');

    g.text(22, 9, '◄═►', '3');

    g.box(25, 7, 21, 4, 'round', '2', ' [05] WEBABC CORE ', '2');
    g.text(27, 8, 'Custom Web & Woo', '0');
    g.text(27, 9, 'API + Payment Hub', '2');

    g.text(46, 9, '◄═►', '3');

    g.box(49, 7, 21, 4, 'single', '6', ' [06] AEO & LLMS ', '6');
    g.text(51, 8, '/llms.txt + .md', '0');
    g.text(51, 9, 'JSON-LD @id Graph', '1');

    // Bottom Live Telemetry Strip (rows 12..16)
    g.hline(2, 12, 68, '─', '8');
    g.text(2, 13, 'LIVE PIPELINE METRICS:', '6');
    g.text(26, 13, '● BUILD: PASS', '2');
    g.text(42, 13, '● CWV: 100/100', '2');
    g.text(58, 13, '● CLS: 0.00', '3');

    const streamShift = Math.floor(t * 12) % 64;
    g.hline(3, 15, 66, '─', '8');
    for (let k = 0; k < 5; k++) {
      g.set(3 + ((streamShift + k) % 66), 15, '━', '2');
    }
    g.text(2, 16, '✓ End-to-End Custom Engineering · WordPress/WooCommerce · Technical SEO', '0');

    return g.frame();
  };
}
