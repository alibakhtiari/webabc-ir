import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'code-editor',
  name: 'Custom Web & WooCommerce Engineering',
  category: 'ui',
  note: 'Active clean code architecture, Astro/TypeScript islands, and responsive viewport layouts.',
  tags: ['web-dev', 'astro', 'woocommerce', 'code'],
  cols: 66,
  rows: 17,
  fps: 30,
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

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const isFa = lang === 'fa';
  const isAr = lang === 'ar';

  const header = isFa
    ? ' /استودیو-توسعه · معماری مدرن وب اِی‌بی‌سی '
    : isAr
      ? ' /استوديو-التطوير · بنية الكود الحديث '
      : ' /DEV-STUDIO · src/pages/[lang]/index.astro ';

  const badge = isFa ? ' کد تمیز · ۹۹/۱۰۰ ' : isAr ? ' أداء 99/100 ' : ' TS · 99/100 ';
  const statusBar = isFa
    ? 'عادی │ شاخه اصلی │ یونیکد │ 0.0KB JS'
    : isAr
      ? 'نشط │ الفرع الرئيسي │ UTF-8 │ 0.0KB JS'
      : 'NORMAL │ main→ascii │ UTF-8 │ 0.0KB JS';
  const viewportTitle = isFa ? 'پیش‌نمایش واکنش‌گرا' : isAr ? 'عرض متجاوب' : 'VIEWPORT [RESPONSIVE]';
  const buildTitle = isFa ? 'پایپ‌لاین بیلد:' : isAr ? 'مسار البناء:' : 'BUILD PIPELINE:';
  const ttfbText = isFa ? 'پاسخ: ۱۸ میلی‌ثانیه' : isAr ? 'الاستجابة: 18ms' : 'TTFB: 18ms · Edge';

  const CODE_LINES = [
    { ln: '01', tokens: [['import', '5'], [' { Astro, Schema } ', '0'], ['from', '5'], [" '@webabc/core';", '2']] },
    { ln: '02', tokens: [['export const', '5'], [' prerender = ', '0'], ['true', '3'], [';', '1']] },
    { ln: '03', tokens: [['const', '5'], [' vitals = ', '0'], ['await', '5'], [' optimizeCWV({', '6']] },
    { ln: '04', tokens: [['  lcpTarget:', '3'], [" '< 0.9s'", '2'], [', cls:', '3'], [' 0.00', '4']] },
    { ln: '05', tokens: [['  locales:', '3'], [" ['en', 'fa', 'ar']", '2'], [', rtl:', '3'], [' true', '4']] },
    { ln: '06', tokens: [['  schema:', '3'], [" ['Organization', 'FAQPage']", '6']] },
    { ln: '07', tokens: [['});', '6']] },
    { ln: '08', tokens: [['// Render zero-JS static island + edge worker', '1']] },
    { ln: '09', tokens: [['<Layout', '2'], [' theme=', '0'], ['"terminal-dark"', '4'], [' dir=', '0'], ['"auto"', '3'], ['>', '2']] },
    { ln: '10', tokens: [['  <HeroStage', '3'], [' look=', '0'], ['"original"', '2'], [' fps={30} />', '0']] },
    { ln: '11', tokens: [['</Layout>', '2']] },
  ];

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      66,
      17,
      'round',
      '8',
      header,
      '0',
      badge,
      '3'
    );

    // Code pane (cols 2..42)
    const activeLine = Math.floor(t * 2.2) % CODE_LINES.length;
    for (let i = 0; i < CODE_LINES.length; i++) {
      const row = 2 + i;
      const line = CODE_LINES[i];
      const isCurrent = i === activeLine;
      g.text(2, row, isCurrent ? `▸${line.ln}` : ` ${line.ln}`, isCurrent ? '4' : '7');
      let colX = 6;
      for (const [txt, color] of line.tokens) {
        g.text(colX, row, txt, color);
        colX += txt.length;
      }
      if (isCurrent && Math.floor(t * 4) % 2 === 0) {
        g.set(Math.min(41, colX), row, '█', '2');
      }
    }

    // Bottom status bar in editor
    g.hline(1, 14, 41, '─', '8');
    g.text(2, 15, statusBar, '2');

    // Right live viewport preview (cols 43..64)
    g.vline(42, 1, 15, '│', '8');
    g.text(44, 2, viewportTitle, '6');
    g.box(44, 3, 20, 7, 'single', '3', ' webabc.ir ', '0');
    g.text(46, 4, '╭──────╮ ╭──────╮', '2');
    g.text(46, 5, isFa ? '│ سئو  │ │ توسعه│' : isAr ? '│ سيو  │ │ برمج │' : '│ SEO  │ │  DEV │', '0');
    g.text(46, 6, '╰──────╯ ╰──────╯', '2');
    const barShift = Math.floor(t * 3) % 4;
    g.text(46, 7, '▓▒░'.repeat(4).slice(barShift, barShift + 8), '3');
    g.text(46, 8, '✓ SSR  ✓ Edge CDN', '2');

    g.text(44, 11, buildTitle, '1');
    g.bar(44, 12, 19, 0.88 + Math.sin(t * 2) * 0.1, '2', '8');
    g.text(44, 14, ttfbText, '4');
    g.text(44, 15, 'HREFLANG: en/fa/ar', '3');

    return g.frame();
  };
}
