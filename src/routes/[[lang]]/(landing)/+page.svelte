<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import PromoPopup from '$lib/components/sections/promo-popup.svelte';
	import ReservationModal from './workshops/components/reservation-modal.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();

	let reservationOpen = $state(false);
	let reservationType = $state<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('ax_l1');

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	const axLevelKeys = ['basic', 'intermediate', 'advanced'] as const;
	const axTypes = ['ax_l1', 'ax_l2', 'ax_l3'] as const;
	const staticTestimonials = ['workshop1', 'workshop2', 'workshop3'];

	function book(type: 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom' = 'ax_l1') {
		reservationType = type;
		reservationOpen = true;
	}
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
	<!-- ══════════════════════════════════════════════ -->
	<!-- 1. HERO — indigo navy                         -->
	<!-- ══════════════════════════════════════════════ -->
	<section style="background-color: #1B1938;" class="overflow-hidden">
		<div class="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-stretch">
			<!-- Left: copy -->
			<div
				class="flex flex-col justify-center px-5 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:w-1/2 lg:py-28 lg:pl-16 lg:pr-12 xl:pl-20"
			>
				<span
					class="mb-6 block text-xs font-semibold uppercase tracking-[0.2em]"
					style="color: #C9B4FA;"
				>
					{$_('landing.hero.eyebrow')}
				</span>
				<h1
					class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[52px] xl:text-[58px]"
					style="line-height: 1.08;"
				>
					{$_('landing.hero.title')}
				</h1>
				<p
					class="mt-6 max-w-md text-lg leading-relaxed md:mt-8 md:text-xl"
					style="color: rgba(255,255,255,0.80);"
				>
					{$_('landing.hero.subtitle')}
				</p>
				<div class="mt-10 md:mt-12">
					<button
						onclick={() => book('diagnosis')}
						class="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-opacity hover:opacity-90 active:translate-y-px"
						style="background-color: #C9B4FA; color: #1B1938;"
					>
						{$_('landing.hero.cta')}
						<ArrowRight class="h-4 w-4" />
					</button>
					<p class="mt-3 text-xs" style="color: rgba(255,255,255,0.50);">
						{$_('landing.hero.ctaSub')}
					</p>
				</div>
				<p class="mt-8 text-xs tracking-wide" style="color: rgba(255,255,255,0.45);">
					{$_('landing.hero.meta')}
				</p>
			</div>

			<!-- Right: before → after visual -->
			<div class="relative hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
				<!-- Radial glow -->
				<div
					class="pointer-events-none absolute inset-0"
					style="background: radial-gradient(ellipse 70% 60% at 55% 50%, rgba(201,180,250,0.10) 0%, transparent 68%);"
				></div>

				<div class="relative mr-8 xl:mr-16">
					<div
						class="rounded-2xl p-8"
						style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(16px); min-width: 340px; max-width: 400px;"
					>
						<!-- Eyebrow -->
						<p
							class="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em]"
							style="color: rgba(201,180,250,0.65);"
						>
							Real result · last week
						</p>

						<!-- Before / After columns -->
						<div class="mb-6 grid grid-cols-2 gap-3">
							<!-- Before -->
							<div class="rounded-xl p-5" style="background: rgba(255,255,255,0.04);">
								<p
									class="mb-3 text-[10px] font-bold uppercase tracking-widest"
									style="color: rgba(255,255,255,0.30);"
								>
									Before
								</p>
								<p class="text-5xl font-bold leading-none text-white">3h</p>
								<p class="mt-2 text-xs leading-snug" style="color: rgba(255,255,255,0.40);">
									manual work<br />every Monday
								</p>
							</div>
							<!-- After -->
							<div
								class="rounded-xl p-5"
								style="background: rgba(201,180,250,0.08); border: 1px solid rgba(201,180,250,0.18);"
							>
								<p
									class="mb-3 text-[10px] font-bold uppercase tracking-widest"
									style="color: #C9B4FA;"
								>
									After
								</p>
								<p class="text-5xl font-bold leading-none text-white">0</p>
								<p class="mt-2 text-xs leading-snug" style="color: rgba(201,180,250,0.70);">
									runs itself<br />automatically
								</p>
							</div>
						</div>

						<!-- Confirmation bar -->
						<div
							class="flex items-center gap-3 rounded-xl px-5 py-4"
							style="background: rgba(201,180,250,0.10);"
						>
							<div
								class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
								style="background-color: #C9B4FA; color: #1B1938;"
							>
								✓
							</div>
							<p class="text-sm" style="color: rgba(255,255,255,0.80);">
								Built and deployed in a <strong class="text-white">2h workshop</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 2. PAIN — CEO monologue + AI gap             -->
	<!-- ══════════════════════════════════════════════ -->

	<!-- Part 1: CEO internal monologue -->
	<section class="bg-white px-5 pb-16 pt-20 md:px-12 md:pb-20 md:pt-28 lg:pb-24 lg:pt-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-14 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-16"
			>
				{$_('landing.pain.badge')}
			</span>
			<div class="space-y-12 md:space-y-14">
				{#each [0, 1, 2] as i}
					<p
						class="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
						style="color: #292827;"
					>
						{$_(`landing.pain.items.${i}`)}
					</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- Part 2: AI gap — same white canvas, continues the thought -->
	<section class="bg-white px-5 pb-20 md:px-12 md:pb-28 lg:pb-36">
		<div class="mx-auto max-w-4xl">
			<div class="border-t border-[#E8E4DD] pt-16 md:pt-20 lg:pt-24">
				<span
					class="mb-10 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
				>
					{$_('landing.pain.aiGap.label')}
				</span>

				<!-- Current usage — visually faded to signal low value -->
				<p
					class="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[46px]"
					style="color: rgba(41,40,39,0.22);"
				>
					{$_('landing.pain.aiGap.usage')}
				</p>
				<p class="mt-5 text-lg font-medium md:text-xl" style="color: rgba(41,40,39,0.38);">
					{$_('landing.pain.aiGap.usageImpact')}
				</p>

				<!-- The reveal — snaps back to full contrast -->
				<div class="mt-16 md:mt-20">
					<p
						class="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
						style="color: #292827;"
					>
						{$_('landing.pain.aiGap.reveal')}
					</p>
					<p class="mt-4 text-xl font-medium md:text-2xl" style="color: rgba(41,40,39,0.50);">
						{$_('landing.pain.aiGap.revealSub')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 3. FOMO TRAP — white, pattern interrupt       -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-12 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
			>
				{$_('landing.fomo.badge')}
			</span>

			<!-- Opener -->
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.fomo.headline')}
			</p>
			<p class="mt-5 text-xl font-medium md:text-2xl" style="color: rgba(41,40,39,0.45);">
				{$_('landing.fomo.subline')}
			</p>

			<!-- Contrast: wrong vs. right -->
			<div class="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
				<!-- FOMO — muted, struck -->
				<div class="rounded-2xl border border-[#E8E4DD] p-7 md:p-9">
					<p
						class="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]"
						style="color: rgba(41,40,39,0.30);"
					>
						{$_('landing.fomo.wrongLabel')}
					</p>
					<p
						class="text-xl font-medium leading-snug md:text-2xl"
						style="color: rgba(41,40,39,0.25); text-decoration: line-through; text-decoration-color: rgba(41,40,39,0.15);"
					>
						"{$_('landing.fomo.wrongQuote')}"
					</p>
				</div>

				<!-- Real problem — vivid -->
				<div
					class="rounded-2xl p-7 md:p-9"
					style="background: rgba(27,25,56,0.04); border: 1.5px solid rgba(27,25,56,0.12);"
				>
					<p class="mb-5 text-[11px] font-bold uppercase tracking-[0.18em]" style="color: #1B1938;">
						{$_('landing.fomo.rightLabel')}
					</p>
					<p class="text-xl font-semibold leading-snug md:text-2xl" style="color: #292827;">
						"{$_('landing.fomo.rightQuote')}"
					</p>
				</div>
			</div>

			<!-- Conclusion bridge -->
			<div class="mt-14 md:mt-16">
				<p
					class="text-2xl font-bold tracking-tight md:text-3xl lg:text-[36px]"
					style="color: rgba(41,40,39,0.40);"
				>
					{$_('landing.fomo.conclusion')}
				</p>
				<p
					class="mt-1 text-2xl font-bold tracking-tight md:text-3xl lg:text-[36px]"
					style="color: #292827;"
				>
					{$_('landing.fomo.conclusionBold')}
				</p>
				<p class="mt-6 text-base md:text-lg" style="color: rgba(41,40,39,0.50);">
					{$_('landing.fomo.cta')}
				</p>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 4. METHOD — canvas-soft, large scale          -->
	<!-- ══════════════════════════════════════════════ -->
	<section
		style="background-color: #FAFAF8;"
		class="border-y border-[#E8E4DD] px-5 py-20 md:px-12 md:py-28 lg:py-36"
	>
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
			>
				{$_('landing.method.badge')}
			</span>

			<p
				class="mb-16 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:mb-20 md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.method.headline')}
			</p>

			<div class="space-y-16 md:space-y-20">
				{#each [0, 1, 2] as i}
					<div class="flex gap-8 md:gap-12">
						<!-- Step number -->
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white md:h-12 md:w-12"
							style="background-color: #1B1938; margin-top: 6px;"
						>
							{i + 1}
						</div>
						<!-- Step content -->
						<div>
							<h3
								class="text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-[40px]"
								style="color: #292827;"
							>
								{$_(`landing.method.steps.${i}.title`)}
							</h3>
							<p
								class="mt-4 text-lg leading-relaxed md:text-xl"
								style="color: rgba(41,40,39,0.55);"
							>
								{$_(`landing.method.steps.${i}.description`)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 4. TRANSFORMATION — white                    -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-12 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-14"
			>
				{$_('landing.transformation.badge')}
			</span>

			<!-- Headline -->
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.transformation.headline')}
			</p>
			<p class="mt-5 text-xl font-medium md:text-2xl" style="color: rgba(41,40,39,0.45);">
				{$_('landing.transformation.subline')}
			</p>

			<!-- Column headers -->
			<div class="mt-16 grid grid-cols-[1fr_32px_1fr] md:mt-20">
				<p
					class="text-[11px] font-bold uppercase tracking-[0.18em]"
					style="color: rgba(41,40,39,0.30);"
				>
					{$_('landing.transformation.beforeLabel')}
				</p>
				<div></div>
				<p class="text-[11px] font-bold uppercase tracking-[0.18em]" style="color: #1B1938;">
					{$_('landing.transformation.afterLabel')}
				</p>
			</div>

			<!-- Transformation rows -->
			<div class="mt-4 border-t" style="border-color: #E8E4DD;">
				{#each $_('landing.transformation.rows') as row}
					<div
						class="grid grid-cols-[1fr_32px_1fr] items-center border-b py-6 md:py-7"
						style="border-color: #E8E4DD;"
					>
						<p class="text-base leading-snug md:text-lg" style="color: rgba(41,40,39,0.28);">
							{row.before}
						</p>
						<span class="text-center text-sm" style="color: rgba(41,40,39,0.18);">→</span>
						<p class="text-base font-semibold leading-snug md:text-lg" style="color: #292827;">
							{row.after}
						</p>
					</div>
				{/each}
			</div>

			<!-- Closing statement -->
			<div class="mt-14 md:mt-16">
				<p
					class="text-3xl font-bold tracking-tight md:text-4xl lg:text-[44px]"
					style="color: #292827;"
				>
					{$_('landing.transformation.closing')}
				</p>
				<p class="mt-4 text-lg md:text-xl" style="color: rgba(41,40,39,0.50);">
					{$_('landing.transformation.closingSub')}
				</p>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 5. FOR / NOT FOR — canvas-soft               -->
	<!-- ══════════════════════════════════════════════ -->
	<section
		style="background-color: #FAFAF8;"
		class="border-y border-[#E8E4DD] px-5 py-20 md:px-12 md:py-28 lg:py-36"
	>
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-12 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-14"
			>
				{$_('landing.forNotFor.badge')}
			</span>

			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.forNotFor.headline')}
			</p>

			<!-- Two columns — NOT FOR first, FOR second -->
			<div class="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-8">
				<!-- NOT FOR — left -->
				<div>
					<p
						class="mb-8 text-[11px] font-bold uppercase tracking-[0.18em]"
						style="color: rgba(41,40,39,0.55);"
					>
						{$_('landing.forNotFor.notForLabel')}
					</p>
					<div class="space-y-6">
						{#each $_('landing.forNotFor.notForItems') as item}
							<div class="flex items-start gap-4">
								<div
									class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
									style="background: rgba(41,40,39,0.12); color: rgba(41,40,39,0.60);"
								>
									✕
								</div>
								<p class="text-lg leading-snug md:text-xl" style="color: rgba(41,40,39,0.65);">
									{item}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- FOR — right -->
				<div>
					<p class="mb-8 text-[11px] font-bold uppercase tracking-[0.18em]" style="color: #1B1938;">
						{$_('landing.forNotFor.forLabel')}
					</p>
					<div class="space-y-6">
						{#each $_('landing.forNotFor.forItems') as item}
							<div class="flex items-start gap-4">
								<div
									class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
									style="background-color: #1B1938;"
								>
									✓
								</div>
								<p class="text-lg font-medium leading-snug md:text-xl" style="color: #292827;">
									{item}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Honest closer -->
			<div class="mt-14 rounded-2xl border border-[#E8E4DD] bg-white p-8 md:mt-16 md:p-10">
				<p class="text-xl font-semibold md:text-2xl" style="color: #292827;">
					{$_('landing.forNotFor.unsureLabel')}
				</p>
				<p class="mt-3 text-base leading-relaxed md:text-lg" style="color: rgba(41,40,39,0.55);">
					{$_('landing.forNotFor.unsureSub')}
				</p>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 6. AX LEVELS + PRICING — white               -->
	<!-- ══════════════════════════════════════════════ -->
	<section id="training" class="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
			>
				{$_('landing.ax_training.badge')}
			</span>
			<h2
				class="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.ax_training.title')}
			</h2>
			<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl">
				{$_('landing.ax_training.intro')}
			</p>

			<div class="mt-10 space-y-4 md:mt-12">
				{#each axLevelKeys as levelKey, i}
					<div
						class="rounded-xl border p-6 md:p-8 {i === 2
							? 'border-[#1B1938]/20 bg-[#1B1938]/[0.03]'
							: 'border-[#E8E4DD] bg-white'}"
					>
						<div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
							<div class="flex-1">
								<div class="mb-3 flex flex-wrap items-center gap-2">
									<span
										class="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
										style="background-color: #1B1938;">{i + 1}</span
									>
									<span
										class="text-xs font-bold uppercase tracking-[0.15em]"
										style="color: #1B1938;"
									>
										{$_(`landing.ax_training.levels.${levelKey}.level`)}
									</span>
									<span
										class="rounded-full border border-[#E8E4DD] px-3 py-0.5 text-xs text-muted-foreground"
									>
										{$_(`landing.ax_training.levels.${levelKey}.duration`)}
									</span>
								</div>
								<h3 class="mb-2 text-base font-semibold md:text-lg" style="color: #292827;">
									{$_(`landing.ax_training.levels.${levelKey}.title`)}
								</h3>
								<p class="text-sm leading-relaxed text-muted-foreground">
									{$_(`landing.ax_training.levels.${levelKey}.description`)}
								</p>
							</div>
							<div class="flex flex-row items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
								<span class="text-2xl font-bold tracking-tight" style="color: #292827;">
									€{$_(`landing.pricing.ax.levels.${levelKey}.price`)}
								</span>
								<button
									onclick={() => book(axTypes[i])}
									class="rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
									style="background-color: #1B1938;"
								>
									Book L{i + 1}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<p
				class="mt-6 rounded-xl border border-[#E8E4DD] px-5 py-4 text-sm leading-relaxed text-muted-foreground"
				style="background-color: #FAFAF8;"
			>
				{$_('landing.pricing.note')}
			</p>
			<p class="mt-4 text-xs text-muted-foreground">
				{$_('landing.ax_training.note')}
			</p>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 7. WORKSHOP RESULTS — canvas-soft             -->
	<!-- ══════════════════════════════════════════════ -->
	<section
		style="background-color: #FAFAF8;"
		class="border-y border-[#E8E4DD] px-5 py-20 md:px-8 md:py-28 lg:py-36"
	>
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
			>
				{$_('testimonials.badge')}
			</span>
			<p
				class="mb-16 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('testimonials.title')}
			</p>
			<div class="grid gap-6 md:grid-cols-3">
				{#each staticTestimonials as clientKey}
					<div class="flex flex-col rounded-2xl border border-[#E8E4DD] bg-white p-7">
						<!-- Metric delta -->
						<div class="mb-5 border-b border-[#E8E4DD] pb-5">
							<p class="text-2xl font-bold leading-none tracking-tight" style="color: #1B1938;">
								{$_(`testimonials.clients.${clientKey}.metric`)}
							</p>
							<p
								class="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]"
								style="color: rgba(41,40,39,0.45);"
							>
								{$_(`testimonials.clients.${clientKey}.metricLabel`)}
							</p>
						</div>
						<!-- Quote -->
						<blockquote
							class="flex-1 text-base leading-relaxed"
							style="color: rgba(41,40,39,0.75);"
						>
							"{$_(`testimonials.clients.${clientKey}.quote`)}"
						</blockquote>
						<!-- Author -->
						<div class="mt-6">
							<p class="text-sm font-semibold" style="color: #292827;">
								{$_(`testimonials.clients.${clientKey}.author`)}
							</p>
							<p class="text-xs" style="color: rgba(41,40,39,0.45);">
								{$_(`testimonials.clients.${clientKey}.role`)} · {$_(
									`testimonials.clients.${clientKey}.company`
								)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 8. FAQ — white                                -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
			>
				{$_('landing.faq.badge')}
			</span>
			<h2
				class="mb-10 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:mb-14 md:text-5xl lg:text-[52px]"
				style="color: #292827;"
			>
				{$_('landing.faq.title')}
			</h2>
			<div class="space-y-0">
				{#each [0, 1, 2, 3] as i}
					<div class="border-b border-[#E8E4DD] py-8 first:pt-0 last:border-0 md:py-10">
						<h3 class="mb-4 text-lg font-semibold leading-snug md:text-xl" style="color: #292827;">
							{$_(`landing.faq.items.${i}.q`)}
						</h3>
						<p class="text-base leading-relaxed md:text-lg" style="color: rgba(41,40,39,0.65);">
							{$_(`landing.faq.items.${i}.a`)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 7. CLOSING BAND — deep teal                   -->
	<!-- ══════════════════════════════════════════════ -->
	<section
		style="background-color: #0E3030;"
		class="px-5 py-24 text-center md:px-8 md:py-32 lg:py-40"
	>
		<div class="mx-auto max-w-2xl">
			<h2
				class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
				style="line-height: 0.96;"
			>
				{$_('landing.closing.title')}
			</h2>
			<p
				class="mx-auto mt-6 max-w-lg text-base leading-relaxed md:mt-8 md:text-lg"
				style="color: rgba(255,255,255,0.72);"
			>
				{$_('landing.closing.lead')}
			</p>
			<div class="mt-10 md:mt-12">
				<button
					onclick={() => book('ax_l1')}
					class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold transition-opacity hover:opacity-90 active:translate-y-px"
					style="color: #0E3030;"
				>
					{$_('landing.closing.cta')}
					<ArrowRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</section>
</main>
