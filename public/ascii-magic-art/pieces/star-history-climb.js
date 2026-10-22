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

const TEXTS = {
  en: {
    header: ' /RESULTS-VERIFIED · Compounding Organic Growth Curve ',
    badge: ' ★ +285% ROI ',
    chartTitle: 'IMPRESSIONS & TOP-3 KEYWORDS (12-MONTH TRAJECTORY)',
    chartX: 'M01   M03   M06   M09   M12 [SUSTAINABLE GROWTH]',
    sideTitle: 'CLIENT TELEMETRY',
    l1: 'Organic Clicks',
    v1: '▲ +312.4%',
    l2: 'Top-3 Keywords',
    v2: '▲ 140+ Terms',
    l3: 'CWV Pass Rate',
    v3: '✓ 99 / 100',
    l4: 'Ad Spend Saved',
    v4: '▼ -48% CAC',
  },
  fa: {
    header: ' /نتایج-واقعی · روند رشد تصاعدی ترافیک ارگانیک ',
    badge: ' ★ بازگشت سرمایه +۲۸۵٪ ',
    chartTitle: 'ایمپرشن و رتبه‌های ۱ تا ۳ گوگل (مسیر ۱۲ ماهه)',
    chartX: 'ماه ۱   ماه ۳   ماه ۶   ماه ۹   ماه ۱۲ [رشد مداوم]',
    sideTitle: 'تله‌متری پروژه',
    l1: 'کلیک ارگانیک',
    v1: '▲ +۳۱۲.۴٪',
    l2: 'کلمات رتبه ۱ تا ۳',
    v2: '▲ ۱۴۰+ کلمه',
    l3: 'نمره سرعت CWV',
    v3: '✓ ۹۹ / ۱۰۰',
    l4: 'کاهش هزینه تبلیغ',
    v4: '▼ -۴۸٪ هزینه',
  },
  ar: {
    header: ' /نتائج-موثقة · مسار النمو التراكمي للزيارات ',
    badge: ' ★ عائد استثمار +285% ',
    chartTitle: 'مرات الظهور وتصدر المراكز الثلاثة (12 شهراً)',
    chartX: 'ش 1     ش 3     ش 6     ش 9     ش 12 [نمو مستمر]',
    sideTitle: 'مؤشرات الأداء',
    l1: 'النقرات العضوية',
    v1: '▲ +312.4%',
    l2: 'كلمات الصدارة',
    v2: '▲ 140+ كلمة',
    l3: 'اجتياز سرعة CWV',
    v3: '✓ 99 / 100',
    l4: 'توفير الإعلانات',
    v4: '▼ -48% تكلفة',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;

  return (_t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      66,
      17,
      'round',
      '8',
      tStrings.header,
      '0',
      tStrings.badge,
      '4'
    );

    g.text(3, 2, tStrings.chartTitle, '6');

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
    g.text(4, 15, tStrings.chartX, '1');

    g.vline(44, 1, 15, '│', '8');
    g.text(46, 3, tStrings.sideTitle, '6');
    g.text(46, 5, tStrings.l1, '1');
    g.text(46, 6, tStrings.v1, '2');
    g.text(46, 8, tStrings.l2, '1');
    g.text(46, 9, tStrings.v2, '3');
    g.text(46, 11, tStrings.l3, '1');
    g.text(46, 12, tStrings.v3, '2');
    g.text(46, 14, tStrings.l4, '1');
    g.text(46, 15, tStrings.v4, '4');

    return g.frame();
  };
}
