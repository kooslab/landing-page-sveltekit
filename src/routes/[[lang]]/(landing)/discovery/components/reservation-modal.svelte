<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { X, ArrowRight } from 'lucide-svelte';
	import DatePickerGrid from './date-picker-grid.svelte';
	import { page } from '$app/stores';

	let {
		open = $bindable(false),
		workshopType = $bindable<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('diagnosis')
	}: {
		open: boolean;
		workshopType: 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom';
	} = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let selectedDates = $state<string[]>([]);
	let consentChecked = $state(false);
	let submitting = $state(false);
	let result = $state<{ success: boolean; message: string } | null>(null);
	let errors = $state<Record<string, string>>({});

	let langPrefix = $derived($page.params.lang ? `/${$page.params.lang}` : '');

	let workshopLabels = $derived({
		diagnosis: $_('reservation.types.diagnosis'),
		ax_l1: $_('reservation.types.ax_l1'),
		ax_l2: $_('reservation.types.ax_l2'),
		ax_l3: $_('reservation.types.ax_l3'),
		custom: $_('reservation.types.custom')
	});

	function resetForm() {
		name = '';
		email = '';
		message = '';
		selectedDates = [];
		consentChecked = false;
		result = null;
		errors = {};
	}

	function close() {
		open = false;
		setTimeout(resetForm, 300);
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	$effect(() => {
		if (!open) return;
		function onKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape') close();
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};

		if (!name.trim()) errors.name = $_('reservation.errors.nameRequired');
		if (!email.trim() || !email.includes('@')) errors.email = $_('reservation.errors.emailInvalid');
		if (selectedDates.length === 0) errors.dates = $_('reservation.errors.datesRequired');
		if (!consentChecked) errors.consent = $_('reservation.errors.consentRequired');

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

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
		role="dialog"
		aria-modal="true"
	>
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-brand/65 backdrop-blur-sm"
			onclick={close}
			aria-hidden="true"
		></div>

		<!-- Modal card -->
		<div
			class="relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
			style="max-height: 92dvh;"
		>
			<!-- Header -->
			<div class="flex-shrink-0 border-b border-brand/10 px-6 py-5">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h2 class="text-xl font-bold text-ink">{$_('reservation.title')}</h2>
						<p class="mt-0.5 text-sm text-ink/50">{workshopLabels[workshopType]}</p>
					</div>
					<button
						onclick={close}
						class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/30 transition-colors hover:bg-brand/5 hover:text-ink/60"
						aria-label="Close"
					>
						<X class="h-4 w-4" />
					</button>
				</div>
			</div>

			<!-- Body (scrollable) -->
			<div class="flex-1 overflow-y-auto px-6 py-6">
				{#if result?.success}
					<div class="py-10 text-center">
						<div
							class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10"
						>
							<svg class="h-7 w-7 text-brand" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<h3 class="text-xl font-bold text-ink">{$_('reservation.success')}</h3>
						<button
							onclick={close}
							class="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-base font-bold text-white hover:opacity-90"
						>
							{$_('reservation.close')}
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5">
						<!-- Workshop type selector -->
						<div>
							<p class="mb-2 text-sm font-semibold text-ink">{$_('reservation.workshopLabel')}</p>
							<div class="space-y-2">
								{#each ['diagnosis', 'ax_l1', 'ax_l2', 'ax_l3', 'custom'] as type (type)}
									<button
										type="button"
										class="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors
											{workshopType === type
											? 'border-brand/30 bg-brand/[0.06] text-brand'
											: 'border-brand/10 text-ink/70 hover:border-brand/20 hover:bg-brand/[0.03]'}"
										onclick={() =>
											(workshopType = type as 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom')}
									>
										<span
											class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2
											{workshopType === type ? 'border-brand' : 'border-ink/20'}"
										>
											{#if workshopType === type}
												<span class="h-2 w-2 rounded-full bg-brand"></span>
											{/if}
										</span>
										{$_(`reservation.types.${type}`)}
									</button>
								{/each}
							</div>
						</div>

						<!-- Date picker -->
						<div>
							<p class="mb-1.5 text-sm font-semibold text-ink">{$_('reservation.datesLabel')}</p>
							<div
								style="--primary: 243 38% 16%; --primary-foreground: 0 0% 100%; --accent: 243 20% 96%; --muted-foreground: 243 10% 55%;"
							>
								<DatePickerGrid bind:selectedDates maxDates={3} />
							</div>
							{#if errors.dates}
								<p class="mt-1 text-sm text-red-500">{errors.dates}</p>
							{/if}
						</div>

						<!-- Name -->
						<div>
							<label for="res-name" class="mb-1.5 block text-sm font-semibold text-ink"
								>{$_('reservation.nameLabel')}</label
							>
							<input
								id="res-name"
								type="text"
								bind:value={name}
								placeholder={$_('reservation.namePlaceholder')}
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.name}
								<p class="mt-1 text-sm text-red-500">{errors.name}</p>
							{/if}
						</div>

						<!-- Email -->
						<div>
							<label for="res-email" class="mb-1.5 block text-sm font-semibold text-ink"
								>{$_('reservation.emailLabel')}</label
							>
							<input
								id="res-email"
								type="email"
								bind:value={email}
								placeholder={$_('reservation.emailPlaceholder')}
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-500">{errors.email}</p>
							{/if}
						</div>

						<!-- Message -->
						<div>
							<label for="res-message" class="mb-1.5 block text-sm font-semibold text-ink">
								{$_('reservation.messageLabel')}
							</label>
							<textarea
								id="res-message"
								bind:value={message}
								placeholder={$_('reservation.messagePlaceholder')}
								rows={3}
								class="w-full resize-none rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							></textarea>
						</div>

						<!-- Consent -->
						<div>
							<label class="flex cursor-pointer items-start gap-3">
								<input
									type="checkbox"
									bind:checked={consentChecked}
									class="mt-1 h-4 w-4 flex-shrink-0 cursor-pointer rounded border-brand/20 accent-brand"
									disabled={submitting}
								/>
								<span class="text-sm leading-relaxed text-ink/60">
									{$_('reservation.consent')}
									<a href="{langPrefix}/privacy" class="underline hover:text-ink/80">
										{$_('footer.privacy')}
									</a>
								</span>
							</label>
							{#if errors.consent}
								<p class="mt-1 text-sm text-red-500">{errors.consent}</p>
							{/if}
						</div>

						{#if result && !result.success}
							<p class="text-sm text-red-500">{result.message}</p>
						{/if}

						<button
							type="submit"
							disabled={submitting || !consentChecked}
							class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
						>
							{submitting ? $_('reservation.submitting') : $_('reservation.submit')}
							{#if !submitting}
								<ArrowRight class="h-4 w-4" />
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}
