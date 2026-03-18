<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import ReservationModal from './components/reservation-modal.svelte';

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);

	let modalOpen = $state(false);
	let modalWorkshopType = $state<'requirements' | 'vibe' | 'free'>('requirements');

	function openReservation(type: 'requirements' | 'vibe' | 'free') {
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
	<!-- ═══════════════════════════════════════════════ -->
	<!-- HERO                                            -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-4 pb-12 pt-24 md:pb-20 md:pt-32">
		<div class="mx-auto max-w-4xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
				</span>
				<span class="text-xs font-semibold tracking-wide text-primary"
					>{$_('workshops.earlyBird')}</span
				>
			</div>
			<h1 class="text-3xl font-bold leading-[1.2] tracking-tight md:text-4xl lg:text-5xl">
				{$_('workshops.hero.title')}
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
				{$_('workshops.hero.subtitle')}
			</p>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- WORKSHOP CARDS                                   -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-4 pb-20 md:pb-28">
		<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
			<!-- Requirements Workshop -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
			>
				<div class="absolute right-0 top-0 overflow-hidden">
					<div
						class="translate-x-[30%] translate-y-[-10%] rotate-45 bg-primary px-10 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
					>
						50% off
					</div>
				</div>

				<div class="p-8 md:p-10">
					<!-- Price block -->
					<div class="mb-6">
						<div class="flex items-baseline gap-3">
							<span class="text-4xl font-bold tracking-tight md:text-5xl">200</span>
							<span class="text-lg font-medium text-muted-foreground">EUR</span>
						</div>
						<div class="mt-1 flex items-center gap-2">
							<span class="text-base text-muted-foreground line-through decoration-destructive/60"
								>400 EUR</span
							>
							<span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
								>{$_('workshops.earlyBird')}</span
							>
						</div>
					</div>

					<!-- Title & description -->
					<h2 class="mb-3 text-xl font-bold tracking-tight md:text-2xl">
						{$_('workshops.requirements.title')}
					</h2>
					<p class="mb-8 text-[15px] leading-relaxed text-muted-foreground">
						{$_('workshops.requirements.description')}
					</p>

					<!-- What's included -->
					<div class="mb-8">
						<p class="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
							{$_('workshops.whatsIncluded')}
						</p>
						<ul class="space-y-3">
							{#each $_('workshops.requirements.includes') as item}
								<li class="flex items-start gap-3 text-sm">
									<svg
										class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-foreground/80">{item}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Format -->
					<p class="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
						<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clip-rule="evenodd"
							/>
						</svg>
						{$_('workshops.requirements.format')}
					</p>

					<Button
						size="lg"
						class="group/btn w-full"
						onclick={() => openReservation('requirements')}
					>
						{$_('workshops.requirements.cta')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
					</Button>
				</div>
			</div>

			<!-- Vibe Coding Workshop -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
			>
				<div class="absolute right-0 top-0 overflow-hidden">
					<div
						class="translate-x-[30%] translate-y-[-10%] rotate-45 bg-primary px-10 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
					>
						50% off
					</div>
				</div>

				<div class="p-8 md:p-10">
					<!-- Price block -->
					<div class="mb-6">
						<div class="flex items-baseline gap-3">
							<span class="text-4xl font-bold tracking-tight md:text-5xl">100</span>
							<span class="text-lg font-medium text-muted-foreground">EUR</span>
						</div>
						<div class="mt-1 flex items-center gap-2">
							<span class="text-base text-muted-foreground line-through decoration-destructive/60"
								>200 EUR</span
							>
							<span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
								>{$_('workshops.earlyBird')}</span
							>
						</div>
					</div>

					<!-- Title & description -->
					<h2 class="mb-3 text-xl font-bold tracking-tight md:text-2xl">
						{$_('workshops.vibe.title')}
					</h2>
					<p class="mb-8 text-[15px] leading-relaxed text-muted-foreground">
						{$_('workshops.vibe.description')}
					</p>

					<!-- What's included -->
					<div class="mb-8">
						<p class="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
							{$_('workshops.whatsIncluded')}
						</p>
						<ul class="space-y-3">
							{#each $_('workshops.vibe.includes') as item}
								<li class="flex items-start gap-3 text-sm">
									<svg
										class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-foreground/80">{item}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Format -->
					<p class="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
						<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clip-rule="evenodd"
							/>
						</svg>
						{$_('workshops.vibe.format')}
					</p>

					<Button size="lg" class="group/btn w-full" onclick={() => openReservation('vibe')}>
						{$_('workshops.vibe.cta')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
					</Button>
				</div>
			</div>
		</div>

		<!-- Price note -->
		<p class="mx-auto mt-8 max-w-4xl text-center text-sm text-muted-foreground">
			{$_('workshops.priceNote')}
		</p>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- FREE WORKSHOP CALLOUT                           -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-16 md:py-20">
		<div class="mx-auto max-w-4xl">
			<div
				class="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center md:p-12"
			>
				<p class="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
					{$_('workshops.free.badge')}
				</p>
				<h3 class="mb-3 text-xl font-bold tracking-tight md:text-2xl">
					{$_('workshops.free.title')}
				</h3>
				<p class="mx-auto mb-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
					{$_('workshops.free.description')}
				</p>
				<Button variant="outline" size="lg" class="group" onclick={() => openReservation('free')}>
					{$_('workshops.free.cta')}
					<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- FAQ                                             -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-t border-border px-4 py-20 md:py-28">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-12 text-2xl font-bold tracking-tight md:text-3xl">
				{$_('workshops.faq.title')}
			</h2>
			<div class="space-y-8">
				{#each [0, 1, 2, 3] as i}
					<div>
						<h3 class="mb-2 text-base font-semibold">{$_(`workshops.faq.items.${i}.q`)}</h3>
						<p class="text-[15px] leading-relaxed text-muted-foreground">
							{$_(`workshops.faq.items.${i}.a`)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
