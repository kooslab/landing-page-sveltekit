<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { updateLocale } from '$lib/i18n';

	let { children }: { children: Snippet } = $props();

	// Force locale update when params change
	$effect(() => {
		const lang = $page.params?.lang || 'en';
		console.log('[Layout] Setting locale to:', lang);
		updateLocale(lang);
	});
</script>

{@render children?.()}
