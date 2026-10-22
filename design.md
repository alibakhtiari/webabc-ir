# DESIGN.md — Visual Design System & Art Direction for WebABC.ir

**Project:** [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) (English `/en/`, Persian `/`, Arabic `/ar/`)  
**Visual Benchmark:** [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii), [ASCII Magic Studio](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2F), and [ASCII Magic Recipes](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Frecipes)  
**Purpose:** Single source of truth for UI styling, color tokens, typography, procedural `<ascii-art>` animations, and AI/dithered image generation across the WebABC codebase.

## 1. Aesthetic Direction & Core Philosophy

WebABC's visual identity combines **Terminal-Native Engineering Precision** with **Retro-Futuristic Glyph & Dither Art**. Every visual element on the site must reinforce that WebABC is a technical SEO, Core Web Vitals, and custom web engineering powerhouse:

1. **Code as Illustration:** Never use generic corporate vector art, flat SaaS cartoon people, or unedited stock photography. Every visual is either a live procedural `<ascii-art>` canvas animation (3–10 KB) or a high-contrast ASCII/dither/halftone render.
2. **Exposed Structural Honesty:** Layouts use exposed `1px solid` hairline grids (`#30363d` in dark mode, `#d0d7de` in light mode), visible terminal chrome headers (`╭─ ... ─╮`), monospace coordinate/telemetry badges (`66×17 · 30 fps · 3.3 KB`), and slash-prefixed section identifiers (`/SERVICES`, `/RESULTS`, `/FREE-TOOLS`).
3. **Interactive Tactility:** Visuals are not passive decorations; visitors can toggle character ramps (`Original`, `Halftone dots`, `ASCII`, `Binary`, `Blocks`, `Dither`), adjust playback speed (`0.5×`, `1×`, `2×`), and test live micro-tools directly on the page.

## 2. Color Architecture & Semantic Ink Tokens

Derived directly from the [ASCII Magic Animated Library](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii) and the [Settings Toggles Piece](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fsettings-toggles) source palette, all UI surfaces and generated visuals must adhere strictly to this token table:

| Token Name | Dark Mode Hex (Default) | Light Mode Hex | Visual Role in UI & Generated Imagery |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#090b0e` | `#ffffff` | Deepest page background and outer canvas void. |
| `--bg-surface` | `#0d1117` | `#f6f8fa` | Primary card background, terminal stage fill, and image backdrop. |
| `--bg-elevated` | `#161b22` | `#eaeef2` | Hover states, active tab pills, and modal headers. |
| `--border-subtle` | `#21262d` | `#eaeef2` | Inner grid subdivisions and table row separators. |
| `--border-hairline` | `#30363d` | `#d0d7de` | Primary `1px` exposed bento grid borders and box frames. |
| `--border-focus` | `#484f58` | `#8c959f` | Active card outlines and ASCII box-drawing strokes (`╭─╮`). |
| `--ink-primary` | `#e6edf3` | `#1f2328` | High-density foreground glyphs (`█`, `@`, `#`), H1/H2 headings. |
| `--ink-secondary` | `#8b949e` | `#59636e` | Mid-tone shading glyphs (`▒`, `+`, `:`), body copy, and descriptions. |
| `--ink-PhosphorGreen` | `#7ee787` | `#1a7f37` | Primary accent: upward SEO charts, `✓` status, CWV pass, active switches. |
| `--ink-ForestGreen` | `#2ea043` | `#1f883d` | Secondary green depth layer for shaded bars, buttons, and matrix trails. |
| `--ink-TerminalBlue` | `#79c0ff` | `#0969da` | Interactive focus indicators, active code tokens, links, and water/sky glyphs. |
| `--ink-AmberGold` | `#ffa657` | `#9a6700` | Speed gauges, CTR score highlights, warm sunrise/desert dither gradients. |
| `--ink-CoralRed` | `#ff7b72` | `#cf222e` | UI/UX friction audit markers, heatmap peaks, and alert badges. |
| `--ink-LavenderPurple` | `#d2a8ff` | `#8250df` | Slash section headers (`/SERVICES`), JSON-LD schema keys, and synthwave accents. |

## 3. The 11 Signature Character & Dither "Looks"

