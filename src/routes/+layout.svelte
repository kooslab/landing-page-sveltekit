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
	import Navbar from './(landing)/components/navbar.svelte';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let { session, supabase } = $derived(data);

	$effect(() => {
		if (browser) {
			locale.set($page.url.searchParams.get('lang') || window.navigator.language);
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

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />
<Navbar />

{#await waitLocale() then}
	{@render children()}
{/await}
