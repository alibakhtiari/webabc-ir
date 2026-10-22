import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'ecommerce-telemetry',
  name: 'High-Conversion E-Commerce & Storefront Engine',
  category: 'live-data',
  note: 'Sub-second WooCommerce & custom storefront architecture, checkout velocity, and revenue telemetry.',
  tags: ['ecommerce', 'woocommerce', 'cro', 'checkout'],
  cols: 70,
  rows: 18,
  fps: 24,
  size: '3.5 KB',
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
      70,
      18,
      'round',
      '8',
      ' /ECOMMERCE-ENGINE · Storefront & Checkout Velocity ',
      '0',
      ' CRO +168% ',
      '2'
    );

    // Left pane: Live Checkout Pipeline (cols 2..41)
    g.text(2, 2, 'ZERO-FRICTION CHECKOUT FLOW', '6');

    const stages = [
      { id: '01', name: 'Product Discovery (SSR)', time: '120ms', status: 'PASS' },
      { id: '02', name: 'Instant Cart Drawer', time: ' 18ms', status: 'PASS' },
      { id: '03', name: '1-Step Payment Gateway', time: ' 45ms', status: 'PASS' },
      { id: '04', name: 'Order Confirmed & Sync', time: ' 22ms', status: 'DONE' },
    ];

    const activeStage = Math.floor(t * 2) % stages.length;

    for (let i = 0; i < stages.length; i++) {
      const s = stages[i];
      const r = 4 + i * 3;
      const isAct = i === activeStage;
      g.text(2, r, isAct ? `▸[${s.id}]` : ` [${s.id}]`, isAct ? '4' : '3');
      g.text(8, r, s.name, isAct ? '2' : '0');
      g.text(33, r, s.time, '1');
      if (i < stages.length - 1) {
        g.text(4, r + 1, '│   ╰──► Zero Reload · Edge Cached', '8');
      }
    }

    g.text(2, 16, '✓ Schema: Product + Offer + AggregateRating', '2');

    // Vertical divider at col 43
    g.vline(43, 1, 16, '│', '8');

    // Right pane: Storefront Vitals & Revenue Lift (cols 45..68)
    g.text(45, 2, 'STORE TELEMETRY', '6');

    g.text(45, 4, 'Cart Abandonment', '1');
    g.text(45, 5, '▼ -42.8% Reduced', '2');
    g.bar(45, 6, 22, 0.85, '2', '8');

    g.text(45, 8, 'Mobile Checkout Speed', '1');
    g.text(45, 9, '⚡ 0.7s Instant Load', '3');
    g.bar(45, 10, 22, 0.94, '3', '8');

    g.text(45, 12, 'Conversion Lift', '1');
    g.text(45, 13, '▲ +168% YoY Sales', '4');
    g.bar(45, 14, 22, 0.91, '4', '8');

    g.text(45, 16, '● WooCommerce / Custom', '6');

    return g.frame();
  };
}
