<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let {
		selectedDates = $bindable<string[]>([]),
		maxDates = 3
	}: {
		selectedDates: string[];
		maxDates?: number;
	} = $props();

	let currentMonth = $state(new Date().getMonth());
	let currentYear = $state(new Date().getFullYear());

	let today = $derived(new Date().toISOString().split('T')[0]);

	let weekdays = $derived([
		$_('reservation.calendar.sun'),
		$_('reservation.calendar.mon'),
		$_('reservation.calendar.tue'),
		$_('reservation.calendar.wed'),
		$_('reservation.calendar.thu'),
		$_('reservation.calendar.fri'),
		$_('reservation.calendar.sat')
	]);

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

	function isSelected(day: number): boolean {
		return selectedDates.includes(dateToString(day));
	}

	function toggleDate(day: number) {
		const ds = dateToString(day);
		if (isPast(day)) return;
		if (selectedDates.includes(ds)) {
			selectedDates = selectedDates.filter((d) => d !== ds);
		} else if (selectedDates.length < maxDates) {
			selectedDates = [...selectedDates, ds];
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
</script>

<div class="select-none">
	<!-- Month navigation -->
	<div class="mb-3 flex items-center justify-between">
		<button
			type="button"
			onclick={prevMonth}
			disabled={!canGoPrev}
			class="rounded-md p-1.5 transition-colors hover:bg-accent disabled:opacity-30"
		>
			<ChevronLeft class="h-4 w-4" />
		</button>
		<span class="text-sm font-medium">{monthLabel}</span>
		<button
			type="button"
			onclick={nextMonth}
			class="rounded-md p-1.5 transition-colors hover:bg-accent"
		>
			<ChevronRight class="h-4 w-4" />
		</button>
	</div>

	<!-- Weekday headers -->
	<div class="mb-1 grid grid-cols-7 text-center">
		{#each weekdays as wd}
			<div class="py-1 text-xs font-medium text-muted-foreground">{wd}</div>
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
			{@const selected = isSelected(day)}
			<button
				type="button"
				disabled={past}
				onclick={() => toggleDate(day)}
				class="flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors
					{past
					? 'cursor-not-allowed text-muted-foreground/40'
					: selected
						? 'bg-primary font-semibold text-primary-foreground'
						: 'cursor-pointer hover:bg-accent'}"
			>
				{day}
			</button>
		{/each}
	</div>

	<!-- Selection hint -->
	<p class="mt-3 text-center text-xs text-muted-foreground">
		{$_('reservation.calendar.hint', { values: { selected: selectedDates.length, max: maxDates } })}
	</p>
</div>
