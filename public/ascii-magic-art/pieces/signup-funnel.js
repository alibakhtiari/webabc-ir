import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'signup-funnel',
  name: 'UI/UX Conversion Funnel Audit',
  category: 'live-data',
  note: 'Identifies and eliminates hidden UX friction points to maximize visitor-to-lead conversion.',
  tags: ['ui-ux', 'funnel', 'cro'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '2.9 KB',
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
      66,
      17,
      'round',
      '8',
      ' /UX-AUDIT · User Journey & Conversion Funnel ',
      '0',
      ' CRO +148% ',
      '2'
    );

    // Labels end by col 20; bars start at col 22; max width 35 ends at col 57; pct at col 59..62
    const steps = [
      { label: '01. SERP Landing', width: 35, rate: '100%', col: '3' },
      { label: '02. Value Clarity', width: 29, rate: ' 84%', col: '3' },
      { label: '03. Tool / Service', width: 23, rate: ' 68%', col: '6' },
      { label: '04. Consultation', width: 17, rate: ' 49%', col: '2' },
    ];

    const flowOffset = Math.floor(t * 6) % 4;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      const r = 3 + i * 3;
      g.text(3, r, s.label, '0');
      for (let x = 0; x < s.width; x++) {
        const ch = (x + flowOffset) % 4 === 0 ? '█' : '▓';
        g.set(22 + x, r, ch, s.col);
      }
      g.text(22 + s.width + 2, r, s.rate, '2');
      if (i < steps.length - 1) {
        g.text(22, r + 1, '╰──► Friction Removed ✓', '1');
      }
    }

    g.hline(2, 14, 62, '─', '8');
    g.text(3, 15, 'VERDICT: 0 Rage Clicks · 48px Tap Targets · WCAG AA ✓', '2');

    return g.frame();
  };
}
