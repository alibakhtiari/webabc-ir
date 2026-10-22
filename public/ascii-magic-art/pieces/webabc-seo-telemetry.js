import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'webabc-seo-telemetry',
  name: 'WebABC SEO & CWV Telemetry',
  category: 'live-data',
  note: 'Live SERP ranking climb, Core Web Vitals gauges, and organic traffic sparkline for WebABC.',
  tags: ['seo', 'cwv', 'analytics', 'webabc'],
  cols: 68,
  rows: 18,
  fps: 24,
  size: '3.4 KB',
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
      68,
      18,
      'round',
      '8',
      ' WebABC · Technical SEO & CWV Engine ',
      '0',
      ' ✓ LCP 0.8s ',
      '2'
    );

    // Left pane (cols 2..38)
    g.text(2, 2, 'SERP CLIMB & ORGANIC VELOCITY', '6');
    for (let x = 0; x < 35; x++) {
      const ratio = Math.min(0.95, Math.max(0.12, Math.pow(x / 34, 1.2) * 0.8 + 0.15 + Math.sin(t * 2 + x * 0.3) * 0.06));
      const top = 14 - Math.round(ratio * 10);
      for (let y = 14; y >= top; y--) {
        g.set(3 + x, y, y === top ? '█' : y < 10 ? '▓' : '▒', y === top ? '2' : '9');
      }
    }
    g.text(3, 15, 'RANK #1 TARGETS: +312% IMPRESSIONS', '2');

    // Right pane (cols 40..65)
    g.vline(39, 1, 16, '│', '8');
    g.text(41, 2, 'CORE WEB VITALS', '6');
    g.text(41, 4, 'LCP 0.8s', '0');
    g.slider(41, 5, 24, 0.92, '3', '8', '2');
    g.text(41, 7, 'INP 28ms', '0');
    g.slider(41, 8, 24, 0.94, '3', '8', '2');
    g.text(41, 10, 'CLS 0.00', '0');
    g.slider(41, 11, 24, 0.99, '3', '8', '2');
    g.text(41, 14, '·•● JSON-LD Graph Active', '6');
    g.text(41, 15, '·•● EN / FA / AR Parity', '3');

    return g.frame();
  };
}
