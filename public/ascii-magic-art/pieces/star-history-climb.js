import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'star-history-climb',
  name: 'Tangible SEO Results & Compounding Growth',
  category: 'live-data',
  note: 'Compounding organic impressions, Top-3 keyword velocity, and verified client ROI.',
  tags: ['results', 'seo', 'growth', 'roi'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.2 KB',
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
      ' /RESULTS-VERIFIED · Compounding Organic Growth Curve ',
      '0',
      ' ★ +285% ROI ',
      '4'
    );

    g.text(3, 2, 'IMPRESSIONS & TOP-3 KEYWORDS (12-MONTH TRAJECTORY)', '6');

    for (let x = 0; x < 38; x++) {
      const norm = x / 37;
      const curve = Math.pow(norm, 1.55) * 9;
      const yTop = Math.max(4, Math.min(13, 13 - Math.round(curve)));
      for (let y = 13; y >= yTop; y--) {
        const ch = y === yTop ? '★' : y === yTop + 1 ? '▓' : '▒';
        const col = y === yTop ? '4' : '2';
        g.set(4 + x, y, ch, col);
      }
    }
    g.hline(3, 14, 40, '─', '8');
    g.text(4, 15, 'M01   M03   M06   M09   M12 [SUSTAINABLE GROWTH]', '1');

    g.vline(44, 1, 15, '│', '8');
    g.text(46, 3, 'CLIENT TELEMETRY', '6');
    g.text(46, 5, 'Organic Clicks', '1');
    g.text(46, 6, '▲ +312.4%', '2');
    g.text(46, 8, 'Top-3 Keywords', '1');
    g.text(46, 9, '▲ 140+ Terms', '3');
    g.text(46, 11, 'CWV Pass Rate', '1');
    g.text(46, 12, '✓ 99 / 100', '2');
    g.text(46, 14, 'Ad Spend Saved', '1');
    g.text(46, 15, '▼ -48% CAC', '4');

    return g.frame();
  };
}
