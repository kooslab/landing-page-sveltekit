<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	let loading = $state<string | null>(null);

	const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		pending: 'outline',
		confirmed: 'default',
		completed: 'secondary',
		cancelled: 'destructive'
	};

	const workshopLabels: Record<string, string> = {
		requirements: 'Requirements',
		vibe: 'Vibe Coding',
		free: 'Free Consulting'
	};

	async function updateStatus(id: string, status: string) {
		loading = id;
		try {
			const response = await fetch(`/api/admin/reservations/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status })
			});

			if (!response.ok) throw new Error('Failed to update');
			await invalidateAll();
		} catch (error) {
			console.error('Error updating reservation:', error);
			alert('Failed to update reservation');
		} finally {
			loading = null;
		}
	}

	function formatDates(dates: string[] | null): string {
		if (!dates) return '-';
		return dates
			.map((d) =>
				new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					weekday: 'short'
				})
			)
			.join(', ');
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
				href="/admin/reservations"
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
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
					<line x1="16" y1="2" x2="16" y2="6"></line>
					<line x1="8" y1="2" x2="8" y2="6"></line>
					<line x1="3" y1="10" x2="21" y2="10"></line>
				</svg>
				Reservations
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
	<div class="flex-1 px-8 py-8">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold">Workshop Reservations</h1>
			<form method="POST" action="/logout">
				<Button type="submit" variant="outline">Logout</Button>
			</form>
		</div>

		{#if data.reservations.length === 0}
			<p class="text-muted-foreground">No reservations yet.</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
					<thead>
						<tr class="border-b">
							<th class="p-4 text-left">Name</th>
							<th class="p-4 text-left">Email</th>
							<th class="p-4 text-left">Workshop</th>
							<th class="p-4 text-left">Preferred Dates</th>
							<th class="p-4 text-left">Status</th>
							<th class="p-4 text-left">Created</th>
							<th class="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.reservations as reservation}
							<tr class="border-b hover:bg-muted/50">
								<td class="p-4">
									<div class="font-medium">{reservation.name}</div>
									{#if reservation.message}
										<div
											class="mt-1 max-w-xs truncate text-xs text-muted-foreground"
											title={reservation.message}
										>
											{reservation.message}
										</div>
									{/if}
								</td>
								<td class="p-4 text-sm">{reservation.email}</td>
								<td class="p-4">
									<Badge variant="secondary">
										{workshopLabels[reservation.workshopType] || reservation.workshopType}
									</Badge>
								</td>
								<td class="p-4 text-sm">{formatDates(reservation.preferredDates)}</td>
								<td class="p-4">
									<Badge variant={statusColors[reservation.status] || 'outline'}>
										{reservation.status}
									</Badge>
								</td>
								<td class="p-4 text-sm text-muted-foreground">
									{new Date(reservation.createdAt).toLocaleDateString()}
								</td>
								<td class="p-4">
									<div class="flex flex-wrap gap-1">
										{#if reservation.status !== 'confirmed'}
											<Button
												variant="default"
												size="sm"
												onclick={() => updateStatus(reservation.id, 'confirmed')}
												disabled={loading === reservation.id}
											>
												Confirm
											</Button>
										{/if}
										{#if reservation.status !== 'completed'}
											<Button
												variant="secondary"
												size="sm"
												onclick={() => updateStatus(reservation.id, 'completed')}
												disabled={loading === reservation.id}
											>
												Complete
											</Button>
										{/if}
										{#if reservation.status !== 'cancelled'}
											<Button
												variant="outline"
												size="sm"
												onclick={() => updateStatus(reservation.id, 'cancelled')}
												disabled={loading === reservation.id}
											>
												Cancel
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
