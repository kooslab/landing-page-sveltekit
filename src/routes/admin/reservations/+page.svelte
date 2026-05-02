<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { invalidateAll } from '$app/navigation';
	import { Ellipsis, CheckCircle, CircleCheck, XCircle, Trash2 } from 'lucide-svelte';

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

	async function deleteReservation(id: string) {
		if (!confirm('Delete this reservation?')) return;
		loading = id;
		try {
			const response = await fetch(`/api/admin/reservations/${id}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete');
			await invalidateAll();
		} catch (error) {
			console.error('Error deleting reservation:', error);
			alert('Failed to delete reservation');
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
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="ghost" size="sm" disabled={loading === reservation.id}>
											<Ellipsis size={16} />
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										{#if reservation.status !== 'confirmed'}
											<DropdownMenu.Item onclick={() => updateStatus(reservation.id, 'confirmed')}>
												<CheckCircle size={14} class="mr-2" />
												Confirm
											</DropdownMenu.Item>
										{/if}
										{#if reservation.status !== 'completed'}
											<DropdownMenu.Item onclick={() => updateStatus(reservation.id, 'completed')}>
												<CircleCheck size={14} class="mr-2" />
												Complete
											</DropdownMenu.Item>
										{/if}
										{#if reservation.status !== 'cancelled'}
											<DropdownMenu.Item onclick={() => updateStatus(reservation.id, 'cancelled')}>
												<XCircle size={14} class="mr-2" />
												Cancel
											</DropdownMenu.Item>
										{/if}
										<DropdownMenu.Separator />
										<DropdownMenu.Item
											class="text-destructive focus:text-destructive"
											onclick={() => deleteReservation(reservation.id)}
										>
											<Trash2 size={14} class="mr-2" />
											Delete
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
