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

const TEXTS = {
  en: {
    header: ' /PIPELINE · 3-Stage Search & Engineering Execution Architecture ',
    badge: ' CONTINUOUS · 1× ',
    s1Title: ' [01] KEYWORD DISCOVERY ',
    s1_1: '├─ Search Intent Clustering',
    s1_2: '├─ Competitor SERP Gap Map',
    s1_3: '╰─ High-ROI Query Matrix',
    s2Title: ' [02] CONTENT & ON-PAGE ',
    s2_1: '├─ Semantic H1-H3 Hierarchy',
    s2_2: '├─ JSON-LD Schema & AEO',
    s2_3: '╰─ Core Web Vitals 99/100',
    s3Title: ' [03] AUTHORITY GRAPH ',
    s3_1: '├─ Editorial Digital PR',
    s3_2: '├─ Topical Pillar Backlinks',
    s3_3: '╰─ Domain Rating Velocity',
    footer: 'COMMIT: main ──● [Intent Mapped] ──● [CWV & Schema Verified] ──● [Ranked Top-3 in Google Search]',
  },
  fa: {
    header: ' /پایپ‌لاین · معماری اجرای سه‌مرحله‌ای سئو و مهندسی وب ',
    badge: ' اجرای گام‌به‌گام ',
    s1Title: ' [۰۱] کشف کلمات و رقبا ',
    s1_1: '├─ تحلیل نیت جستجوی کاربر',
    s1_2: '├─ بررسی شکاف کلمات رقبا',
    s1_3: '╰─ ماتریس کلمات پربازده',
    s2Title: ' [۰۲] محتوا و سئو داخلی ',
    s2_1: '├─ ساختار معنایی H1 تا H3',
    s2_2: '├─ اسکیمای استاندارد و AEO',
    s2_3: '╰─ سرعت لود و CWV زیر ۱ثانیه',
    s3Title: ' [۰۳] اعتبار و لینک‌سازی ',
    s3_1: '├─ روابط عمومی دیجیتال و PR',
    s3_2: '├─ بک‌لینک‌های موضوعی معتبر',
    s3_3: '╰─ رشد پیوسته اتوریتی دامین',
    footer: 'فرآیند: ──● [تحلیل نیت کاربر] ──● [تایید سرعت و اسکیما] ──● [رتبه ۱ تا ۳ نتایج جستجوی گوگل]',
  },
  ar: {
    header: ' /مسار-التنفيذ · بنية العمل الهندسية الثلاثية للسيو ',
    badge: ' مراحل متتابعة ',
    s1Title: ' [۰۱] استكشاف الكلمات ',
    s1_1: '├─ تحليل نية البحث والجمهور',
    s1_2: '├─ خريطة الفجوات التنافسية',
    s1_3: '╰─ مصفوفة الكلمات المفتاحية',
    s2Title: ' [۰۲] المحتوى والسيو الداخلي ',
    s2_1: '├─ الهيكل الدلالي للعناوين',
    s2_2: '├─ بيانات منظمة وذكاء اصطناعي',
    s2_3: '╰─ سرعة فائقة CWV 99/100',
    s3Title: ' [۰۳] شبكة الروابط والسلطة ',
    s3_1: '├─ علاقات عامة رقمية PR',
    s3_2: '├─ روابط خلفية موضوعية قوية',
    s3_3: '╰─ تسريع سلطة الدومين DR',
    footer: 'المسار: ──● [تحديد الكلمات] ──● [توثيق السرعة والبيانات] ──● [تصدر المراكز الأولى في جوجل]',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');
    g.box(
      0,
      0,
      102,
      13,
      'round',
      '8',
      tStrings.header,
      '0',
      tStrings.badge,
      '2'
    );

    // 3 Stage Cards aligned directly beneath the 3 columns of /PROCESS
    // Stage 1: cols 3..31 (width 29)
    g.box(3, 2, 29, 7, 'single', '3', tStrings.s1Title, '2');
    g.text(5, 4, tStrings.s1_1, '0');
    g.text(5, 5, tStrings.s1_2, '1');
    g.text(5, 6, tStrings.s1_3, '3');
    g.bar(5, 7, 25, 0.92, '2', '8');

    // Connector 1 -> 2 (cols 32..36)
    const p1 = Math.floor(t * 8) % 4;
    g.text(32, 5, p1 === 0 ? '━━►─' : p1 === 1 ? '─━━►' : '───►', '2');

    // Stage 2: cols 37..65 (width 29)
    g.box(37, 2, 29, 7, 'single', '6', tStrings.s2Title, '2');
    g.text(39, 4, tStrings.s2_1, '0');
    g.text(39, 5, tStrings.s2_2, '1');
    g.text(39, 6, tStrings.s2_3, '3');
    g.bar(39, 7, 25, 0.95, '3', '8');

    // Connector 2 -> 3 (cols 66..70)
    g.text(66, 5, p1 === 2 ? '━━►─' : p1 === 3 ? '─━━►' : '───►', '2');

    // Stage 3: cols 71..99 (width 29)
    g.box(71, 2, 29, 7, 'single', '4', tStrings.s3Title, '2');
    g.text(73, 4, tStrings.s3_1, '0');
    g.text(73, 5, tStrings.s3_2, '1');
    g.text(73, 6, tStrings.s3_3, '3');
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
      tStrings.footer,
      '2'
    );

    return g.frame();
  };
}
