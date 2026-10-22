import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'webabc-logo-waveform',
  name: 'WebABC Waveform & Frequency Spectrum Logo',
  category: 'brand',
  note: 'Audio waveform synthesizer and live Core Web Vitals spectrum analyzer surrounding the WebABC monogram.',
  tags: ['brand', 'waveform', 'spectrum', 'audio', 'telemetry'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.7 KB',
  palette: palette([
    '#e6edf3', // 0: primary text
    '#8b949e', // 1: muted text
    '#7ee787', // 2: accent green
    '#79c0ff', // 3: accent blue
    '#ffa657', // 4: accent amber
    '#ff7b72', // 5: accent coral
    '#d2a8ff', // 6: accent purple
    '#484f58', // 7: border faint
    '#30363d', // 8: border hairline
    '#2ea043', // 9: bright green
  ]),
};

const TEXTS = {
  en: {
    header: ' /BRAND-SPECTRUM · CWV Frequency & Waveform Studio ',
    badge: ' 0.8s LCP ',
    title: 'W E B A B C   S T U D I O',
    tagline: 'SYNTHESIZING SPEED · ACCESSIBILITY · SEARCH DOMINANCE',
    lcp: 'LCP 0.8s',
    inp: 'INP 24ms',
    cls: 'CLS 0.00',
    seo: 'SEO 100',
    footer: 'SPECTRUM: 60 FPS RENDER · 16 HARMONIC BANDS · 0ms JITTER',
  },
  fa: {
    header: ' /طیف-بسامد-برند · آنالایزر فرکانسی شاخص‌های سرعت ',
    badge: ' سرعت ۰.۸ثانیه ',
    title: 'ا سـ تـ و د یـ و   و ب   اِیـ ‌بـ یـ ‌سـ ی',
    tagline: 'هم‌نشینی سرعت فوق‌العاده · دسترسی‌پذیری · برتری در سئو',
    lcp: 'بارگذاری ۰.۸ ثانیه',
    inp: 'پاسخ‌دهی ۲۴ میلی‌ثانیه',
    cls: 'تغییر چیدمان ۰.۰۰',
    seo: 'امتیاز سئو ۱۰۰',
    footer: 'طیف بسامدی: پردازش ۶۰ فریم · ۱۶ باند هارمونیک · بدون تاخیر',
  },
  ar: {
    header: ' /طيف-التردد-البصري · محلل إشارات مؤشرات الويب ',
    badge: ' سرعة 0.8 ث ',
    title: 'ا سـ تـ و د يـ و   W e b A B C',
    tagline: 'تكامل السرعة القصوى · سهولة الوصول · تصدر نتائج البحث',
    lcp: 'سرعة العرض 0.8ث',
    inp: 'زمن الاستجابة 24ملي',
    cls: 'ثبات العناصر 0.00',
    seo: 'سيو جوجل 100',
    footer: 'معالجة الإشارات: 60 إطار/ثانية · 16 نطاقاً متوافقاً · استجابة فورية',
  },
};

const BARS = [' ', ' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const loc = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');

    // Terminal container box
    g.box(
      0,
      0,
      meta.cols,
      meta.rows,
      'round',
      '8',
      loc.header,
      '0',
      loc.badge,
      '2'
    );

    // Left & Right Equalizer VU Meters (Cols 3..14 and 51..62)
    const numBands = 10;
    for (let b = 0; b < numBands; b++) {
      // Harmonic wave formula
      const wave1 = (Math.sin(t * 3.5 + b * 0.7) + 1) / 2;
      const wave2 = (Math.cos(t * 2.2 - b * 0.5) + 1) / 2;
      const combined = Math.min(1, Math.max(0.1, wave1 * 0.7 + wave2 * 0.4));
      const barHeight = Math.round(combined * 7);

      for (let y = 0; y < 7; y++) {
        const row = 9 - y;
        const colLeft = 3 + b;
        const colRight = 53 + b;
        const ch = y < barHeight ? (y === barHeight - 1 ? '█' : '▓') : ' ';
        const col = y > 5 ? '5' : y > 3 ? '4' : '2';

        if (ch !== ' ') {
          g.set(colLeft, row, ch, col);
          g.set(colRight, row, ch, col);
        }
      }
    }

    // Centered Brand Badge Plate (Cols 15..50, Rows 3..7)
    g.box(15, 3, 36, 6, 'single', '8');
    const titleX = Math.floor(15 + (36 - loc.title.length) / 2);
    g.text(titleX, 5, loc.title, '0');
    g.text(25, 6, '▓▒░ WebABC ░▒▓', '2');

    // Oscilloscope Sine Wave Strip (Row 10..11)
    for (let x = 2; x < meta.cols - 2; x++) {
      const freq = Math.sin(t * 4 + x * 0.22) * Math.cos(t * 1.5 + x * 0.08);
      const waveY = Math.round(11 + freq * 0.85);
      const ch = Math.abs(freq) > 0.5 ? '━' : '─';
      g.set(x, waveY, ch, '3');
    }

    // Live Core Web Vitals telemetry gauges (Row 13)
    g.text(4, 13, `[✓ ${loc.lcp}]`, '2');
    g.text(20, 13, `[✓ ${loc.inp}]`, '3');
    g.text(35, 13, `[✓ ${loc.cls}]`, '6');
    g.text(50, 13, `[★ ${loc.seo}]`, '4');

    // Footer status bar
    g.hline(1, 14, meta.cols - 2, '─', '7');
    const footX = Math.max(2, Math.floor((meta.cols - loc.footer.length) / 2));
    g.text(footX, 15, loc.footer, '2');

    return g.frame();
  };
}
