// MIT License — ascii-magic-art procedural grid & character ramp toolkit for WebABC.ir
export const LOOKS = [
  { id: 'original', glyph: '▓▒░', label: 'Original', ramp: null },
  { id: 'dots', glyph: '·•●', label: 'Halftone dots', ramp: ' ·∙•●' },
  { id: 'ascii', glyph: '*#$@', label: 'ASCII', ramp: ' .,-~:;=!*#$@' },
  {
    id: 'dense',
    glyph: '%B@$',
    label: 'Dense ASCII',
    ramp: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  },
  { id: 'numbers', glyph: '6980', label: 'Numbers', ramp: ' 1723456980' },
  { id: 'binary', glyph: '01', label: 'Binary', ramp: ' 01' },
  { id: 'letters', glyph: 'AHMW', label: 'Letters', ramp: ' ilcoeaxkdbAHMW' },
  { id: 'blocks', glyph: '░▒▓█', label: 'Blocks', ramp: ' ░▒▓█' },
  { id: 'squares', glyph: '·▪■', label: 'Squares', ramp: ' ·▪▫■◼' },
  { id: 'lines', glyph: '╌─━═', label: 'Lines', ramp: ' ╌─┄┈━═▬' },
  { id: 'dither', glyph: '▚▞▚▞', label: 'Dither', ramp: ' ░▚▞▓█' },
];

export function palette(colors) {
  return Array.isArray(colors) ? colors.slice() : [];
}

const BOX_CHARS = {
  round: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  heavy: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
};

export class Grid {
  constructor(cols = 66, rows = 17) {
    this.cols = cols;
    this.rows = rows;
    this.cells = new Array(cols * rows);
    this.colors = new Array(cols * rows);
    this.clear();
  }

  clear(ch = ' ', color = '1') {
    const total = this.cols * this.rows;
    for (let i = 0; i < total; i++) {
      this.cells[i] = ch;
      this.colors[i] = color;
    }
  }

  set(x, y, ch, color = '0') {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    if (xi < 0 || xi >= this.cols || yi < 0 || yi >= this.rows) return;
    if (!ch) return;
    const idx = yi * this.cols + xi;
    this.cells[idx] = String(ch)[0];
    this.colors[idx] = String(color);
  }

  text(x, y, str, color = '0') {
    const yi = Math.floor(y);
    if (yi < 0 || yi >= this.rows) return;
    const s = String(str);
    const startX = Math.floor(x);
    for (let i = 0; i < s.length; i++) {
      const xi = startX + i;
      if (xi >= 0 && xi < this.cols) {
        const idx = yi * this.cols + xi;
        this.cells[idx] = s[i];
        this.colors[idx] = String(color);
      }
    }
  }

  hline(x, y, len, ch = '─', color = '8') {
    const yi = Math.floor(y);
    if (yi < 0 || yi >= this.rows) return;
    const startX = Math.floor(x);
    for (let i = 0; i < len; i++) {
      this.set(startX + i, yi, ch, color);
    }
  }

  vline(x, y, len, ch = '│', color = '8') {
    const xi = Math.floor(x);
    if (xi < 0 || xi >= this.cols) return;
    const startY = Math.floor(y);
    for (let i = 0; i < len; i++) {
      this.set(xi, startY + i, ch, color);
    }
  }

  fill(x, y, w, h, ch = '░', color = '8') {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        this.set(x + dx, y + dy, ch, color);
      }
    }
  }

  box(x, y, w, h, style = 'round', color = '8', title = '', titleColor = '0', badge = '', badgeColor = '2') {
    const b = BOX_CHARS[style] || BOX_CHARS.round;
    if (w < 2 || h < 2) return;
    this.set(x, y, b.tl, color);
    this.set(x + w - 1, y, b.tr, color);
    this.set(x, y + h - 1, b.bl, color);
    this.set(x + w - 1, y + h - 1, b.br, color);
    for (let dx = 1; dx < w - 1; dx++) {
      this.set(x + dx, y, b.h, color);
      this.set(x + dx, y + h - 1, b.h, color);
    }
    for (let dy = 1; dy < h - 1; dy++) {
      this.set(x, y + dy, b.v, color);
      this.set(x + w - 1, y + dy, b.v, color);
    }
    if (title) {
      this.text(x + 2, y, title, titleColor);
    }
    if (badge) {
      this.text(x + w - badge.length - 2, y, badge, badgeColor);
    }
  }

  bar(x, y, width, ratio, fillColor = '2', trackColor = '8') {
    const clamped = Math.max(0, Math.min(1, ratio));
    const filled = Math.round(clamped * width);
    for (let i = 0; i < width; i++) {
      if (i < filled) {
        this.set(x + i, y, '█', fillColor);
      } else {
        this.set(x + i, y, '░', trackColor);
      }
    }
  }

  slider(x, y, width, ratio, activeColor = '3', trackColor = '8', knobColor = '2') {
    const clamped = Math.max(0, Math.min(1, ratio));
    const knobPos = Math.min(width - 1, Math.max(0, Math.round(clamped * (width - 1))));
    for (let i = 0; i < width; i++) {
      if (i === knobPos) {
        this.set(x + i, y, '●', knobColor);
      } else if (i < knobPos) {
        this.set(x + i, y, '━', activeColor);
      } else {
        this.set(x + i, y, '─', trackColor);
      }
    }
  }

  frame() {
    const rows = [];
    for (let r = 0; r < this.rows; r++) {
      const start = r * this.cols;
      rows.push({
        chars: this.cells.slice(start, start + this.cols),
        colors: this.colors.slice(start, start + this.cols),
      });
    }
    return { cols: this.cols, rows: this.rows, lines: rows };
  }
}
