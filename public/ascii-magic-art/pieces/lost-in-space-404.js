import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'lost-in-space-404',
  name: '404 Signal Lost & Route Recovery',
  category: 'status',
  note: '404 signal recovery, HTTP status code art, and intelligent routing fallbacks.',
  tags: ['404', 'status', 'error', 'system'],
  cols: 70,
  rows: 15,
  fps: 24,
  size: '2.9 KB',
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
    header: ' ╭─ /ERROR-404 · lost-in-space-404.js ─╮ ',
    badge: ' STATUS 404 ',
    signal: '[SIGNAL LOST]',
    route: 'ROUTE_MISSING',
    status: 'STATUS: 404',
    fallback: '→ Fallback: /en/ · /fa/ · /ar/ · /llms.txt · /sitemap-index.xml',
    active: '✓ Agent Content-Negotiation: Accept: text/markdown [ACTIVE]',
  },
  fa: {
    header: ' ╭─ /خطای-۴۰۴ · صفحه مورد نظر پیدا نشد ─╮ ',
    badge: ' کد ۴۰۴ ',
    signal: '[سیگنال ناموجود]',
    route: 'مسیر_یافت_نشد',
    status: 'وضعیت: ۴۰۴',
    fallback: '← صفحات در دسترس: /fa/ · /en/ · /ar/ · نقشه سایت',
    active: '✓ بازگشت به صفحه اصلی یا استفاده از ابزارهای رایگان',
  },
  ar: {
    header: ' ╭─ /خطأ-۴۰۴ · الصفحة المطلوبة غير موجودة ─╮ ',
    badge: ' رمز ۴۰۴ ',
    signal: '[انقطاع المسار]',
    route: 'الصفحة_مفقودة',
    status: 'الحالة: ۴۰۴',
    fallback: '← الروابط المتاحة: /ar/ · /en/ · /fa/ · خريطة الموقع',
    active: '✓ يمكنك العودة للرئيسية أو استخدام الأدوات المجانية',
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
      70,
      15,
      'round',
      '8',
      tStrings.header,
      '5',
      tStrings.badge,
      '4'
    );

    // Starfield in background
    for (let i = 0; i < 28; i++) {
      const sx = (i * 17 + Math.floor(t * 4)) % 66 + 2;
      const sy = (i * 7 + 3) % 11 + 2;
      const ch = (i + Math.floor(t * 2)) % 3 === 0 ? '✦' : '·';
      g.set(sx, sy, ch, '7');
    }

    // Centered 404 block with orbit satellite
    const satX = Math.round(35 + Math.cos(t * 2.5) * 24);
    const satY = Math.round(5 + Math.sin(t * 2.5) * 2.5);
    g.text(satX - 2, satY, '◄[404]►', '4');

    g.text(16, 4, `█▀▀█  █▀▀█  █▀▀█     ${tStrings.signal}`, '4');
    g.text(16, 5, `──▀█  █▄▀█  ──▀█     ${tStrings.route}`, '0');
    g.text(16, 6, `  █   █▄▄█    █      ${tStrings.status}`, '5');

    g.hline(4, 8, 62, '─', '8');
    const blink = Math.floor(t * 3) % 2 === 0 ? '█' : ' ';
    g.text(6, 9, `$ curl -I https://webabc.ir/missing-path ${blink}`, '3');
    g.text(6, 10, tStrings.fallback, '2');
    g.text(6, 12, tStrings.active, '6');

    return g.frame();
  };
}
