<script lang="ts">
	import { marked } from 'marked';

	let { source = '' as string }: { source: string } = $props();

	// Sync render. `marked` returns a string when no async extensions are configured.
	let html = $derived(marked.parse(source, { gfm: true, breaks: true, async: false }) as string);
</script>

<div
	class="prose prose-sm max-w-none break-words dark:prose-invert
		prose-headings:mb-2 prose-headings:mt-3 prose-headings:font-semibold
		prose-p:my-2 prose-p:leading-relaxed
		prose-a:text-primary
		prose-a:underline-offset-2 prose-strong:text-foreground
		prose-code:rounded prose-code:bg-muted
		prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:text-foreground
		prose-ol:my-2 prose-ul:my-2
		prose-li:my-0.5
		prose-hr:my-3 prose-hr:border-border"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
