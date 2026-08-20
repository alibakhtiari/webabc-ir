import { serviceTypeMap, offerSubServicesMap, ogImageMap } from '@/config/services';

export function createServiceSchema(
  slugVal: string,
  langVal: string,
  titleVal: string,
  descVal: string,
  homeLabel: string = 'Home',
  servicesLabel: string = 'Services'
) {
  const inLang = langVal === 'en' ? 'en-US' : langVal === 'ar' ? 'ar-SA' : 'fa-IR';
  const canonicalUrl = `https://webabc.ir/${langVal}/services/${slugVal}/`;

  const selectedType =
    serviceTypeMap[slugVal]?.[langVal] || serviceTypeMap[slugVal]?.en || 'Digital Services';
  const offersList = offerSubServicesMap[slugVal]?.[langVal] ||
    offerSubServicesMap[slugVal]?.en || ['Professional Consultation', 'Custom Implementation'];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: titleVal,
        description: descVal,
        inLanguage: inLang,
        isPartOf: {
          '@id': 'https://webabc.ir/#website',
        },
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`,
        },
        mainEntity: {
          '@id': `${canonicalUrl}#service`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: titleVal,
        description: descVal,
        url: canonicalUrl,
        image: `https://webabc.ir${ogImageMap[slugVal] || '/images/og/services/web-development.webp'}`,
        serviceType: selectedType,
        category: serviceTypeMap[slugVal]?.en || 'Digital Services',
        keywords: offersList.join(', '),
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Small to medium-sized businesses and startups',
        },
        provider: {
          '@id': 'https://webabc.ir/#organization',
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'Iran',
          },
          {
            '@type': 'Country',
            name: 'Global',
          },
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${titleVal} Solutions`,
          itemListElement: offersList.map((offerName) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: offerName,
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeLabel,
            item: `https://webabc.ir/${langVal}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: servicesLabel,
            item: `https://webabc.ir/${langVal}/services/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: titleVal,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}
