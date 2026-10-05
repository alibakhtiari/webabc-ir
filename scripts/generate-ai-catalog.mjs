import fs from 'node:fs';
import path from 'node:path';
import { toolConfigMap } from '../src/config/tools.ts';

const root = process.cwd();
const ORIGIN = 'https://webabc.ir';
const LOCALES = ['en', 'fa', 'ar'];

const dataPath = path.join(root, 'scripts/llms-index.data.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Validate toolConfigMap
const expectedTools = Object.keys(toolConfigMap);
if (expectedTools.length !== 21) {
  throw new Error(`Expected 21 tools in toolConfigMap, found ${expectedTools.length}`);
}

// 2. Extract tools and services across locales
const catalogTools = {};
const catalogServices = {};

for (const lang of LOCALES) {
  const rawLocaleTools = rawData.tools?.[lang] || [];
  const rawLocaleServices = rawData.services?.[lang] || [];

  // Filter out the overview page (/${lang}/tools/) to extract the 21 interactive tools
  const interactiveTools = rawLocaleTools.filter((t) => {
    const cleanPath = t.u.replace(/\/+$/, '');
    return cleanPath !== `/${lang}/tools`;
  });

  if (interactiveTools.length !== 21) {
    throw new Error(
      `Locale ${lang}: expected 21 interactive tools, got ${interactiveTools.length}`
    );
  }

  // Verify all 21 tools from toolConfigMap are present
  const extractedSlugs = new Set();
  catalogTools[lang] = interactiveTools.map((entry) => {
    const slug = entry.u.split('/').filter(Boolean).pop();
    if (!slug || !toolConfigMap[slug]) {
      throw new Error(`Locale ${lang}: unknown tool slug '${slug}' for url '${entry.u}'`);
    }
    extractedSlugs.add(slug);
    const config = toolConfigMap[slug];

    return {
      id: slug,
      slug,
      title: entry.t,
      description: entry.d,
      category: config.category,
      serviceSlug: config.serviceSlug,
      url: entry.u.startsWith('http') ? entry.u : `${ORIGIN}${entry.u}`,
      canonicalUrl: entry.u.startsWith('http') ? entry.u : `${ORIGIN}${entry.u}`,
      path: entry.u,
      t: entry.t,
      u: entry.u,
      d: entry.d,
    };
  });

  for (const expectedSlug of expectedTools) {
    if (!extractedSlugs.has(expectedSlug)) {
      throw new Error(`Locale ${lang} missing tool from toolConfigMap: '${expectedSlug}'`);
    }
  }

  // Verify 12 services
  if (rawLocaleServices.length !== 12) {
    throw new Error(
      `Locale ${lang}: expected 12 services, got ${rawLocaleServices.length}`
    );
  }

  catalogServices[lang] = rawLocaleServices.map((entry) => {
    const parts = entry.u.split('/').filter(Boolean);
    const slug = parts.length > 2 ? parts[2] : (parts[1] || 'services');
    const isOverview = entry.u.replace(/\/+$/, '') === `/${lang}/services`;

    return {
      id: isOverview ? 'services' : slug,
      slug: isOverview ? 'services' : slug,
      title: entry.t,
      description: entry.d,
      category: isOverview ? 'ServiceDirectory' : 'ProfessionalService',
      url: entry.u.startsWith('http') ? entry.u : `${ORIGIN}${entry.u}`,
      canonicalUrl: entry.u.startsWith('http') ? entry.u : `${ORIGIN}${entry.u}`,
      path: entry.u,
      t: entry.t,
      u: entry.u,
      d: entry.d,
    };
  });
}

const catalog = {
  $schema: 'https://webabc.ir/schemas/ai-catalog.json',
  metadata: {
    name: 'WebABC AI Discovery Catalog',
    description: 'Agentic catalogue of WebABC interactive tools and core services for AI crawlers, agents, and LLMs.',
    version: '1.0.0',
    homepage: `${ORIGIN}/`,
    canonical: `${ORIGIN}/ai-catalog.json`,
    updated: '2026-10-05',
    locales: LOCALES,
    toolsCount: 21,
    servicesCount: 12,
  },
  tools: catalogTools,
  services: catalogServices,
};

const outPath = path.join(root, 'public/ai-catalog.json');
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`Generated ${outPath} (21 tools, 12 services across en/fa/ar)`);

// If dist/ directory already exists, also keep it in sync
const distPath = path.join(root, 'dist/ai-catalog.json');
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.writeFileSync(distPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  console.log(`Synced ${distPath}`);
}
