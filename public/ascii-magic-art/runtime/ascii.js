// MIT License — Self-hosted <ascii-art> Custom Element Runtime for WebABC.ir
// Locked to Original Look, 1x speed, exact container-fit sizing, and live site-synced themes.
import createHeroGrowthStory, { meta as metaHeroGrowthStory } from '../pieces/hero-growth-story.js';
import createLiveLineChart, { meta as metaLiveLineChart } from '../pieces/live-line-chart.js';
import createCodeEditor, { meta as metaCodeEditor } from '../pieces/code-editor.js';
import createRequestWaterfall, { meta as metaRequestWaterfall } from '../pieces/request-waterfall.js';
import createWorldMapPings, { meta as metaWorldMapPings } from '../pieces/world-map-pings.js';
import createSettingsToggles, { meta as metaSettingsToggles } from '../pieces/settings-toggles.js';
import createSyntaxHighlightPass, { meta as metaSyntaxHighlightPass } from '../pieces/syntax-highlight-pass.js';
import createStatusPage, { meta as metaStatusPage } from '../pieces/status-page.js';
import createStarHistoryClimb, { meta as metaStarHistoryClimb } from '../pieces/star-history-climb.js';
import createSignupFunnel, { meta as metaSignupFunnel } from '../pieces/signup-funnel.js';
import createGitBranchGraph, { meta as metaGitBranchGraph } from '../pieces/git-branch-graph.js';
import createLostInSpace404, { meta as metaLostInSpace404 } from '../pieces/lost-in-space-404.js';
import createWebabcSeoTelemetry, { meta as metaWebabcSeoTelemetry } from '../pieces/webabc-seo-telemetry.js';

const BUILTIN_PIECES = {
  'hero-growth-story': { create: createHeroGrowthStory, meta: metaHeroGrowthStory },
  'live-line-chart': { create: createLiveLineChart, meta: metaLiveLineChart },
  'bar-chart-race': { create: createLiveLineChart, meta: metaLiveLineChart },
  'search-autocomplete': { create: createLiveLineChart, meta: metaLiveLineChart },
  'code-editor': { create: createCodeEditor, meta: metaCodeEditor },
  'window-tiling-manager': { create: createCodeEditor, meta: metaCodeEditor },
  'request-waterfall': { create: createRequestWaterfall, meta: metaRequestWaterfall },
  'speed-gauge': { create: createRequestWaterfall, meta: metaRequestWaterfall },
  'world-map-pings': { create: createWorldMapPings, meta: metaWorldMapPings },
  'settings-toggles': { create: createSettingsToggles, meta: metaSettingsToggles },
  'signup-funnel': { create: createSignupFunnel, meta: metaSignupFunnel },
  'syntax-highlight-pass': { create: createSyntaxHighlightPass, meta: metaSyntaxHighlightPass },
  'typewriter': { create: createSyntaxHighlightPass, meta: metaSyntaxHighlightPass },
  'status-page': { create: createStatusPage, meta: metaStatusPage },
  'server-gauge-cluster': { create: createStatusPage, meta: metaStatusPage },
  'star-history-climb': { create: createStarHistoryClimb, meta: metaStarHistoryClimb },
  'contribution-heatmap': { create: createStarHistoryClimb, meta: metaStarHistoryClimb },
  'git-branch-graph': { create: createGitBranchGraph, meta: metaGitBranchGraph },
  'ci-pipeline': { create: createGitBranchGraph, meta: metaGitBranchGraph },
  'lost-in-space-404': { create: createLostInSpace404, meta: metaLostInSpace404 },
  'server-error-500': { create: createLostInSpace404, meta: metaLostInSpace404 },
  'webabc-seo-telemetry': { create: createWebabcSeoTelemetry, meta: metaWebabcSeoTelemetry },
};

