import { Grid, palette } from '../lib/kit.js';

export const meta = {
  slug: 'webabc-logo-glitch',
  name: 'WebABC Terminal Logo · Matrix Scanline Glitch',
  category: 'brand',
  note: 'Cyberpunk scanline reveal of the WebABC brandmark with matrix rain and live telemetry.',
  tags: ['brand', 'logo', 'glitch', 'matrix', 'terminal'],
  cols: 66,
  rows: 17,
  fps: 24,
  size: '3.6 KB',
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
    header: ' /BRAND · WebABC Terminal Identity [v1.0] ',
    badge: ' ● ACTIVE ',
    subhead: 'HIGH-PERFORMANCE WEB ENGINEERING & TECHNICAL SEO',
    tagline: 'ASTRO · CLOUDFLARE EDGE · CWV 99/100 · TRILINGUAL',
    status: 'SYSTEM STATUS: 100% OPERATIONAL · 0.8s LCP',
  },
  fa: {
    header: ' /هویت-برند · وب اِی‌بی‌سی در محیط ترمینال ',
    badge: ' ● فعال ',
    subhead: 'مهندسی وب با کارایی بالا و سئو تخصصی',
    tagline: 'استرو ۷ · لبه ابری کلودفلر · شاخص سرعت ۹۹ · سه‌زبانه',
    status: 'وضعیت سیستم: ۱۰۰٪ آنلاین و عملیاتی · سرعت ۰.۸ ثانیه',
  },
  ar: {
    header: ' /الهوية-البصرية · استوديو WebABC في الطرفية ',
    badge: ' ● متصل ',
    subhead: 'هندسة الويب فائقة الأداء واستشارات السيو المتقدمة',
    tagline: 'أسترو 7 · شبكة كلاودفلير · سرعة قياسية 99 · 3 لغات',
    status: 'حالة النظام: متصل بنسبة 100% · استجابة 0.8 ثانية',
  },
};

const LOGO_FONT = [
  // 5 rows of 37 characters: W  E  B  A  B  C
  '██╗    ██╗███████╗██████╗  █████╗ ██████╗  ██████╗',
  '██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝',
  '██║ █╗ ██║█████╗  ██████╔╝███████║██████╔╝██║     ',
  '██║███╗██║██╔══╝  ██╔══██╗██╔══██║██╔══██╗██║     ',
  '╚███╔███╔╝███████╗██████╔╝██║  ██║██████╔╝╚██████╗',
];

const GLITCH_CHARS = ['░', '▒', '▓', '█', '*', '+', '#', '$', '%', '&', '0', '1'];

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

    // Subtle background matrix digital rain
    for (let c = 2; c < meta.cols - 2; c += 3) {
      const dropY = Math.floor((t * 6 + c * 3.7) % 18);
      if (dropY >= 1 && dropY < meta.rows - 1) {
        const ch = (c + dropY) % 2 === 0 ? '0' : '1';
        g.set(c, dropY, ch, '7');
      }
    }

    // Scanning horizontal raster beam
    const scanRow = Math.floor(2 + ((t * 5) % 10));

    // Render large typography logo centered
    const startX = Math.floor((meta.cols - 46) / 2);
    const startY = 3;

    for (let r = 0; r < LOGO_FONT.length; r++) {
      const line = LOGO_FONT[r];
      const curY = startY + r;
      const isScan = curY === scanRow;
      const glitchActive = Math.sin(t * 12 + r) > 0.88;

      for (let c = 0; c < line.length; c++) {
        const origChar = line[c];
        if (origChar === ' ') continue;

        let charToDraw = origChar;
        let color = '0';

        if (isScan) {
          color = '2'; // Glowing green on scanline pass
        } else if (r === 2) {
          color = '3'; // Blue mid-accent
        } else if (r === 0 || r === 4) {
          color = '6'; // Purple accents
        }

        if (glitchActive && Math.random() < 0.22) {
          charToDraw = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          color = '4'; // Amber glitch flicker
        }

        g.set(startX + c, curY, charToDraw, color);
      }
    }

    // Accent line divider
    const divY = 9;
    const pulseLen = Math.floor(18 + Math.sin(t * 3) * 6);
    const divStart = Math.floor((meta.cols - pulseLen) / 2);
    for (let i = 0; i < pulseLen; i++) {
      g.set(divStart + i, divY, i % 2 === 0 ? '━' : '═', '8');
    }
    g.set(divStart + Math.floor(pulseLen / 2), divY, '✦', '2');

    // Localized Subheading
    const subX = Math.max(2, Math.floor((meta.cols - loc.subhead.length) / 2));
    g.text(subX, 11, loc.subhead, '0');

    // Localized Tagline & Framework pill
    const tagX = Math.max(2, Math.floor((meta.cols - loc.tagline.length) / 2));
    g.text(tagX, 13, loc.tagline, '3');

    // Footer telemetry bar
    g.hline(1, 14, meta.cols - 2, '─', '7');
    const statX = Math.max(2, Math.floor((meta.cols - loc.status.length) / 2));
    g.text(statX, 15, loc.status, '2');

    return g.frame();
  };
}
