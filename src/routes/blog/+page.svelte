<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto max-w-4xl px-4 py-16">
	<h1 class="mb-8 text-4xl font-bold">Blog</h1>

	{#if data.error}
		<div class="mb-8 rounded-md bg-destructive/10 p-4 text-destructive">
			{data.error}
		</div>
	{/if}

	{#if data.posts.length === 0}
		<div class="py-12 text-center">
			<p class="mb-4 text-muted-foreground">No published blog posts yet.</p>
			<p class="text-sm text-muted-foreground">Check back soon for new content!</p>
		</div>
	{:else}
		<div class="space-y-8">
			{#each data.posts as post}
				<article class="border-b pb-8">
					<a href="/blog/{post.slug}" class="group">
						<h2 class="mb-2 text-2xl font-semibold transition-colors group-hover:text-primary">
							{post.title}
						</h2>
						{#if post.excerpt}
							<p class="mb-4 text-muted-foreground">{post.excerpt}</p>
						{/if}
						<div class="text-sm text-muted-foreground">
							<time datetime={new Date(post.createdAt).toISOString()}>
								{new Date(post.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						</div>
					</a>
				</article>
			{/each}
		</div>
	{/if}
</div>
