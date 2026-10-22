import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-command-center',
  name: 'WebABC Mission Control & Live Telemetry',
  category: 'hero',
  note: 'Isometric browser/mobile viewport builder, 24-band traffic equalizer, and 100/100 Lighthouse vitals.',
  tags: ['hero', 'command-center', 'cwv', 'seo'],
  cols: 72,
  rows: 18,
  fps: 30,
  size: '3.9 KB',
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
  const EQ = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const CITIES = ['TEHRAN #1', 'DUBAI #1 ', 'RIYADH #1', 'MUSCAT #1', 'QAZVIN #1'];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      72,
      18,
      'round',
      '8',
      ' /COMMAND-CENTER · WebABC Engineering & SEO Studio ',
      '0',
      ' ● 100/100 PSI ',
      '2'
    );

    // Top-Left: Isometric Desktop + Mobile Viewport Wireframe (cols 2..43, rows 2..9)
    g.box(2, 2, 28, 8, 'single', '3', ' DESKTOP [1440px] ', '0');
    g.text(4, 3, '▓▒░ WebABC   [Nav] [CTA→]', '2');
    g.hline(3, 4, 26, '─', '8');
    g.text(4, 5, '█▀▀▀▀▀▀▀▀▀▀█ ╭──────────╮', '3');
    g.text(4, 6, '█ HERO H1  █ │ ▁▂▄▆█ +3x│', '2');
    g.text(4, 7, '█ [Consult]█ ╰──────────╯', '3');
    g.text(4, 8, '▣ Bento-01  ▣ Bento-02   ', '1');

    // Mobile device frame next to desktop (cols 31..43, rows 2..9)
    g.box(31, 2, 13, 8, 'round', '6', ' 390px ', '4');
    g.text(33, 3, '─── ● ───', '1');
    g.text(33, 4, '▓ WebABC ', '2');
    g.text(33, 5, '█████████', '3');
    g.text(33, 6, '▒▒▒▒▒▒▒▒▒', '6');
    const scanRow = 4 + (Math.floor(t * 5) % 4);
    g.set(32, scanRow, '▸', '4');
    g.text(33, 7, '[CTA ───►]', '2');
    g.text(33, 8, 'CWV: 0.7s', '4');

    // Bottom-Left: 24-Band Live Organic Traffic & Conversion Equalizer (cols 2..43, rows 10..16)
    g.text(2, 10, 'ORGANIC TRAFFIC & CONVERSION VELOCITY', '6');
    for (let i = 0; i < 40; i++) {
      const w1 = Math.sin(t * 3.2 + i * 0.35) * 0.35;
      const w2 = Math.cos(t * 1.8 - i * 0.2) * 0.25;
      const trend = (i / 39) * 0.45;
      const level = Math.min(1, Math.max(0.12, 0.38 + w1 + w2 + trend));
      const fullRows = Math.floor(level * 4);
      const rem = Math.floor(((level * 4) - fullRows) * 7);

      for (let r = 0; r < 4; r++) {
        const y = 14 - r;
        if (r < fullRows) {
          g.set(3 + i, y, '█', i > 26 ? '2' : i > 13 ? '3' : '9');
        } else if (r === fullRows) {
          g.set(3 + i, y, EQ[rem], i > 26 ? '2' : '3');
        } else {
          g.set(3 + i, y, '·', '8');
        }
      }
    }
    g.text(2, 15, 'IMPRESSIONS: ▲ +312% YoY', '2');
    g.text(28, 15, 'LEADS: ▲ +168%', '4');
    g.text(2, 16, 'STACK: Astro 5 · React 19 · WP/Woo · Edge CDN', '1');

    // Vertical divider at col 45
    g.vline(45, 1, 16, '│', '8');

    // Right Pane: Lighthouse 100/100 & Live SERP Ticker (cols 47..70)
    g.text(47, 2, 'LIGHTHOUSE TELEMETRY', '6');

    const vitals = [
      { label: 'PERFORMANCE', score: '100', col: '2', ratio: 1.0 },
      { label: 'TECH SEO   ', score: '100', col: '2', ratio: 1.0 },
      { label: 'ACCESSIBLE ', score: '100', col: '3', ratio: 1.0 },
      { label: 'AEO / SCHEMA', score: '99%', col: '4', ratio: 0.96 },
    ];

    for (let i = 0; i < vitals.length; i++) {
      const v = vitals[i];
      const y = 4 + i * 2;
      g.text(47, y, v.label, '0');
      g.text(66, y, v.score, v.col);
      g.bar(47, y + 1, 22, v.ratio, v.col, '8');
    }

    g.hline(47, 12, 23, '─', '8');
    const cityIdx = Math.floor(t * 1.5) % CITIES.length;
    g.text(47, 13, `SERP: ${CITIES[cityIdx]}`, '2');
    g.text(47, 14, 'LCP 0.8s · CLS 0.00', '3');
    g.text(47, 15, 'LOCALE: EN / FA / AR', '4');
    g.text(47, 16, '✓ Verified Agency SLA', '2');

    return g.frame();
  };
}
