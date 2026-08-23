import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const getStaticPaths = () => [
  { params: { lang: 'en' } },
  { params: { lang: 'fa' } },
  { params: { lang: 'ar' } },
];

const SITE = 'https://webabc.ir';

export const GET: APIRoute = async ({ params }) => {
  const lang = (params.lang as 'en' | 'fa' | 'ar') || 'en';

  const posts = (await getCollection('blog', (post) => post.id.startsWith(`${lang}/`)))
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title:
      lang === 'fa'
        ? 'وب اِی‌بی‌سی — وبلاگ سئو و طراحی سایت'
        : lang === 'ar'
          ? 'WebABC — مدونة السيو وتصميم المواقع'
          : 'WebABC — SEO & Web Design Blog',
    description:
      lang === 'fa'
        ? 'راهنماها، تحلیل‌ها و ابزارهای رایگان سئو، طراحی وب و توسعه وب.'
        : lang === 'ar'
          ? 'أدلة وتحليلات وأدوات مجانية للسيو وتصميم وتطوير الويب.'
          : 'Guides, analysis, and free tools for SEO, web design, and development.',
    site: `${SITE}/${lang}/`,
    items: posts.map((post) => {
      const slug = post.id.replace(/^.*?\//, '');
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.date),
        link: `/${lang}/blog/${slug}/`,
        categories: post.data.tags || [],
      };
    }),
    customData: '<language>' + (lang === 'en' ? 'en-us' : lang === 'fa' ? 'fa-ir' : 'ar-sa') + '</language>',
  });
};
