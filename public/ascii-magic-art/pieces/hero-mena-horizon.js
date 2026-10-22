import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-mena-horizon',
  name: '3D Orthographic Globe & MENA Edge Network',
  category: 'hero',
  note: 'Real-time 3D orthographic Earth projection with continent shading, spherical graticule, and MENA/Global SERP telemetry.',
  tags: ['hero', 'globe', 'mena', '3d', 'multilingual'],
  cols: 72,
  rows: 18,
  fps: 30,
  size: '4.1 KB',
  palette: palette([
    '#e6edf3', // 0: primary ink
    '#8b949e', // 1: secondary ink
    '#7ee787', // 2: primary brand accent
    '#79c0ff', // 3: secondary accent
    '#ffa657', // 4: highlight / amber
    '#ff7b72', // 5: coral
    '#d2a8ff', // 6: eyebrow / tag accent
    '#484f58', // 7: border focus
    '#30363d', // 8: hairline grid
    '#2ea043', // 9: dim brand accent
  ]),
};

// 72x18 equirectangular world continent bitmap (lon -180..+180, lat +75..-65)
// '#' = continent land, '.' = ocean
const WORLD_BITMAP = [
  '.........##########...............############..###################.....',
  '.....##############.............#####################################...',
  '....###############............#######.##############################...',
  '.....#############............########...############################...',
  '......#########..............######..##..############################...',
  '.......#######..............############.############################...',
  '........####...............#################.########################...',
  '.........###...............################....#####################....',
  '..........####.............###############......#######..#########......',
  '...........########.........#############........#####.....######.......',
  '............###########......###########..........###.......#####.......',
  '............############......#########......................#####......',
  '.............##########........#######......................#########...',
  '.............########...........#####......................##########...',
  '..............#####..............###........................########....',
  '..............####................#..........................#####......',
  '...............##.......................................................',
  '........................................................................',
];

const HUBS = [
  { code: 'THR', name: 'Tehran & Qazvin', lat: 35.8, lon: 51.0, lang: 'FA/EN', rtt: ' 6ms', growth: '+340%' },
  { code: 'DXB', name: 'Dubai & UAE', lat: 25.2, lon: 55.3, lang: 'AR/EN', rtt: '18ms', growth: '+295%' },
  { code: 'RUH', name: 'Riyadh & KSA', lat: 24.7, lon: 46.7, lang: 'AR/EN', rtt: '21ms', growth: '+270%' },
  { code: 'MCT', name: 'Muscat & Oman', lat: 23.6, lon: 58.4, lang: 'AR/EN', rtt: '19ms', growth: '+310%' },
  { code: 'IST', name: 'Istanbul & TR', lat: 41.0, lon: 29.0, lang: 'EN/TR', rtt: '26ms', growth: '+230%' },
  { code: 'FRA', name: 'Frankfurt EU', lat: 50.1, lon: 8.7, lang: 'EN/EU', rtt: '34ms', growth: '+215%' },
];

function sampleContinent(latRad, lonRad) {
  // Normalize lonRad to [-PI, PI]
  let lon = ((lonRad + Math.PI) % (Math.PI * 2));
  if (lon < 0) lon += Math.PI * 2;
  lon -= Math.PI;

  const u = (lon + Math.PI) / (Math.PI * 2);
  const v = (Math.PI / 2 - latRad) / Math.PI;
  const col = Math.max(0, Math.min(71, Math.floor(u * 72)));
  const row = Math.max(0, Math.min(17, Math.floor(v * 18)));
  return WORLD_BITMAP[row][col] === '#';
}

function projectPoint(latDeg, lonDeg, centralLon, centralLat, cx, cy, rx, ry) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180 - centralLon;
  const cosLat = Math.cos(lat);
  const sinLat = Math.sin(lat);
  const cosLon = Math.cos(lon);
  const sinLon = Math.sin(lon);
  const cosC = Math.cos(centralLat);
  const sinC = Math.sin(centralLat);

  const nx = cosLat * sinLon;
  const ny = cosC * sinLat - sinC * cosLat * cosLon;
  const nz = sinC * sinLat + cosC * cosLat * cosLon;

  return {
    x: Math.round(cx + nx * rx),
    y: Math.round(cy - ny * ry),
    nz,
  };
}

