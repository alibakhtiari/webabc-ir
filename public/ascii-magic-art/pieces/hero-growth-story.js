import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'hero-growth-story',
  name: 'Full-Width Client Growth Pipeline · WebABC',
  category: 'hero',
  note: 'Full-width 4-stage client transformation: 01. Fast Website → 02. #1 on Google → 03. Authority Moat → 04. 3x Revenue.',
  tags: ['hero', 'growth', 'clients', 'conversion', 'pipeline'],
  cols: 101,
  rows: 18,
  fps: 24,
  size: '4.2 KB',
  palette: palette([
    '#e6edf3', // 0: primary ink
    '#8b949e', // 1: secondary ink
    '#7ee787', // 2: primary brand accent (green)
    '#79c0ff', // 3: secondary accent (blue)
    '#ffa657', // 4: warm gold / stars
    '#ff7b72', // 5: coral
    '#d2a8ff', // 6: highlight accent (purple)
    '#484f58', // 7: muted border
    '#30363d', // 8: hairline border
    '#2ea043', // 9: dim brand accent
  ]),
};

const TEXTS = {
  en: {
    title: ' ★ HOW WEBABC GROWS YOUR BUSINESS · 4-STAGE PIPELINE ',
    badge: ' ✓ VERIFIED CLIENT ROI ',
    s1Title: ' 01. FAST WEBSITE ',
    s1Site: '● ● ●  yoursite.com',
    s1Speed: '⚡ LCP 0.8s Fast Load',
    s1Cwv: '✓ Core Web Vitals 100',
    s1CtaPulse: '★ GET QUOTE ◄',
    s1Cta: '★ GET QUOTE →',
    s1Mobile: '✓ 100% Mobile Ready',

    s2Title: ' 02. #1 ON GOOGLE ',
    s2Search: 'Google Search   🔍',
    s2Brand: '#1 YOUR BRAND ✦',
    s2TopHit: '★★★★★  Top Hit',
    s2Comp1: '  #2 Competitor A',
    s2Comp2: '  #3 Competitor B',

    s3Title: ' 03. DOMAIN MOAT ',
    s3Schema: 'Semantic Schema LD',
    s3Graph: '✓ Schema.org Graph',
    s3Links: '✓ Editorial Backlinks',
    s3Badge: 'DOMAIN RATING 84',
    s3Aeo: '✓ AI & PAA Citations',

    s4Title: ' 04. 3× REVENUE ',
    s4Leads: 'Leads & Revenue 📈',
    s4Revenue: '▲ +312% SALES & ROI',

    beforeLabel: 'BEFORE WEBABC :',
    beforeText: 'Slow Site · Low Rankings · High Ad Spend · Weak Conversion',
    afterLabel: 'WITH WEBABC   :',
    afterText: '0.8s LCP · #1 on Google · Domain Moat · 3× Leads & Sales ✓',
    bottomTrust:
      '★ 150+ Clients · Qazvin · Tehran · Dubai · Riyadh · Muscat · Free Audit SLA < 2H',
  },
  fa: {
    title: ' ★ فرآیند رشد آنلاین کسب‌وکار شما با وب اِی‌بی‌سی · ۴ مرحله ',
    badge: ' ✓ نتایج اثبات‌شده ',
    s1Title: ' ۰۱. وب‌سایت سریع ',
    s1Site: '● ● ●  yoursite.ir',
    s1Speed: '⚡ سرعت لود ۰.۸ ثانیه',
    s1Cwv: '✓ شاخص سرعت ۱۰۰٪',
    s1CtaPulse: '★ استعلام قیمت ◄',
    s1Cta: '★ استعلام قیمت ←',
    s1Mobile: '✓ سئو و ریسپانسیو',

    s2Title: ' ۰۲. رتبه ۱ گوگل ',
    s2Search: 'جستجوی گوگل    🔍',
    s2Brand: 'رتبه ۱ برند شما ✦',
    s2TopHit: '★★★★★ لینک اول',
    s2Comp1: '  #۲ رقیب قدیمی',
    s2Comp2: '  #۳ سایت ضعیف',

    s3Title: ' ۰۳. اعتبار دامنه ',
    s3Schema: 'اسکیمای معنایی JSON',
    s3Graph: '✓ گراف ساختاریافته',
    s3Links: '✓ رپورتاژ و لینک ادیتوریال',
    s3Badge: 'اعتبار دامنه ۸۴',
    s3Aeo: '✓ ارجاع در هوش مصنوعی',

    s4Title: ' ۰۴. ۳ برابر فروش ',
    s4Leads: 'لید و درآمد 📈',
    s4Revenue: '▲ +۳۱۲٪ سود و فروش',

    beforeLabel: 'قبل از همکاری :',
    beforeText: 'سایت کند · ورودی صفر · هزینه تبلیغات بالا · فروش اندک',
    afterLabel: 'با وب‌اِی‌بی‌سی :',
    afterText: 'سرعت ۰.۸ث · رتبه ۱ گوگل · سنگر سئو · ۳ برابر فروش و سود ✓',
    bottomTrust:
      '★ بیش از ۱۵۰ پروژه موفق · قزوین · تهران · دبی · ریاض · مسقط · آنالیز رایگان زیر ۲ ساعت',
  },
  ar: {
    title: ' ★ مسار نمو أعمالك الرقمية مع WebABC · 4 مراحل متكاملة ',
    badge: ' ✓ نتائج موثقة ',
    s1Title: ' 01. موقع فائق ',
    s1Site: '● ● ● yoursite.com',
    s1Speed: '⚡ تحميل خلال 0.8ث',
    s1Cwv: '✓ أداء الويب 100%',
    s1CtaPulse: '★ اطلب عرض سعر ◄',
    s1Cta: '★ اطلب عرض سعر ←',
    s1Mobile: '✓ متوافق مع الجوال',

    s2Title: ' 02. #1 في جوجل ',
    s2Search: 'بحث جوجل       🔍',
    s2Brand: '#1 علامتك التجارية',
    s2TopHit: '★★★★★ النتيجة الأولى',
    s2Comp1: '  #2 منافس تجاري',
    s2Comp2: '  #3 موقع ضعيف',

    s3Title: ' 03. سلطة الدومين ',
    s3Schema: 'البيانات المنظمة LD',
    s3Graph: '✓ مخطط Schema معتمد',
    s3Links: '✓ روابط خلفية قوية',
    s3Badge: 'قوة النطاق DR 84',
    s3Aeo: '✓ مصداقية محركات الذكاء',

    s4Title: ' 04. مضاعفة الأرباح ',
    s4Leads: 'عملاء ومبيعات 📈',
    s4Revenue: '▲ +312% نمو الأرباح',

    beforeLabel: 'قبل WebABC    :',
    beforeText: 'موقع بطيء · زيارات معدومة · إعلانات مكلفة · بدون أرباح',
    afterLabel: 'مع WebABC     :',
    afterText: 'سرعة 0.8ث · رتبة 1 في جوجل · سلطة قوية · 3 أضعاف المبيعات ✓',
    bottomTrust:
      '★ موثوق من 150+ شركة · دبي · الرياض · مسقط · قزوين · طهران · استشارة وتدقيق فوري < 2س',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;

  return (t) => {
    g.clear(' ', '1');

    // Outer Frame (cols 0..100, rows 0..17)
    g.box(
      0,
      0,
      meta.cols,
      meta.rows,
      'round',
      '8',
      tStrings.title,
      '0',
      tStrings.badge,
      '2'
    );

    // Active cycle across the 4 stages (every 1.6s)
    const activeStage = Math.floor(t / 1.6) % 4;
    const pulse = Math.floor(t * 6) % 2 === 0;

    // =========================================================================
    // STEP 01: FAST WEBSITE (cols 2..23, width 22, rows 2..11)
    // =========================================================================
    const s1Active = activeStage === 0;
    g.box(
      2,
      2,
      22,
      10,
      'round',
      s1Active ? '2' : '8',
      tStrings.s1Title,
      s1Active ? '2' : '0'
    );
    g.text(4, 3, tStrings.s1Site, '1');
    g.hline(3, 4, 20, '─', '8');
    g.text(4, 5, tStrings.s1Speed, '3');
    g.text(4, 6, tStrings.s1Cwv, '2');
    g.box(4, 7, 18, 3, 'single', s1Active ? '2' : '3');
    g.text(5, 8, s1Active && pulse ? tStrings.s1CtaPulse : tStrings.s1Cta, s1Active ? '2' : '0');
    g.text(4, 10, tStrings.s1Mobile, '2');

    // Animated Connector 1 -> 2 (cols 24..26)
    g.text(24, 6, s1Active ? ' ━━►' : ' ──►', s1Active ? '2' : '3');

    // =========================================================================
    // STEP 02: #1 ON GOOGLE (cols 27..48, width 22, rows 2..11)
    // =========================================================================
    const s2Active = activeStage === 1;
    g.box(
      27,
      2,
      22,
      10,
      'round',
      s2Active ? '2' : '8',
      tStrings.s2Title,
      s2Active ? '2' : '0'
    );
    g.text(29, 3, tStrings.s2Search, '1');
    g.hline(28, 4, 20, '─', '8');
    g.box(29, 5, 18, 4, 'single', '2');
    g.text(31, 6, tStrings.s2Brand, '2');
    g.text(31, 7, tStrings.s2TopHit, '4');
    g.text(29, 9, tStrings.s2Comp1, '1');
    g.text(29, 10, tStrings.s2Comp2, '7');

    // Animated Connector 2 -> 3 (cols 49..51)
    g.text(49, 6, s2Active ? ' ━━►' : ' ──►', s2Active ? '2' : '3');

    // =========================================================================
    // STEP 03: DOMAIN MOAT & AUTHORITY (cols 52..73, width 22, rows 2..11)
    // =========================================================================
    const s3Active = activeStage === 2;
    g.box(
      52,
      2,
      22,
      10,
      'round',
      s3Active ? '2' : '8',
      tStrings.s3Title,
      s3Active ? '2' : '0'
    );
    g.text(54, 3, tStrings.s3Schema, '1');
    g.hline(53, 4, 20, '─', '8');
    g.text(54, 5, tStrings.s3Graph, '6');
    g.text(54, 6, tStrings.s3Links, '3');
    g.box(54, 7, 18, 3, 'single', s3Active ? '2' : '6');
    g.text(56, 8, `★ ${tStrings.s3Badge}`, s3Active ? '2' : '6');
    g.text(54, 10, tStrings.s3Aeo, '2');

    // Animated Connector 3 -> 4 (cols 74..76)
    g.text(74, 6, s3Active ? ' ━━►' : ' ──►', s3Active ? '2' : '3');

    // =========================================================================
    // STEP 04: 3X REVENUE & ROI (cols 77..98, width 22, rows 2..11)
    // =========================================================================
    const s4Active = activeStage === 3;
    g.box(
      77,
      2,
      22,
      10,
      'round',
      s4Active ? '2' : '8',
      tStrings.s4Title,
      s4Active ? '2' : '0'
    );
    g.text(79, 3, tStrings.s4Leads, '1');
    g.hline(78, 4, 20, '─', '8');

    // 5 Rising Bar Columns (cols 80, 84, 88, 92, 96; rows 5..8)
    const heights = [1, 2, 3, 4, 4];
    for (let c = 0; c < 5; c++) {
      const bx = 80 + c * 4;
      const h = heights[c];
      const colCode = c === 4 ? '2' : c >= 2 ? '3' : '9';
      for (let r = 0; r < h; r++) {
        const by = 8 - r;
        g.text(bx, by, '███', s4Active && c === 4 && pulse ? '4' : colCode);
      }
    }
    g.hline(78, 9, 20, '─', '8');
    g.text(79, 10, tStrings.s4Revenue, '2');

    // =========================================================================
    // BOTTOM IMPACT COMPARISON BAR (rows 12..16, cols 2..98)
    // =========================================================================
    g.hline(2, 12, 97, '─', '8');

    g.text(3, 13, tStrings.beforeLabel, '1');
    g.text(18, 13, '░░░░░░░░░░░░░░░░░░░░', '7');
    g.text(41, 13, tStrings.beforeText, '1');

    g.text(3, 14, tStrings.afterLabel, '2');
    const shimmer = Math.floor(t * 12) % 20;
    for (let i = 0; i < 20; i++) {
      g.set(18 + i, 14, '█', i === shimmer ? '3' : '2');
    }
    g.text(41, 14, tStrings.afterText, '2');

    g.hline(2, 15, 97, '─', '7');
    g.text(3, 16, tStrings.bottomTrust, '4');

    return g.frame();
  };
}
