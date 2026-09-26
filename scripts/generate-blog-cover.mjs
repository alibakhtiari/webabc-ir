#!/usr/bin/env node
/**
 * Generate a blog cover image at public/images/blog/<slug>.webp
 *
 *   node scripts/generate-blog-cover.mjs <slug> "<prompt>" [quality] [size]
 *
 * Uses the ChatGPT subscription OAuth token OpenCode already stores, so the
 * generation is billed against the subscription rather than an API key. This is
 * the same request `opencode-gpt-imagegen` issues; it is inlined here because
 * that plugin only registers its tool at OpenCode process start.
 *
 * The site hardcodes og:image to 1200x630 (src/layouts/Layout.astro), so the
 * raw PNG is cropped to exactly those dimensions before being written as WebP.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const ENDPOINT = 'https://chatgpt.com/backend-api/codex/responses';
const MODEL = 'gpt-5.5';
const OUT_W = 1200;
const OUT_H = 630;
// The API only accepts edge lengths that are multiples of 16, so the source is
// rendered 10px taller than the OG box and cropped rather than squashed.
const GEN_SIZE = `${OUT_W}x${OUT_H + 10}`;

async function loadAuth() {
  const candidates = [
    process.env.XDG_DATA_HOME && path.join(process.env.XDG_DATA_HOME, 'opencode', 'auth.json'),
    path.join(os.homedir(), '.local', 'share', 'opencode', 'auth.json'),
    path.join(os.homedir(), '.config', 'opencode', 'auth.json'),
  ].filter(Boolean);

  for (const p of candidates) {
    try {
      const data = JSON.parse(await fs.readFile(p, 'utf-8'));
      const entry = data.openai;
      if (entry?.type === 'oauth' && typeof entry.access === 'string') return entry;
    } catch {
      /* try the next candidate */
    }
  }
  throw new Error(
    'No OpenAI ChatGPT OAuth credentials found. Expected an "openai" oauth entry in ' +
      '~/.local/share/opencode/auth.json.'
  );
}

async function generate(auth, prompt, quality, size) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.access}`,
      ...(auth.accountId ? { 'ChatGPT-Account-Id': auth.accountId } : {}),
      originator: 'opencode',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({
      model: MODEL,
      instructions:
        'You are an image generation assistant running inside the Codex backend. ' +
        'Always satisfy the request by invoking the image_generation tool exactly once. ' +
        'Do not respond with text only.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
      tools: [{ type: 'image_generation', output_format: 'png', quality, size }],
      tool_choice: { type: 'image_generation' },
      stream: true,
      store: false,
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new Error(`codex responses request failed: ${res.status} ${detail.slice(0, 500)}`);
  }

  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    for (const line of buffer.split('\n')) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      let json;
      try {
        json = JSON.parse(payload);
      } catch {
        continue;
      }
      if (
        json.type === 'response.output_item.done' &&
        json.item?.type === 'image_generation_call' &&
        typeof json.item.result === 'string' &&
        json.item.result.length > 0
      ) {
        return json.item.result;
      }
    }
  }
  throw new Error('no image_generation result returned by the codex backend');
}

const [, , slug, prompt, quality = 'high', size = GEN_SIZE] = process.argv;
if (!slug || !prompt) {
  console.error('usage: node scripts/generate-blog-cover.mjs <slug> "<prompt>" [quality] [size]');
  process.exit(1);
}

const auth = await loadAuth();
const base64 = await generate(auth, prompt, quality, size);

const outDir = path.resolve('public/images/blog');
await fs.mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, `${slug}.webp`);
await sharp(Buffer.from(base64, 'base64'))
  .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
  .webp({ quality: 82, effort: 5 })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
const kb = (await fs.stat(outPath)).size / 1024;
console.log(`${outPath}  ${meta.width}x${meta.height}  ${kb.toFixed(0)} KB`);
