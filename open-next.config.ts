import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Cloudflare Workers build (see wrangler.jsonc). Every page here is either static or prerendered by
 * generateStaticParams, so there is no ISR to cache and no queue to run.
 *
 * That is exactly why the incremental cache has to be declared. Left at its default ("dummy") the
 * prerendered HTML the build puts in .open-next/cache is never read back by anything, so the Worker
 * re-rendered every page with React on every request — measured at 260–393 ms of CPU per page, and
 * `x-nextjs-cache: MISS` on three sequential requests for the same URL. The static-assets cache
 * serves that same prerendered HTML out of the ASSETS binding instead (read-only, which suits a site
 * with nothing to revalidate), and cache interception answers from it before the Next server is
 * entered at all.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
