import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Optional: Enable incremental cache using Cloudflare R2 if you have it configured
  // incrementalCache: async () => {
  //   const { default: r2IncrementalCache } = await import("@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache");
  //   return r2IncrementalCache;
  // },
});