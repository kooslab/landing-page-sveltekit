<script lang="ts">
	export let data: {
		posts: Array<{
			title: string;
			description: string;
			slug: string;
			date: Date;
			readingTime?: string;
		}>;
	};

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<div class="container max-w-[1024px] space-y-12 py-12">
	<h1 class="mb-8 text-3xl font-bold tracking-tighter text-foreground">Blog Posts</h1>

	<div class="grid gap-8">
		{#each data.posts as post}
			<article class="group relative rounded-lg border p-6 hover:bg-muted/50">
				<a href={`/blog/${post.slug}`} class="absolute inset-0 z-0" aria-label={post.title} />
				<div class="space-y-2">
					<div class="flex items-center gap-x-2 text-sm text-muted-foreground dark:text-gray-400">
						<time datetime={post.date.toISOString()}>
							{formatDate(post.date)}
						</time>
						{#if post.readingTime}
							<span>•</span>
							<span>{post.readingTime}</span>
						{/if}
					</div>
					<h2 class="text-2xl font-semibold tracking-tight text-foreground dark:text-gray-100">
						{post.title}
					</h2>
					{#if post.description}
						<p class="text-muted-foreground dark:text-gray-400">
							{post.description}
						</p>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</div>
