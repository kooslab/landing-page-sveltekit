<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Switch } from '$lib/components/ui/switch';
	import Editor from '$lib/components/Editor.svelte';
	import { goto } from '$app/navigation';

	let title = '';
	let slug = '';
	let excerpt = '';
	let content = '';
	let published = false;
	let loading = false;

	$: if (title && !slug) {
		slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}

	async function handleSubmit() {
		loading = true;

		try {
			const response = await fetch('/api/admin/blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					slug,
					excerpt,
					content,
					published
				})
			});

			if (!response.ok) {
				throw new Error('Failed to create post');
			}

			await goto('/admin/cms');
		} catch (error) {
			console.error('Error creating post:', error);
			alert('Failed to create post');
		} finally {
			loading = false;
		}
	}
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold">New Article</h1>
		<Button variant="outline" href="/admin/cms">Cancel</Button>
	</div>

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<div>
			<Label for="title">Title</Label>
			<Input id="title" bind:value={title} required placeholder="My Awesome Blog Post" />
			<p class="mt-1 text-sm text-muted-foreground">The main title of your blog post</p>
		</div>

		<div>
			<Label for="slug">URL Slug</Label>
			<Input id="slug" bind:value={slug} required placeholder="my-awesome-blog-post" />
			<p class="mt-1 text-sm text-muted-foreground">
				URL: /blog/{slug || 'your-slug-here'}
			</p>
		</div>

		<div>
			<Label for="excerpt">Excerpt (optional)</Label>
			<Textarea
				id="excerpt"
				bind:value={excerpt}
				rows={3}
				placeholder="A brief summary of your blog post that will appear in the blog listing..."
			/>
			<p class="mt-1 text-sm text-muted-foreground">
				A short preview of your article (2-3 sentences)
			</p>
		</div>

		<div class="space-y-2">
			<Label for="content">Article Content</Label>
			<p class="text-sm text-muted-foreground">
				Write your blog post below. You can switch between Rich Text and Markdown modes.
			</p>
			<Editor bind:content />
			<p class="mt-1 text-sm text-muted-foreground">
				💡 Tip: Use the toolbar to format text, or switch to Markdown mode for direct markdown
				editing
			</p>
		</div>

		<div class="flex items-center space-x-2">
			<Switch id="published" bind:checked={published} />
			<Label for="published">Publish immediately</Label>
		</div>

		<div class="flex gap-4">
			<Button type="submit" disabled={loading}>
				{loading ? 'Creating...' : 'Create Article'}
			</Button>
			<Button variant="outline" href="/admin/cms">Cancel</Button>
		</div>
	</form>
</div>
