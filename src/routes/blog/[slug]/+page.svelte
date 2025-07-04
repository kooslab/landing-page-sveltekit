<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';

	export let data: PageData;

	$: htmlContent = marked(data.post.content);
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

	<div class="prose prose-lg max-w-none dark:prose-invert">
		{@html htmlContent}
	</div>
</article>
