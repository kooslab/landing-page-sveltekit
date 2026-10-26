<script lang="ts">
	import { X, ArrowRight } from 'lucide-svelte';
	import DatePickerGrid from './date-picker-grid.svelte';
	import DateTimePicker from './date-time-picker.svelte';

	interface BookingItem {
		id: string;
		key: string;
		label: string;
		description: string;
		priceCents: number | null;
		sortOrder: number;
		active: boolean;
	}

	let {
		open = $bindable(false),
		workshopType = $bindable('custom'),
		segment = '',
		simple = false
	}: {
		open: boolean;
		workshopType: string;
		segment?: string;
		simple?: boolean;
	} = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	// Full mode: multiple dates
	let selectedDates = $state<string[]>([]);
	// Simple mode: single date + time
	let selectedDate = $state('');
	let selectedTime = $state('');
	let consentChecked = $state(false);
	let submitting = $state(false);
	let result = $state<{ success: boolean; message: string } | null>(null);
	let errors = $state<Record<string, string>>({});

	let bookingItems = $state<BookingItem[]>([]);
	let loadedSegment = $state<string | null>(null);

	// Fallback labels in case DB items haven't loaded yet
	const fallbackLabels: Record<string, string> = {
		diagnosis: 'Business Diagnosis - €300 · Half day · In-person · Berlin',
		ax_l1: 'AX Training L1 - AI Productivity · €400 · Half day · Group',
		ax_l2: 'AX Training L2 - AI Workflows · €700 · Full day · Group',
		ax_l3: 'AX Training L3 - Claude Code · €1,200 · Full day + 1 week follow-up',
		custom: "Custom Software Development - Let's scope together"
	};

	async function loadBookingItems() {
		if (loadedSegment === segment) return;
		try {
			const params = segment ? `?segment=${encodeURIComponent(segment)}` : '';
			const res = await fetch(`/api/booking-items${params}`);
			const data = await res.json();
			if (data.items && data.items.length > 0) {
				bookingItems = data.items;
			}
		} catch {
			// Silently fall back to hardcoded items
		}
		loadedSegment = segment;
	}

	$effect(() => {
		if (open && !simple) {
			loadBookingItems();
		}
	});

	let displayItems = $derived(
		bookingItems.length > 0
			? bookingItems.map((item) => ({
					key: item.key,
					label: `${item.label} - ${item.description}`
				}))
			: Object.entries(fallbackLabels).map(([key, label]) => ({ key, label }))
	);

	let currentLabel = $derived(
		displayItems.find((i) => i.key === workshopType)?.label || workshopType
	);

	function resetForm() {
		name = '';
		email = '';
		message = '';
		selectedDates = [];
		selectedDate = '';
		selectedTime = '';
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
		if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email';

		if (simple) {
			if (!selectedDate) errors.dates = 'Please select a date';
			else if (!selectedTime) errors.dates = 'Please select a time';
		} else {
			if (selectedDates.length === 0) errors.dates = 'Please select at least one preferred date';
		}

		if (!consentChecked) errors.consent = 'Please agree to the data processing terms';

		if (Object.keys(errors).length > 0) return;

		submitting = true;
		try {
			// Build preferredDates: in simple mode, send "YYYY-MM-DD HH:MM" as single entry
			const preferredDates = simple ? [`${selectedDate} ${selectedTime}`] : selectedDates.sort();

			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					workshopType,
					name: name.trim(),
					email: email.trim(),
					message: message.trim(),
					preferredDates
				})
			});

			const data = await res.json();
			if (res.ok && data.success) {
				result = {
					success: true,
					message: simple
						? "You're booked! We'll send a confirmation email shortly."
						: "Reservation received! We'll confirm your date within 1-2 business days."
				};
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
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={close}
			aria-hidden="true"
		></div>

		<!-- Modal card -->
		<div
			class="relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
			style="max-height: 92dvh;"
		>
			<!-- Header -->
			<div class="flex-shrink-0 border-b border-ink/8 px-6 py-5">
				<div class="flex items-start justify-between gap-4">
					<div>
						{#if simple}
							<h2 class="text-xl font-bold text-ink">Book a Free 30-Min Call</h2>
							<p class="mt-0.5 text-sm text-ink/50">
								No commitment - just a quick chat about your ops
							</p>
						{:else}
							<h2 class="text-xl font-bold text-ink">Book a Session</h2>
							<p class="mt-0.5 text-sm text-ink/50">{currentLabel}</p>
						{/if}
					</div>
					<button
						onclick={close}
						class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink/60"
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
						<h3 class="text-lg font-bold text-ink">{result.message}</h3>
						<p class="mt-2 text-sm text-ink/50">Check your email for details.</p>
						<button
							onclick={close}
							class="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-base font-bold text-white hover:opacity-90"
						>
							Close
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5">
						<!-- Workshop type selector (full mode only) -->
						{#if !simple}
							<div>
								<p class="mb-2 text-sm font-semibold text-ink">What are you interested in?</p>
								<div class="space-y-2">
									{#each displayItems as item (item.key)}
										<button
											type="button"
											class="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors
												{workshopType === item.key
												? 'border-brand/30 bg-brand/[0.06] text-brand'
												: 'border-brand/10 text-ink/70 hover:border-brand/20 hover:bg-brand/[0.03]'}"
											onclick={() => (workshopType = item.key)}
										>
											<span
												class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2
												{workshopType === item.key ? 'border-brand' : 'border-ink/20'}"
											>
												{#if workshopType === item.key}
													<span class="h-2 w-2 rounded-full bg-brand"></span>
												{/if}
											</span>
											{item.label}
										</button>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Date/time picker -->
						<div>
							{#if simple}
								<p class="mb-1.5 text-sm font-semibold text-ink">Pick a date and time</p>
								<DateTimePicker bind:selectedDate bind:selectedTime />
							{:else}
								<p class="mb-1.5 text-sm font-semibold text-ink">Preferred Dates (up to 3)</p>
								<DatePickerGrid bind:selectedDates maxDates={3} />
							{/if}
							{#if errors.dates}
								<p class="mt-1 text-sm text-red-500">{errors.dates}</p>
							{/if}
						</div>

						<!-- Name -->
						<div>
							<label for="res-name" class="mb-1.5 block text-sm font-semibold text-ink">Name</label>
							<input
								id="res-name"
								type="text"
								bind:value={name}
								placeholder="Your name"
								class="w-full rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.name}
								<p class="mt-1 text-sm text-red-500">{errors.name}</p>
							{/if}
						</div>

						<!-- Email -->
						<div>
							<label for="res-email" class="mb-1.5 block text-sm font-semibold text-ink"
								>Email</label
							>
							<input
								id="res-email"
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								class="w-full rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-500">{errors.email}</p>
							{/if}
						</div>

						<!-- Message -->
						<div>
							<label for="res-message" class="mb-1.5 block text-sm font-semibold text-ink">
								{simple ? 'Anything we should know? (optional)' : 'Message (optional)'}
							</label>
							<textarea
								id="res-message"
								bind:value={message}
								placeholder={simple
									? 'e.g. My team spends 10 hours/week on manual data entry...'
									: 'Any details about your project or preferences...'}
								rows={2}
								class="w-full resize-none rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3 text-base text-ink placeholder:text-ink/30 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10"
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
									I agree that KooStory (Koostory UG) may store and process my name, email, and
									message to manage my reservation and contact me about it. I can withdraw consent
									at any time by emailing ilmokoo@koostory.net.
									<a href="/privacy" class="underline hover:text-ink/80"> Privacy Policy </a>
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
							{submitting ? 'Submitting...' : simple ? 'Book My Call' : 'Reserve Workshop'}
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
