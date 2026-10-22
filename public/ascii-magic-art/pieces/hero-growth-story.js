import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-growth-story',
  name: 'Your Business Growth Journey with WebABC',
  category: 'hero',
  note: 'Clear 3-step client transformation: 01. Fast Modern Website → 02. #1 on Google → 03. 3x More Leads & Sales.',
  tags: ['hero', 'growth', 'clients', 'conversion'],
  cols: 72,
  rows: 17,
  fps: 24,
  size: '3.4 KB',
  palette: palette([
    '#e6edf3', // 0: primary ink
    '#8b949e', // 1: secondary ink
    '#7ee787', // 2: primary brand accent
    '#79c0ff', // 3: secondary accent
    '#ffa657', // 4: warm gold / stars
    '#ff7b72', // 5: coral
    '#d2a8ff', // 6: highlight accent
    '#484f58', // 7: muted border
    '#30363d', // 8: hairline border
    '#2ea043', // 9: dim brand accent
  ]),
};

const TEXTS = {
  en: {
    title: ' ★ HOW WEBABC GROWS YOUR BUSINESS ',
    badge: ' ✓ PROVEN RESULTS ',
    s1Title: ' 01. YOUR WEBSITE ',
    s1Site: '● ● ●  yoursite',
    s1Design: '▓▒░ Modern Design',
    s1Speed: '⚡ 0.8s Fast Load',
    s1CtaPulse: '★ GET QUOTE ◄',
    s1Cta: '★ GET QUOTE →',
    s1Mobile: '✓ Mobile Ready',
    s2Title: ' 02. #1 ON GOOGLE ',
    s2Search: 'Google Search 🔍',
    s2Brand: '#1 YOUR BRAND',
    s2TopHit: '★★★★★ Top Hit',
    s2Comp1: '  #2 Competitor',
    s2Comp2: '  #3 Competitor',
    s3Title: ' 03. MORE SALES ',
    s3Leads: 'Leads & Sales 📈',
    s3Revenue: '▲ +312% Revenue',
    beforeLabel: 'BEFORE WEBABC :',
    beforeText: 'Slow Site · Low Traffic · Few Calls',
    afterLabel: 'WITH WEBABC   :',
    afterText: '0.8s Fast · #1 on Google · 3× Leads ✓',
    bottomTrust: '★ Trusted by 150+ Businesses · Transparent Monthly Reports · Free Audit',
  },
  fa: {
    title: ' ★ مسیر رشد آنلاین با وب اِی‌بی‌سی ',
    badge: ' ✓ نتایج واقعی ',
    s1Title: ' ۰۱. وب‌سایت شما ',
    s1Site: '● ● ●  yoursite.ir',
    s1Design: '▓▒░ طراحی اختصاصی',
    s1Speed: '⚡ لود ۰.۸ ثانیه',
    s1CtaPulse: '★ استعلام قیمت ◄',
    s1Cta: '★ استعلام قیمت ←',
    s1Mobile: '✓ سئو و ریسپانسیو',
    s2Title: ' ۰۲. رتبه ۱ گوگل ',
    s2Search: 'جستجوی گوگل 🔍',
    s2Brand: 'رتبه ۱ برند شما',
    s2TopHit: '★★★★★ لینک اول',
    s2Comp1: '  #۲ رقیب قدیمی',
    s2Comp2: '  #۳ سایت ضعیف',
    s3Title: ' ۰۳. افزایش فروش ',
    s3Leads: 'لید و فروش 📈',
    s3Revenue: '▲ +۳۱۲٪ درآمد',
    beforeLabel: 'قبل از همکاری :',
    beforeText: 'سایت کند · ورودی صفر · فروش اندک',
    afterLabel: 'با وب اِی‌بی‌سی :',
    afterText: 'سرعت ۰.۸ث · رتبه ۱ گوگل · ۳برابر فروش ✓',
    bottomTrust: '★ مورد اعتماد ۱۵۰+ برند · گزارش ماهانه شفاف · مشاوره رایگان',
  },
  ar: {
    title: ' ★ كيف نطور أعمالك مع WebABC ',
    badge: ' ✓ نتائج موثقة ',
    s1Title: ' ۰۱. موقعك الجديد ',
    s1Site: '● ● ●  yoursite.com',
    s1Design: '▓▒░ برمجة مخصصة',
    s1Speed: '⚡ تحميل ۰.۸ ثانية',
    s1CtaPulse: '★ اطلب عرض سعر ◄',
    s1Cta: '★ اطلب عرض سعر ←',
    s1Mobile: '✓ متوافق مع الجوال',
    s2Title: ' ۰۲. رتبة ۱ في جوجل ',
    s2Search: 'بحث جوجل 🔍',
    s2Brand: '#۱ علامتك التجارية',
    s2TopHit: '★★★★★ النتيجة الأولى',
    s2Comp1: '  #۲ منافس تجاري',
    s2Comp2: '  #۳ موقع ضعيف',
    s3Title: ' ۰۳. زيادة المبيعات ',
    s3Leads: 'عملاء وأرباح 📈',
    s3Revenue: '▲ +۳۱۲٪ نمو الدخل',
    beforeLabel: 'قبل WebABC    :',
    beforeText: 'موقع بطيء · زيارات قليلة · أرباح ضعيفة',
    afterLabel: 'مع WebABC     :',
    afterText: 'سرعة ۰.۸ث · تصدر جوجل · ۳ أضعاف المبيعات ✓',
    bottomTrust: '★ موثوق من ۱۵۰+ شركة · تقارير شهرية دقيقة · تدقيق مجاني',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');

    // Outer Frame (cols 0..71, rows 0..16)
    g.box(
      0,
      0,
      72,
      17,
      'round',
      '8',
      tStrings.title,
      '0',
      tStrings.badge,
      '2'
    );

    // Cycle active highlight smoothly across the 3 steps (every 1.8s)
    const activeStage = Math.floor(t / 1.8) % 3;
    const pulse = Math.floor(t * 6) % 2 === 0;

    // =========================================================================
    // STEP 01: FAST, MODERN WEBSITE (cols 2..21, width 20, rows 2..11)
    // =========================================================================
    const s1Active = activeStage === 0;
    g.box(
      2,
      2,
      20,
      10,
      'round',
      s1Active ? '2' : '8',
      tStrings.s1Title,
      s1Active ? '2' : '0'
    );
    g.text(4, 3, tStrings.s1Site, '1');
    g.hline(3, 4, 18, '─', '8');
    g.text(4, 5, tStrings.s1Design, '0');
    g.text(4, 6, tStrings.s1Speed, '3');
    g.box(4, 7, 16, 3, 'single', s1Active ? '2' : '3');
    g.text(5, 8, s1Active && pulse ? tStrings.s1CtaPulse : tStrings.s1Cta, s1Active ? '2' : '0');
    g.text(4, 10, tStrings.s1Mobile, '2');

    // Animated Connector 1 -> 2 (cols 22..25)
    g.text(22, 6, s1Active ? ' ━━►' : ' ──►', s1Active ? '2' : '3');

    // =========================================================================
    // STEP 02: #1 ON GOOGLE SEARCH (cols 26..45, width 20, rows 2..11)
    // =========================================================================
    const s2Active = activeStage === 1;
    g.box(
      26,
      2,
      20,
      10,
      'round',
      s2Active ? '2' : '8',
      tStrings.s2Title,
      s2Active ? '2' : '0'
    );
    g.text(28, 3, tStrings.s2Search, '1');
    g.hline(27, 4, 18, '─', '8');
    g.box(28, 5, 16, 4, 'single', '2');
    g.text(30, 6, tStrings.s2Brand, '2');
    g.text(30, 7, tStrings.s2TopHit, '4');
    g.text(28, 9, tStrings.s2Comp1, '1');
    g.text(28, 10, tStrings.s2Comp2, '7');

    // Animated Connector 2 -> 3 (cols 46..49)
    g.text(46, 6, s2Active ? ' ━━►' : ' ──►', s2Active ? '2' : '3');

    // =========================================================================
    // STEP 03: MORE CUSTOMERS & SALES (cols 50..69, width 20, rows 2..11)
    // =========================================================================
    const s3Active = activeStage === 2;
    g.box(
      50,
      2,
      20,
      10,
      'round',
      s3Active ? '2' : '8',
      tStrings.s3Title,
      s3Active ? '2' : '0'
    );
    g.text(52, 3, tStrings.s3Leads, '1');
    g.hline(51, 4, 18, '─', '8');

    // 4 Rising Bar Columns (cols 53, 57, 61, 65; rows 5..8)
    const heights = [1, 2, 3, 4];
    for (let c = 0; c < 4; c++) {
      const bx = 53 + c * 4;
      const h = heights[c];
      const colCode = c === 3 ? '2' : c === 2 ? '3' : '9';
      for (let r = 0; r < h; r++) {
        const by = 8 - r;
        g.text(bx, by, '███', s3Active && c === 3 && pulse ? '4' : colCode);
      }
    }
    g.hline(52, 9, 16, '─', '8');
    g.text(52, 10, tStrings.s3Revenue, '2');

    // =========================================================================
    // BOTTOM IMPACT COMPARISON BAR (rows 12..15, cols 2..69)
    // =========================================================================
    g.hline(2, 12, 68, '─', '8');

    g.text(3, 13, tStrings.beforeLabel, '1');
    g.text(19, 13, '░░░░░░░░░░░░░░', '7');
    g.text(35, 13, tStrings.beforeText, '1');

    g.text(3, 14, tStrings.afterLabel, '2');
    const shimmer = Math.floor(t * 10) % 14;
    for (let i = 0; i < 14; i++) {
      g.set(19 + i, 14, '█', i === shimmer ? '3' : '2');
    }
    g.text(35, 14, tStrings.afterText, '2');

    g.text(
      3,
      15,
      tStrings.bottomTrust,
      '4'
    );

    return g.frame();
  };
}