export default function create() {
  const g = new Grid(meta.cols, meta.rows);
  const SHADE = ['░', '▒', '▓', '█'];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      72,
      18,
      'round',
      '8',
      ' /GLOBAL-GLOBE · 3D Orthographic MENA & Edge Mesh ',
      '0',
      ' EN · FA · AR ',
      '2'
    );

    // Globe parameters (cols 2..34, rows 2..15)
    // Aspect ratio 14.5 / 6.7 = 2.16 -> renders as a true circle in monospace font
    const cx = 18;
    const cy = 8.5;
    const rx = 14.5;
    const ry = 6.7;

    // Smoothly rotate around the MENA/Europe/Asia hemisphere (25°E..70°E) + subtle tilt
    const centralLon = (46 * Math.PI) / 180 + Math.sin(t * 0.65) * 0.52;
    const centralLat = (24 * Math.PI) / 180 + Math.cos(t * 0.45) * 0.08;
    const cosC = Math.cos(centralLat);
    const sinC = Math.sin(centralLat);

    for (let y = 2; y <= 15; y++) {
      for (let x = 3; x <= 33; x++) {
        const nx = (x - cx) / rx;
        const ny = (cy - y) / ry;
        const r2 = nx * nx + ny * ny;

        if (r2 <= 1.0) {
          const nz = Math.sqrt(1.0 - r2);

          // Inverse orthographic projection to spherical (lat, lon)
          const sinLat = ny * cosC + nz * sinC;
          const lat = Math.asin(Math.max(-1, Math.min(1, sinLat)));
          const lon = centralLon + Math.atan2(nx, nz * cosC - ny * sinC);

          const isLand = sampleContinent(lat, lon);
          // Directional sunlight from top-left-front
          const light = Math.max(0.1, nx * -0.3 + ny * 0.35 + nz * 0.88);

          if (r2 > 0.91) {
            // Crisp glowing atmosphere horizon rim
            g.set(x, y, '·', '3');
          } else if (isLand) {
            const sIdx = Math.min(3, Math.floor(light * 3.8));
            const col = light > 0.62 ? '2' : '9';
            g.set(x, y, SHADE[sIdx], col);
          } else {
            // Ocean graticule grid (every 24 deg lon / 20 deg lat)
            const latDeg = Math.abs((lat * 180) / Math.PI);
            const lonDeg = Math.abs(((lon * 180) / Math.PI) % 360);
            const onGrid = (latDeg % 20) < 2.4 || (lonDeg % 24) < 3.2;
            if (onGrid) {
              g.set(x, y, '·', '8');
            }
          }
        }
      }
    }

    // Active hub cycling & 3D great-circle signal arc from HQ (Tehran/Qazvin)
    const activeIdx = Math.floor(t * 1.3) % HUBS.length;
    const hq = HUBS[0];
    const activeHub = HUBS[activeIdx];

    if (activeIdx !== 0) {
      const steps = 10;
      const pulseStep = Math.floor(t * 16) % steps;
      for (let s = 1; s < steps; s++) {
        const f = s / steps;
        const iLat = hq.lat + (activeHub.lat - hq.lat) * f;
        const iLon = hq.lon + (activeHub.lon - hq.lon) * f;
        const pt = projectPoint(iLat, iLon, centralLon, centralLat, cx, cy, rx, ry);
        if (pt.nz > 0.1) {
          g.set(pt.x, pt.y, s === pulseStep ? '✦' : '•', s === pulseStep ? '4' : '3');
        }
      }
    }

    // Plot 3D-projected city beacons on the globe surface
    for (let i = 0; i < HUBS.length; i++) {
      const h = HUBS[i];
      const pt = projectPoint(h.lat, h.lon, centralLon, centralLat, cx, cy, rx, ry);
      if (pt.nz > 0.15) {
        const isAct = i === activeIdx;
        const ch = isAct ? (Math.floor(t * 6) % 2 === 0 ? '◎' : '●') : '●';
        g.set(pt.x, pt.y, ch, isAct ? '4' : '3');
      }
    }

    // Active Beacon Callout Pill beneath the 3D Globe (row 16, cols 2..34)
    g.text(3, 16, `◎ [${activeHub.code}] ${activeHub.name} · ${activeHub.rtt}`, '4');

    // Vertical divider at col 35
    g.vline(35, 1, 16, '│', '8');

    // Right Pane: Regional Hub Telemetry Table (cols 37..70)
    g.text(37, 2, 'REGIONAL HUB      LOCALE  SERP ROI', '6');
    g.hline(37, 3, 33, '─', '8');

    for (let i = 0; i < HUBS.length; i++) {
      const h = HUBS[i];
      const y = 4 + i * 2;
      const isAct = i === activeIdx;
      g.text(37, y, `${isAct ? '▸' : ' '}${h.name.padEnd(16)}`, isAct ? '2' : '0');
      g.text(55, y, h.lang.padEnd(6), '3');
      g.text(63, y, h.growth, isAct ? '4' : '2');

      if (y + 1 <= 14) {
        g.bar(38, y + 1, 31, isAct ? 0.96 : 0.78 + i * 0.03, isAct ? '2' : '8', '8');
      }
    }

    g.hline(37, 15, 33, '─', '8');
    g.text(37, 16, '✓ Hreflang: /en/ · /fa/ · /ar/ OK', '2');

    return g.frame();
  };
}
