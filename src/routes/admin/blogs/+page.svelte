<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { invalidateAll } from '$app/navigation';
	import { toggleMode, mode } from 'mode-watcher';
	import { Sun, Moon } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	let loading = $state<string | null>(null);

	async function togglePublish(postId: string, currentStatus: boolean) {
		loading = postId;
		try {
			const response = await fetch(`/api/admin/blog/${postId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					published: !currentStatus
				})
			});

			if (!response.ok) {
				throw new Error('Failed to update post');
			}

			// Refresh the data to show updated status
			await invalidateAll();
		} catch (error) {
			console.error('Error updating post:', error);
			alert('Failed to update post');
		} finally {
			loading = null;
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
				class="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
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
				href="/admin/reservations"
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
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
					<line x1="16" y1="2" x2="16" y2="6"></line>
					<line x1="8" y1="2" x2="8" y2="6"></line>
					<line x1="3" y1="10" x2="21" y2="10"></line>
				</svg>
				Reservations
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
			<button
				onclick={toggleMode}
				class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				{#if $mode === 'dark'}
					<Sun size={20} />
					Light Mode
				{:else}
					<Moon size={20} />
					Dark Mode
				{/if}
			</button>
		</nav>
	</div>

	<!-- Main Content -->
	<div class="flex-1 px-8 py-8">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold">Blog Management</h1>
			<div class="flex gap-2">
				<Button href="/admin/blogs/new">New Article</Button>
				<form method="POST" action="/logout">
					<Button type="submit" variant="outline">Logout</Button>
				</form>
			</div>
		</div>

		{#if data.posts.length === 0}
			<p class="text-muted-foreground">No blog posts yet. Create your first one!</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
					<thead>
						<tr class="border-b">
							<th class="p-4 text-left">Title</th>
							<th class="p-4 text-left">Status</th>
							<th class="p-4 text-left">Created</th>
							<th class="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.posts as post}
							<tr
								class="cursor-pointer border-b hover:bg-muted/50"
								onclick={(e) => {
									if ((e.target as HTMLElement).closest('button')) return;
									window.location.href = `/admin/blogs/edit/${post.id}`;
								}}
							>
								<td class="p-4">
									<div>
										<div class="font-medium">{post.title}</div>
										<div class="text-sm text-muted-foreground">{post.slug}</div>
									</div>
								</td>
								<td class="p-4">
									{#if post.published}
										<Badge variant="default">Published</Badge>
									{:else}
										<Badge variant="secondary">Draft</Badge>
									{/if}
								</td>
								<td class="p-4 text-sm text-muted-foreground">
									{new Date(post.createdAt).toLocaleDateString()}
								</td>
								<td class="p-4">
									<div class="flex gap-2">
										{#if post.published}
											<Button variant="outline" size="sm" href="/blog/{post.slug}" target="_blank">
												View
											</Button>
											<Button
												variant="secondary"
												size="sm"
												onclick={() => togglePublish(post.id, post.published ?? false)}
												disabled={loading === post.id}
											>
												{loading === post.id ? 'Updating...' : 'Unpublish'}
											</Button>
										{:else}
											<Button
												variant="default"
												size="sm"
												onclick={() => togglePublish(post.id, post.published ?? false)}
												disabled={loading === post.id}
											>
												{loading === post.id ? 'Updating...' : 'Publish'}
											</Button>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
