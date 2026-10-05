import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ORIGIN = 'https://webabc.ir';
const LOCALES = ['en', 'fa', 'ar'];

const TITLES = { en: 'WebABC', fa: 'وب اِی‌بی‌سی', ar: 'ويب إيه بي سي' };

const SECTIONS = [
  { key: 'company', en: 'Company & Overview', fa: 'شرکت و معرفی کلی', ar: 'الشركة والنظرة العامة' },
  { key: 'services', en: 'Core Services', fa: 'خدمات اصلی', ar: 'الخدمات الأساسية' },
  {
    key: 'serviceAreas',
    en: 'Geographic Service Areas (GEO / Localized Hubs)',
    fa: 'مناطق خدمات (مراکز محلی و GEO)',
    ar: 'مناطق الخدمة (المراكز المحلية و GEO)',
  },
  {
    key: 'tools',
    en: 'Interactive Tools (Free Developer & SEO Utilities)',
    fa: 'ابزارهای تعاملی (ابزارهای رایگان توسعه و سئو)',
    ar: 'الأدوات التفاعلية (أدوات مجانية للمطورين وSEO)',
  },
  {
    key: 'portfolio',
    en: 'Case Studies & Portfolio',
    fa: 'نمونه‌کارها و مطالعات موردی',
    ar: 'أعمال الحالة ودراسات المشروع',
  },
  {
    key: 'blog',
    en: 'Research, Guides & Insights (Blog)',
    fa: 'پژوهش‌ها، راهنماها و مقالات (بلاگ)',
    ar: 'الأبحاث والأدلة والمقالات (المدونة)',
  },
];

const CONTACT_TITLE = {
  en: 'Direct Contact & Support',
  fa: 'تماس مستقیم و پشتیبانی',
  ar: 'الاتصال والدعم المباشر',
};

const CONTACT = {
  en: ['Email: info@webabc.ir', `Support & Inquiry: ${ORIGIN}/en/contact/`, `Website: ${ORIGIN}`],
  fa: ['ایمیل: info@webabc.ir', `پشتیبانی و پرسش: ${ORIGIN}/fa/contact/`, `وب‌سایت: ${ORIGIN}`],
  ar: [
    'البريد الإلكتروني: info@webabc.ir',
    `الدعم والاستفسارات: ${ORIGIN}/ar/contact/`,
    `الموقع الإلكتروني: ${ORIGIN}`,
  ],
};

// Root hub: a language router whose English core stays curated (~20-50 URLs),
// per the llmstxt.org guidance on token efficiency.
const ROOT_BRIEF =
  `> WebABC (${ORIGIN}) is a premier web design, full-stack custom development, performance SEO, ` +
  'and AI engine optimization (AEO/GEO) agency serving the Middle East (Dubai, Tehran, Muscat, Riyadh, ' +
  'Abu Dhabi, Qazvin) and international markets. This root file is the language router: each locale ' +
  'publishes its own canonical index.';

const ROOT_LANGS = [
  `[English Documentation & Resources](${ORIGIN}/en/llms.txt): English index covering services, tools, and research.`,
  `[مستندات و خدمات فارسی](${ORIGIN}/fa/llms.txt): فهرست کامل خدمات، ابزارها و راهنماها به زبان فارسی.`,
  `[الفهرس العربي](${ORIGIN}/ar/llms.txt): الفهرس الكامل باللغة العربية.`,
].map((l) => `- ${l}`);

// Curated English subset for the root hub, not the full /en/ index.
const ROOT_CORE = [
  '/en/',
  '/en/about/',
  '/en/contact/',
  '/en/faq/',
  '/en/services/',
  '/en/services/seo/',
  '/en/services/local-seo/',
  '/en/services/web-development/',
  '/en/services/web-design/',
  '/en/services/wordpress-development/',
  '/en/services/content-creation/',
  '/en/service-areas/',
  '/en/service-areas/dubai/',
  '/en/service-areas/tehran/',
  '/en/service-areas/riyadh/',
  '/en/tools/',
  '/en/tools/cost-calculator/',
  '/en/tools/robots-generator/',
  '/en/tools/headline-analyzer/',
  '/en/tools/schema-generator/',
  '/ai-catalog.json',
  '/en/portfolio/',
  '/en/blog/',
];

