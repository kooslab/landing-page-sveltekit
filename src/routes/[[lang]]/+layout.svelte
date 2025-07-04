<script lang="ts">
	import { page } from '$app/stores';
	import { updateLocale } from '$lib/i18n';

	// Force locale update when params change
	$effect(() => {
		const lang = $page.params?.lang || 'en';
		console.log('[Layout] Setting locale to:', lang);
		updateLocale(lang);
	});
</script>

<slot />
