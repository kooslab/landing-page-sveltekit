<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { invalidateAll } from '$app/navigation';

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

			await invalidateAll();
		} catch (error) {
			console.error('Error updating post:', error);
			alert('Failed to update post');
		} finally {
			loading = null;
		}
	}
</script>

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
								if ((e.target as HTMLElement).closest('button, a')) return;
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
