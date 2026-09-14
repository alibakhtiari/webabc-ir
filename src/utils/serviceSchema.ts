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
          '@id': `https://webabc.ir/${langVal}/#website`,
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
          { '@type': 'City', name: 'Tehran' },
          { '@type': 'City', name: 'Dubai' },
          { '@type': 'City', name: 'Muscat' },
          { '@type': 'City', name: 'Riyadh' },
          { '@type': 'City', name: 'Abu Dhabi' },
          { '@type': 'City', name: 'Qazvin' },
          { '@type': 'Country', name: 'Global' },
        ],
        offers: {
          '@type': 'Offer',
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
    ],
  };
}
