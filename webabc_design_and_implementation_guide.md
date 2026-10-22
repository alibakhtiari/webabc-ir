# Design System & Technical Implementation Guide: WebABC.ir Redesign

**Target Site:** [https://webabc.ir/en/](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F)  
**Design System Source:** [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) & [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs)  
**License of `<ascii-art>` Library:** MIT License (`ascii-magic-art` on npm / GitHub)  

## 1. Color Palette & CSS Custom Properties establish the Terminal-Native aesthetic

The [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) uses a high-contrast dark surface hierarchy paired with semantic ANSI/GitHub-inspired accent tokens (extracted directly from the [Settings Toggles Piece](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fsettings-toggles) palette). Add these CSS variables to your root stylesheet so [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) supports both the signature Dark Studio mode and a high-contrast Light mode:

```css
:root,
[data-theme="dark"] {
  /* Surface Hierarchy */
  --bg-canvas: #090b0e;
  --bg-surface: #0d1117;
  --bg-elevated: #161b22;
  --bg-glass: rgba(13, 17, 23, 0.82);

  /* Hairline Borders & Dividers */
  --border-subtle: #21262d;
  --border-hairline: #30363d;
  --border-focus: #484f58;

  /* Typography & Ink */
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --text-muted: #6e7681;

  /* Semantic Terminal Accents (from ascii-magic-art palette) */
  --accent-green: #7ee787;       /* Primary success, CWV pass, active toggles */
  --accent-green-dim: #2ea043;   /* Button fills & badge borders */
  --accent-blue: #79c0ff;        /* Focus indicators, links, interactive tabs */
  --accent-amber: #ffa657;       /* Warnings, CTR highlights, speed badges */
  --accent-coral: #ff7b72;       /* Audit alerts, hot badges */
  --accent-purple: #d2a8ff;      /* Section slash prefixes & schema tags */
}

[data-theme="light"] {
  --bg-canvas: #ffffff;
  --bg-surface: #f6f8fa;
  --bg-elevated: #eaeef2;
  --bg-glass: rgba(255, 255, 255, 0.88);

  --border-subtle: #eaeef2;
  --border-hairline: #d0d7de;
  --border-focus: #8c959f;

  --text-primary: #1f2328;
  --text-secondary: #59636e;
  --text-muted: #6e7781;

  --accent-green: #1a7f37;
  --accent-green-dim: #1f883d;
  --accent-blue: #0969da;
  --accent-amber: #9a6700;
  --accent-coral: #cf222e;
  --accent-purple: #8250df;
}
```

## 2. Typography & Multilingual (`EN` / `FA` / `AR`) Rules protect ASCII grid integrity

Because [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) serves clients in English (`en`), Persian (`fa`), and Arabic (`ar`), the typography system must pair a clean display sans-serif with a strict fixed-width monospace font while isolating ASCII canvases from Right-to-Left (`RTL`) text flow.

| Role | English (`/en/` — LTR) | Persian (`/`) & Arabic (`/ar/` — RTL) | CSS Sizing & Tracking |
| :--- | :--- | :--- | :--- |
| **Display Headings (`H1`, `H2`)** | `'Geist'`, `'Inter'`, system-ui | `'Vazirmatn'`, `'IRANSansX'`, sans-serif | `clamp(2rem, 4vw, 3.5rem)`, `font-weight: 700`, `letter-spacing: -0.03em` (LTR only) |
| **Body Copy** | `'Geist'`, `'Inter'`, system-ui | `'Vazirmatn'`, sans-serif | `1rem` (`16px`), `line-height: 1.65`, max measure `65ch` |
| **Slash Section Labels (`/SERVICES`)** | `'JetBrains Mono'`, `'Geist Mono'`, monospace | `'JetBrains Mono'`, monospace (`dir="ltr"`) | `0.8125rem` (`13px`), `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: var(--accent-purple)` |
| **ASCII Canvas & Code Blocks** | `'JetBrains Mono'`, `'Menlo'`, `'Consolas'`, monospace | `'JetBrains Mono'`, `'Consolas'`, monospace (`dir="ltr"`) | `line-height: 1.0`, strict `dir="ltr"` and `unicode-bidi: isolate` |

### Critical RTL Isolation Snippet for Persian & Arabic Views

Add this rule globally so that switching from `https://webabc.ir/en/` to `https://webabc.ir/` (Persian) or `/ar/` (Arabic) never flips box-drawing characters (`╭─╮│╰─╯`) or reverses `<ascii-art>` animations:

```css
ascii-art,
.ascii-stage-container,
.terminal-chrome-bar,
.monospace-telemetry-pill,
pre,
code {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  text-align: left !important;
  font-variant-ligatures: none;
}
```

## 3. Mapping WebABC Sections to Curated `<ascii-art>` Pieces replaces stock graphics with live code

Every visual slot on [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) maps directly to a lightweight, MIT-licensed animation from the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii):

