// src/worker.ts
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

declare const __STATIC_CONTENT_MANIFEST: string;
const assetManifest = JSON.parse(__STATIC_CONTENT_MANIFEST);

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    try {
      // This serves the static files (HTML, CSS, JS) from your "dist" folder
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // Handle cases where the file is not found
      let pathname = new URL(request.url).pathname;
      return new Response(`File ${pathname} not found`, {
        status: 404,
        statusText: 'not found',
      });
    }
  },
};