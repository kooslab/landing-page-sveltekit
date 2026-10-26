<script lang="ts">
	let { scrolled = true }: { scrolled?: boolean } = $props();

	let linkClass = 'text-muted-foreground hover:text-foreground';
</script>

<div class="hidden items-center gap-6 md:ml-8 md:flex">
	<a href="/about" class="text-base font-medium transition-colors duration-300 {linkClass}">
		About
	</a>
	<a href="/discovery" class="text-base font-medium transition-colors duration-300 {linkClass}">
		Discovery
	</a>
	<a href="/use-cases" class="text-base font-medium transition-colors duration-300 {linkClass}">
		Use Cases
	</a>
	<a href="/blog" class="text-base font-medium transition-colors duration-300 {linkClass}">
		Blog
	</a>
</div>
