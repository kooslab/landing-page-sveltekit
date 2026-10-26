<script lang="ts">
	import { Logo } from '@/components/logo';

	let { scrolled = true }: { scrolled?: boolean } = $props();
</script>

<a class="contents" href="/">
	<div class="flex h-9 items-center space-x-2 md:space-x-3">
		<Logo size="sm" />
		<div class="font-display text-lg font-bold text-foreground">KooStory</div>
	</div>
</a>
