import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-live-builder',
  name: 'Interactive UI/UX & Storefront Live Builder',
  category: 'hero',
  note: 'Real-time browser viewport assembly with live UI grid, conversion funnel, and Core Web Vitals inspector.',
  tags: ['hero', 'ui-ux', 'web-design', 'builder'],
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
      ' /LIVE-BUILDER · Custom UI/UX & Conversion Studio ',
      '0',
      ' WCAG 2.2 AA ',
      '2'
    );

    // Left Pane: Simulated Browser Window (cols 2..46, rows 2..15)
    g.box(2, 2, 44, 14, 'single', '3', ' ● ● ●  https://webabc.ir/store ', '0');
    g.text(4, 3, '[Logo]   Services  Tools  Portfolio   [CTA→]', '2');
    g.hline(3, 4, 42, '─', '8');

    // Hero block inside simulated browser
    g.box(4, 5, 24, 5, 'round', '2', ' HERO VALUE PROP ', '2');
    g.text(6, 6, 'Custom Design & SEO', '0');
    g.text(6, 7, 'Conversion Lift +168%', '4');
    g.text(6, 8, '[Free Consultation →]', '2');

    // Side widget inside simulated browser
    g.box(29, 5, 15, 5, 'round', '6', ' LIVE CART ', '6');
    g.text(31, 6, '⚡ 0.7s Load', '3');
    g.text(31, 7, '✓ 1-Click Pay', '2');
    g.text(31, 8, '▲ +99% Score', '4');

    // 3 Bento cards at bottom of simulated browser
    const activeCard = Math.floor(t * 2) % 3;
    const cards = ['[01] SEO', '[02] DEV', '[03] UX '];
    for (let c = 0; c < 3; c++) {
      const bx = 4 + c * 14;
      const isAct = c === activeCard;
      g.box(bx, 11, 13, 4, 'single', isAct ? '2' : '8');
      g.text(bx + 2, 12, cards[c], isAct ? '2' : '0');
      g.text(bx + 2, 13, isAct ? '████▓▒░' : '▒▒▒▒░░░', isAct ? '2' : '3');
    }

    g.text(2, 16, '✓ Pixel-Perfect Responsive Grid · Zero Layout Shift', '2');

    // Vertical divider at col 47
    g.vline(47, 1, 16, '│', '8');

    // Right Pane: Inspector Controls (cols 49..70)
    g.text(49, 2, 'DESIGN INSPECTOR', '6');

    const checks = [
      ['Grid System', '12-Col CSS'],
      ['Dark/White ', '6 Palettes'],
      ['RTL Support', 'FA / AR OK'],
      ['Tap Targets', '48×48px AA'],
      ['Image AVIF ', 'Optimized '],
    ];

    for (let i = 0; i < checks.length; i++) {
      const y = 4 + i * 2;
      g.text(49, y, `✓ ${checks[i][0]}`, '2');
      g.text(61, y, checks[i][1], '3');
    }

    g.hline(49, 14, 21, '─', '8');
    g.text(49, 15, 'UX FRICTION: -64%', '4');
    g.text(49, 16, 'LIGHTHOUSE: 100/100', '2');

    return g.frame();
  };
}