const THEME_PALETTES = {
  emerald: {
    dark: ['#e6edf3', '#8b949e', '#7ee787', '#79c0ff', '#ffa657', '#ff7b72', '#d2a8ff', '#484f58', '#30363d', '#2ea043'],
    light: ['#1f2328', '#59636e', '#1a7f37', '#0969da', '#9a6700', '#cf222e', '#8250df', '#8c959f', '#d0d7de', '#2da44e'],
  },
  blue: {
    dark: ['#f0f6fc', '#94a3b8', '#38bdf8', '#818cf8', '#fbbf24', '#f87171', '#60a5fa', '#475569', '#1e293b', '#0284c7'],
    light: ['#0f172a', '#475569', '#0284c7', '#4f46e5', '#d97706', '#dc2626', '#2563eb', '#94a3b8', '#cbd5e1', '#0369a1'],
  },
  mono: {
    dark: ['#fafafa', '#a1a1aa', '#ffffff', '#d4d4d8', '#e4e4e7', '#a1a1aa', '#d4d4d8', '#52525b', '#27272a', '#71717a'],
    light: ['#09090b', '#52525b', '#09090b', '#3f3f46', '#27272a', '#52525b', '#18181b', '#a1a1aa', '#e4e4e7', '#52525b'],
  },
  cyan: {
    dark: ['#ecfeff', '#94a3b8', '#2dd4bf', '#38bdf8', '#fbbf24', '#fb7185', '#67e8f9', '#475569', '#1e293b', '#0d9488'],
    light: ['#0f172a', '#475569', '#0d9488', '#0284c7', '#d97706', '#e11d48', '#0891b2', '#94a3b8', '#cbd5e1', '#0f766e'],
  },
  violet: {
    dark: ['#f5f3ff', '#a1a1aa', '#a78bfa', '#38bdf8', '#fbbf24', '#fb7185', '#c084fc', '#52525b', '#27272a', '#7c3aed'],
    light: ['#1e1b4b', '#4b5563', '#6d28d9', '#0284c7', '#d97706', '#e11d48', '#7c3aed', '#9ca3af', '#d1d5db', '#5b21b6'],
  },
  amber: {
    dark: ['#fefce8', '#a8a29e', '#fbbf24', '#38bdf8', '#f59e0b', '#f87171', '#fcd34d', '#57534e', '#292524', '#d97706'],
    light: ['#1c1917', '#57534e', '#b45309', '#0284c7', '#d97706', '#dc2626', '#92400e', '#a8a29e', '#d6d3d1', '#b45309'],
  },
};

function escapeHtml(ch) {
  if (ch === '&') return '&amp;';
  if (ch === '<') return '&lt;';
  if (ch === '>') return '&gt;';
  return ch;
}

class AsciiArtElement extends HTMLElement {
  static get observedAttributes() {
    return ['piece', 'size', 'still'];
  }

  constructor() {
    super();
    this._raf = null;
    this._frameFn = null;
    this._meta = null;
    this._startTime = performance.now();
    this._inViewport = true;
    this._observer = null;
    this._themeObserver = null;
    this._resizeObserver = null;
    this._pre = null;
  }

