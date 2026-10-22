import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'request-waterfall',
  name: 'Core Web Vitals & Asset Waterfall',
  category: 'live-data',
  note: 'Sub-second HTTP/3 asset waterfall compression and Core Web Vitals optimization.',
  tags: ['cwv', 'speed', 'lcp', 'inp', 'cls'],
  cols: 66,
  rows: 17,
  fps: 30,
  size: '3.1 KB',
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
  const ASSETS = [
    { name: 'GET /en/index.html', start: 0, len: 5, time: '18ms', color: '2' },
    { name: 'GET /fonts/ltr.woff2', start: 3, len: 6, time: '24ms', color: '6' },
    { name: 'GET /ascii/runtime.js', start: 4, len: 5, time: '14ms', color: '3' },
    { name: 'GET /hero-665.avif', start: 5, len: 8, time: '42ms', color: '2' },
    { name: 'GET /ai-catalog.json', start: 8, len: 4, time: '11ms', color: '4' },
    { name: 'GET /en/llms.txt', start: 10, len: 4, time: '9ms', color: '2' },
  ];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      66,
      17,
      'round',
      '8',
      ' /SPEED-OPT · HTTP/3 Edge Waterfall & CWV ',
      '0',
      ' 99/100 PSI ',
      '2'
    );

    g.text(2, 2, 'RESOURCE', '1');
    g.text(25, 2, '0ms    100ms   200ms   300ms   400ms', '1');
    g.hline(2, 3, 62, '─', '8');

    // Draw playhead first so asset bars and timing labels always stay on top without overlap
    const scanX = 25 + (Math.floor(t * 10) % 36);
    for (let r = 4; r <= 9; r++) {
      g.set(scanX, r, '┆', '4');
    }

    for (let i = 0; i < ASSETS.length; i++) {
      const row = 4 + i;
      const a = ASSETS[i];
      g.text(2, row, a.name, '0');
      for (let c = 25; c < 61; c += 8) {
        if (c !== scanX) g.set(c, row, '·', '8');
      }
      const barStart = 25 + a.start;
      const pulseLen = a.len + Math.round(Math.sin(t * 2.5 + i) * 1);
      for (let k = 0; k < pulseLen; k++) {
        g.set(barStart + k, row, k === 0 ? '├' : k === pulseLen - 1 ? '┤' : '━', a.color);
      }
      g.text(barStart + pulseLen + 1, row, a.time, '2');
    }

    g.hline(2, 11, 62, '─', '8');
    g.text(2, 12, 'BEFORE OPT: ██████████████████████████░░ 3.8s (LCP FAIL)', '5');
    g.text(2, 13, 'WEBABC OPT: ██████░░░░░░░░░░░░░░░░░░░░░░ 0.8s (CWV PASS ✓)', '2');
    g.text(2, 15, '⚡ Brotli-11 · AVIF · Zero Blocking CSS · Edge Cache HIT', '3');

    return g.frame();
  };
}
