import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ does not exist. Run astro build first.');
  process.exit(1);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeMd(relPath, content) {
  const absPath = path.join(distDir, relPath);
  ensureDir(absPath);
  fs.writeFileSync(absPath, content.trim() + '\n', 'utf8');
}

function parseMdx(fileContent) {
  if (!fileContent.startsWith('---')) {
    return { frontmatter: {}, body: fileContent };
  }
  const end = fileContent.indexOf('\n---', 3);
  if (end === -1) {
    return { frontmatter: {}, body: fileContent };
  }
  const fmRaw = fileContent.slice(3, end).trim();
  const body = fileContent.slice(end + 4).trim();
  const frontmatter = {};
  for (const line of fmRaw.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
        val = val.slice(1, -1);
      }
      frontmatter[key] = val;
    }
  }
  return { frontmatter, body };
}

let generatedCount = 0;

// 1. 404 Markdown
const public404 = path.join(root, 'public/404.md');
if (fs.existsSync(public404)) {
  const c404 = fs.readFileSync(public404, 'utf8');
  writeMd('404.md', c404);
  generatedCount++;
}

// 2. Blog Posts
const blogDir = path.join(root, 'src/content/blog');
if (fs.existsSync(blogDir)) {
  for (const lang of ['en', 'fa', 'ar']) {
    const langDir = path.join(blogDir, lang);
    if (!fs.existsSync(langDir)) continue;
    const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
    for (const f of files) {
      const slug = f.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(langDir, f), 'utf8');
      const { frontmatter, body } = parseMdx(raw);
      const title = frontmatter.title || slug;
      const desc = frontmatter.description ? `\n> ${frontmatter.description}\n` : '';
      const md = `# ${title}\n${desc}\n${body}\n\n---\n*WebABC Agency: https://webabc.ir/${lang}/blog/${slug}/*\n`;
      
      writeMd(`${lang}/blog/${slug}/index.md`, md);
      writeMd(`${lang}/blog/${slug}.md`, md);
      generatedCount += 2;
    }
  }
}

// 3. Portfolio Projects
const portfolioDir = path.join(root, 'src/content/portfolio');
if (fs.existsSync(portfolioDir)) {
  for (const lang of ['en', 'fa', 'ar']) {
    const langDir = path.join(portfolioDir, lang);
    if (!fs.existsSync(langDir)) continue;
    const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
    for (const f of files) {
      const slug = f.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(langDir, f), 'utf8');
      const { frontmatter, body } = parseMdx(raw);
      const title = frontmatter.title || slug;
      const desc = frontmatter.description ? `\n> ${frontmatter.description}\n` : '';
      const md = `# ${title}\n${desc}\n${body}\n\n---\n*WebABC Case Study: https://webabc.ir/${lang}/portfolio/${slug}/*\n`;

      writeMd(`${lang}/portfolio/${slug}/index.md`, md);
      writeMd(`${lang}/portfolio/${slug}.md`, md);
      generatedCount += 2;
    }
  }
}

// 4. Homepage Markdown representations
const enHomeMd = `# WebABC — Premier Web Design, Custom Development & SEO Agency

> WebABC (https://webabc.ir) is a premier full-stack web engineering, performance SEO, and AI engine optimization (AEO/GEO) agency serving international businesses and Middle Eastern enterprises across Dubai, Riyadh, Abu Dhabi, Muscat, Tehran, and Qazvin.

## Core Capabilities
- **Astro & TypeScript Web Development**: Sub-second TTFB, zero superfluous client-side JavaScript, responsive UI design systems with Tailwind CSS.
- **Enterprise SEO & AEO**: Technical site audits, Google Core Web Vitals optimization, entity-graph Schema.org structured data, and high-CTR snippet targeting.
- **Local SEO & Middle East Growth**: Google Maps 3-Pack, local business directory management, and verified localized citations across the GCC and Iran.
- **E-commerce & Web Applications**: Fast, high-conversion headless stores, custom checkout flows, and payment integrations.
- **Free Developer & SEO Tools**: 23 zero-install client-side utilities including Headline Analyzer & SERP Preview, Website Cost Calculator, and Schema Generator.

## Geographic Service Hubs
- **Dubai, UAE**: https://webabc.ir/en/service-areas/dubai/
- **Riyadh, Saudi Arabia**: https://webabc.ir/en/service-areas/riyadh/
- **Abu Dhabi, UAE**: https://webabc.ir/en/service-areas/abu-dhabi/
- **Muscat, Oman**: https://webabc.ir/en/service-areas/muscat/
- **Tehran, Iran**: https://webabc.ir/en/service-areas/tehran/
- **Qazvin, Iran**: https://webabc.ir/en/service-areas/qazvin/

## Key Resources
- **Machine-readable Agent Guide**: https://webabc.ir/llms.txt
- **Full Text Corpus**: https://webabc.ir/llms-full.txt
- **All Services**: https://webabc.ir/en/services/
- **Interactive Tools**: https://webabc.ir/en/tools/
- **Portfolio & Case Studies**: https://webabc.ir/en/portfolio/
- **Pricing Calculator**: https://webabc.ir/en/tools/cost-calculator/
- **Contact & Free Consultation**: https://webabc.ir/en/contact/

## Frequently Asked Questions
1. **What services does WebABC provide?** Web design, custom web development (Astro, React, Node.js), WordPress & WooCommerce, SEO, UI/UX audits, speed optimization, and ongoing maintenance.
2. **Do you work internationally?** Yes — we operate in English, Persian, and Arabic, serving clients across the Middle East, Europe, and North America.
3. **How much does a typical project cost?** Check our instant interactive pricing tool at https://webabc.ir/en/tools/cost-calculator/ or contact us for an itemized quote.
`;