All imagery and procedural animations created for [WebABC](https://www.google.com/search?q=https%3A%2F%2Fwebabc.ir%2Fen%2F) draw from the 11 visual rendering modes of the [ASCII Magic Library Docs](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2Fascii%2Fdocs) and [ASCII Magic Studio](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2F):

| Look ID | UI Label & Glyph Preview | Character Ramp (Light → Dark) / Visual Texture | Best WebABC Use Case |
| :--- | :--- | :--- | :--- |
| `original` | `▓▒░ Original` | Mixed box-drawing (`╭─╮│╰─╯`), shading blocks (`░▒▓█`), and semantic symbols (`●`, `━`, `✓`) | Default hero interactive scenes, UI mockups, and data charts. |
| `dots` | `·•● Halftone dots` | Scaled circular halftone dots (`·`, `•`, `●`) mapped to luminance | World maps (`world-map-pings`), local SEO grids, and modern print-style cards. |
| `ascii` | `*#$@ ASCII` | `.,-~:;=!*#$@` classic 12-step brightness ramp | Classic terminal code art, SEO blog headers, and developer tools. |
| `dense` | `%B@$ Dense ASCII` | 70-character ramp (`.'\`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`) | High-detail portrait conversions, portfolio thumbnails, and complex scenes. |
| `numbers` | `6980 Numbers` | `1723456980` numeric brightness mapping | Analytics, ROI telemetry, and `Website Cost Calculator` graphics. |
| `binary` | `01 Binary` | Strict `0` and `1` bit-stream matrix | Cybersecurity, `Website Maintenance & Care Plans`, and server infrastructure. |
| `letters` | `AHMW Letters` | `ilcoeaxkdbAHMW` typographic density ramp | `Specialized Content Creation` and `Headline & Title Checker` visuals. |
| `blocks` | `░▒▓█ Blocks` | Unicode quarter/half/full shade blocks (`░`, `▒`, `▓`, `█`) | Retro computing, isometric 3D architecture, and pixel-dense hero banners. |
| `squares` | `·▪■ Squares` | Geometric square matrix (`·`, `▪`, `■`) | Modular e-commerce grids, WooCommerce product tiles, and bento headers. |
| `lines` | `╌─━═ Lines` | Horizontal/vertical stroke weights (`╌`, `─`, `━`, `═`) | `Core Web Vitals & Speed Optimization`, request waterfalls, and speed lines. |
| `dither` | `▚▞▚▞ Dither` | Ordered `8×8 Bayer` or `Floyd–Steinberg` 1-bit/2-bit pixel checkerboard (`▚`, `▞`, `█`) | Editorial hero backgrounds, OG social cards, and retro-futuristic posters. |

## 4. Post-Processing & Shader Effects Stack

When generating static/video assets in the [ASCII Magic Studio](https://www.google.com/search?q=https%3A%2F%2Fwww.ascii-magic.com%2F) or prompting AI image generators, layer up to three of these signature post-processing effects:

1. **Character Bloom & Phosphor Glow:** Subtle radial halation around bright `#7ee787` green and `#79c0ff` cyan glyphs against the `#0d1117` dark background, mimicking a high-resolution OLED or vintage Sony Trinitron monitor.
2. **CRT Scanlines & Subtle Vignette:** Fine horizontal scanlines (`1px` every `3px` at `8–12%` opacity) paired with a soft dark perimeter vignette that pulls focus toward the center of the terminal frame.
3. **Chromatic Aberration / RGB Split:** Micro-offset (`1–2px`) cyan/magenta channel separation on outer edges for glitch-art or high-speed performance visuals.
4. **Ordered Bayer Matrix Dithering:** Sharp, un-antialiased pixel transitions between dark slate (`#161b22`) and bright accent tones without smooth muddy CSS gradients.

## 5. Typography, Chrome & Layout Geometry

* **Section Eyebrow Convention:** Every section starts with a slash-prefixed monospace tag in `--ink-LavenderPurple` (`#d2a8ff`) or `--ink-PhosphorGreen` (`#7ee787`), followed by middle-dot metadata:
  * `/HERO · WEB-ENGINEERING & TECHNICAL SEO`
  * `/SERVICES · 11 SPECIALIZED SOLUTIONS`
  * `/PROCESS · 3-STAGE EXECUTION PIPELINE`
  * `/RESULTS · VERIFIED CORE WEB VITALS & RANKINGS`
  * `/FREE-TOOLS · 5 BROWSER UTILITIES`
  * `/FAQS · TECHNICAL & COMMERCIAL ANSWERS`
* **Terminal Window Chrome:** Frame featured visuals and interactive tools inside a `1px solid var(--border-hairline)` container with a `36px` top bar displaying:
  * Left: Piece/Tool slug in monospace (e.g., `live-line-chart.js` or `faq-schema-generator`).
  * Right: Dimension, frame rate, and payload telemetry badges (`66×17 · 30 fps · 3.3 KB`).
* **Bi-Directional (`EN` / `FA` / `AR`) Isolation:**
  * English (`/en/`) uses `Geist` or `Inter` (`LTR`).
  * Persian (`/`) and Arabic (`/ar/`) use `Vazirmatn` (`RTL`).
  * **Hard Rule:** Every `<ascii-art>` element, code block, terminal header bar, and ASCII image container MUST enforce `dir="ltr"` and `unicode-bidi: isolate` so box-drawing corners (`╭─╮│╰─╯`) and character shading never mirror in RTL locales.
