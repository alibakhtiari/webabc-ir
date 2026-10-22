import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-ai-radar',
  name: 'AI Search & Answer Engine Radar',
  category: 'hero',
  note: 'Procedural circular radar sweep locking onto SEO, AEO, CWV, and LLM citation signals.',
  tags: ['hero', 'radar', 'aeo', 'ai-search'],
  cols: 72,
  rows: 18,
  fps: 24,
  size: '3.7 KB',
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

  const TARGETS = [
    { x: 22, y: 6, label: 'SEO #1', angle: 0.6 },
    { x: 11, y: 7, label: 'AEO', angle: 2.5 },
    { x: 23, y: 11, label: 'CWV', angle: 5.6 },
    { x: 12, y: 12, label: 'CRO', angle: 3.8 },
  ];

  const ENGINES = [
    { name: 'Google Search #1 Pack', status: 'LOCKED', score: 0.98, col: '2' },
    { name: 'Google AI Overviews  ', status: 'CITED ', score: 0.95, col: '2' },
    { name: 'ChatGPT & SearchGPT  ', status: 'CITED ', score: 0.93, col: '3' },
    { name: 'Perplexity & Claude  ', status: 'CITED ', score: 0.96, col: '6' },
  ];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      72,
      18,
      'round',
      '8',
      ' /AI-RADAR · Search & Answer Engine Signal Scanner ',
      '0',
      ' AEO + GEO ',
      '2'
    );

    // Left Pane: Circular Radar Scanner (center cx=18, cy=9, rx=13, ry=6)
    const cx = 18;
    const cy = 9;
    const rx = 13;
    const ry = 6;

    // Outer & inner radar rings
    for (let deg = 0; deg < 360; deg += 5) {
      const rad = (deg * Math.PI) / 180;
      g.set(Math.round(cx + Math.cos(rad) * rx), Math.round(cy + Math.sin(rad) * ry), '·', '8');
      g.set(
        Math.round(cx + Math.cos(rad) * (rx * 0.55)),
        Math.round(cy + Math.sin(rad) * (ry * 0.55)),
        '·',
        '8'
      );
    }
    g.hline(cx - rx + 1, cy, rx * 2 - 1, '─', '8');
    g.vline(cx, cy - ry + 1, ry * 2 - 1, '│', '8');
    g.set(cx, cy, '┼', '3');

    // Rotating radar sweep beam
    const sweepAngle = (t * 1.8) % (Math.PI * 2);
    for (let r = 1; r <= rx; r++) {
      const bx = Math.round(cx + Math.cos(sweepAngle) * r);
      const by = Math.round(cy + Math.sin(sweepAngle) * (r * (ry / rx)));
      g.set(bx, by, '•', '2');
    }

    // Plot radar targets
    for (const tgt of TARGETS) {
      g.set(tgt.x, tgt.y, '◎', '2');
      g.text(tgt.x + 2, tgt.y, tgt.label, '4');
    }

    g.text(3, 16, 'SCAN: /llms.txt · JSON-LD · Sitemap', '2');

    // Vertical divider at col 35
    g.vline(35, 1, 16, '│', '8');

    // Right Pane: AI & Search Engine Citation Matrix (cols 37..70)
    g.text(37, 2, 'ENGINE CITATION TELEMETRY', '6');

    for (let i = 0; i < ENGINES.length; i++) {
      const e = ENGINES[i];
      const y = 4 + i * 3;
      g.text(37, y, e.name, '0');
      g.text(60, y, `[${e.status}]`, e.col);
      g.slider(37, y + 1, 32, e.score, e.col, '8', '2');
    }

    g.text(37, 16, '✓ Markdown Twin: /*/index.md [200 OK]', '3');

    return g.frame();
  };
}