const faHomeMd = `# وب اِی‌بی‌سی (WebABC) — شرکت طراحی سایت، توسعه وب اختصاصی و سئو پیشرفته

> وب اِی‌بی‌سی (https://webabc.ir/fa/) مجری تخصصی پروژه‌های طراحی وب‌سایت مدرن با فریم‌ورک آسترو (Astro)، سئو تکنیکال، بهینه‌سازی برای هوش مصنوعی (AEO/GEO) و سئو محلی در تهران، قزوین، دبی و کشورهای حوزه خلیج فارس است.

## خدمات کلیدی
- **طراحی و توسعه اختصاصی وب**: توسعه با Astro، React، TypeScript و Tailwind CSS با سرعت لود زیر ۱ ثانیه و بالاترین امتیاز Core Web Vitals.
- **سئو تخصصی و رشد ارگانیک**: سئو تکنیکال، لینک‌سازی اصولی، داده‌های ساختاریافته Schema.org و بهبود نرخ کلیک (CTR).
- **سئو محلی و رتبه ۱ نقشه**: ثبت و رتبه‌گیری در Google Maps، نشان و بلد برای کسب‌وکارهای تهران، قزوین و منطقه خلیج فارس.
- **طراحی فروشگاه اینترنتی**: پلتفرم‌های فروشگاهی سریع با تجربه کاربری روان و اتصال به درگاه‌های بانکی.
- **ابزارهای آنلاین رایگان**: ۲۳ ابزار بدون نیاز به نصب شامل تحلیلگر تیتر سئو و پیش‌نمایش گوگل، ماشین‌حساب هزینه طراحی سایت و سازنده اسکیما.

## دفاتر و مناطق تحت پوشش
- **قزوین (دفتر مرکزی و شهرک‌های صنعتی کاسپین و لیا)**: https://webabc.ir/fa/service-areas/qazvin/
- **تهران**: https://webabc.ir/fa/service-areas/tehran/
- **دبی و امارات**: https://webabc.ir/fa/service-areas/dubai/

## ارتباط با ما
- **ایمیل**: info@webabc.ir
- **مشاوره رایگان و برآورد هزینه**: https://webabc.ir/fa/contact/
- **ماشین‌حساب آنلاین قیمت**: https://webabc.ir/fa/tools/cost-calculator/
`;

const arHomeMd = `# ويب إيه بي سي (WebABC) — تصميم وتطوير المواقع وتحسين محركات البحث

> شركة ويب إيه بي سي (https://webabc.ir/ar/) هي وكالة رائدة في تصميم وتطوير تطبيقات الويب المخصصة، السيو التقني، وتحسين محركات الذكاء الاصطناعي (AEO/GEO) لخدمة الشركات في دبي، الرياض، مسقط، وأبوظبي.

## الخدمات الرئيسية
- **تطوير المواقع المخصصة**: بناء مواقع فائقة السرعة باستخدام Astro وTypeScript مع زمن تحميل أقل من ثانية وتوافق تام مع اللغة العربية (RTL).
- **السيو والنمو العضوي**: تحسين البنية التقنية، البيانات المنظمة Schema.org، وتصدر نتائج محركات البحث والذكاء الاصطناعي.
- **السيو المحلي وخرائط جوجل**: تصدر حزمة النتائج الثلاثية في خرائط Google وإدارة الملفات التجارية في الخليج.
- **المتاجر الإلكترونية**: متاجر متكاملة وسريعة متوافقة مع بوابات الدفع المحلية.
- **أدوات السيو والتطوير المجانية**: أكثر من 20 أداة تفاعلية تشمل محلل عناوين السيو، حاسبة التكلفة، ومولد أكواد السكيما.

## الأسواق الإقليمية
- **دبي، الإمارات**: https://webabc.ir/ar/service-areas/dubai/
- **الرياض، السعودية**: https://webabc.ir/ar/service-areas/riyadh/
- **مسقط، عمان**: https://webabc.ir/ar/service-areas/muscat/
- **أبوظبي، الإمارات**: https://webabc.ir/ar/service-areas/abu-dhabi/

## التواصل
- **البريد الإلكتروني**: info@webabc.ir
- **طلب استشارة مجانية**: https://webabc.ir/ar/contact/
- **حاسبة تكلفة المشاريع**: https://webabc.ir/ar/tools/cost-calculator/
`;

