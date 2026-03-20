<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import DatePickerGrid from './date-picker-grid.svelte';

	let {
		open = $bindable(false),
		workshopType = $bindable<'requirements' | 'vibe' | 'free'>('requirements')
	}: {
		open: boolean;
		workshopType: 'requirements' | 'vibe' | 'free';
	} = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let selectedDates = $state<string[]>([]);
	let submitting = $state(false);
	let result = $state<{ success: boolean; message: string } | null>(null);
	let errors = $state<Record<string, string>>({});

	let workshopLabels = $derived({
		requirements: $_('reservation.types.requirements'),
		vibe: $_('reservation.types.vibe'),
		free: $_('reservation.types.free')
	});

	function resetForm() {
		name = '';
		email = '';
		message = '';
		selectedDates = [];
		result = null;
		errors = {};
	}

	function handleOpenChange(isOpen: boolean) {
		open = isOpen;
		if (!isOpen) {
			// Reset on close after a delay so animation finishes
			setTimeout(resetForm, 300);
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};

		// Client-side validation
		if (!name.trim()) errors.name = $_('reservation.errors.nameRequired');
		if (!email.trim() || !email.includes('@')) errors.email = $_('reservation.errors.emailInvalid');
		if (selectedDates.length === 0) errors.dates = $_('reservation.errors.datesRequired');

		if (Object.keys(errors).length > 0) return;

		submitting = true;
		try {
			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					workshopType,
					name: name.trim(),
					email: email.trim(),
					message: message.trim(),
					preferredDates: selectedDates.sort()
				})
			});

			const data = await res.json();
			if (res.ok && data.success) {
				result = { success: true, message: $_('reservation.success') };
			} else {
				result = { success: false, message: data.error || $_('reservation.error') };
			}
		} catch {
			result = { success: false, message: $_('reservation.error') };
		} finally {
			submitting = false;
		}
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-h-[90vh] overflow-y-auto sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>{$_('reservation.title')}</Dialog.Title>
			<Dialog.Description>
				{workshopLabels[workshopType]}
			</Dialog.Description>
		</Dialog.Header>

		{#if result?.success}
			<!-- Success state -->
			<div class="py-6 text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
				>
					<svg class="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<p class="text-sm text-foreground">{result.message}</p>
				<Button class="mt-4" variant="outline" onclick={() => (open = false)}>
					{$_('reservation.close')}
				</Button>
			</div>
		{:else}
			<!-- Form -->
			<form onsubmit={handleSubmit} class="space-y-4">
				<!-- Workshop type selector -->
				<div class="space-y-2">
					<Label>{$_('reservation.workshopLabel')}</Label>
					<div class="space-y-1.5">
						{#each ['free', 'requirements', 'vibe'] as type}
							<button
								type="button"
								class="flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors
									{workshopType === type
									? 'border-primary bg-primary/5 font-medium'
									: 'border-input hover:bg-muted/50'}"
								onclick={() => (workshopType = type)}
							>
								<span
									class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2
									{workshopType === type ? 'border-primary' : 'border-muted-foreground/30'}"
								>
									{#if workshopType === type}
										<span class="h-2 w-2 rounded-full bg-primary"></span>
									{/if}
								</span>
								{$_(`reservation.types.${type}`)}
							</button>
						{/each}
					</div>
				</div>

				<!-- Date picker -->
				<div class="space-y-1.5">
					<Label>{$_('reservation.datesLabel')}</Label>
					<DatePickerGrid bind:selectedDates maxDates={3} />
					{#if errors.dates}
						<p class="text-xs text-destructive">{errors.dates}</p>
					{/if}
				</div>

				<!-- Name -->
				<div class="space-y-1.5">
					<Label for="name">{$_('reservation.nameLabel')}</Label>
					<Input id="name" bind:value={name} placeholder={$_('reservation.namePlaceholder')} />
					{#if errors.name}
						<p class="text-xs text-destructive">{errors.name}</p>
					{/if}
				</div>

				<!-- Email -->
				<div class="space-y-1.5">
					<Label for="email">{$_('reservation.emailLabel')}</Label>
					<Input
						id="email"
						type="email"
						bind:value={email}
						placeholder={$_('reservation.emailPlaceholder')}
					/>
					{#if errors.email}
						<p class="text-xs text-destructive">{errors.email}</p>
					{/if}
				</div>

				<!-- Message -->
				<div class="space-y-1.5">
					<Label for="message">{$_('reservation.messageLabel')}</Label>
					<Textarea
						id="message"
						bind:value={message}
						placeholder={$_('reservation.messagePlaceholder')}
						rows={3}
					/>
				</div>

				{#if result && !result.success}
					<p class="text-sm text-destructive">{result.message}</p>
				{/if}

				<Button type="submit" class="w-full" disabled={submitting}>
					{submitting ? $_('reservation.submitting') : $_('reservation.submit')}
				</Button>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>
