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
	let { session, supabase } = $derived(data);

	// Ensure locale is properly initialized from URL
	$effect(() => {
		if (browser) {
			const path = window.location.pathname;
			const segments = path.split('/').filter(Boolean);
			if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ko')) {
				const urlLocale = segments[0];
				if ($locale !== urlLocale) {
					console.log('[Root Layout] Updating locale to match URL:', urlLocale);
					locale.set(urlLocale);
				}
			}
		}
	});

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let metaTags = $derived(deepMerge(data?.baseMetaTags || {}, $page.data?.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />

{#await waitLocale() then}
	{@render children()}
{/await}
