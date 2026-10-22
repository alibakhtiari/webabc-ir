import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'webabc-logo-orbit',
  name: 'WebABC Orbital Radar & Regional Nodes Logo',
  category: 'brand',
  note: 'Orbital radar scanner tracing active Middle East telemetry nodes around the WebABC core emblem.',
  tags: ['brand', 'orbit', 'radar', 'nodes', 'network'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.9 KB',
  palette: palette([
    '#e6edf3', // 0: primary text
    '#8b949e', // 1: muted text
    '#7ee787', // 2: accent green
    '#79c0ff', // 3: accent blue
    '#ffa657', // 4: accent amber
    '#ff7b72', // 5: accent coral
    '#d2a8ff', // 6: accent purple
    '#484f58', // 7: border faint
    '#30363d', // 8: border hairline
    '#2ea043', // 9: bright green
  ]),
};

const TEXTS = {
  en: {
    header: ' /BRAND-ORBIT · Middle East Regional Radar & Nodes ',
    badge: ' 5 EDGE HUBS ',
    center: 'WebABC',
    n1: 'QAZVIN (HQ)',
    n2: 'TEHRAN',
    n3: 'DUBAI',
    n4: 'RIYADH',
    n5: 'MUSCAT',
    footer: 'ACTIVE NODES: 5 · ENCRYPTED TLS 1.3 · SUB-SECOND EDGE DISPATCH',
  },
  fa: {
    header: ' /مدار-ارتباطی · رادار منطقه‌ای و گره‌های ارتباطی خاورمیانه ',
    badge: ' ۵ گره فعال ',
    center: 'وب اِی‌بی‌سی',
    n1: 'قزوین (مرکزی)',
    n2: 'تهران',
    n3: 'دبی',
    n4: 'ریاض',
    n5: 'مسقط',
    footer: 'گره‌های فعال: ۵ پایگاه ارتباطی · رمزنگاری امن TLS 1.3 · پاسخ‌دهی زیرثانیه',
  },
  ar: {
    header: ' /الرادار-الإقليمي · شبكة مراكز WebABC في الشرق الأوسط ',
    badge: ' 5 مراكز سحابية ',
    center: 'WebABC',
    n1: 'قزوين (المقر)',
    n2: 'طهران',
    n3: 'دبي',
    n4: 'الرياض',
    n5: 'مسقط',
    footer: 'المراكز النشطة: 5 محطات سحابية · تشفير فائق الأمان · سرعة استجابة فورية',
  },
};

const REGIONAL_NODES = [
  { key: 'n1', angleOffset: 0.0, radiusX: 23, radiusY: 5.5, col: '2' },
  { key: 'n2', angleOffset: 1.25, radiusX: 18, radiusY: 4.2, col: '3' },
  { key: 'n3', angleOffset: 2.5, radiusX: 25, radiusY: 6.0, col: '4' },
  { key: 'n4', angleOffset: 3.8, radiusX: 20, radiusY: 4.8, col: '6' },
  { key: 'n5', angleOffset: 5.1, radiusX: 27, radiusY: 6.3, col: '3' },
];

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const loc = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');

    // Terminal container box
    g.box(
      0,
      0,
      meta.cols,
      meta.rows,
      'round',
      '8',
      loc.header,
      '0',
      loc.badge,
      '2'
    );

    const cx = 33;
    const cy = 7;

    // Draw elliptical orbital rings (faint dots)
    const orbits = [
      { rx: 16, ry: 3.8 },
      { rx: 22, ry: 5.2 },
      { rx: 28, ry: 6.4 },
    ];

    for (let o = 0; o < orbits.length; o++) {
      const { rx, ry } = orbits[o];
      const steps = 48;
      for (let s = 0; s < steps; s++) {
        const theta = (s / steps) * Math.PI * 2;
        const px = Math.round(cx + Math.cos(theta) * rx);
        const py = Math.round(cy + Math.sin(theta) * ry);
        if (s % 2 === 0) {
          g.set(px, py, '·', '7');
        }
      }
    }

    // Rotating radar scanner beam
    const sweepAngle = t * 1.8;
    for (let r = 2; r < 28; r += 2) {
      const sx = Math.round(cx + Math.cos(sweepAngle) * r);
      const sy = Math.round(cy + Math.sin(sweepAngle) * (r * 0.24));
      g.set(sx, sy, '✦', '2');
    }

    // Central Brand Node
    g.box(cx - 7, cy - 1, 15, 3, 'single', '2');
    g.text(cx - Math.floor(loc.center.length / 2), cy, loc.center, '0');

    // Orbiting Regional Nodes
    for (let i = 0; i < REGIONAL_NODES.length; i++) {
      const n = REGIONAL_NODES[i];
      const angle = t * 0.8 + n.angleOffset;
      const nx = Math.round(cx + Math.cos(angle) * n.radiusX);
      const ny = Math.round(cy + Math.sin(angle) * n.radiusY);

      // Node Marker
      g.set(nx, ny, '●', n.col);

      // Node Label (drawn only when not colliding with center)
      const label = loc[n.key];
      if (Math.abs(nx - cx) > 10 || Math.abs(ny - cy) > 2) {
        const lx = Math.min(meta.cols - label.length - 2, Math.max(2, nx - 2));
        const ly = ny > cy ? Math.min(meta.rows - 3, ny + 1) : Math.max(2, ny - 1);
        g.text(lx, ly, label, '1');
      }
    }

    // Footer telemetry line
    g.hline(1, 14, meta.cols - 2, '─', '7');
    const footX = Math.max(2, Math.floor((meta.cols - loc.footer.length) / 2));
    g.text(footX, 15, loc.footer, '2');

    return g.frame();
  };
}
