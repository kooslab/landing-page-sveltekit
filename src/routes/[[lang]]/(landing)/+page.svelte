<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import PromoPopup from '$lib/components/sections/promo-popup.svelte';
	import ReservationModal from './workshops/components/reservation-modal.svelte';
	import { ArrowRight, ChevronDown } from 'lucide-svelte';

	let { data } = $props();

	let reservationOpen = $state(false);
	let reservationType = $state<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('ax_l1');
	let openFaq = $state<number | null>(null);

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	function book(type: 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom' = 'ax_l1') {
		reservationType = type;
		reservationOpen = true;
	}

	$effect(() => {
		const handler = () => book('diagnosis');
		document.addEventListener('open-booking-modal', handler);
		return () => document.removeEventListener('open-booking-modal', handler);
	});
</script>

<SEO
	title={isKorean
		? 'KooStory - B2B AI 전환 & AX 핸즈온 교육 | 베를린'
		: 'KooStory - Hands-on AI Training for B2B Teams | Berlin'}
	description={isKorean
		? 'Scale or Fade. 진짜 문제를 가져오세요. 함께 해결합니다. 베를린 기반 AI 핸즈온 교육.'
		: "Scale or Fade. Bring your real problem. Break things. That's how you actually learn. Hands-on AI training in Berlin."}
	ogImage="/og-image-landing.png"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'KooStory',
		url: 'https://koostory.net',
		description: 'AX hands-on training for B2B teams in Berlin',
		publisher: {
			'@type': 'Organization',
			name: 'KooStory',
			logo: { '@type': 'ImageObject', url: 'https://koostory.net/logo.png' }
		}
	}}
/>

<PromoPopup showPromo={data.showPromo} onBook={() => book('diagnosis')} />
<ReservationModal bind:open={reservationOpen} bind:workshopType={reservationType} />

