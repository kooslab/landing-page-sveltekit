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
		class="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
		role="dialog"
		aria-modal="true"
	>
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={close}
			aria-hidden="true"
		></div>

		<!-- Modal card — wide on desktop, full-width bottom-sheet on mobile -->
		<div
			class="relative z-10 flex w-full flex-col overflow-hidden border border-border bg-background shadow-2xl sm:max-w-2xl sm:rounded-sm"
			style="max-height: 92dvh;"
		>
			<!-- Header -->
			<div class="flex-shrink-0 border-b border-border px-6 py-5">
				<div class="flex items-start justify-between gap-4">
					<div>
						<p class="mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
							Free · 45 min · Video call
						</p>
						<h2 class="font-display text-2xl font-black tracking-tighter text-foreground">
							Book a free Discovery
						</h2>
					</div>
					<button
						onclick={close}
						class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
						aria-label="Close"
					>
						<X class="h-4 w-4" />
					</button>
				</div>
			</div>

			{#if result?.success}
				<!-- Success state -->
				<div class="flex-1 px-6 py-12 text-center">
					<div
						class="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-brand-violet"
					>
						<svg class="h-6 w-6 text-brand-violet" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<h3 class="font-display text-2xl font-black tracking-tighter text-foreground">
						You're booked.
					</h3>
					<p class="mt-3 text-base text-foreground/70">{result.message}</p>
					<button
						onclick={close}
						class="mt-8 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground"
					>
						Done
					</button>
				</div>
			{:else}
				<!-- Body: single column on mobile, two columns on desktop -->
				<form onsubmit={handleSubmit} class="min-h-0 flex-1 overflow-y-auto sm:overflow-visible">
					<div class="flex flex-col sm:flex-row sm:divide-x sm:divide-border">
						<!-- Left column (desktop): calendar -->
						<div class="px-6 py-6 sm:w-[280px] sm:flex-shrink-0">
							<p class="mb-3 text-sm font-semibold text-foreground">
								Preferred dates
								<span class="block font-normal text-muted-foreground">pick up to 3</span>
							</p>
							<DatePickerGrid bind:selectedDates maxDates={3} />
							{#if errors.dates}
								<p class="mt-1 text-sm text-red-400">{errors.dates}</p>
							{/if}
						</div>

						<!-- Right column (desktop) / rest on mobile: fields + submit -->
						<div
							class="flex flex-1 flex-col justify-between px-6 pb-8 pt-0 sm:overflow-y-auto sm:py-6"
						>
							<div class="space-y-5">
								<!-- Name -->
								<div>
									<label for="diag-name" class="mb-2 block text-sm font-semibold text-foreground">
										Your name
									</label>
									<input
										id="diag-name"
										type="text"
										bind:value={name}
										placeholder="Jane Smith"
										class="w-full border-b border-border bg-transparent pb-2 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
									/>
									{#if errors.name}
										<p class="mt-1 text-sm text-red-400">{errors.name}</p>
									{/if}
								</div>

								<!-- Email -->
								<div>
									<label for="diag-email" class="mb-2 block text-sm font-semibold text-foreground">
										Email address
									</label>
									<input
										id="diag-email"
										type="email"
										bind:value={email}
										placeholder="jane@company.com"
										class="w-full border-b border-border bg-transparent pb-2 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
									/>
									{#if errors.email}
										<p class="mt-1 text-sm text-red-400">{errors.email}</p>
									{/if}
								</div>

								<!-- Message -->
								<div>
									<label
										for="diag-message"
										class="mb-2 block text-sm font-semibold text-foreground"
									>
										Anything we should know?
										<span class="font-normal text-muted-foreground">(optional)</span>
									</label>
									<textarea
										id="diag-message"
										bind:value={message}
										placeholder="Your biggest operational headache right now..."
										rows={2}
										class="w-full resize-none border-b border-border bg-transparent pb-2 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
									></textarea>
								</div>

								<!-- Consent -->
								<div>
									<label class="flex cursor-pointer items-start gap-3">
										<input
											type="checkbox"
											bind:checked={consentChecked}
											class="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-foreground"
											disabled={submitting}
										/>
										<span class="text-sm leading-relaxed text-muted-foreground">
											I agree to be contacted. See our
											<a
												href="{langPrefix}/privacy"
												class="text-foreground underline hover:text-foreground/70"
											>
												privacy policy
											</a>.
										</span>
									</label>
									{#if errors.consent}
										<p class="mt-1 text-sm text-red-400">{errors.consent}</p>
									{/if}
								</div>

								{#if result && !result.success}
									<p class="text-sm text-red-400">{result.message}</p>
								{/if}
							</div>

							<!-- Submit -->
							<button
								type="submit"
								disabled={submitting || !consentChecked}
								class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
							>
								{submitting ? 'Booking...' : 'Book Free Discovery'}
								{#if !submitting}
									<ArrowRight class="h-4 w-4" />
								{/if}
							</button>
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}
