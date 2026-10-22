import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'git-branch-graph',
  name: '4-Stage Search & Engineering Execution Pipeline',
  category: 'explainers',
  note: 'Full-width 140-column architecture: Keyword Discovery → Content & On-Page → Authority Graph → Revenue Velocity.',
  tags: ['process', 'pipeline', 'seo', 'full-width'],
  cols: 140,
  rows: 14,
  fps: 24,
  size: '4.6 KB',
  palette: palette([
    '#e6edf3', // 0: White
    '#8b949e', // 1: Muted gray
    '#7ee787', // 2: Accent green
    '#79c0ff', // 3: Accent blue
    '#ffa657', // 4: Amber
    '#ff7b72', // 5: Coral
    '#d2a8ff', // 6: Violet
    '#484f58', // 7: Dark gray
    '#30363d', // 8: Border gray
    '#2ea043', // 9: Bright green
  ]),
};

const TEXTS = {
  en: {
    header: ' /PIPELINE · 4-Stage Search & Engineering Execution Architecture ',
    badge: ' CONTINUOUS PIPELINE · 1× ',

    s1Title: ' [01] KEYWORD DISCOVERY ',
    s1_1: '├─ Search Intent Clustering',
    s1_2: '├─ Competitor SERP Gap Map',
    s1_3: '├─ High-ROI Query Matrix',
    s1_4: '╰─ Intent-to-Page Routing',

    s2Title: ' [02] CONTENT & ON-PAGE ',
    s2_1: '├─ Semantic H1-H3 Hierarchy',
    s2_2: '├─ JSON-LD Schema & AEO',
    s2_3: '├─ Core Web Vitals 99/100',
    s2_4: '╰─ Editorial UX & Scannability',

    s3Title: ' [03] AUTHORITY GRAPH ',
    s3_1: '├─ Editorial Digital PR',
    s3_2: '├─ Topical Pillar Backlinks',
    s3_3: '├─ Domain Rating 84 Moat',
    s3_4: '╰─ Entity Graph Co-Citations',

    s4Title: ' [04] REVENUE & VELOCITY ',
    s4_1: '├─ CRO Conversion Funnels',
    s4_2: '├─ High-Intent Lead Capture',
    s4_3: '├─ 3× Compounding Sales ROI',
    s4_4: '╰─ Live Telemetry Analytics',

    status1: 'Intent Mapped',
    status2: 'CWV & Schema Pass',
    status3: 'DR Moat Built',
    status4: '3× Revenue ROI',

    footerCommit: 'COMMIT: main ──● [01.Intent] ──● [02.Schema/CWV] ──● [03.Authority] ──● [04.Rank #1 & 3× ROI]',
    footerMeta: 'TELEMETRY: SLA < 2H · ZERO BLOAT · 100% AUDIT PASS',
  },
  fa: {
    header: ' /پایپ‌لاین · معماری اجرای ۴ مرحله‌ای سئو، کد و مهندسی وب ',
    badge: ' اجرای گام‌به‌گام پیوسته ',

    s1Title: ' [۰۱] کشف کلمات و نیت ',
    s1_1: '├─ تحلیل نیت جستجوی کاربر',
    s1_2: '├─ بررسی شکاف کلمات رقبا',
    s1_3: '├─ ماتریس کلمات پربازده',
    s1_4: '╰─ اتصال کوئری به صفحات هدف',

    s2Title: ' [۰۲] محتوا و سئو داخلی ',
    s2_1: '├─ ساختار معنایی H1 تا H3',
    s2_2: '├─ اسکیمای استاندارد و AEO',
    s2_3: '├─ شاخص‌های لود CWV زیر ۱ث',
    s2_4: '╰─ تجربه کاربری مدرن و روان',

    s3Title: ' [۰۳] اعتبار و لینک‌سازی ',
    s3_1: '├─ روابط عمومی دیجیتال و PR',
    s3_2: '├─ بک‌لینک‌های موضوعی معتبر',
    s3_3: '├─ سنگر دفاعی دامین DR ۸۴',
    s3_4: '╰─ استنادات در موتورهای هوش',

    s4Title: ' [۰۴] نرخ تبدیل و درآمد ',
    s4_1: '├─ بهینه‌سازی مسیر خرید CRO',
    s4_2: '├─ دریافت لید هدفمند و فروش',
    s4_3: '├─ ۳ برابر بازگشت سرمایه',
    s4_4: '╰─ تله‌متری و تحلیل لحظه‌ای',

    status1: 'نیت جستجو',
    status2: 'تایید سرعت',
    status3: 'اتوریتی دامنه',
    status4: '۳ برابر فروش',

    footerCommit: 'فرآیند: ──● [۰۱.تحلیل نیت] ──● [۰۲.سرعت و اسکیما] ──● [۰۳.اعتبار دامنه] ──● [۰۴.رتبه ۱ گوگل و سود]',
    footerMeta: 'پروژه‌ها: ۱۵۰+ موفق · تضمین فنی CWV · بدون قفل بلندمدت',
  },
  ar: {
    header: ' /مسار-التنفيذ · بنية العمل الهندسية الرباعية للسيو ومضاعفة الأرباح ',
    badge: ' مسار متواصل ومعتمد ',

    s1Title: ' [۰۱] استكشاف الكلمات ',
    s1_1: '├─ تحليل نية البحث والجمهور',
    s1_2: '├─ خريطة الفجوات التنافسية',
    s1_3: '├─ مصفوفة الكلمات عالية العائد',
    s1_4: '╰─ توجيه الكلمات لصفحات الهدف',

    s2Title: ' [۰۲] المحتوى والسيو الداخلي ',
    s2_1: '├─ الهيكل الدلالي للعناوين',
    s2_2: '├─ بيانات منظمة ومحركات الذكاء',
    s2_3: '├─ سرعة فائقة CWV 99/100',
    s2_4: '╰─ تجربة مستخدم متجاوبة تماماً',

    s3Title: ' [۰۳] شبكة الروابط والسلطة ',
    s3_1: '├─ علاقات عامة رقمية PR',
    s3_2: '├─ روابط خلفية موضوعية قوية',
    s3_3: '├─ قوة نطاق DR 84 محصنة',
    s3_4: '╰─ حضور دلالي في الذكاء الاصطناعي',

    s4Title: ' [۰۴] التحويل ومضاعفة الأرباح ',
    s4_1: '├─ تحسين معدل التحويل CRO',
    s4_2: '├─ استقطاب عملاء محتملين',
    s4_3: '├─ 3 أضعاف العائد على الاستثمار',
    s4_4: '╰─ تحليلات وتقارير أداء فورية',

    status1: 'تحليل الكلمات',
    status2: 'السرعة والبيانات',
    status3: 'سلطة الدومين',
    status4: '3× نمو الأرباح',

    footerCommit: 'المسار: ──● [۰۱.تحديد الكلمات] ──● [۰۲.السرعة والبيانات] ──● [۰۳.بناء السلطة] ──● [۰۴.المراتب الأولى والأرباح]',
    footerMeta: 'موثوق من 150+ شركة · سرعة أقل من 0.8ث · نتائج مؤكدة',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');

    // Outer Frame (cols 0..139, rows 0..13)
    g.box(
      0,
      0,
      meta.cols,
      meta.rows,
      'round',
      '8',
      tStrings.header,
      '0',
      tStrings.badge,
      '2'
    );

    // Active pipeline stage cycle (every 1.5s)
    const activeStage = Math.floor(t / 1.5) % 4;
    const pulse = Math.floor(t * 6) % 2 === 0;

    // =========================================================================
    // STAGE 01: KEYWORD DISCOVERY (cols 2..32, width 31, rows 2..9)
    // =========================================================================
    const s1Active = activeStage === 0;
    g.box(
      2,
      2,
      31,
      8,
      'round',
      s1Active ? '2' : '8',
      tStrings.s1Title,
      s1Active ? '2' : '0'
    );
    g.text(4, 3, tStrings.s1_1, s1Active ? '0' : '1');
    g.text(4, 4, tStrings.s1_2, '1');
    g.text(4, 5, tStrings.s1_3, s1Active ? '3' : '1');
    g.text(4, 6, tStrings.s1_4, '1');
    g.bar(4, 8, 27, s1Active && pulse ? 0.98 : 0.92, s1Active ? '2' : '3', '8');

    // Connector 1 -> 2 (cols 33..36, row 5)
    g.text(33, 5, s1Active ? ' ━━►' : ' ──►', s1Active ? '2' : '8');

    // =========================================================================
    // STAGE 02: CONTENT & ON-PAGE (cols 37..67, width 31, rows 2..9)
    // =========================================================================
    const s2Active = activeStage === 1;
    g.box(
      37,
      2,
      31,
      8,
      'round',
      s2Active ? '2' : '8',
      tStrings.s2Title,
      s2Active ? '2' : '0'
    );
    g.text(39, 3, tStrings.s2_1, s2Active ? '0' : '1');
    g.text(39, 4, tStrings.s2_2, s2Active ? '6' : '1');
    g.text(39, 5, tStrings.s2_3, s2Active ? '2' : '1');
    g.text(39, 6, tStrings.s2_4, '1');
    g.bar(39, 8, 27, s2Active && pulse ? 1.0 : 0.96, s2Active ? '2' : '6', '8');

    // Connector 2 -> 3 (cols 68..71, row 5)
    g.text(68, 5, s2Active ? ' ━━►' : ' ──►', s2Active ? '2' : '8');

    // =========================================================================
    // STAGE 03: AUTHORITY GRAPH (cols 72..102, width 31, rows 2..9)
    // =========================================================================
    const s3Active = activeStage === 2;
    g.box(
      72,
      2,
      31,
      8,
      'round',
      s3Active ? '2' : '8',
      tStrings.s3Title,
      s3Active ? '2' : '0'
    );
    g.text(74, 3, tStrings.s3_1, s3Active ? '0' : '1');
    g.text(74, 4, tStrings.s3_2, '1');
    g.text(74, 5, tStrings.s3_3, s3Active ? '4' : '1');
    g.text(74, 6, tStrings.s3_4, '1');
    g.bar(74, 8, 27, s3Active && pulse ? 0.96 : 0.90, s3Active ? '2' : '4', '8');

    // Connector 3 -> 4 (cols 103..106, row 5)
    g.text(103, 5, s3Active ? ' ━━►' : ' ──►', s3Active ? '2' : '8');

    // =========================================================================
    // STAGE 04: REVENUE & VELOCITY (cols 107..137, width 31, rows 2..9)
    // =========================================================================
    const s4Active = activeStage === 3;
    g.box(
      107,
      2,
      31,
      8,
      'round',
      s4Active ? '2' : '8',
      tStrings.s4Title,
      s4Active ? '2' : '0'
    );
    g.text(109, 3, tStrings.s4_1, s4Active ? '0' : '1');
    g.text(109, 4, tStrings.s4_2, '1');
    g.text(109, 5, tStrings.s4_3, s4Active ? '2' : '1');
    g.text(109, 6, tStrings.s4_4, '1');
    g.bar(109, 8, 27, s4Active && pulse ? 1.0 : 0.94, s4Active ? '2' : '2', '8');

    // =========================================================================
    // BOTTOM TELEMETRY PIPELINE & COMMIT BAR (rows 10..12, cols 2..137)
    // =========================================================================
    g.hline(2, 10, 136, '━', '8');

    // Live continuous pulse scanner along the pipeline wire
    const pulsePos = 2 + (Math.floor(t * 30) % 130);
    for (let k = 0; k < 6; k++) {
      g.set(pulsePos + k, 10, '━', '2');
    }

    // Milestones nodes aligned with the 4 stage centers
    g.set(17, 10, '●', s1Active ? '2' : '3');
    g.set(52, 10, '●', s2Active ? '2' : '6');
    g.set(87, 10, '●', s3Active ? '2' : '4');
    g.set(122, 10, '●', s4Active ? '2' : '2');

    // Milestone text labels
    g.text(19, 10, `[${tStrings.status1}]`, s1Active ? '2' : '1');
    g.text(54, 10, `[${tStrings.status2}]`, s2Active ? '2' : '1');
    g.text(89, 10, `[${tStrings.status3}]`, s3Active ? '2' : '1');
    g.text(124, 10, `[${tStrings.status4}]`, s4Active ? '2' : '1');

    g.hline(2, 11, 136, '─', '8');

    // Footer telemetry line
    g.text(3, 12, tStrings.footerCommit, '2');
    const metaOffset = meta.cols - tStrings.footerMeta.length - 3;
    if (metaOffset > 85) {
      g.text(metaOffset, 12, tStrings.footerMeta, '4');
    }

    return g.frame();
  };
}
