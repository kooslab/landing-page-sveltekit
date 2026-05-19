<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { updateLocale } from '$lib/i18n';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	$effect(() => {
		const urlLang = $page.params?.lang;
		if (urlLang) {
			// Explicit lang in URL — update locale and persist to cookie
			updateLocale(urlLang);
			if (browser) {
				document.cookie = `preferred-lang=${urlLang}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
			}
		} else if (browser) {
			// No lang in URL — use the server-resolved lang (from cookie / default)
			updateLocale(data.lang);
		}
	});
</script>

{@render children?.()}
