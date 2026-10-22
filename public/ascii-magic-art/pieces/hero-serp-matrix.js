import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-serp-matrix',
  name: 'Google #1 SERP & ROI Growth Matrix',
  category: 'hero',
  note: 'Live Google Position #1 SERP snippet simulator with CTR dominance and compounding ROI curve.',
  tags: ['hero', 'serp', 'seo', 'roi'],
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

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      72,
      18,
      'round',
      '8',
      ' /SERP-DOMINANCE · Position #1 & Organic CTR Engine ',
      '0',
      ' ★ #1 RANKED ',
      '2'
    );

    // Left Pane: Live Google SERP Position #1 Card (cols 2..43)
    g.text(2, 2, 'GOOGLE SEARCH RESULTS [LIVE SERP]', '6');
    g.text(36, 2, 'CTR 44.2%', '2');

    // Featured #1 Result Box
    g.box(2, 3, 41, 6, 'round', '2', ' [#1] ★ https://webabc.ir ', '2');
    g.text(4, 4, 'WebABC — Custom Web Design & Technical SEO', '0');
    g.text(4, 5, '★★★★★ 4.9 (180+) · FAQ Schema · CWV Pass', '4');
    const barW = 28 + Math.round(Math.sin(t * 2.5) * 2);
    g.bar(4, 6, 36, barW / 36, '2', '8');
    g.text(4, 7, '✓ Sitelinks: /services  /tools  /portfolio', '3');

    // Competitor rows below
    const comps = [
      { pos: '[#2]', domain: 'competitor-a.example', ctr: '14.6%', w: 12 },
      { pos: '[#3]', domain: 'competitor-b.example', ctr: ' 8.2%', w: 7 },
      { pos: '[#4]', domain: 'competitor-c.example', ctr: ' 4.5%', w: 4 },
    ];
    for (let i = 0; i < comps.length; i++) {
      const c = comps[i];
      const y = 10 + i * 2;
      g.text(3, y, `${c.pos} ${c.domain}`, '1');
      g.text(36, y, c.ctr, '1');
      g.bar(3, y + 1, 38, c.w / 38, '7', '8');
    }

    g.text(2, 16, '⚡ Rich Snippets + AEO Entity Graph Active', '2');

    // Vertical divider at col 44
    g.vline(44, 1, 16, '│', '8');

    // Right Pane: 12-Month Compounding Revenue & CAC Reduction (cols 46..70)
    g.text(46, 2, '12M REVENUE VELOCITY', '6');

    for (let x = 0; x < 23; x++) {
      const norm = x / 22;
      const h = Math.round(Math.pow(norm, 1.35) * 7 + Math.sin(t * 2 + x * 0.4) * 0.4);
      const topY = Math.max(4, Math.min(11, 11 - h));
      for (let y = 11; y >= topY; y--) {
        g.set(46 + x, y, y === topY ? '█' : '▓', y === topY ? '2' : '9');
      }
    }
    g.hline(46, 12, 23, '─', '8');
    g.text(46, 13, 'M1    M4    M8    M12', '1');
    g.text(46, 14, 'ORGANIC ROI: ▲ +312%', '2');
    g.text(46, 15, 'AD CAC COST: ▼ -48%', '4');
    g.text(46, 16, 'TOP-3 TERMS: 140+ KW', '3');

    return g.frame();
  };
}
