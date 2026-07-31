// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Canonical origin. Everything absolute — canonical links, Open Graph URLs
	// and the sitemap — is derived from this, so it has to match the domain the
	// site is actually served from.
	site: 'https://presentjoy.la',
	// Internal links are written without a trailing slash, so canonical links
	// and the sitemap follow suit — one address per page, no duplicates for a
	// crawler to reconcile.
	trailingSlash: 'never',
	integrations: [sitemap()],
});
