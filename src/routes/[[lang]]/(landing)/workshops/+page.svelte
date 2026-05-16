<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import ReservationModal from './components/reservation-modal.svelte';
	import { ArrowRight, ChevronDown } from 'lucide-svelte';

	let lang = $derived($page.params?.lang || 'en');

	let modalOpen = $state(false);
	let modalWorkshopType = $state<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('ax_l1');
	let openFaq = $state<number | null>(null);

	const axLevelKeys = ['basic', 'intermediate', 'advanced'] as const;
	const axTypes = ['ax_l1', 'ax_l2', 'ax_l3'] as const;

	function book(type: 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom') {
		modalWorkshopType = type;
		modalOpen = true;
	}
</script>

<SEO
	title={$_('workshops.seo.title')}
	description={$_('workshops.seo.description')}
	ogImage="/og-image-landing.png"
/>

<ReservationModal bind:open={modalOpen} bind:workshopType={modalWorkshopType} />

<main class="w-full">
	<!-- ══════════════════════════════════════════════ -->
	<!-- HERO                                           -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-brand px-5 pb-20 pt-24 md:px-12 md:pb-28 md:pt-32">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				{$_('landing.ax_training.badge')}
			</span>
			<h1
				class="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[52px] lg:text-[60px]"
			>
				{$_('landing.ax_training.title')}
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl">
				{$_('landing.ax_training.intro')}
			</p>
			<div class="mt-10 md:mt-12">
				<button
					onclick={() => book('diagnosis')}
					class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-all hover:border-white/40 hover:text-white"
				>
					Not sure which level? Book a free 20-min call
					<ArrowRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- AX LEVELS                                      -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl space-y-5">
			{#each axLevelKeys as levelKey, i}
				<div
					class="rounded-2xl border p-7 md:p-9 {i === 2
						? 'border-brand/20 bg-brand/[0.03]'
						: 'border-canvas-warm bg-white'}"
				>
					<div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
						<!-- Left: info -->
						<div class="flex-1">
							<div class="mb-4 flex flex-wrap items-center gap-2">
								<span
									class="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
								>
									{i + 1}
								</span>
								<span class="text-sm font-bold uppercase tracking-[0.15em] text-brand">
									{$_(`landing.ax_training.levels.${levelKey}.level`)}
								</span>
								<span
									class="rounded-full border border-canvas-warm px-3 py-0.5 text-sm text-ink/60"
								>
									{$_(`landing.ax_training.levels.${levelKey}.duration`)}
								</span>
							</div>
							<h2 class="mb-2 text-xl font-bold text-ink md:text-2xl">
								{$_(`landing.ax_training.levels.${levelKey}.title`)}
							</h2>
							<p class="text-base leading-relaxed text-ink/70">
								{$_(`landing.ax_training.levels.${levelKey}.description`)}
							</p>
							<p class="mt-3 text-sm text-ink/50">
								{$_(`landing.pricing.ax.levels.${levelKey}.format`)}
							</p>
						</div>

						<!-- Right: price + CTA -->
						<div class="flex flex-row items-center gap-5 sm:flex-col sm:items-end sm:gap-3">
							<div class="text-right">
								<p class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
									€{$_(`landing.pricing.ax.levels.${levelKey}.price`)}
								</p>
								<p class="text-sm text-ink/50">{$_('landing.pricing.ax.perGroup')}</p>
							</div>
							<button
								onclick={() => book(axTypes[i])}
								class="flex-shrink-0 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
							>
								Book L{i + 1}
							</button>
						</div>
					</div>
				</div>
			{/each}

			<p
				class="rounded-xl border border-canvas-warm bg-canvas-soft px-5 py-4 text-sm leading-relaxed text-ink/70"
			>
				{$_('landing.pricing.note')}
			</p>
			<p class="text-sm text-ink/60">{$_('landing.ax_training.note')}</p>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- FREE DIAGNOSIS CTA                             -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-16 md:px-12 md:py-20">
		<div class="mx-auto max-w-4xl">
			<div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
				<div>
					<p class="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-brand">
						{$_('workshops.free.badge')}
					</p>
					<h3 class="text-2xl font-bold text-ink md:text-3xl">
						{$_('workshops.free.title')}
					</h3>
					<p class="mt-2 max-w-lg text-base leading-relaxed text-ink/70">
						{$_('workshops.free.description')}
					</p>
				</div>
				<button
					onclick={() => book('diagnosis')}
					class="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
				>
					{$_('workshops.free.cta')}
					<ArrowRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- FAQ                                            -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.faq.badge')}
			</span>
			<h2 class="mb-12 text-3xl font-bold leading-[1.1] tracking-tight text-brand md:text-4xl">
				{$_('landing.faq.title')}
			</h2>
			<div class="divide-y divide-canvas-warm border-t border-canvas-warm">
				{#each [0, 1, 2, 3] as i}
					{@const isOpen = openFaq === i}
					<button
						class="flex w-full items-start justify-between gap-6 py-7 text-left md:py-8"
						onclick={() => (openFaq = isOpen ? null : i)}
					>
						<h3 class="text-lg font-semibold leading-snug text-ink md:text-xl">
							{$_(`landing.faq.items.${i}.q`)}
						</h3>
						<ChevronDown
							class="mt-1 h-6 w-6 flex-shrink-0 text-ink/60 transition-transform duration-200 {isOpen
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if isOpen}
						<div class="pb-7 md:pb-8">
							<p class="text-base leading-relaxed text-ink/80 md:text-lg">
								{$_(`landing.faq.items.${i}.a`)}
							</p>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
</main>