/** Markdown link targets resolve unambiguously when absolute. Backticked code stays verbatim. */
const absolute = (md) => md.replace(/\]\(\//g, `](${ORIGIN}/`);

const data = JSON.parse(fs.readFileSync(path.join(root, 'scripts/llms-index.data.json'), 'utf8'));

const guidance = {};
for (const lang of LOCALES) {
  const p = path.join(root, 'src/i18n', lang, 'llms-guidance.md');
  if (!fs.existsSync(p)) throw new Error(`missing guidance file: ${p}`);
  guidance[lang] = fs.readFileSync(p, 'utf8').replace(/\s+$/, '');
}

const bullet = (entry) => {
  const url = entry.u.startsWith('http') ? entry.u : `${ORIGIN}${entry.u}`;
  return `- [${entry.t}](${url}): ${entry.d}`;
};

const missing = [];
for (const lang of LOCALES) {
  const parts = [`# ${TITLES[lang]}\n\n${absolute(guidance[lang])}`];

  for (const s of SECTIONS) {
    const entries = data[s.key]?.[lang];
    if (!entries?.length) throw new Error(`no entries for ${s.key}/${lang}`);
    parts.push(`## ${s[lang]}\n\n${entries.map(bullet).join('\n')}`);
  }

  parts.push(`## ${CONTACT_TITLE[lang]}\n\n${CONTACT[lang].map((l) => `- ${l}`).join('\n')}`);

  const out = `${parts
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`;
  const dir = path.join(root, 'public', lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'llms.txt'), out, 'utf8');
}

// Root hub: router + curated English core + the full agent guidance (so the
// English fallback stays useful to a crawler that never follows the chooser).
const enIndex = fs.readFileSync(path.join(root, 'public/en/llms.txt'), 'utf8');
const guidanceStart = enIndex.indexOf('## When to Use This (Agent Guidance)');
if (guidanceStart === -1) throw new Error('en guidance section not found in /en/llms.txt');
const enGuidance = enIndex.slice(guidanceStart, enIndex.indexOf('\n## ', guidanceStart + 4));

const findEntry = (url) => {
  for (const key of Object.keys(data)) {
    const hit = data[key].en?.find((e) => e.u === url);
    if (hit) return hit;
  }
  return null;
};

const core = [];
for (const url of ROOT_CORE) {
  const hit = findEntry(url);
  if (hit) core.push(bullet(hit));
  else missing.push(url);
}
if (missing.length)
  console.warn(`root core: ${missing.length} curated URL(s) not found: ${missing.join(', ')}`);

const rootOut = [
  `# WebABC\n\n${ROOT_BRIEF}`,
  `## Available Languages\n\n${ROOT_LANGS.join('\n')}`,
  `## Core Global Content (English)\n\n${core.join('\n')}`,
  enGuidance.trimEnd(),
  `## Direct Contact & Support\n\n${CONTACT.en.map((l) => `- ${l}`).join('\n')}`,
].join('\n\n');

fs.writeFileSync(path.join(root, 'public/llms.txt'), `${rootOut}\n`, 'utf8');

// Parity is structural: the generator refuses to ship unbalanced indexes.
const counts = {};
for (const s of SECTIONS) {
  counts[s.key] = LOCALES.map((l) => data[s.key][l].length);
  if (new Set(counts[s.key]).size !== 1)
    throw new Error(`parity gap in ${s.key}: ${counts[s.key].join('/')}`);
}

console.log(
  `Generated llms.txt (root, ${Buffer.byteLength(rootOut, 'utf8')} bytes) and ${LOCALES.join('/')} indexes: ` +
    SECTIONS.map((s) => `${s.key} ${counts[s.key][0]}`).join(', ')
);