| WebABC Section / Service | Recommended `piece` Slug | Backup `piece` Slug | Category & Rationale | Recommended Attributes |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Main Stage** | `live-line-chart` | `world-map-pings` | `Live Data` — Shows real-time upward ranking & traffic velocity across global/regional nodes. | `size="12" speed="1" look="original"` |
| **SEO & Specialized Optimization** | `bar-chart-race` | `search-autocomplete` | `Live Data` / `UI` — Demonstrates search query capture and competitive SERP climbing. | `size="11" speed="1"` |
| **Custom Website Design & Dev** | `code-editor` | `window-tiling-manager` | `UI` — Shows active clean code architecture and responsive viewport layouts in motion. | `size="11" speed="1"` |
| **Specialized Content Creation** | `syntax-highlight-pass` | `typewriter` | `Lettering` — Illustrates structured editorial drafting and semantic markup pass. | `size="11" speed="1"` |
| **Core Web Vitals & Speed Opt.** | `request-waterfall` | `speed-gauge` | `UI` / `Live Data` — Visually represents asset waterfall compression and sub-second load times. | `size="11" speed="1.2"` |
| **Professional UI/UX Audit** | `settings-toggles` | `signup-funnel` | `UI` / `Live Data` — Highlights interactive control refinement and conversion funnel optimization. | `size="11" speed="1"` |
| **Website Maintenance & Care** | `status-page` | `server-gauge-cluster` | `Live Data` — Conveys 99.99% uptime monitoring, security checks, and server health. | `size="11" speed="1"` |
| **3-Step SEO Process Strip** | `git-branch-graph` | `ci-pipeline` | `Explainers` — Connects `Keyword Research → Content Optimization → Link Building` as a continuous pipeline. | `size="10" look="dots"` |
| **Results Guaranteed Section** | `star-history-climb` | `contribution-heatmap` | `Live Data` — Replaces the static `SEO Results Image` with a compounding growth curve. | `size="12" speed="1"` |
| **404 / Empty States** | `lost-in-space-404` | `server-error-500` | `UI` — Ready-made animated error state from the library. | `size="12" speed="1"` |

## 4. Self-Hosting `ascii-magic-art` for Zero External Latency in Iran & the Middle East

To ensure [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) achieves a 99–100 PageSpeed score and never suffers from external CDN throttling or regional firewall blocks, follow the self-hosting workflow from the [ASCII Art Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs):

### Step 1: Install and Copy the Open-Source Package into Your Static Assets

```bash
# Install the MIT-licensed package
npm install ascii-magic-art

# Copy the runtime, lib, and pieces folders into your public static directory
mkdir -p public/ascii-magic-art
cp -r node_modules/ascii-magic-art/{runtime,pieces,lib} public/ascii-magic-art/
```

*(Optimization Tip: If you only use the 10–12 pieces listed in the mapping table above, you can keep only those specific `.js` files inside `public/ascii-magic-art/pieces/`, reducing the entire self-hosted directory to under 50 KB total.)*

### Step 2: Load the Script Once & Use `<ascii-art>` in Next.js, React, or WordPress

#### Option A: Plain HTML / WordPress Theme (`header.php` or Custom HTML Block)

If [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) runs on WordPress, copy the `ascii-magic-art` folder to your theme or root directory (`/ascii-magic-art/`) and enqueue the module script once:

