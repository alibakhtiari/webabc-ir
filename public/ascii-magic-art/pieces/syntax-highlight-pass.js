import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'syntax-highlight-pass',
  name: 'Semantic Content & Entity Architecture',
  category: 'lettering',
  note: 'Structured editorial drafting, semantic H2/H3 hierarchy, and JSON-LD FAQPage pass.',
  tags: ['content', 'seo', 'copywriting', 'schema'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.6 KB',
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
    header: ' /CONTENT-ENGINE · Semantic Topic Cluster & AEO ',
    badge: ' 2,100 WORDS ',
    h1: 'Complete Technical SEO & Web Engineering Guide 2026',
    tldr: 'TL;DR: Verified architecture for sub-second Core Web Vitals.',
    h2_1: 'Entity-First Content Strategy & Intent Mapping',
    s1_1: 'Primary Keyword Density: 1.4% · Readability: Grade 8',
    s1_2: 'Internal Link Graph: 12 contextual pillar anchors',
    h2_2: 'Multilingual Parity (English / Persian / Arabic)',
    s2_1: 'Byte-identical slugs + reciprocal hreflang tags',
    s2_2: 'Markdown sibling representation: /index.md [200 OK]',
    h2_3: 'FAQPage & WebPage @id Schema Verification',
    scoreLabel: 'AEO / LLM CITATION SCORE: ',
    scoreVal: '96/100',
    schemaLabel: 'SCHEMA: ✓',
  },
  fa: {
    header: ' /موتور-محتوا · کلاستر معنایی موضوعی و AEO ',
    badge: ' ۲,۱۰۰ کلمه ',
    h1: 'راهنمای جامع سئو تکنیکال و مهندسی وب ۲۰۲۶',
    tldr: 'خلاصه: معماری تاییدشده برای شاخص‌های Core Web Vitals',
    h2_1: '۰۱. استراتژی محتوای موجودیت‌محور و نیت جستجو',
    s1_1: 'تراکم کلمات کلیدی: ۱.۴٪ (خوانایی استاندارد سطح ۸)',
    s1_2: 'گراف لینک‌سازی داخلی: ۱۲ انکرتکست ستونی زمینه‌ای',
    h2_2: '۰۲. برابری ساختار چندزبانه (انگلیسی/فارسی/عربی)',
    s2_1: 'اسلاگ‌های یکسان بایت‌به‌بایت و تگ‌های متقابل hreflang',
    s2_2: 'نسخه متنی مارک‌داون: /index.md با وضعیت [200 OK]',
    h2_3: '۰۳. اعتبارسنجی اسکیمای رسمی FAQPage و WebPage',
    scoreLabel: 'امتیاز استناد هوش مصنوعی و AEO: ',
    scoreVal: '96/100',
    schemaLabel: 'اسکیما: ✓',
  },
  ar: {
    header: ' /محرك-المحتوى · العناقيد الدلالية وسيو AEO ',
    badge: ' 2,100 كلمة ',
    h1: 'دليل السيو التقني وهندسة الويب الشامل 2026',
    tldr: 'ملخص: بنية هندسية مجربة لأعلى معايير Core Web Vitals',
    h2_1: '01. استراتيجية المحتوى الموجه بالكيانات ونية البحث',
    s1_1: 'كثافة الكلمات المفتاحية: 1.4% (سهولة القراءة: ممتازة)',
    s1_2: 'شبكة الروابط الداخلية: 12 رابطاً سياقياً رئيسياً',
    h2_2: '02. تكافؤ متعدد اللغات (الإنجليزية/الفارسية/العربية)',
    s2_1: 'معرفات روابط موحدة بالبايت ووسوم hreflang متزامنة',
    s2_2: 'تمثيل ماركداون متزامن: /index.md برمز [200 OK]',
    h2_3: '03. التحقق من صحة بيانات FAQPage و WebPage',
    scoreLabel: 'نقاط الاستشهاد في محركات AEO: ',
    scoreVal: '96/100',
    schemaLabel: 'البيانات: ✓',
  },
};

export default function create(lang = 'en') {
  const g = new Grid(meta.cols, meta.rows);
  const tStrings = TEXTS[lang] || TEXTS.en;
  const isRtl = lang === 'fa' || lang === 'ar';

  return (t) => {
    g.clear(' ', '1');

    if (isRtl) {
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
        '6'
      );

      const scanRow = 3 + (Math.floor(t * 4) % 10);

      const lines = [
        ['# ', '6', tStrings.h1, '0'],
        ['> ', '2', tStrings.tldr, '2'],
        ['', '1', '', '1'],
        ['## ', '3', tStrings.h2_1, '0'],
        ['─┤ ', '8', tStrings.s1_1, '1'],
        ['─╯ ', '8', tStrings.s1_2, '3'],
        ['## ', '3', tStrings.h2_2, '0'],
        ['─┤ ', '8', tStrings.s2_1, '1'],
        ['─╯ ', '8', tStrings.s2_2, '2'],
        ['## ', '3', tStrings.h2_3, '0'],
      ];

      for (let i = 0; i < lines.length; i++) {
        const r = 3 + i;
        const [tag, pCol, body, bCol] = lines[i];
        const highlight = r === scanRow;
        if (body) {
          const startX = 62 - body.length - (tag ? tag.length : 0);
          g.text(startX, r, body, highlight ? '2' : bCol);
        }
        if (tag) {
          const tagX = 62 - tag.length;
          g.text(tagX, r, tag, highlight ? '4' : pCol);
        }
        if (highlight) {
          g.set(63, r, '◂', '4');
        }
      }

      g.hline(2, 13, 62, '─', '8');
      g.text(3, 14, tStrings.scoreLabel, '2');
      const barX = 3 + tStrings.scoreLabel.length;
      g.bar(barX, 14, 10, 0.96, '2', '8');
      g.text(barX + 11, 14, `${tStrings.scoreVal} │ ${tStrings.schemaLabel}`, '2');
    } else {
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
        '6'
      );

      const scanRow = 3 + (Math.floor(t * 4) % 10);

      const lines = [
        ['# ', '6', tStrings.h1, '0'],
        ['> ', '2', tStrings.tldr, '2'],
        ['', '1', '', '1'],
        ['## 01. ', '3', tStrings.h2_1, '0'],
        ['   ├─ ', '8', tStrings.s1_1, '1'],
        ['   ╰─ ', '8', tStrings.s1_2, '3'],
        ['## 02. ', '3', tStrings.h2_2, '0'],
        ['   ├─ ', '8', tStrings.s2_1, '1'],
        ['   ╰─ ', '8', tStrings.s2_2, '2'],
        ['## 03. ', '3', tStrings.h2_3, '0'],
      ];

      for (let i = 0; i < lines.length; i++) {
        const r = 3 + i;
        const [prefix, pCol, body, bCol] = lines[i];
        const highlight = r === scanRow;
        if (prefix) {
          g.text(3, r, prefix, highlight ? '4' : pCol);
        }
        if (body) {
          g.text(3 + prefix.length, r, body, highlight ? '2' : bCol);
        }
        if (highlight) {
          g.set(2, r, '▸', '4');
        }
      }

      g.hline(2, 13, 62, '─', '8');
      g.text(3, 14, tStrings.scoreLabel, '2');
      const barX = 3 + tStrings.scoreLabel.length;
      g.bar(barX, 14, 10, 0.96, '2', '8');
      g.text(barX + 11, 14, `${tStrings.scoreVal} │ ${tStrings.schemaLabel}`, '2');
    }

    return g.frame();
  };
}
