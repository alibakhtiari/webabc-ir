import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'settings-toggles',
  name: 'UI/UX Audit & Conversion Controls',
  category: 'ui',
  note: 'Interactive control refinement, accessibility contrast checks, and conversion rate optimization.',
  tags: ['ui-ux', 'audit', 'cro', 'accessibility'],
  cols: 66,
  rows: 17,
  fps: 30,
  size: '3.2 KB',
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
      ' /UI-UX-AUDIT · Conversion & Accessibility Inspector ',
      '0',
      ' WCAG 2.2 AA ',
      '2'
    );

    // Left column: Toggles & Sliders
    g.text(3, 2, 'CONTROL MATRIX', '6');
    const toggles = [
      { label: 'Zero-Friction Checkout', on: true },
      { label: 'RTL BiDi Grid Isolation', on: true },
      { label: 'WCAG 4.5:1 Contrast Guard', on: true },
      { label: 'Sticky CTA Action Dock', on: Math.floor(t) % 4 !== 0 },
    ];

    for (let i = 0; i < toggles.length; i++) {
      const row = 4 + i * 2;
      const item = toggles[i];
      const pill = item.on ? '[━━● ON ]' : '[●━━ OFF]';
      const col = item.on ? '2' : '7';
      g.text(3, row, pill, col);
      g.text(13, row, item.label, '0');
    }

    g.text(3, 12, 'CTA Visibility Index', '1');
    g.slider(3, 13, 30, 0.86 + Math.sin(t * 1.8) * 0.08, '2', '8', '2');
    g.text(3, 14, 'Form Drop-off Friction: -64%', '3');

    // Divider
    g.vline(37, 1, 15, '│', '8');

    // Right column: Conversion Funnel & Heatmap
    g.text(39, 2, 'CONVERSION FUNNEL', '6');
    const stages = [
      { name: 'Landing', w: 22, pct: '100%', col: '3' },
      { name: 'Engaged', w: 18, pct: ' 82%', col: '3' },
      { name: 'Tool/CTA', w: 14, pct: ' 64%', col: '2' },
      { name: 'Lead ✓ ', w: 10, pct: ' 41%', col: '2' },
    ];
    for (let i = 0; i < stages.length; i++) {
      const s = stages[i];
      const row = 4 + i * 2;
      const pad = Math.floor((22 - s.w) / 2);
      g.text(39 + pad, row, '█'.repeat(s.w), s.col);
      g.text(39, row + 1, `${s.name} ${s.pct}`, '1');
    }

    g.text(39, 13, 'HEATMAP FOCUS: ░▒▓█▓▒░', '4');
    g.text(39, 14, 'CRO LIFT: +148% Verified', '2');

    return g.frame();
  };
}