```html
<!-- Load once in <head> or footer -->
<script type="module" src="/ascii-magic-art/runtime/ascii.js"></script>

<!-- Drop anywhere in Elementor, Gutenberg Custom HTML, or PHP templates -->
<div class="ascii-stage-card" dir="ltr">
  <div class="terminal-chrome-bar">
    <span class="terminal-title">/LIVE-DATA · Organic Growth Telemetry</span>
    <span class="terminal-meta">66×17 · 30 fps · 3.3 KB</span>
  </div>
  <div class="ascii-canvas-wrapper" style="min-height: 260px;">
    <ascii-art
      id="hero-ascii"
      piece="live-line-chart"
      size="12"
      speed="1"
      look="original">
    </ascii-art>
  </div>
</div>
```

#### Option B: Interactive Look Switcher Script (Vanilla JS / WordPress / React)

Wire up the 11-Look character ramp bar so visitors on [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) can interactively restyle the hero animation just like on the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii):

```javascript
const LOOKS = [
  { id: "original", glyph: "▓▒░", label: "Original" },
  { id: "dots",     glyph: "·•●", label: "Halftone dots" },
  { id: "ascii",    glyph: "*#$@", label: "ASCII" },
  { id: "dense",    glyph: "%B@$", label: "Dense ASCII" },
  { id: "numbers",  glyph: "6980", label: "Numbers" },
  { id: "binary",   glyph: "01",   label: "Binary" },
  { id: "letters",  glyph: "AHMW", label: "Letters" },
  { id: "blocks",   glyph: "░▒▓█", label: "Blocks" },
  { id: "squares",  glyph: "·▪■",  label: "Squares" },
  { id: "lines",    glyph: "╌─━═", label: "Lines" },
  { id: "dither",   glyph: "▚▞▚▞", label: "Dither" }
];

export function bindLookSwitcher(asciiElementId, buttonContainerSelector) {
  const el = document.getElementById(asciiElementId);
  const container = document.querySelector(buttonContainerSelector);
  if (!el || !container) return;

  LOOKS.forEach(({ id, glyph, label }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "look-pill";
    btn.dataset.look = id;
    btn.innerHTML = `<span class="look-glyph">${glyph}</span> <span>${label}</span>`;
    btn.addEventListener("click", () => {
      el.setAttribute("look", id);
      container.querySelectorAll(".look-pill").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
    container.appendChild(btn);
  });
}
```

## 5. Pre-Launch Quality & SEO Verification Checklist ensures zero regression

Before deploying the redesigned [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) interface to production, verify the following seven engineering gates:

1. **Zero Cumulative Layout Shift (`CLS = 0.00`):** Every `<ascii-art>` wrapper has an explicit `min-height` or `aspect-ratio` in CSS so the canvas initialization never pushes adjacent text down.
2. **Reduced Motion Compliance:** Visiting the page with `prefers-reduced-motion: reduce` enabled in the OS renders a clean static frame on every `<ascii-art>` element without running `requestAnimationFrame` loops.
3. **Screen Reader Clarity:** Inspecting each `<ascii-art>` tag in DevTools confirms `role="img"` and a descriptive `aria-label` are present, accompanied by real HTML headings (`<h1>`, `<h2>`, `<h3>`) for search crawlers.
4. **RTL Integrity Check (`fa` and `ar`):** Switching the language toggle to `فارسی` or `العربية` flips prose alignment and grid order to RTL while keeping `<ascii-art>`, code snippets, and phone numbers (`+98 912 581 1880`, `+98 935 476 7068`) strictly `ltr`.
5. **All 11 Mega-Menu Services & 5 Free Tools Linked:** Every service and tool URL from the existing [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) sitemap resolves cleanly without broken links or missing `hreflang` tags (`en`, `fa`, `ar`).
6. **Consultation Modal & WhatsApp Handoff:** Clicking `Free Consultation` or `Consult about [Service]` pre-fills the selected service in the modal and provides a working direct link to WhatsApp.
7. **Self-Hosted Asset Verification:** Network tab confirms `/ascii-magic-art/runtime/ascii.js` and `/ascii-magic-art/pieces/*.js` load directly from `webabc.ir` with Brotli/Gzip compression and immutable cache headers.
