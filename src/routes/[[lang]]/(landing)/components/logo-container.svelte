<script lang="ts">
	import { Logo } from '@/components/logo';
	import { locale } from 'svelte-i18n';

	let { scrolled = true }: { scrolled?: boolean } = $props();

	let homeHref = $derived($locale && $locale !== 'en' ? `/${$locale}` : '/');
</script>

<a class="contents" href={homeHref}>
	<div class="flex h-9 items-center space-x-2 md:space-x-3">
		<Logo size="sm" />
		<div class="text-lg font-medium transition-colors duration-300 {scrolled ? '' : 'text-white'}">
			Koostory
		</div>
	</div>
</a>
