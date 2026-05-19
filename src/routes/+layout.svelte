<script lang="ts">
	import { browser } from '$app/environment';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';

	import '../app.pcss';
	import type { LayoutData } from './$types';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let { user } = $derived(data);

	// Ensure locale is properly initialized from URL or cookie preference
	$effect(() => {
		if (browser) {
			const path = window.location.pathname;
			const segments = path.split('/').filter(Boolean);
			const supportedLangs = ['en', 'ko', 'de'];

			if (segments.length > 0 && supportedLangs.includes(segments[0])) {
				// URL has an explicit lang segment (main page routes like /ko, /de)
				const urlLang = segments[0];
				if ($locale !== urlLang) locale.set(urlLang);
			} else {
				// No lang in URL — use cookie preference
				const cookieMatch = document.cookie.match(/(?:^|;\s*)preferred-lang=([^;]+)/);
				const cookieLang = cookieMatch ? cookieMatch[1] : null;
				const preferredLang = cookieLang && supportedLangs.includes(cookieLang) ? cookieLang : 'en';
				if ($locale !== preferredLang) locale.set(preferredLang);
			}
		}
	});

	let metaTags = $derived(deepMerge(data?.baseMetaTags || {}, $page.data?.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />

{#await waitLocale() then}
	{@render children()}
{/await}
