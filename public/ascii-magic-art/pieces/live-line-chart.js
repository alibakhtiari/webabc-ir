import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'live-line-chart',
  name: 'Organic Growth & SERP Telemetry',
  category: 'live-data',
  note: 'Real-time upward ranking velocity, organic impressions, and Core Web Vitals telemetry.',
  tags: ['seo', 'cwv', 'analytics', 'webabc'],
  cols: 66,
  rows: 17,
  fps: 30,
  size: '3.3 KB',
  palette: palette([
    '#e6edf3', // 0: primary ink
    '#8b949e', // 1: secondary ink
    '#7ee787', // 2: primary accent
    '#79c0ff', // 3: secondary accent
    '#ffa657', // 4: highlight accent
    '#ff7b72', // 5: alert accent
    '#d2a8ff', // 6: tag accent
    '#484f58', // 7: border focus
    '#30363d', // 8: border hairline
    '#2ea043', // 9: dim primary accent
  ]),
};

export default function create() {
  const g = new Grid(meta.cols, meta.rows);
  const SPARK = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const SHADE = ['░', '▒', '▓', '█'];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      66,
      17,
      'round',
      '8',
      ' /LIVE-DATA · WebABC Organic Search & CWV Engine ',
      '0',
      ' ✓ LCP 0.8s ',
      '2'
    );

    // Left chart pane (cols 2..39, rows 2..14; col 41 is vertical divider)
    g.text(2, 2, 'ORGANIC TRAFFIC & SERP', '6');
    g.text(31, 2, '+312% YoY', '2');

    for (let r = 3; r <= 13; r++) {
      g.set(2, r, '│', '8');
      if (r % 2 === 1) {
        for (let c = 3; c <= 39; c += 2) {
          g.set(c, r, '·', '8');
        }
      }
    }
    g.hline(2, 13, 38, '─', '8');
    g.set(2, 13, '╰', '8');

    const chartWidth = 36;
    for (let x = 0; x < chartWidth; x++) {
      const progress = x / (chartWidth - 1);
      const wave =
        Math.sin(t * 2.2 + x * 0.25) * 0.08 +
        Math.cos(t * 1.4 - x * 0.15) * 0.05;
      const heightRatio = Math.min(
        0.96,
        Math.max(0.12, Math.pow(progress, 1.15) * 0.82 + 0.14 + wave)
      );
      const topRow = 12 - Math.round(heightRatio * 8.5);

      for (let r = 12; r >= topRow; r--) {
        const depth = 12 - r;
        const ch = r === topRow ? '█' : SHADE[Math.min(3, Math.floor((depth / 9) * 4))];
        const col = r === topRow ? '2' : depth > 4 ? '9' : '8';
        g.set(3 + x, r, ch, col);
      }
    }

    // Moving cursor along the growth curve
    const cursorX = Math.floor((t * 6) % chartWidth);
    const cursorRatio = Math.min(
      0.95,
      Math.max(0.15, Math.pow(cursorX / (chartWidth - 1), 1.15) * 0.82 + 0.14)
    );
    const cursorY = Math.max(3, 12 - Math.round(cursorRatio * 8.5));
    g.set(3 + cursorX, cursorY, '●', '3');
    g.text(3, 14, 'Q1    Q2    Q3    Q4   RANK #1 [OK]', '1');

    // Vertical divider at col 41
    g.vline(41, 1, 15, '│', '8');

    // Right telemetry pane (cols 43..63)
    g.text(43, 2, '/VITALS & TELEMETRY', '6');

    const lcpVal = (0.76 + Math.sin(t * 1.5) * 0.04).toFixed(2);
    g.text(43, 4, `LCP   ${lcpVal}s`, '0');
    g.text(58, 4, 'PASS', '2');
    g.slider(43, 5, 20, 0.92 + Math.sin(t * 1.5) * 0.03, '2', '8', '2');

    const inpVal = Math.round(22 + Math.cos(t * 2.1) * 3);
    g.text(43, 7, `INP   ${inpVal}ms`, '0');
    g.text(58, 7, 'PASS', '2');
    g.slider(43, 8, 20, 0.94, '3', '8', '3');

    g.text(43, 10, 'CLS   0.00', '0');
    g.text(58, 10, '100%', '2');
    g.slider(43, 11, 20, 0.99, '2', '8', '2');

    // Live sparkline & JSON-LD pulse
    g.text(43, 13, 'SERP CTR:', '1');
    for (let i = 0; i < 10; i++) {
      const sIdx = Math.min(
        7,
        Math.max(0, Math.floor(((Math.sin(t * 3 + i * 0.6) + 1) * 0.35 + (i / 10) * 0.5) * 7))
      );
      g.set(53 + i, 13, SPARK[sIdx], i > 6 ? '2' : '3');
    }
    const pulse = Math.floor(t * 2) % 2 === 0 ? '●' : '•';
    g.text(43, 14, `${pulse} JSON-LD Graph: VALID`, '4');

    return g.frame();
  };
}