  connectedCallback() {
    this.setAttribute('dir', 'ltr');
    this.style.direction = 'ltr';
    this.style.unicodeBidi = 'isolate';
    this.style.display = 'block';
    this.style.width = '100%';

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'img');
    }

    if (!this._pre) {
      this._pre = document.createElement('pre');
      this._pre.className = 'ascii-art-surface';
      this._pre.setAttribute('aria-hidden', 'true');
      this._pre.setAttribute('dir', 'ltr');
      this._pre.style.margin = '0 auto';
      this._pre.style.padding = '0';
      this._pre.style.display = 'inline-block';
      this._pre.style.fontFamily =
        "'JetBrains Mono', 'Geist Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace";
      this._pre.style.lineHeight = '1.2';
      this._pre.style.letterSpacing = '0';
      this._pre.style.overflowX = 'hidden';
      this._pre.style.userSelect = 'none';
      this._pre.style.fontVariantLigatures = 'none';
      this.style.textAlign = 'center';
      this.appendChild(this._pre);
    }

    this._loadPiece();
    this._applyResponsiveSizing();

    if ('ResizeObserver' in window) {
      this._resizeObserver = new ResizeObserver(() => {
        this._applyResponsiveSizing();
      });
      this._resizeObserver.observe(this.parentElement || this);
    }

    if ('IntersectionObserver' in window) {
      this._observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            this._inViewport = entry.isIntersecting;
            if (this._inViewport) {
              this._startLoop();
            } else {
              this._stopLoop();
            }
          }
        },
        { rootMargin: '100px' }
      );
      this._observer.observe(this);
    }

    if ('MutationObserver' in window) {
      this._themeObserver = new MutationObserver(() => {
        this._renderAt(this._currentTimeSeconds());
      });
      this._themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-palette'],
      });
    }
  }

  disconnectedCallback() {
    this._stopLoop();
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'size') {
      this._applyResponsiveSizing();
      this._renderAt(this._currentTimeSeconds());
    } else if (name === 'piece') {
      this._loadPiece();
      this._applyResponsiveSizing();
    } else if (name === 'still') {
      if (this._isPaused()) {
        this._stopLoop();
        this._renderAt(2.4);
      } else {
        this._startLoop();
      }
    }
  }

  _applyResponsiveSizing() {
    if (!this._pre) return;
    const cols = (this._meta && this._meta.cols) || 66;
    const parent = this.parentElement || this;
    const hostWidth = parent.clientWidth || this.clientWidth || 0;

    if (hostWidth > 60) {
      const targetWidth = Math.max(40, hostWidth - 16);
      let fontSize = targetWidth / (cols * 0.601);
      const maxFont = parseFloat(this.getAttribute('max-size') || '22');
      fontSize = Math.max(6.2, Math.min(maxFont, fontSize));
      this._pre.style.fontSize = `${fontSize.toFixed(2)}px`;

      const measured = this._pre.scrollWidth;
      if (measured > 0) {
        const calibrated = Math.max(
          6.2,
          Math.min(maxFont, fontSize * (targetWidth / measured))
        );
        this._pre.style.fontSize = `${calibrated.toFixed(2)}px`;
      }
    } else {
      const sizeAttr = parseFloat(this.getAttribute('size') || '12');
      const fontSize = Number.isFinite(sizeAttr) ? Math.max(7.5, Math.min(20, sizeAttr)) : 12;
      this._pre.style.fontSize = `${fontSize}px`;
    }
  }

  _getActivePalette() {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light' || !root.classList.contains('dark');
    const paletteKey = root.getAttribute('data-palette') || 'blue';
    const scheme = THEME_PALETTES[paletteKey] || THEME_PALETTES.blue;
    return isLight ? scheme.light : scheme.dark;
  }

  _isPaused() {
    if (this.hasAttribute('still') && this.getAttribute('still') !== 'false') return true;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    return false;
  }

  _currentTimeSeconds() {
    return (performance.now() - this._startTime) / 1000;
  }

  async _loadPiece() {
    const slug = this.getAttribute('piece') || 'hero-growth-story';
    const entry = BUILTIN_PIECES[slug] || BUILTIN_PIECES['hero-growth-story'];
    this._meta = entry.meta;
    this._frameFn = entry.create();

    if (!this.getAttribute('aria-label') && this._meta) {
      this.setAttribute('aria-label', `${this._meta.name} — ${this._meta.note}`);
    }

    this._renderAt(2.4);
    this._applyResponsiveSizing();
    if (!this._isPaused() && this._inViewport) {
      this._startLoop();
    }
  }

  _renderAt(t) {
    if (!this._frameFn || !this._pre) return;
    const frameData = this._frameFn(t);
    if (!frameData || !frameData.lines) return;

    const activePalette = this._getActivePalette();

    const htmlRows = [];
    for (let y = 0; y < frameData.lines.length; y++) {
      const row = frameData.lines[y];
      let rowHtml = '';
      let currentColor = null;
      let buffer = '';

      for (let x = 0; x < row.chars.length; x++) {
        const ch = row.chars[x];
        const colorIdx = parseInt(row.colors[x], 10);
        const hex = activePalette[Number.isFinite(colorIdx) ? colorIdx : 0] || activePalette[0];

        if (hex !== currentColor) {
          if (buffer) {
            rowHtml += `<span style="color:${currentColor}">${buffer}</span>`;
            buffer = '';
          }
          currentColor = hex;
        }
        buffer += escapeHtml(ch);
      }
      if (buffer) {
        rowHtml += `<span style="color:${currentColor}">${buffer}</span>`;
      }
      htmlRows.push(rowHtml);
    }

    this._pre.innerHTML = htmlRows.join('\n');
  }

  _startLoop() {
    this._stopLoop();
    if (this._isPaused() || !this._inViewport) return;

    const fps = (this._meta && this._meta.fps) || 24;
    const interval = 1000 / fps;
    let lastFrame = 0;

    const tick = (now) => {
      if (this._isPaused() || !this._inViewport) {
        this._raf = null;
        return;
      }
      if (now - lastFrame >= interval) {
        lastFrame = now;
        this._renderAt(this._currentTimeSeconds());
      }
      this._raf = requestAnimationFrame(tick);
    };

    this._raf = requestAnimationFrame(tick);
  }

  _stopLoop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }
}

if (typeof window !== 'undefined' && !customElements.get('ascii-art')) {
  customElements.define('ascii-art', AsciiArtElement);
}
