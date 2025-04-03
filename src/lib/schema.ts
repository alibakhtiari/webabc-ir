
export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const createServiceSchema = (
  name: string,
  description: string,
  url: string,
  provider: string = "WebABC",
  image: string = "/og-image.png"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "url": url,
    "image": image
  };
};

export const createOrganizationSchema = (
  url: string = "https://webabc.com",
  logo: string = "/images/logo.jpg",
  contactPoint: Array<{telephone: string, contactType: string}> = []
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebABC",
    "url": url,
    "logo": logo,
    "sameAs": [
      "https://www.instagram.com/webabc",
      "https://www.linkedin.com/company/webabc",
      "https://twitter.com/webabc"
    ],
    "contactPoint": contactPoint
  };
};

export const createArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "WebABC Team"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "WebABC",
      "logo": {
        "@type": "ImageObject",
        "url": "/images/logo.jpg"
      }
    }
  };
};