writeMd('index.md', enHomeMd);
writeMd('en/index.md', enHomeMd);
writeMd('en.md', enHomeMd);

writeMd('fa/index.md', faHomeMd);
writeMd('fa.md', faHomeMd);

writeMd('ar/index.md', arHomeMd);
writeMd('ar.md', arHomeMd);
generatedCount += 7;

// 5. Hub Pages (Services, Tools, Portfolio, About, Contact, FAQ, Privacy)
const HUBS = [
  {
    path: 'services',
    titleEn: 'Core Web Design & SEO Services',
    titleFa: 'خدمات تخصصی طراحی سایت و سئو',
    titleAr: 'خدمات تصميم المواقع والسيو',
    descEn: 'Comprehensive directory of WebABC services: Web Development, SEO, Local SEO, E-commerce, WordPress, UI/UX Audits, and Speed Optimization.',
    descFa: 'فهرست خدمات وب اِی‌بی‌سی شامل توسعه وب، سئو تکنیکال، سئو محلی، وردپرس، ممیزی تجربه کاربری و بهینه‌سازی سرعت.',
    descAr: 'دليل خدمات ويب إيه بي سي: تطوير الويب، السيو، السيو المحلي، المتاجر الإلكترونية، وتدقيق تجربة المستخدم.'
  },
  {
    path: 'tools',
    titleEn: 'Free Online Developer & SEO Tools',
    titleFa: 'ابزارهای آنلاین رایگان سئو و توسعه وب',
    titleAr: 'أدوات مجانية للمطورين والسيو',
    descEn: '23 zero-install client-side utilities including Headline Analyzer & SERP Preview Simulator, Cost Calculator, Schema Generator, and Readability Checker.',
    descFa: '۲۳ ابزار آنلاین و رایگان شامل تحلیلگر تیتر سئو و پیش‌نمایش گوگل، ماشین‌حساب هزینه طراحی سایت، سازنده اسکیما و چکر خوانایی.',
    descAr: 'أكثر من 20 أداة تفاعلية مجانية تشمل محلل عناوين السيو، حاسبة تكلفة المواقع، ومولد ترميز السكيما.'
  },
  {
    path: 'portfolio',
    titleEn: 'Client Portfolio & Case Studies',
    titleFa: 'نمونه کارها و مطالعات موردی',
    titleAr: 'سجل الأعمال ودراسات الحالة',
    descEn: 'Real results and case studies demonstrating organic ranking gains, conversion boosts, and custom web architectures.',
    descFa: 'نمونه کارهای موفق وب اِی‌بی‌سی با رشد ترافیک ارگانیک، رتبه ۱ گوگل و پلتفرم‌های پرسرعت.',
    descAr: 'دراسات حالة عملية توضح نمو الزيارات العضوية وتصدر نتائج البحث.'
  },
  {
    path: 'about',
    titleEn: 'About WebABC Agency',
    titleFa: 'درباره شرکت وب اِی‌بی‌سی',
    titleAr: 'عن شركة ويب إيه بي سي',
    descEn: 'Our engineering principles, full-stack tech stack (Astro, TypeScript, Cloudflare), and dedicated team profile.',
    descFa: 'آشنایی با تیم فنی وب اِی‌بی‌سی، استانداردها و تکنولوژی‌های توسعه وب مدرن.',
    descAr: 'تعرف على فريق ويب إيه بي سي ومعاييرنا الهندسية في بناء الويب الحديث.'
  },
  {
    path: 'contact',
    titleEn: 'Contact WebABC & Free Consultation',
    titleFa: 'تماس با ما و مشاوره رایگان',
    titleAr: 'تواصل معنا واستشارة مجانية',
    descEn: 'Book a consultation or submit your project details for an itemized timeline and estimate. Direct email: info@webabc.ir',
    descFa: 'جهت دریافت مشاوره رایگان یا استعلام قیمت پروژه خود با کارشناسان وب اِی‌بی‌سی در ارتباط باشید. ایمیل: info@webabc.ir',
    descAr: 'تواصل مع فريقنا للحصول على استشارة فنية مجانية وعرض سعر مخصص. البريد: info@webabc.ir'
  },
  {
    path: 'faq',
    titleEn: 'Frequently Asked Questions (FAQ)',
    titleFa: 'سوالات متداول',
    titleAr: 'الأسئلة الشائعة',
    descEn: 'Answers regarding our development timelines, pricing formulas, technologies, and post-launch maintenance.',
    descFa: 'پاسخ به سوالات پرتکرار درباره مدت زمان تحویل، قیمت‌گذاری، تکنولوژی‌ها و پشتیبانی فنی.',
    descAr: 'إجابات حول الجداول الزمنية لتسليم المشاريع، نماذج التسعير، والتقنيات المستخدمة.'
  },
  {
    path: 'privacy',
    titleEn: 'Privacy Policy',
    titleFa: 'سیاست حفظ حریم خصوصی',
    titleAr: 'سياسة الخصوصية',
    descEn: 'GDPR-compliant data protection and privacy policy for WebABC visitors and clients.',
    descFa: 'خط‌مشی رازداری و حفظ حریم خصوصی کاربران و مشتریان وب اِی‌بی‌سی.',
    descAr: 'سياسة حماية البيانات والخصوصية المتبعة في ويب إيه بي سي.'
  },
  {
    path: 'service-areas',
    titleEn: 'Service Areas & Regional Coverage',
    titleFa: 'مناطق تحت پوشش خدمات',
    titleAr: 'المناطق والمدن المشمولة',
    descEn: 'Local offices and targeted services across Dubai, Riyadh, Abu Dhabi, Muscat, Tehran, and Qazvin.',
    descFa: 'مناطق و شهرهای تحت پوشش خدمات سئو و طراحی سایت در ایران و کشورهای حوزه خلیج فارس.',
    descAr: 'التغطية الإقليمية لخدماتنا في دبي، الرياض، مسقط، وأبوظبي.'
  }
];

