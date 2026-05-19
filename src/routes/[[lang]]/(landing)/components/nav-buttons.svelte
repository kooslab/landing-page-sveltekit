<script lang="ts">
	import { _ } from 'svelte-i18n';
	let { scrolled = true }: { scrolled?: boolean } = $props();

	let linkClass = $derived(
		scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/80 hover:text-white'
	);
</script>

<div class="hidden items-center gap-6 md:ml-8 md:flex">
	<a href="/about" class="text-sm font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.about')}
	</a>
	<a href="/workshops" class="text-sm font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.workshops')}
	</a>
	<a href="/use-cases" class="text-sm font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.useCases')}
	</a>
	<a href="/blog" class="text-sm font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.blog')}
	</a>
</div>
