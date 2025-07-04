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

	// Ensure locale is properly initialized from URL
	$effect(() => {
		if (browser) {
			const path = window.location.pathname;
			const segments = path.split('/').filter(Boolean);

			// Check if first segment is 'ko' (Korean)
			if (segments.length > 0 && segments[0] === 'ko') {
				if ($locale !== 'ko') {
					console.log('[Root Layout] Updating locale to Korean');
					locale.set('ko');
				}
			} else {
				// Default to English for root or any other path
				if ($locale !== 'en') {
					console.log('[Root Layout] Updating locale to English');
					locale.set('en');
				}
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