for (const hub of HUBS) {
  const mdEn = `# ${hub.titleEn}\n\n> ${hub.descEn}\n\nFor details visit https://webabc.ir/en/${hub.path}/\nOr read the machine-readable catalog at https://webabc.ir/llms.txt\n`;
  const mdFa = `# ${hub.titleFa}\n\n> ${hub.descFa}\n\nبرای مشاهده کامل به https://webabc.ir/fa/${hub.path}/ مراجعه کنید.\nیا راهنمای جامع را در https://webabc.ir/llms.txt مطالعه نمایید.\n`;
  const mdAr = `# ${hub.titleAr}\n\n> ${hub.descAr}\n\nللمزيد يرجى زيارة https://webabc.ir/ar/${hub.path}/\nأو قراءة الدليل على https://webabc.ir/llms.txt\n`;

  writeMd(`en/${hub.path}/index.md`, mdEn);
  writeMd(`en/${hub.path}.md`, mdEn);
  writeMd(`fa/${hub.path}/index.md`, mdFa);
  writeMd(`fa/${hub.path}.md`, mdFa);
  writeMd(`ar/${hub.path}/index.md`, mdAr);
  writeMd(`ar/${hub.path}.md`, mdAr);
  generatedCount += 6;
}

// 6. Regional service area cities
const CITIES = ['dubai', 'riyadh', 'abu-dhabi', 'muscat', 'tehran', 'qazvin'];
for (const city of CITIES) {
  const name = city.charAt(0).toUpperCase() + city.slice(1);
  const cityEn = `# Web Design & SEO Services in ${name}\n\n> Specialized localized web engineering, Core Web Vitals optimization, and Google Maps 3-Pack SEO in ${name}.\n\nVisit: https://webabc.ir/en/service-areas/${city}/\n`;
  const cityFa = `# خدمات طراحی سایت و سئو در ${city === 'qazvin' ? 'قزوین' : city === 'tehran' ? 'تهران' : name}\n\n> خدمات تخصصی طراحی پلتفرم وب، سئو تکنیکال و رتبه یک نقشه گوگل در ${city === 'qazvin' ? 'قزوین' : city === 'tehran' ? 'تهران' : name}.\n\nآدرس: https://webabc.ir/fa/service-areas/${city}/\n`;
  const cityAr = `# خدمات تصميم المواقع والسيو في ${name}\n\n> تطوير مواقع مخصصة فائقة السرعة وتصدر خرائط جوجل في ${name}.\n\nالرابط: https://webabc.ir/ar/service-areas/${city}/\n`;

  writeMd(`en/service-areas/${city}/index.md`, cityEn);
  writeMd(`en/service-areas/${city}.md`, cityEn);
  writeMd(`fa/service-areas/${city}/index.md`, cityFa);
  writeMd(`fa/service-areas/${city}.md`, cityFa);
  writeMd(`ar/service-areas/${city}/index.md`, cityAr);
  writeMd(`ar/service-areas/${city}.md`, cityAr);
  generatedCount += 6;
}

console.log(`Successfully generated ${generatedCount} markdown representations in dist/.`);
