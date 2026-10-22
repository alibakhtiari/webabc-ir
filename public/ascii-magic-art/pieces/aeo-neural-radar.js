import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'aeo-neural-radar',
  name: 'AI Search, AEO & LLM Citation Graph',
  category: 'live-data',
  note: 'Answer Engine Optimization (AEO), /llms.txt ingestion, and structured JSON-LD citation velocity.',
  tags: ['aeo', 'geo', 'llms-txt', 'json-ld'],
  cols: 70,
  rows: 18,
  fps: 24,
  size: '3.6 KB',
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

  const ENGINES = [
    { name: 'Google AI Overviews', score: 0.96, share: '98%' },
    { name: 'ChatGPT Search', score: 0.92, share: '94%' },
    { name: 'Perplexity Citations', score: 0.95, share: '96%' },
    { name: 'Gemini / Claude Rag', score: 0.91, share: '93%' },
  ];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      70,
      18,
      'round',
      '8',
      ' /AEO-ENGINE · AI Search & LLM Citation Graph ',
      '0',
      ' /llms.txt OK ',
      '2'
    );

    // Left pane: Entity & Markdown Ingestion Graph (cols 2..40)
    g.text(2, 2, 'AGENTIC DISCOVERY PIPELINE', '6');

    g.box(2, 3, 18, 4, 'single', '3', ' /llms-full.txt ', '0');
    g.text(4, 4, 'Markdown Twin', '2');
    g.text(4, 5, 'Accept: text/md', '1');

    g.box(23, 3, 18, 4, 'single', '6', ' JSON-LD @graph ', '0');
    g.text(25, 4, 'Organization', '2');
    g.text(25, 5, 'FAQPage + Service', '1');

    const flow = Math.floor(t * 8) % 3;
    g.text(10, 7, flow === 0 ? '╰───────▼───────╯' : '╰───────▽───────╯', '3');
    g.text(18, 8, '▼', '2');

    g.box(4, 9, 35, 5, 'round', '2', ' VERIFIED ENTITY CITATION HUB ', '0');
    const pulse = Math.floor(t * 4) % 2 === 0 ? '●' : '◎';
    g.text(6, 10, `${pulse} WebABC.ir Canonical Entity ID`, '2');
    g.text(6, 11, '├─ /.well-known/api-catalog [200]', '3');
    g.text(6, 12, '╰─ Content-Signal: ai-train=yes', '4');

    g.text(2, 15, 'ZERO HALLUCINATION · BYTE-IDENTICAL', '1');
    g.text(2, 16, '✓ 100% Agentic Readiness Pass', '2');

    // Vertical divider at col 42
    g.vline(42, 1, 16, '│', '8');

    // Right pane: Answer Engine Visibility Scores (cols 44..68)
    g.text(44, 2, 'AI CITATION VISIBILITY', '6');

    for (let i = 0; i < ENGINES.length; i++) {
      const e = ENGINES[i];
      const row = 4 + i * 3;
      g.text(44, row, e.name, '0');
      g.text(65, row, e.share, '2');
      const wave = Math.sin(t * 2 + i) * 0.03;
      g.slider(44, row + 1, 24, e.score + wave, '2', '8', '3');
    }

    g.text(44, 16, '★ AI Citation Lift: +240%', '4');

    return g.frame();
  };
}
