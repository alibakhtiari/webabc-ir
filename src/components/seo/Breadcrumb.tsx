"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { createBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customItems }) => {
  const { t, language } = useLanguage();
  const pathname = usePathname();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = (pathname || '').split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Add home
    items.push({
      name: t('common.home'),
      path: `/${language}`
    });

    // Filter out language segment from display
    const segmentsWithoutLanguage = pathSegments.filter(segment => segment !== language);

    // Add language-specific segments but without showing language in breadcrumb text
    if (segmentsWithoutLanguage.length > 0) {
      segmentsWithoutLanguage.forEach((segment, index) => {
        const path = `/${language}/${segmentsWithoutLanguage.slice(0, index + 1).join('/')}`;

        // Translate segment names
        let name = segment;
        const parentSegment = segmentsWithoutLanguage[index - 1];

        if (parentSegment === 'tools') {
          // Attempt to translate tool name from tools.json using camelCase key
          // Mapping for tool slugs to i18n keys
          const toolKeyMap: Record<string, string> = {
            'headline-analyzer': 'headlineAnalyzer',
            'lorem-generator': 'loremGenerator',
            'meta-generator': 'metaGenerator',
            'paa-scraper': 'paaScraper',
            'readability-checker': 'readabilityChecker',
            'serp-preview': 'serpPreview',
            'utm-builder': 'utmBuilder',
            'faq-generator': 'faqGenerator',
            'keyword-research': 'keywordResearch'
          };

          const toolKey = toolKeyMap[segment];
          if (toolKey) {
            // @ts-ignore
            const toolTitle = t(`tools.${toolKey}.title`);
            if (toolTitle && toolTitle !== `tools.${toolKey}.title`) {
              name = toolTitle;
            }
          }
        }

        switch (segment) {
          case 'services':
            name = t('common.services');
            break;
          case 'seo':
            name = t('seo.title');
            break;
          case 'web-development':
            name = t('services.webDevelopment');
            break;
          case 'local-seo':
            name = t('seo.localSeo');
            break;
          case 'wordpress-development':
            name = t('wordpress.title');
            break;
          case 'web-design':
            name = t('services.webDesign.title');
            break;
          case 'portfolio':
            name = t('common.portfolio');
            break;
          case 'about':
            name = t('common.about');
            break;
          case 'contact':
            name = t('common.contact');
            break;
          case 'case-studies':
            name = t('common.caseStudies');
            break;
          case 'tools':
            name = t('tools.title');
            break;
          case 'resources':
            name = t('common.resources');
            break;
          case 'service-areas':
            name = t('service-areas.title');
            break;
          case 'blog':
            name = t('common.blog') || 'Blog';
            break;
          default:
            // Keep name as is if not matched above or in tools check
            if (name === segment) {
              name = segment.charAt(0).toUpperCase() + segment.slice(1);
            }
        }

        items.push({ name, path });
      });
    }

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  // Create schema markup
  const schemaItems = breadcrumbItems.map(item => ({
    name: item.name,
    item: `https://webabc.ir${item.path}`
  }));

  const breadcrumbSchema = createBreadcrumbSchema(schemaItems, language);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <nav aria-label="breadcrumb" className="mb-4 pt-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 justify-center">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
