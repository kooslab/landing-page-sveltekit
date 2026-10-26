<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let {
		selectedDate = $bindable(''),
		selectedTime = $bindable('')
	}: {
		selectedDate: string;
		selectedTime: string;
	} = $props();

	let currentMonth = $state(new Date().getMonth());
	let currentYear = $state(new Date().getFullYear());

	let today = $derived(new Date().toISOString().split('T')[0]);

	const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	// 30-min slots from 09:00 to 18:00
	const timeSlots = Array.from({ length: 18 }, (_, i) => {
		const hour = Math.floor(i / 2) + 9;
		const min = i % 2 === 0 ? '00' : '30';
		return `${String(hour).padStart(2, '0')}:${min}`;
	});

	let monthLabel = $derived(
		new Date(currentYear, currentMonth).toLocaleDateString(undefined, {
			month: 'long',
			year: 'numeric'
		})
	);

	let daysInMonth = $derived(new Date(currentYear, currentMonth + 1, 0).getDate());
	let firstDayOfWeek = $derived(new Date(currentYear, currentMonth, 1).getDay());

	function dateToString(day: number): string {
		const m = String(currentMonth + 1).padStart(2, '0');
		const d = String(day).padStart(2, '0');
		return `${currentYear}-${m}-${d}`;
	}

	function isPast(day: number): boolean {
		return dateToString(day) < today;
	}

	function isWeekend(day: number): boolean {
		const dow = new Date(currentYear, currentMonth, day).getDay();
		return dow === 0 || dow === 6;
	}

	function selectDate(day: number) {
		if (isPast(day) || isWeekend(day)) return;
		const ds = dateToString(day);
		if (selectedDate === ds) {
			selectedDate = '';
			selectedTime = '';
		} else {
			selectedDate = ds;
			selectedTime = '';
		}
	}

	function prevMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	let canGoPrev = $derived(
		currentYear > new Date().getFullYear() ||
			(currentYear === new Date().getFullYear() && currentMonth > new Date().getMonth())
	);

	let selectedDateLabel = $derived(
		selectedDate
			? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
					weekday: 'long',
					month: 'long',
					day: 'numeric'
				})
			: ''
	);

	function formatTime(t: string): string {
		const [h, m] = t.split(':').map(Number);
		const suffix = h >= 12 ? 'PM' : 'AM';
		const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
		return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
	}
</script>

<div class="select-none">
	<!-- Month navigation -->
	<div class="mb-3 flex items-center justify-between">
		<button
			type="button"
			onclick={prevMonth}
			disabled={!canGoPrev}
			class="rounded-md p-1.5 text-ink/70 transition-colors hover:bg-ink/5 disabled:opacity-30"
		>
			<ChevronLeft class="h-4 w-4" />
		</button>
		<span class="text-sm font-semibold text-ink">{monthLabel}</span>
		<button
			type="button"
			onclick={nextMonth}
			class="rounded-md p-1.5 text-ink/70 transition-colors hover:bg-ink/5"
		>
			<ChevronRight class="h-4 w-4" />
		</button>
	</div>

	<!-- Weekday headers -->
	<div class="mb-1 grid grid-cols-7 text-center">
		{#each weekdays as wd}
			<div class="py-1 text-xs font-medium text-ink/40">{wd}</div>
		{/each}
	</div>

	<!-- Day grid -->
	<div class="grid grid-cols-7 gap-0.5">
		{#each Array(firstDayOfWeek) as _}
			<div></div>
		{/each}
		{#each Array(daysInMonth) as _, i}
			{@const day = i + 1}
			{@const past = isPast(day)}
			{@const weekend = isWeekend(day)}
			{@const disabled = past || weekend}
			{@const selected = selectedDate === dateToString(day)}
			<button
				type="button"
				{disabled}
				onclick={() => selectDate(day)}
				class="flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors
					{disabled
					? 'cursor-not-allowed text-ink/15'
					: selected
						? 'bg-brand font-semibold text-white'
						: 'text-ink cursor-pointer hover:bg-ink/5'}"
			>
				{day}
			</button>
		{/each}
	</div>

	<!-- Time slots (shown after date is picked) -->
	{#if selectedDate}
		<div class="mt-4 border-t border-ink/10 pt-4">
			<p class="mb-2.5 text-sm font-semibold text-ink">
				{selectedDateLabel} - pick a time
			</p>
			<div class="grid grid-cols-3 gap-1.5">
				{#each timeSlots as slot}
					<button
						type="button"
						onclick={() => (selectedTime = selectedTime === slot ? '' : slot)}
						class="rounded-lg px-2 py-2 text-sm font-medium transition-colors
							{selectedTime === slot ? 'bg-brand text-white' : 'bg-ink/[0.03] text-ink/70 hover:bg-ink/[0.07]'}"
					>
						{formatTime(slot)}
					</button>
				{/each}
			</div>
			<p class="mt-2 text-xs text-ink/35">Times shown in your local timezone (CET)</p>
		</div>
	{/if}
</div>
