export interface RelatedTool {
  key: string;
  route: string;
}

export interface ToolConfig {
  category: string;
  related: RelatedTool[];
  serviceSlug: string;
}

export const toolConfigMap: Record<string, ToolConfig> = {
  'base64-encoder': {
    category: 'DeveloperApplication',
    related: [
      { key: 'tools.jsonFormatter', route: 'json-formatter' },
      { key: 'qrGenerator', route: 'qr-generator' },
      { key: 'slugGenerator', route: 'slug-generator' },
    ],
    serviceSlug: 'web-development',
  },
  'box-shadow-generator': {
    category: 'DesignApplication',
    related: [
      { key: 'glassGen', route: 'glassmorphism-generator' },
      { key: 'gradientGen', route: 'css-gradient-generator' },
      { key: 'colorContrast', route: 'color-contrast-checker' },
    ],
    serviceSlug: 'web-design',
  },
  'color-contrast-checker': {
    category: 'DesignApplication',
    related: [
      { key: 'glassGen', route: 'glassmorphism-generator' },
      { key: 'boxShadow', route: 'box-shadow-generator' },
      { key: 'gradientGen', route: 'css-gradient-generator' },
    ],
    serviceSlug: 'ui-ux-audit',
  },
  'cost-calculator': {
    category: 'BusinessApplication',
    related: [
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'serpPreview', route: 'serp-preview' },
      { key: 'readabilityChecker', route: 'readability-checker' },
    ],
    serviceSlug: 'web-development',
  },
  'css-gradient-generator': {
    category: 'DesignApplication',
    related: [
      { key: 'glassGen', route: 'glassmorphism-generator' },
      { key: 'boxShadow', route: 'box-shadow-generator' },
      { key: 'colorContrast', route: 'color-contrast-checker' },
    ],
    serviceSlug: 'web-design',
  },
  'faq-generator': {
    category: 'DeveloperApplication',
    related: [
      { key: 'schemaGenerator', route: 'schema-generator' },
      { key: 'metaGenerator', route: 'meta-generator' },
      { key: 'tools.robotsGenerator', route: 'robots-generator' },
    ],
    serviceSlug: 'content-creation',
  },
  'glassmorphism-generator': {
    category: 'BusinessApplication',
    related: [
      { key: 'gradientGen', route: 'css-gradient-generator' },
      { key: 'boxShadow', route: 'box-shadow-generator' },
      { key: 'colorContrast', route: 'color-contrast-checker' },
    ],
    serviceSlug: 'web-design',
  },
  'headline-analyzer': {
    category: 'BusinessApplication',
    related: [
      { key: 'serpPreview', route: 'serp-preview' },
      { key: 'readabilityChecker', route: 'readability-checker' },
      { key: 'tools.keywordDensity', route: 'keyword-density-analyzer' },
    ],
    serviceSlug: 'content-creation',
  },
  'json-formatter': {
    category: 'BusinessApplication',
    related: [
      { key: 'base64', route: 'base64-encoder' },
      { key: 'schemaGenerator', route: 'schema-generator' },
      { key: 'qrGenerator', route: 'qr-generator' },
    ],
    serviceSlug: 'web-development',
  },
  'keyword-density-analyzer': {
    category: 'BusinessApplication',
    related: [
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'readabilityChecker', route: 'readability-checker' },
      { key: 'metaGenerator', route: 'meta-generator' },
    ],
    serviceSlug: 'content-creation',
  },
  'lorem-generator': {
    category: 'DesignApplication',
    related: [
      { key: 'slugGenerator', route: 'slug-generator' },
      { key: 'base64', route: 'base64-encoder' },
      { key: 'qrGenerator', route: 'qr-generator' },
    ],
    serviceSlug: 'web-development',
  },
  'meta-generator': {
    category: 'DeveloperApplication',
    related: [
      { key: 'serpPreview', route: 'serp-preview' },
      { key: 'socialPreview', route: 'social-media-preview' },
      { key: 'tools.robotsGenerator', route: 'robots-generator' },
    ],
    serviceSlug: 'seo',
  },
  'paa-scraper': {
    category: 'BusinessApplication',
    related: [
      { key: 'tools.keywordDensity', route: 'keyword-density-analyzer' },
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'faqGenerator', route: 'faq-generator' },
    ],
    serviceSlug: 'content-creation',
  },
  'privacy-policy-generator': {
    category: 'BusinessApplication',
    related: [
      { key: 'tools.robotsGenerator', route: 'robots-generator' },
      { key: 'metaGenerator', route: 'meta-generator' },
      { key: 'schemaGenerator', route: 'schema-generator' },
    ],
    serviceSlug: 'web-development',
  },
  'qr-generator': {
    category: 'UtilityApplication',
    related: [
      { key: 'utmBuilder', route: 'utm-builder' },
      { key: 'slugGenerator', route: 'slug-generator' },
      { key: 'base64', route: 'base64-encoder' },
    ],
    serviceSlug: 'web-design',
  },
  'readability-checker': {
    category: 'BusinessApplication',
    related: [
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'tools.keywordDensity', route: 'keyword-density-analyzer' },
      { key: 'serpPreview', route: 'serp-preview' },
    ],
    serviceSlug: 'content-creation',
  },
  'robots-generator': {
    category: 'BusinessApplication',
    related: [
      { key: 'metaGenerator', route: 'meta-generator' },
      { key: 'schemaGenerator', route: 'schema-generator' },
      { key: 'serpPreview', route: 'serp-preview' },
    ],
    serviceSlug: 'seo',
  },
  'schema-generator': {
    category: 'DeveloperApplication',
    related: [
      { key: 'metaGenerator', route: 'meta-generator' },
      { key: 'tools.robotsGenerator', route: 'robots-generator' },
      { key: 'faqGenerator', route: 'faq-generator' },
    ],
    serviceSlug: 'seo',
  },
  'serp-preview': {
    category: 'BusinessApplication',
    related: [
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'socialPreview', route: 'social-media-preview' },
      { key: 'metaGenerator', route: 'meta-generator' },
    ],
    serviceSlug: 'seo',
  },
  'slug-generator': {
    category: 'BusinessApplication',
    related: [
      { key: 'utmBuilder', route: 'utm-builder' },
      { key: 'headlineAnalyzer', route: 'headline-analyzer' },
      { key: 'qrGenerator', route: 'qr-generator' },
    ],
    serviceSlug: 'seo',
  },
  'social-media-preview': {
    category: 'BusinessApplication',
    related: [
      { key: 'serpPreview', route: 'serp-preview' },
      { key: 'metaGenerator', route: 'meta-generator' },
      { key: 'utmBuilder', route: 'utm-builder' },
    ],
    serviceSlug: 'content-creation',
  },
  'utm-builder': {
    category: 'BusinessApplication',
    related: [
      { key: 'socialPreview', route: 'social-media-preview' },
      { key: 'slugGenerator', route: 'slug-generator' },
      { key: 'qrGenerator', route: 'qr-generator' },
    ],
    serviceSlug: 'seo',
  },
};
