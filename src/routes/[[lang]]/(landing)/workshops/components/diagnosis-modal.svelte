<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowRight, X } from 'lucide-svelte';
	import DatePickerGrid from './date-picker-grid.svelte';

	let {
		open = $bindable(false)
	}: {
		open: boolean;
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

		if (!name.trim()) errors.name = 'Name is required';
		if (!email.trim() || !email.includes('@')) errors.email = 'A valid email is required';
		if (selectedDates.length === 0) errors.dates = 'Please select at least one preferred date';
		if (!consentChecked) errors.consent = 'Please agree to the privacy policy to continue';

		if (Object.keys(errors).length > 0) return;

		submitting = true;
		try {
			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					workshopType: 'diagnosis',
					name: name.trim(),
					email: email.trim(),
					message: message.trim(),
					preferredDates: selectedDates.sort()
				})
			});

			const data = await res.json();
			if (res.ok && data.success) {
				result = { success: true, message: "We'll confirm your slot within 24 hours." };
			} else {
				result = {
					success: false,
					message: data.error || 'Something went wrong. Please try again.'
				};
			}
		} catch {
			result = { success: false, message: 'Something went wrong. Please try again.' };
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
			class="relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl"
			style="max-height: 92dvh;"
		>
			<!-- Header -->
			<div class="flex-shrink-0 border-b border-brand/10 px-6 py-5">
				<div class="flex items-start justify-between gap-4">
					<div>
						<span
							class="mb-2 inline-block rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand"
						>
							Free until Jul 31, 2026
						</span>
						<h2 class="text-xl font-bold text-ink">Book Free AI Diagnosis</h2>
						<p class="mt-0.5 text-sm text-ink/50">45 min · Video call · No commitment</p>
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
						<h3 class="text-xl font-bold text-ink">You're booked!</h3>
						<p class="mt-2 text-base text-ink/60">{result.message}</p>
						<button
							onclick={close}
							class="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-base font-bold text-white hover:opacity-90"
						>
							Done
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5">
						<!-- Name -->
						<div>
							<label for="diag-name" class="mb-1.5 block text-sm font-semibold text-ink"
								>Your name</label
							>
							<input
								id="diag-name"
								type="text"
								bind:value={name}
								placeholder="Jane Smith"
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.name}
								<p class="mt-1 text-sm text-red-500">{errors.name}</p>
							{/if}
						</div>

						<!-- Email -->
						<div>
							<label for="diag-email" class="mb-1.5 block text-sm font-semibold text-ink"
								>Email address</label
							>
							<input
								id="diag-email"
								type="email"
								bind:value={email}
								placeholder="jane@company.com"
								class="w-full rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-500">{errors.email}</p>
							{/if}
						</div>

						<!-- Date picker -->
						<div>
							<p class="mb-1.5 text-sm font-semibold text-ink">
								Preferred dates <span class="font-normal text-ink/40">(pick up to 3)</span>
							</p>
							<div
								style="--primary: 243 38% 16%; --primary-foreground: 0 0% 100%; --accent: 243 20% 96%; --muted-foreground: 243 10% 55%;"
							>
								<DatePickerGrid bind:selectedDates maxDates={3} />
							</div>
							{#if errors.dates}
								<p class="mt-1 text-sm text-red-500">{errors.dates}</p>
							{/if}
						</div>

						<!-- Message -->
						<div>
							<label for="diag-message" class="mb-1.5 block text-sm font-semibold text-ink">
								Anything we should know? <span class="font-normal text-ink/40">(optional)</span>
							</label>
							<textarea
								id="diag-message"
								bind:value={message}
								placeholder="Your biggest operational headache right now..."
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
									I agree to be contacted about this session. See our
									<a href="{langPrefix}/privacy" class="underline hover:text-ink/80"
										>privacy policy</a
									>.
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
							{submitting ? 'Booking...' : 'Book Free Diagnosis'}
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
