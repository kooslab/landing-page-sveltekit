<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Switch } from '$lib/components/ui/switch';
	import Editor from '$lib/components/Editor.svelte';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let title = $state(data.post.title);
	let slug = $state(data.post.slug);
	let excerpt = $state(data.post.excerpt || '');
	let content = $state(data.post.content);
	let published = $state(data.post.published);
	let loading = $state(false);

	async function handleSubmit(e?: Event) {
		if (e) e.preventDefault();
		loading = true;

		try {
			const response = await fetch(`/api/admin/blog/${data.post.id}`, {
				method: 'PUT',
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
				throw new Error('Failed to update post');
			}

			await goto('/admin/blogs');
		} catch (error) {
			console.error('Error updating post:', error);
			alert('Failed to update post');
		} finally {
			loading = false;
		}
	}

	async function handleDelete() {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}

		loading = true;

		try {
			const response = await fetch(`/api/admin/blog/${data.post.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete post');
			}

			await goto('/admin/blogs');
		} catch (error) {
			console.error('Error deleting post:', error);
			alert('Failed to delete post');
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<div class="w-64 border-r bg-background p-6">
		<div class="mb-8">
			<h2 class="text-lg font-semibold">Admin Panel</h2>
		</div>
		<nav class="space-y-2">
			<a
				href="/admin"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="7" height="7"></rect>
					<rect x="14" y="3" width="7" height="7"></rect>
					<rect x="14" y="14" width="7" height="7"></rect>
					<rect x="3" y="14" width="7" height="7"></rect>
				</svg>
				Dashboard
			</a>
			<a
				href="/admin/blogs"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
				</svg>
				Blog Posts
			</a>
			<a
				href="/admin/blogs/new"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
				Create Article
			</a>
			<div class="my-4 border-t"></div>
			<a
				href="/"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
					<polyline points="10 17 15 12 10 7"></polyline>
					<line x1="15" y1="12" x2="3" y2="12"></line>
				</svg>
				View Site
			</a>
		</nav>
	</div>

	<!-- Main Content -->
	<div class="max-w-4xl flex-1 px-8 py-8">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold">Edit Article</h1>
			<div class="flex gap-2">
				<Button type="button" disabled={loading} onclick={() => handleSubmit()}>
					{loading ? 'Saving...' : 'Update Article'}
				</Button>
				{#if !published}
					<Button
						type="button"
						variant="default"
						disabled={loading}
						onclick={() => {
							published = true;
							handleSubmit();
						}}
					>
						{loading ? 'Publishing...' : 'Publish Now'}
					</Button>
				{/if}
				<Button variant="destructive" onclick={handleDelete} disabled={loading}>Delete</Button>
				<Button variant="outline" href="/admin/blogs">Cancel</Button>
			</div>
		</div>

		<form onsubmit={handleSubmit} class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-lg font-semibold text-foreground">Title</h2>
				<Input id="title" bind:value={title} required placeholder="My Awesome Blog Post" />
				<p class="text-sm text-muted-foreground">The main title of your blog post</p>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold text-foreground">URL Slug</h2>
				<Input id="slug" bind:value={slug} required placeholder="my-awesome-blog-post" />
				<p class="text-sm text-muted-foreground">
					URL: /blog/{slug}
				</p>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold text-foreground">Excerpt (optional)</h2>
				<Textarea
					id="excerpt"
					bind:value={excerpt}
					rows={3}
					placeholder="A brief summary of your blog post that will appear in the blog listing..."
				/>
				<p class="text-sm text-muted-foreground">A short preview of your article (2-3 sentences)</p>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold text-foreground">Article Content</h2>
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
				<Label for="published" class="cursor-pointer text-base font-medium text-foreground"
					>Published</Label
				>
			</div>

			<div class="flex gap-4">
				<Button type="submit" disabled={loading}>
					{loading ? 'Saving...' : 'Update Article'}
				</Button>
				{#if !published}
					<Button
						type="button"
						variant="default"
						disabled={loading}
						onclick={() => {
							published = true;
							handleSubmit();
						}}
					>
						{loading ? 'Publishing...' : 'Publish Now'}
					</Button>
				{/if}
				<Button variant="outline" href="/admin/blogs">Cancel</Button>
			</div>
		</form>
	</div>
</div>
