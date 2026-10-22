import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'git-branch-graph',
  name: '3-Stage SEO & Engineering Execution Pipeline',
  category: 'explainers',
  note: 'Full-width execution pipeline: Keyword Research → Content Optimization → External Link Building.',
  tags: ['process', 'pipeline', 'seo'],
  cols: 102,
  rows: 13,
  fps: 24,
  size: '3.4 KB',
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
      102,
      13,
      'round',
      '8',
      ' /PIPELINE · 3-Stage Search & Engineering Execution Architecture ',
      '0',
      ' CONTINUOUS · 1× ',
      '2'
    );

    // 3 Stage Cards aligned directly beneath the 3 columns of /PROCESS
    // Stage 1: cols 3..31 (width 29)
    g.box(3, 2, 29, 7, 'single', '3', ' [01] KEYWORD DISCOVERY ', '2');
    g.text(5, 4, '├─ Search Intent Clustering', '0');
    g.text(5, 5, '├─ Competitor SERP Gap Map', '1');
    g.text(5, 6, '╰─ High-ROI Query Matrix', '3');
    g.bar(5, 7, 25, 0.92, '2', '8');

    // Connector 1 -> 2 (cols 32..36)
    const p1 = Math.floor(t * 8) % 4;
    g.text(32, 5, p1 === 0 ? '━━►─' : p1 === 1 ? '─━━►' : '───►', '2');

    // Stage 2: cols 37..65 (width 29)
    g.box(37, 2, 29, 7, 'single', '6', ' [02] CONTENT & ON-PAGE ', '2');
    g.text(39, 4, '├─ Semantic H1-H3 Hierarchy', '0');
    g.text(39, 5, '├─ JSON-LD Schema & AEO', '1');
    g.text(39, 6, '╰─ Core Web Vitals 99/100', '3');
    g.bar(39, 7, 25, 0.95, '3', '8');

    // Connector 2 -> 3 (cols 66..70)
    g.text(66, 5, p1 === 2 ? '━━►─' : p1 === 3 ? '─━━►' : '───►', '2');

    // Stage 3: cols 71..99 (width 29)
    g.box(71, 2, 29, 7, 'single', '4', ' [03] AUTHORITY GRAPH ', '2');
    g.text(73, 4, '├─ Editorial Digital PR', '0');
    g.text(73, 5, '├─ Topical Pillar Backlinks', '1');
    g.text(73, 6, '╰─ Domain Rating Velocity', '3');
    g.bar(73, 7, 25, 0.98, '4', '8');

    // Bottom continuous commit & ranking telemetry line (row 10..11)
    g.hline(3, 10, 96, '━', '8');
    const pulseX = 3 + (Math.floor(t * 18) % 90);
    for (let k = 0; k < 6; k++) {
      g.set(pulseX + k, 10, '━', '2');
    }
    g.set(17, 10, '●', '2');
    g.set(51, 10, '●', '3');
    g.set(85, 10, '●', '4');

    g.text(
      3,
      11,
      'COMMIT: main ──● [Intent Mapped] ──● [CWV & Schema Verified] ──● [Ranked Top-3 in Google Search]',
      '2'
    );

    return g.frame();
  };
}
