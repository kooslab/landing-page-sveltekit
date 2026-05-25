<script lang="ts">
	import { _ } from 'svelte-i18n';
	let { scrolled = true }: { scrolled?: boolean } = $props();

	let linkClass = 'text-muted-foreground hover:text-foreground';
</script>

<div class="hidden items-center gap-6 md:ml-8 md:flex">
	<a href="/about" class="text-base font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.about')}
	</a>
	<a href="/discovery" class="text-base font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.workshops')}
	</a>
	<a href="/use-cases" class="text-base font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.useCases')}
	</a>
	<a href="/blog" class="text-base font-medium transition-colors duration-300 {linkClass}">
		{$_('nav.blog')}
	</a>
</div>
