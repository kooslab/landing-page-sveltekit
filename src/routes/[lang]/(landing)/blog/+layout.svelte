<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container mx-auto max-w-[1024px] p-4">
	<div class="prose dark:prose-invert">
		{@render children?.()}
	</div>
</div>
