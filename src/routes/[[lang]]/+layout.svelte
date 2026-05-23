<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { updateLocale } from '$lib/i18n';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	$effect(() => {
		// Sync client locale with URL prefix on every navigation
		const urlLang = $page.params?.lang;
		updateLocale(urlLang || 'en');
	});
</script>

{@render children?.()}