<main class="w-full">
	<!-- ═══════════════════════════════════ 1. HERO ══ -->
	<section class="min-h-screen overflow-hidden bg-brand">
		<div class="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-stretch">
			<!-- Left: copy -->
			<div
				class="flex flex-col justify-center px-5 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:w-1/2 lg:py-28 lg:pl-16 lg:pr-12 xl:pl-20"
			>
				<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
					{$_('landing.hero.eyebrow')}
				</span>
				<h1
					class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[52px] xl:text-[58px]"
					style="line-height: 1.08;"
				>
					{$_('landing.hero.title')}
				</h1>
				<p class="mt-6 max-w-md text-lg leading-relaxed text-white/80 md:mt-8 md:text-xl">
					{$_('landing.hero.subtitle')}
				</p>
				<div class="mt-10 md:mt-12">
					<button
						onclick={() => book('diagnosis')}
						class="inline-flex items-center gap-2 rounded-full bg-brand-violet px-7 py-3.5 text-sm font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
					>
						{$_('landing.hero.cta')}
						<ArrowRight class="h-4 w-4" />
					</button>
					<p class="mt-3 text-base text-white/75">
						{$_('landing.hero.ctaSub')}
					</p>
				</div>
			</div>

			<!-- Right: workshop photo -->
			<div class="relative hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
				<img
					src="/images/workshop.jpg"
					alt="KooStory AI workshop in session"
					class="max-h-[420px] w-[85%] rounded-2xl object-cover opacity-90"
				/>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 2. MIRROR ══ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.mirror.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.mirror.headline')}
			</p>

			<div
				class="mt-14 flex flex-col items-start gap-10 md:mt-16 md:flex-row md:items-center md:gap-14"
			>
				<img
					src="/images/busy.jpeg"
					alt="Cavemen too busy pushing square wheels to accept a round one"
					class="w-full rounded-xl opacity-80 md:w-96 md:flex-shrink-0"
				/>
				<div class="space-y-6">
					{#each $_('landing.mirror.items') as item}
						<div class="border-l-2 border-brand pl-6">
							<p class="text-xl leading-relaxed text-ink md:text-2xl">{item}</p>
						</div>
					{/each}
				</div>
			</div>

			<p class="mt-12 text-xl font-medium text-ink/70 md:mt-14 md:text-2xl">
				{$_('landing.mirror.subline')}
			</p>
			<p class="mt-4 text-lg font-semibold text-brand md:text-xl">
				{$_('landing.mirror.bridge')}
			</p>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 3. FOMO ══ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.fomo.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.fomo.headline')}
			</p>
			<p class="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">{$_('landing.fomo.p1')}</p>
			<p class="mt-4 text-lg leading-relaxed text-ink/80 md:text-xl">{$_('landing.fomo.p2')}</p>

			<div class="mt-12 overflow-hidden rounded-2xl border border-canvas-warm md:mt-14">
				<div class="grid grid-cols-2">
					<div class="border-r border-canvas-warm bg-ink/[.04] px-6 py-4 md:px-8">
						<p class="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
							{$_('landing.fomo.fomoLabel')}
						</p>
					</div>
					<div class="bg-brand/[.06] px-6 py-4 md:px-8">
						<p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">
							{$_('landing.fomo.realLabel')}
						</p>
					</div>
				</div>
				{#each [0, 1, 2] as i}
					<div class="grid grid-cols-2 border-t border-canvas-warm bg-white">
						<div class="border-r border-canvas-warm px-6 py-5 md:px-8 md:py-6">
							<p class="text-base leading-snug text-ink/60 line-through md:text-lg">
								"{$_(`landing.fomo.rows.${i}.fomo`)}"
							</p>
						</div>
						<div class="px-6 py-5 md:px-8 md:py-6">
							<p class="text-base font-semibold leading-snug text-ink md:text-lg">
								"{$_(`landing.fomo.rows.${i}.real`)}"
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════ 4. WHY EFFORTS FAIL ══ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.effortsFail.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.effortsFail.headline')}
			</p>

			<div class="mt-14 space-y-5 md:mt-16">
				{#each [0, 1, 2] as i}
					<div class="rounded-2xl border border-canvas-warm bg-canvas-soft p-7 md:p-9">
						<p class="mb-3 text-lg font-bold leading-snug text-ink md:text-xl">
							{i + 1}. {$_(`landing.effortsFail.items.${i}.label`)}
						</p>
						<p class="text-base leading-relaxed text-ink/70 md:text-lg">
							{$_(`landing.effortsFail.items.${i}.description`)}
						</p>
					</div>
				{/each}
			</div>

			<div class="mt-10 rounded-2xl bg-brand px-8 py-7 md:mt-12">
				<p class="text-base font-medium text-white/60 md:text-lg">
					{$_('landing.effortsFail.conclusion')}
				</p>
				<p class="mt-1 text-xl font-bold text-white md:text-2xl">
					{$_('landing.effortsFail.conclusionBold')}
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 5. METHOD ══ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.method.badge')}
			</span>
			<p
				class="mb-16 text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:mb-20 md:text-5xl lg:text-[52px]"
			>
				{$_('landing.method.headline')}
			</p>

			<div class="space-y-16 md:space-y-20">
				{#each [0, 1, 2] as i}
					<div class="flex gap-8 md:gap-12">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white md:h-12 md:w-12"
							style="margin-top: 4px;"
						>
							{i + 1}
						</div>
						<div>
							<h3
								class="text-2xl font-bold leading-[1.15] tracking-tight text-brand sm:text-3xl md:text-4xl lg:text-[40px]"
							>
								{$_(`landing.method.steps.${i}.title`)}
							</h3>
							<p class="mt-4 text-lg leading-relaxed text-ink/70 md:text-xl">
								{$_(`landing.method.steps.${i}.description`)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════ 6. TRANSFORMATION ══ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.transformation.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.transformation.headline')}
			</p>

			<div class="mt-12 overflow-hidden rounded-2xl border border-canvas-warm md:mt-14">
				<div class="grid grid-cols-2">
					<div class="border-r border-canvas-warm bg-ink/[.04] px-6 py-4 md:px-8">
						<p class="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
							{$_('landing.transformation.beforeLabel')}
						</p>
					</div>
					<div class="bg-brand/[.06] px-6 py-4 md:px-8">
						<p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">
							{$_('landing.transformation.afterLabel')}
						</p>
					</div>
				</div>
				<div class="grid grid-cols-2 border-t border-canvas-warm bg-white">
					<div class="border-r border-canvas-warm px-6 py-8 md:px-8 md:py-10">
						<p class="text-lg leading-relaxed text-ink/70 md:text-xl">
							{$_('landing.transformation.before')}
						</p>
					</div>
					<div class="px-6 py-8 md:px-8 md:py-10">
						<p class="text-lg font-semibold leading-relaxed text-ink md:text-xl">
							{$_('landing.transformation.after')}
						</p>
					</div>
				</div>
			</div>

			<div class="mt-10 space-y-4 md:mt-12">
				<p class="text-lg leading-relaxed text-ink/70 md:text-xl">
					{$_('landing.transformation.p1')}
				</p>
				<p class="text-lg leading-relaxed text-ink/70 md:text-xl">
					{$_('landing.transformation.p2')}
				</p>
				<p class="text-lg leading-relaxed text-ink/70 md:text-xl">
					{$_('landing.transformation.p3')}
				</p>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════ 7. FOR / NOT FOR ══ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.forNotFor.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.forNotFor.headline')}
			</p>

			<div class="mt-12 md:mt-14">
				<p class="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
					{$_('landing.forNotFor.notForLabel')}
				</p>
				<div class="space-y-4">
					{#each $_('landing.forNotFor.notForItems') as item}
						<div
							class="flex items-start gap-4 rounded-2xl border border-canvas-warm bg-white px-6 py-5"
						>
							<span class="mt-0.5 text-lg text-ink/30">—</span>
							<p class="text-lg leading-snug text-ink md:text-xl">{item}</p>
						</div>
					{/each}
				</div>
				<p class="mt-8 text-base leading-relaxed text-ink/60 md:text-lg">
					{$_('landing.forNotFor.note')}
				</p>
			</div>
		</div>
	</section>

	<!-- ════════════════════════════════════ 8. FAQ ══ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.faq.badge')}
			</span>
			<h2
				class="mb-10 text-3xl font-bold leading-[1.1] tracking-tight text-brand sm:text-4xl md:mb-14 md:text-5xl lg:text-[52px]"
			>
				{$_('landing.faq.title')}
			</h2>
			<div class="divide-y divide-canvas-warm border-t border-canvas-warm">
				{#each [0, 1, 2, 3, 4] as i}
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

	<!-- ══════════════════════════════ 9. CLOSING ══ -->
	<section class="bg-brand px-5 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28 lg:pb-40 lg:pt-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-12 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:mb-16 md:text-5xl lg:text-[52px]"
			>
				{$_('landing.closing.axeHeadline')}
			</p>

			<img
				src="/images/ax.png"
				alt={$_('landing.axeStory.imageAlt')}
				class="mx-auto w-4/5 rounded-2xl object-cover opacity-90"
			/>

			<div class="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-10">
				<div class="rounded-2xl border border-white/10 bg-white/[.05] p-7 md:p-8">
					<p class="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-white/50">
						{$_('landing.closing.fadeLabel')}
					</p>
					<div class="space-y-3">
						{#each $_('landing.closing.fadeItems') as item}
							<div class="flex items-start gap-3">
								<span class="mt-1 text-white/30">✕</span>
								<p class="text-base leading-snug text-white/60 md:text-lg">{item}</p>
							</div>
						{/each}
					</div>
				</div>
				<div class="rounded-2xl border border-brand-violet/20 bg-brand-violet/10 p-7 md:p-8">
					<p class="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">
						{$_('landing.closing.scaleLabel')}
					</p>
					<div class="space-y-3">
						{#each $_('landing.closing.scaleItems') as item}
							<div class="flex items-start gap-3">
								<span class="mt-1 text-brand-violet">✓</span>
								<p class="text-base font-medium leading-snug text-white md:text-lg">{item}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-16 text-center md:mt-20">
				<h2
					class="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
					style="line-height: 0.96;"
				>
					{$_('landing.closing.title')}
				</h2>
				<p class="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
					{$_('landing.closing.lead')}
				</p>
				<div class="mt-10 md:mt-12">
					<button
						onclick={() => book('diagnosis')}
						class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
					>
						{$_('landing.closing.cta')}
						<ArrowRight class="h-4 w-4" />
					</button>
					<p class="mt-3 text-sm text-white/50">{$_('landing.closing.ctaSub')}</p>
				</div>
			</div>
		</div>
	</section>
</main>
