import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'lost-in-space-404',
  name: '404 Route Not Found Telemetry',
  category: 'ui',
  note: 'Animated terminal 404 diagnostic scene with recovery links.',
  tags: ['404', 'error', 'diagnostic'],
  cols: 66,
  rows: 14,
  fps: 20,
  size: '2.5 KB',
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
      14,
      'round',
      '8',
      ' /DIAGNOSTIC · HTTP 404 ROUTE NOT FOUND ',
      '5',
      ' RECOVERY READY ',
      '4'
    );

    // Starfield
    for (let i = 0; i < 18; i++) {
      const sx = 3 + ((i * 13 + Math.floor(t * 2)) % 60);
      const sy = 2 + ((i * 7) % 9);
      g.set(sx, sy, i % 3 === 0 ? '✦' : '·', '7');
    }

    g.text(16, 4, '█▀▀█  █▀▀█  █▀▀█     [SIGNAL LOST]', '4');
    g.text(16, 5, '──▀█  █▄▀█  ──▀█     ROUTE_MISSING', '0');
    g.text(16, 6, '  █   █▄▄█    █      STATUS: 404', '5');

    const blink = Math.floor(t * 3) % 2 === 0 ? '█' : '_';
    g.text(6, 9, `$ curl -I https://webabc.ir/missing-path ${blink}`, '3');
    g.text(6, 10, '→ Fallback: /en/ · /fa/ · /ar/ · /llms.txt · /sitemap-index.xml', '2');
    g.text(6, 12, '✓ Agent Content-Negotiation: Accept: text/markdown [ACTIVE]', '6');

    return g.frame();
  };
}
