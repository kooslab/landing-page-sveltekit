<script lang="ts">
	import type { PageData } from './$types';
	import type { BookingItem } from '$lib/server/db/schema';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { invalidateAll } from '$app/navigation';
	import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, X, ArrowRight } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	let loading = $state(false);

	// Form state
	let showForm = $state(false);
	let editingId = $state<string | null>(null);
	let formKey = $state('');
	let formLabel = $state('');
	let formDescription = $state('');
	let formPriceCents = $state<number | null>(null);
	let formSegments = $state('');
	let formSortOrder = $state(0);
	let formActive = $state(true);
	let formError = $state('');

	// Preview state
	let showPreview = $state(false);
	let previewSegment = $state('');

	function resetForm() {
		editingId = null;
		formKey = '';
		formLabel = '';
		formDescription = '';
		formPriceCents = null;
		formSegments = '';
		formSortOrder = 0;
		formActive = true;
		formError = '';
	}

	function openNew() {
		resetForm();
		formSortOrder = data.items.length > 0 ? Math.max(...data.items.map((i) => i.sortOrder)) + 1 : 0;
		showForm = true;
	}

	function openEdit(item: BookingItem) {
		editingId = item.id;
		formKey = item.key;
		formLabel = item.label;
		formDescription = item.description;
		formPriceCents = item.priceCents;
		formSegments = item.segments.join(', ');
		formSortOrder = item.sortOrder;
		formActive = item.active;
		formError = '';
		showForm = true;
	}

	function closeForm() {
		showForm = false;
		resetForm();
	}

	async function saveItem() {
		if (!formKey.trim() || !formLabel.trim() || !formDescription.trim()) {
			formError = 'Key, label, and description are required';
			return;
		}

		loading = true;
		formError = '';

		try {
			const segments = formSegments
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean);

			const body = {
				key: formKey,
				label: formLabel,
				description: formDescription,
				priceCents: formPriceCents,
				segments,
				sortOrder: formSortOrder,
				active: formActive
			};

			const url = editingId ? `/api/admin/booking-items/${editingId}` : '/api/admin/booking-items';

			const res = await fetch(url, {
				method: editingId ? 'PATCH' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});

			const result = await res.json();
			if (!res.ok) {
				formError = result.error || 'Failed to save';
				return;
			}

			closeForm();
			await invalidateAll();
		} catch {
			formError = 'Failed to save booking item';
		} finally {
			loading = false;
		}
	}

	async function toggleActive(item: BookingItem) {
		loading = true;
		try {
			await fetch(`/api/admin/booking-items/${item.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ active: !item.active })
			});
			await invalidateAll();
		} finally {
			loading = false;
		}
	}

	async function deleteItem(item: BookingItem) {
		if (!confirm(`Delete "${item.label}"? This cannot be undone.`)) return;

		loading = true;
		try {
			await fetch(`/api/admin/booking-items/${item.id}`, { method: 'DELETE' });
			await invalidateAll();
		} finally {
			loading = false;
		}
	}

	function formatPrice(cents: number | null): string {
		if (cents === null) return 'Custom pricing';
		return `€${(cents / 100).toLocaleString()}`;
	}

	let allSegments = $derived([...new Set(data.items.flatMap((i) => i.segments))].sort());

	let previewItems = $derived(
		data.items.filter((i) => {
			if (!i.active) return false;
			if (!previewSegment) return true;
			return i.segments.length === 0 || i.segments.includes(previewSegment);
		})
	);
</script>

<div class="flex-1 px-8 py-8">
	<!-- Header -->
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Booking Items</h1>
			<p class="mt-1 text-base text-foreground/60">
				Configure the services shown in the reservation modal
			</p>
		</div>
		<div class="flex gap-3">
			<Button variant="outline" onclick={() => (showPreview = !showPreview)}>
				{showPreview ? 'Hide Preview' : 'Order Preview'}
			</Button>
			<Button onclick={openNew}>
				<Plus size={16} class="mr-1.5" />
				Add Item
			</Button>
		</div>
	</div>

	<!-- Preview panel -->
	{#if showPreview}
		<div class="mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-bold">Reservation Modal Preview</h2>
				<div class="flex items-center gap-2">
					<span class="text-sm text-foreground/50">Segment:</span>
					<select
						bind:value={previewSegment}
						class="rounded-lg border border-border px-3 py-1.5 text-sm focus:border-brand/40 focus:outline-none"
					>
						<option value="">All (no filter)</option>
						{#each allSegments as seg}
							<option value={seg}>{seg}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="mx-auto max-w-lg space-y-2">
				{#each previewItems as item}
					<div
						class="flex w-full items-center gap-3 rounded-xl border border-brand/10 px-4 py-3 text-left text-sm font-medium text-foreground/70"
					>
						<span
							class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground/20"
						></span>
						<span>{item.label} - {item.description}</span>
					</div>
				{/each}
				{#if previewItems.length === 0}
					<p class="py-4 text-center text-foreground/50">No items for this segment</p>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Form modal -->
	{#if showForm}
		<div class="mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-bold">{editingId ? 'Edit' : 'New'} Booking Item</h2>
				<button onclick={closeForm} class="rounded-lg p-1.5 hover:bg-muted">
					<X size={18} />
				</button>
			</div>

			{#if formError}
				<div class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{formError}
				</div>
			{/if}

			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="item-key" class="mb-1.5 block text-sm font-semibold">Key</label>
					<input
						id="item-key"
						type="text"
						bind:value={formKey}
						placeholder="e.g. diagnosis"
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
					<p class="mt-1 text-xs text-foreground/50">Unique identifier, no spaces</p>
				</div>
				<div>
					<label for="item-label" class="mb-1.5 block text-sm font-semibold">Label</label>
					<input
						id="item-label"
						type="text"
						bind:value={formLabel}
						placeholder="e.g. Business Diagnosis"
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
				</div>
				<div class="sm:col-span-2">
					<label for="item-desc" class="mb-1.5 block text-sm font-semibold">Description</label>
					<input
						id="item-desc"
						type="text"
						bind:value={formDescription}
						placeholder="e.g. €300 · Half day · In-person · Berlin"
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
				</div>
				<div>
					<label for="item-price" class="mb-1.5 block text-sm font-semibold">Price (cents)</label>
					<input
						id="item-price"
						type="number"
						bind:value={formPriceCents}
						placeholder="e.g. 30000 for €300"
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
					<p class="mt-1 text-xs text-foreground/50">Leave empty for custom pricing</p>
				</div>
				<div>
					<label for="item-segments" class="mb-1.5 block text-sm font-semibold">Segments</label>
					<input
						id="item-segments"
						type="text"
						bind:value={formSegments}
						placeholder="e.g. agencies, education, studios"
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
					<p class="mt-1 text-xs text-foreground/50">Comma-separated. Empty = show on all pages</p>
				</div>
				<div>
					<label for="item-order" class="mb-1.5 block text-sm font-semibold">Sort Order</label>
					<input
						id="item-order"
						type="number"
						bind:value={formSortOrder}
						class="w-full rounded-lg border border-border px-3 py-2 text-base focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
					/>
				</div>
			</div>

			<div class="mt-4 flex items-center gap-4">
				<label class="flex cursor-pointer items-center gap-2">
					<input type="checkbox" bind:checked={formActive} class="h-4 w-4 accent-brand" />
					<span class="text-sm font-medium">Active (visible in reservation modal)</span>
				</label>
			</div>

			<div class="mt-5 flex justify-end gap-3">
				<Button variant="outline" onclick={closeForm}>Cancel</Button>
				<Button onclick={saveItem} disabled={loading}>
					{loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
				</Button>
			</div>
		</div>
	{/if}

	<!-- Items table -->
	{#if data.items.length === 0}
		<div class="rounded-2xl border border-dashed border-border py-16 text-center">
			<p class="text-lg font-medium text-foreground/50">No booking items yet</p>
			<p class="mt-1 text-base text-foreground/40">
				Add your first service to show in the reservation modal
			</p>
			<Button class="mt-4" onclick={openNew}>
				<Plus size={16} class="mr-1.5" />
				Add First Item
			</Button>
		</div>
	{:else}
		<div class="overflow-x-auto rounded-xl border border-border bg-white">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b bg-muted/30">
						<th class="w-10 px-4 py-3"></th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Key</th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Label</th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Description</th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Price</th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Segments</th>
						<th class="px-4 py-3 text-center text-sm font-semibold">Status</th>
						<th class="px-4 py-3 text-right text-sm font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.items as item}
						<tr class="border-b last:border-0 hover:bg-muted/20">
							<td class="px-4 py-3 text-center text-foreground/30">
								<GripVertical size={16} />
							</td>
							<td class="px-4 py-3">
								<code class="rounded bg-muted px-1.5 py-0.5 text-sm">{item.key}</code>
							</td>
							<td class="px-4 py-3 font-medium">{item.label}</td>
							<td class="max-w-xs truncate px-4 py-3 text-sm text-foreground/70">
								{item.description}
							</td>
							<td class="px-4 py-3 text-sm">{formatPrice(item.priceCents)}</td>
							<td class="px-4 py-3">
								{#if item.segments.length === 0}
									<span class="text-sm text-foreground/40">All pages</span>
								{:else}
									<div class="flex flex-wrap gap-1">
										{#each item.segments as seg}
											<Badge variant="secondary">{seg}</Badge>
										{/each}
									</div>
								{/if}
							</td>
							<td class="px-4 py-3 text-center">
								<button onclick={() => toggleActive(item)} disabled={loading}>
									{#if item.active}
										<Badge variant="default">Active</Badge>
									{:else}
										<Badge variant="outline">Inactive</Badge>
									{/if}
								</button>
							</td>
							<td class="px-4 py-3">
								<div class="flex justify-end gap-1">
									<Button variant="ghost" size="sm" onclick={() => openEdit(item)}>
										<Pencil size={14} />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										class="text-destructive hover:text-destructive"
										onclick={() => deleteItem(item)}
									>
										<Trash2 size={14} />
									</Button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
