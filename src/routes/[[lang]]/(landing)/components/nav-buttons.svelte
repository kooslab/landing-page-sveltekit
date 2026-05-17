<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { ArrowRight } from 'lucide-svelte';

	let { scrolled = true }: { scrolled?: boolean } = $props();

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);

	let linkClass = $derived(
		scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/80 hover:text-white'
	);

	function openBooking() {
		document.dispatchEvent(new CustomEvent('open-booking-modal'));
	}
</script>

<div class="hidden items-center gap-6 md:ml-8 md:flex">
	<a
		href="{langPrefix}/about"
		class="text-sm font-medium transition-colors duration-300 {linkClass}"
	>
		{$_('nav.about')}
	</a>
	<a
		href="{langPrefix}/workshops"
		class="text-sm font-medium transition-colors duration-300 {linkClass}"
	>
		{$_('nav.workshops')}
	</a>
	<a
		href="{langPrefix}/use-cases"
		class="text-sm font-medium transition-colors duration-300 {linkClass}"
	>
		{$_('nav.useCases')}
	</a>
	<a href="/blog" class="text-sm font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.blog')}
	</a>
	<button
		onclick={openBooking}
		class="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 {scrolled
			? 'bg-brand text-white hover:opacity-90'
			: 'bg-white text-brand hover:opacity-90'}"
	>
		{$_('nav.bookCall')}
		<ArrowRight class="h-3.5 w-3.5" />
	</button>
</div>
