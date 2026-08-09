#!/usr/bin/env node
/**
 * CrUX Monitoring — fetch Core Web Vitals from Chrome UX Report
 * via PageSpeed Insights API v5 (or CrUX API directly if key available).
 *
 * Usage:
 *   node scripts/crux-monitor.mjs                    # fetch and print current metrics
 *   node scripts/crux-monitor.mjs --save             # append to src/generated/crux-history.json
 *   node scripts/crux-monitor.mjs --threshold=2500   # exit 1 if LCP > threshold (ms)
 *
 * Requires:
 *   - PSI_API_KEY env var (optional, higher quota with key)
 *   - Or runs with default quota (limited)
 *
 * Metrics tracked: LCP, INP, CLS, FCP, TTFB
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HISTORY_FILE = join(ROOT, 'src', 'generated', 'crux-history.json');
const SITE = 'https://webabc.ir';
const PAGES_TO_CHECK = [
  '/en/',
  '/en/services/',
  '/en/tools/',
  '/en/blog/',
  '/en/portfolio/',
  '/en/contact/',
  '/fa/',
  '/fa/services/',
  '/fa/tools/',
  '/fa/blog/',
  '/fa/portfolio/',
  '/fa/contact/',
  '/ar/',
  '/ar/services/',
  '/ar/tools/',
  '/ar/blog/',
  '/ar/portfolio/',
  '/ar/contact/',
];

const PSI_API_KEY = process.env.PSI_API_KEY || '';
const PSI_BASE = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

async function fetchCruxForUrl(url, strategy = 'mobile') {
  const params = new URLSearchParams({
    url,
    strategy,
    category: 'performance',
  });
  if (PSI_API_KEY) params.set('key', PSI_API_KEY);

  const res = await fetch(`${PSI_BASE}?${params}`, {
    headers: { 'User-Agent': 'WebABC-CrUX-Monitor/1.0' },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PSI API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function extractMetrics(psiData) {
  const crux = psiData?.loadingExperience?.metrics || {};
  const origin = psiData?.originLoadingExperience?.metrics || {};

  function get(metric, source = crux) {
    const m = source[metric];
    if (!m) return null;
    // percentile for LCP/INP/FCP/TTFB, value for CLS
    if (metric === 'CUMULATIVE_LAYOUT_SHIFT_SCORE') {
      return m.percentile || m.value;
    }
    return m.percentile || m.value;
  }

  return {
    lcp: get('LARGEST_CONTENTFUL_PAINT_MS'),
    inp: get('INTERACTION_TO_NEXT_PAINT'),
    cls: get('CUMULATIVE_LAYOUT_SHIFT_SCORE'),
    fcp: get('FIRST_CONTENTFUL_PAINT_MS'),
    ttfb: get('EXPERIMENTAL_TIME_TO_FIRST_BYTE'),
    // Also include field data summary
    category: psiData?.loadingExperience?.overall_category || 'UNKNOWN',
  };
}

async function ensureHistory() {
  try {
    return JSON.parse(await readFile(HISTORY_FILE, 'utf-8'));
  } catch {
    return { entries: [] };
  }
}

async function saveHistory(history) {
  await mkdir(dirname(HISTORY_FILE), { recursive: true });
  await writeFile(HISTORY_FILE, JSON.stringify(history, null, 2) + '\n', 'utf-8');
}

async function main() {
  const args = process.argv.slice(2);
  const saveFlag = args.includes('--save');
  const thresholdArg = args.find(a => a.startsWith('--threshold='));
  const threshold = thresholdArg ? parseInt(thresholdArg.split('=')[1], 10) : null;

  console.log(`Fetching CrUX data for ${PAGES_TO_CHECK.length} URLs...`);
  if (PSI_API_KEY) console.log('Using PSI API key (higher quota)');
  else console.log('Using default quota (limited)');

  const results = [];
  let failed = 0;
  let thresholdExceeded = false;

  for (const path of PAGES_TO_CHECK) {
    const url = `${SITE}${path}`;
    try {
      // Mobile only for now (mobile is primary for CWV)
      const data = await fetchCruxForUrl(url, 'mobile');
      const metrics = extractMetrics(data);
      results.push({ url, timestamp: new Date().toISOString(), ...metrics });

      const status = metrics.category === 'FAST' ? '✅' : metrics.category === 'AVERAGE' ? '⚠️' : '❌';
      console.log(`${status} ${url} LCP=${metrics.lcp}ms INP=${metrics.inp}ms CLS=${metrics.cls} FCP=${metrics.fcp}ms TTFB=${metrics.ttfb}ms (${metrics.category})`);

      if (threshold && metrics.lcp && metrics.lcp > threshold) {
        console.error(`  ⛔ LCP ${metrics.lcp}ms exceeds threshold ${threshold}ms`);
        thresholdExceeded = true;
      }

      // Be nice to API
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      failed++;
      console.error(`❌ ${url} failed: ${e.message}`);
    }
  }

  console.log(`\nDone. ${results.length} successful, ${failed} failed.`);

  if (saveFlag) {
    const history = await ensureHistory();
    history.entries.push(...results);
    // Keep last 30 days of daily runs (approx 30 entries per URL)
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    history.entries = history.entries.filter(e => new Date(e.timestamp).getTime() > cutoff);
    await saveHistory(history);
    console.log(`History saved to ${HISTORY_FILE} (${history.entries.length} entries)`);
  }

  if (thresholdExceeded) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });