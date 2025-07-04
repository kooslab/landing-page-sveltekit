<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';

	let { data }: { data: PageData } = $props();

	// Configure marked to support GFM tables
	marked.setOptions({
		gfm: true,
		breaks: true,
		tables: true
	});

	// Clean up the content to ensure tables are parsed correctly
	const cleanContent = $derived(
		data.post.content
			.replace(/^\s*<p>\s*/gm, '') // Remove opening <p> tags
			.replace(/\s*<\/p>\s*$/gm, '') // Remove closing </p> tags
			.replace(/(\|.*\|)\n\n+(\|)/g, '$1\n$2') // Fix tables with extra line breaks
			.trim()
	);

	const htmlContent = $derived(marked(cleanContent));
</script>

<article class="container mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold">{data.post.title}</h1>
		<div class="text-muted-foreground">
			<time datetime={data.post.createdAt.toISOString()}>
				{new Date(data.post.createdAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
	</header>

	<div
		class="prose prose-lg max-w-none dark:prose-invert [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-3 dark:[&_td]:border-gray-600 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-3 [&_th]:font-bold dark:[&_th]:border-gray-600 dark:[&_th]:bg-gray-800"
	>
		{@html htmlContent}
	</div>
</article>
