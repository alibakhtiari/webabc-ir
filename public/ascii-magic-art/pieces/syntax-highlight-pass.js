import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'syntax-highlight-pass',
  name: 'Semantic Content & Entity Architecture',
  category: 'lettering',
  note: 'Structured editorial drafting, semantic H2/H3 hierarchy, and JSON-LD FAQPage pass.',
  tags: ['content', 'seo', 'copywriting', 'schema'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.1 KB',
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
      ' /CONTENT-ENGINE · Semantic Topic Cluster & AEO ',
      '0',
      ' 2,100 WORDS ',
      '6'
    );

    const scanRow = 3 + (Math.floor(t * 4) % 10);

    const lines = [
      ['# ', '6', 'Complete Technical SEO & Web Engineering Guide 2026', '0'],
      ['> ', '2', 'TL;DR: Verified architecture for sub-second Core Web Vitals.', '2'],
      ['', '1', '', '1'],
      ['## 01. ', '3', 'Entity-First Content Strategy & Intent Mapping', '0'],
      ['   ├─ ', '8', 'Primary Keyword Density: 1.4% · Readability: Grade 8', '1'],
      ['   ╰─ ', '8', 'Internal Link Graph: 12 contextual pillar anchors', '3'],
      ['## 02. ', '3', 'Multilingual Parity (English / Persian / Arabic)', '0'],
      ['   ├─ ', '8', 'Byte-identical slugs + reciprocal hreflang tags', '1'],
      ['   ╰─ ', '8', 'Markdown sibling representation: /index.md [200 OK]', '2'],
      ['## 03. ', '3', 'FAQPage & WebPage @id Schema Verification', '0'],
    ];

    for (let i = 0; i < lines.length; i++) {
      const r = 3 + i;
      const [prefix, pCol, body, bCol] = lines[i];
      const highlight = r === scanRow;
      g.text(3, r, prefix, highlight ? '4' : pCol);
      g.text(3 + prefix.length, r, body, highlight ? '2' : bCol);
      if (highlight) {
        g.set(2, r, '▸', '4');
      }
    }

    g.hline(2, 13, 62, '─', '8');
    g.text(3, 14, 'AEO / LLM CITATION SCORE: ███████████████░ 96/100  │  SCHEMA: ✓', '2');

    return g.frame();
  };
}
