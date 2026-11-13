/**
 * Schema.org JSON-LD generation utilities for WebABC
 */

export interface OrganizationContact {
  telephone: string;
  contactType: string;
}

export function buildOrganizationSchema(url = 'https://webabc.ir', _lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${url}/#organization`,
    url: `${url}/`,
    name: 'WebABC',
    legalName: 'WebABC Web Design & SEO Agency',
    logo: `${url}/images/logo.webp`,
    image: `${url}/images/og-image.webp`,
    telephone: '+989125811880',
    email: 'info@webabc.ir',
    sameAs: [
      'https://www.linkedin.com/company/webabc',
      'https://x.com/aliib1991',
      'https://instagram.com/webabc.ir',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Qazvin Science & Technology Park, Km 2 Barajin Road',
      addressLocality: 'Qazvin',
      addressRegion: 'Qazvin',
      postalCode: '34136',
      addressCountry: 'IR',
    },
  };
}

export function buildWebSiteSchema(url = 'https://webabc.ir', lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/${lang}/#website`,
    url: `${url}/${lang}/`,
    name: 'WebABC',
    inLanguage: lang === 'en' ? 'en-US' : lang === 'ar' ? 'ar-SA' : 'fa-IR',
    publisher: { '@id': `${url}/#organization` },
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
