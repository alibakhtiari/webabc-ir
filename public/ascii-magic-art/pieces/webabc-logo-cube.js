import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'webabc-logo-cube',
  name: 'WebABC 3D Wireframe Cube · Geometric Logo',
  category: 'brand',
  note: 'Real-time 3D isometric wireframe cube rotation with vector telemetry and WebABC monogram.',
  tags: ['brand', '3d', 'wireframe', 'cube', 'geometry'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.8 KB',
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
    header: ' /BRAND-3D · Real-Time Isometric Vector Prism ',
    badge: ' 3D WIREFRAME ',
    paneTitle: 'STUDIO ENGINEERING MATRIX',
    p1: 'Framework',
    v1: 'Astro 7 + Worker',
    p2: 'Architecture',
    v2: 'Static Edge SSR',
    p3: 'Design System',
    v3: 'Monospace Terminal',
    p4: 'Speed Target',
    v4: '100% Core Web Vitals',
    footer: 'ROTATION: X/Y/Z REAL-TIME · 8 VERTICES · 12 EDGES',
  },
  fa: {
    header: ' /لوگو-سه‌بعدی · منشور برداری ایزومتریک وب اِی‌بی‌سی ',
    badge: ' مکعب ۳ بعدی ',
    paneTitle: 'ماتریس مهندسی استودیو',
    p1: 'فریم‌ورک',
    v1: 'استرو ۷ + ورکر کلودفلر',
    p2: 'معماری هسته',
    v2: 'سئو فنی و تحویل در لبه',
    p3: 'زبان طراحی',
    v3: 'ترمینال فوق‌سریع مونو‌اسپیس',
    p4: 'هدف کارایی',
    v4: '۱۰۰٪ قبولی شاخص‌های گوگل',
    footer: 'محاسبه زاویه لحظه‌ای X/Y/Z · ۸ راس · ۱۲ یال محاسباتی',
  },
  ar: {
    header: ' /الشعار-ثلاثي-الأبعاد · المنشور المتجهي لـ WebABC ',
    badge: ' إطار ثلاثي الأبعاد ',
    paneTitle: 'مصفوفة الهندسة الرقمية',
    p1: 'منصة التطوير',
    v1: 'Astro 7 + Cloudflare',
    p2: 'هيكلية النظام',
    v2: 'استضافة سحابية فائقة',
    p3: 'نظام التصميم',
    v3: 'واجهة طرفية هندسية',
    p4: 'مؤشرات الأداء',
    v4: '100% نتائج حيوية للويب',
    footer: 'دوران فوري للمحاور X/Y/Z · 8 رؤوس · 12 ضلعاً حسابياً',
  },
};

// 8 vertices of a 3D cube
const CUBE_VERTICES = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

// 12 edges connecting vertex indices
const CUBE_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0], // back face
  [4, 5], [5, 6], [6, 7], [7, 4], // front face
  [0, 4], [1, 5], [2, 6], [3, 7], // connectors
];

function drawLine(g, x0, y0, x1, y1, ch, color) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let cx = x0;
  let cy = y0;
  const maxSteps = 100;
  let steps = 0;

  while (steps++ < maxSteps) {
    g.set(cx, cy, ch, color);
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      cx += sx;
    }
    if (e2 < dx) {
      err += dx;
      cy += sy;
    }
  }
}

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

    // Split pane vertical divider at col 28
    g.vline(28, 1, meta.rows - 3, '│', '8');

    // 3D rotation angles
    const ax = t * 0.9;
    const ay = t * 1.3;
    const az = t * 0.5;

    const cosX = Math.cos(ax);
    const sinX = Math.sin(ax);
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);
    const cosZ = Math.cos(az);
    const sinZ = Math.sin(az);

    // Project 3D vertices to 2D
    const originX = 14;
    const originY = 8;
    const scaleX = 9.5;
    const scaleY = 5.2;
    const dist = 3.2;

    const proj = CUBE_VERTICES.map(([vx, vy, vz]) => {
      // Rotate around X
      let y1 = vy * cosX - vz * sinX;
      let z1 = vy * sinX + vz * cosX;

      // Rotate around Y
      let x2 = vx * cosY + z1 * sinY;
      let z2 = -vx * sinY + z1 * cosY;

      // Rotate around Z
      let x3 = x2 * cosZ - y1 * sinZ;
      let y3 = x2 * sinZ + y1 * cosZ;

      const factor = 1 / (z2 + dist);
      const px = Math.round(originX + x3 * scaleX * factor);
      const py = Math.round(originY + y3 * scaleY * factor);
      return { x: px, y: py, z: z2 };
    });

    // Draw edges
    for (let i = 0; i < CUBE_EDGES.length; i++) {
      const [i1, i2] = CUBE_EDGES[i];
      const p1 = proj[i1];
      const p2 = proj[i2];
      const avgZ = (p1.z + p2.z) / 2;
      const ch = avgZ > 0 ? '█' : '▓';
      const col = avgZ > 0 ? '2' : '7';
      drawLine(g, p1.x, p1.y, p2.x, p2.y, ch, col);
    }

    // Draw vertex corner nodes
    for (let i = 0; i < proj.length; i++) {
      const p = proj[i];
      g.set(p.x, p.y, '●', '3');
    }

    // Centered brand monogram inside/under cube
    g.text(originX - 3, originY, 'WebABC', '0');

    // Right Pane: Spec & Matrix Table
    g.text(31, 2, loc.paneTitle, '6');
    g.hline(31, 3, 33, '─', '7');

    g.text(31, 5, `• ${loc.p1}:`, '1');
    g.text(45, 5, loc.v1, '0');

    g.text(31, 7, `• ${loc.p2}:`, '1');
    g.text(45, 7, loc.v2, '3');

    g.text(31, 9, `• ${loc.p3}:`, '1');
    g.text(45, 9, loc.v3, '2');

    g.text(31, 11, `• ${loc.p4}:`, '1');
    g.text(45, 11, loc.v4, '4');

    // Live Euler angle readout
    const degX = Math.round(((ax * 180) / Math.PI) % 360);
    const degY = Math.round(((ay * 180) / Math.PI) % 360);
    g.text(31, 13, `ROT: θx=${degX}° θy=${degY}° 60FPS`, '1');

    // Footer telemetry line
    g.hline(1, 14, meta.cols - 2, '─', '7');
    const footX = Math.max(2, Math.floor((meta.cols - loc.footer.length) / 2));
    g.text(footX, 15, loc.footer, '2');

    return g.frame();
  };
}
