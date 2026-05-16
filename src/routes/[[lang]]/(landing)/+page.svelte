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
	<section class="overflow-hidden bg-brand">
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

	<!-- ══════════════════════════════════════════════ -->
	<!-- 3. FOMO TRAP — white, pattern interrupt       -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-12 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.fomo.badge')}
			</span>

			<!-- Opener -->
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.fomo.headline')}
			</p>
			<p class="mt-5 text-xl font-medium text-ink/70 md:text-2xl">
				{$_('landing.fomo.subline')}
			</p>

			<!-- Contrast: wrong vs. right -->
			<div class="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
				<!-- FOMO — muted, struck -->
				<div class="rounded-2xl border border-canvas-warm p-7 md:p-9">
					<p class="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-ink/80">
						{$_('landing.fomo.wrongLabel')}
					</p>
					<p
						class="text-xl font-medium leading-snug text-ink/85 md:text-2xl"
						style="text-decoration: line-through; text-decoration-color: rgba(41,40,39,0.15);"
					>
						"{$_('landing.fomo.wrongQuote')}"
					</p>
				</div>

				<!-- Real problem — vivid -->
				<div
					class="rounded-2xl bg-brand/[.04] p-7 md:p-9"
					style="border: 1.5px solid rgba(27,25,56,0.12);"
				>
					<p class="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand">
						{$_('landing.fomo.rightLabel')}
					</p>
					<p class="text-xl font-semibold leading-snug text-ink md:text-2xl">
						"{$_('landing.fomo.rightQuote')}"
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- WHY EFFORTS FAIL — canvas-soft, 3 cards      -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.effortsFail.badge')}
			</span>
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.effortsFail.headline')}
			</p>
			<p class="mt-5 text-xl font-medium text-ink/70 md:text-2xl">
				{$_('landing.effortsFail.subline')}
			</p>

			<div class="mt-14 space-y-5 md:mt-16">
				{#each [0, 1, 2] as i}
					<div class="rounded-2xl border border-canvas-warm bg-white p-7 md:p-9">
						<div class="flex items-center justify-between gap-4">
							<p class="text-lg font-bold leading-snug text-ink md:text-xl">
								{i + 1}. {$_(`landing.effortsFail.items.${i}.label`)}
							</p>
							<span
								class="flex-shrink-0 rounded-full bg-ink/[.06] px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-ink/85"
							>
								{$_(`landing.effortsFail.items.${i}.tag`)}
							</span>
						</div>
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

	<!-- ══════════════════════════════════════════════ -->
	<!-- 4. METHOD — canvas-soft, large scale          -->
	<!-- ══════════════════════════════════════════════ -->
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
						<!-- Step number -->
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white md:h-12 md:w-12"
							style="margin-top: 6px;"
						>
							{i + 1}
						</div>
						<!-- Step content -->
						<div>
							<h3
								class="text-2xl font-bold leading-[1.15] tracking-tight text-brand sm:text-3xl md:text-4xl lg:text-[40px]"
							>
								{$_(`landing.method.steps.${i}.title`)}
							</h3>
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
				class="mb-12 block text-sm font-semibold uppercase tracking-[0.2em] text-brand md:mb-14"
			>
				{$_('landing.transformation.badge')}
			</span>

			<!-- Headline -->
			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.transformation.headline')}
			</p>
			<p class="mt-5 text-xl font-medium text-ink/70 md:text-2xl">
				{$_('landing.transformation.subline')}
			</p>

			<!-- Column headers -->
			<div class="mt-16 grid grid-cols-[1fr_32px_1fr] md:mt-20">
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-ink/80">
					{$_('landing.transformation.beforeLabel')}
				</p>
				<div></div>
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">
					{$_('landing.transformation.afterLabel')}
				</p>
			</div>

			<!-- Transformation rows -->
			<div class="mt-4 border-t border-canvas-warm">
				{#each $_('landing.transformation.rows') as row}
					<div
						class="grid grid-cols-[1fr_32px_1fr] items-center border-b border-canvas-warm py-6 md:py-7"
					>
						<p class="text-base leading-snug text-ink/80 md:text-lg">
							{row.before}
						</p>
						<span class="text-center text-sm text-ink/80">→</span>
						<p class="text-base font-semibold leading-snug text-ink md:text-lg">
							{row.after}
						</p>
					</div>
				{/each}
			</div>

			<!-- Closing statement -->
			<div class="mt-14 md:mt-16">
				<p class="text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-[44px]">
					{$_('landing.transformation.closing')}
				</p>
				<p class="mt-4 text-lg text-ink/85 md:text-xl">
					{$_('landing.transformation.closingSub')}
				</p>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- EMPLOYEE TRANSFORM — canvas-soft, image+list -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.employeeTransform.badge')}
			</span>
			<p
				class="mb-14 text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:mb-16 md:text-5xl lg:text-[52px]"
			>
				{$_('landing.employeeTransform.headline')}
			</p>

			<img
				src="/images/employee.png"
				alt={$_('landing.employeeTransform.imageAlt')}
				class="mb-12 w-full rounded-2xl object-cover md:mb-16"
			/>

			<!-- After bullets only — image already shows the before -->
			<div class="max-w-lg">
				<p class="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-brand">
					{$_('landing.employeeTransform.afterLabel')}
				</p>
				<div class="space-y-4">
					{#each $_('landing.employeeTransform.afterItems') as item}
						<div class="flex items-start gap-3">
							<div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand"></div>
							<p class="text-base font-medium leading-snug text-ink md:text-lg">{item}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 5. FOR / NOT FOR — canvas-soft               -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span
				class="mb-12 block text-sm font-semibold uppercase tracking-[0.2em] text-brand md:mb-14"
			>
				{$_('landing.forNotFor.badge')}
			</span>

			<p
				class="text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.forNotFor.headline')}
			</p>

			<!-- Two columns — NOT FOR first, FOR second -->
			<div class="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-8">
				<!-- NOT FOR — left -->
				<div>
					<p class="mb-8 text-sm font-bold uppercase tracking-[0.18em] text-ink/80">
						{$_('landing.forNotFor.notForLabel')}
					</p>
					<div class="space-y-6">
						{#each $_('landing.forNotFor.notForItems') as item}
							<div class="flex items-start gap-4">
								<div
									class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink/[.12] text-[11px] font-bold text-ink/80"
								>
									✕
								</div>
								<p class="text-lg leading-snug text-ink/85 md:text-xl">
									{item}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- FOR — right -->
				<div>
					<p class="mb-8 text-sm font-bold uppercase tracking-[0.18em] text-brand">
						{$_('landing.forNotFor.forLabel')}
					</p>
					<div class="space-y-6">
						{#each $_('landing.forNotFor.forItems') as item}
							<div class="flex items-start gap-4">
								<div
									class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white"
								>
									✓
								</div>
								<p class="text-lg font-medium leading-snug text-ink md:text-xl">
									{item}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Honest closer -->
			<div class="mt-14 rounded-2xl border border-canvas-warm bg-white p-8 md:mt-16 md:p-10">
				<p class="text-xl font-semibold text-ink md:text-2xl">
					{$_('landing.forNotFor.unsureLabel')}
				</p>
				<p class="mt-3 text-base leading-relaxed text-ink/80 md:text-lg">
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
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.ax_training.badge')}
			</span>
			<h2
				class="text-3xl font-bold leading-[1.1] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('landing.ax_training.title')}
			</h2>
			<p class="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 md:mt-8 md:text-xl">
				{$_('landing.ax_training.intro')}
			</p>

			<div class="mt-10 space-y-4 md:mt-12">
				{#each axLevelKeys as levelKey, i}
					<div
						class="rounded-xl border p-6 md:p-8 {i === 2
							? 'border-brand/20 bg-brand/[0.03]'
							: 'border-canvas-warm bg-white'}"
					>
						<div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
							<div class="flex-1">
								<div class="mb-3 flex flex-wrap items-center gap-2">
									<span
										class="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white"
										>{i + 1}</span
									>
									<span class="text-sm font-bold uppercase tracking-[0.15em] text-brand">
										{$_(`landing.ax_training.levels.${levelKey}.level`)}
									</span>
									<span
										class="rounded-full border border-canvas-warm px-3 py-0.5 text-sm text-ink/70"
									>
										{$_(`landing.ax_training.levels.${levelKey}.duration`)}
									</span>
								</div>
								<h3 class="mb-2 text-base font-semibold text-ink md:text-lg">
									{$_(`landing.ax_training.levels.${levelKey}.title`)}
								</h3>
								<p class="text-base leading-relaxed text-ink/70">
									{$_(`landing.ax_training.levels.${levelKey}.description`)}
								</p>
							</div>
							<div class="flex flex-row items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
								<span class="text-2xl font-bold tracking-tight text-ink">
									€{$_(`landing.pricing.ax.levels.${levelKey}.price`)}
								</span>
								<button
									onclick={() => book(axTypes[i])}
									class="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
								>
									Book L{i + 1}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<p
				class="mt-6 rounded-xl border border-canvas-warm bg-canvas-soft px-5 py-4 text-base leading-relaxed text-ink/70"
			>
				{$_('landing.pricing.note')}
			</p>
			<p class="mt-4 text-base text-ink/70">
				{$_('landing.ax_training.note')}
			</p>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- 7. WORKSHOP RESULTS — canvas-soft             -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('testimonials.badge')}
			</span>
			<p
				class="mb-16 text-3xl font-bold leading-[1.12] tracking-tight text-brand sm:text-4xl md:text-5xl lg:text-[52px]"
			>
				{$_('testimonials.title')}
			</p>
			<div class="grid gap-6 md:grid-cols-3">
				{#each staticTestimonials as clientKey}
					<div class="flex flex-col rounded-2xl border border-canvas-warm bg-white p-7">
						<!-- Metric delta -->
						<div class="mb-5 border-b border-canvas-warm pb-5">
							<p class="text-2xl font-bold leading-none tracking-tight text-brand">
								{$_(`testimonials.clients.${clientKey}.metric`)}
							</p>
							<p class="mt-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink/70">
								{$_(`testimonials.clients.${clientKey}.metricLabel`)}
							</p>
						</div>
						<!-- Quote -->
						<blockquote class="flex-1 text-base leading-relaxed text-ink/85">
							"{$_(`testimonials.clients.${clientKey}.quote`)}"
						</blockquote>
						<!-- Context tag — no fake names -->
						<p class="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-ink/80">
							{$_(`testimonials.clients.${clientKey}.context`)}
						</p>
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
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.faq.badge')}
			</span>
			<h2
				class="mb-10 text-3xl font-bold leading-[1.1] tracking-tight text-brand sm:text-4xl md:mb-14 md:text-5xl lg:text-[52px]"
			>
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

	<!-- ══════════════════════════════════════════════ -->
	<!-- CLOSING — axe narrative + scale or fade CTA  -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-brand px-5 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28 lg:pb-40 lg:pt-36">
		<div class="mx-auto max-w-4xl">
			<!-- Axe image -->
			<img
				src="/images/ax.png"
				alt={$_('landing.axeStory.imageAlt')}
				class="w-full rounded-2xl object-cover opacity-90"
			/>

			<!-- Axe headline -->
			<p
				class="mt-12 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:mt-16 md:text-5xl lg:text-[52px]"
			>
				{$_('landing.closing.axeHeadline')}
			</p>

			<!-- Fade vs Scale two columns -->
			<div class="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-10">
				<!-- Fade -->
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

				<!-- Scale -->
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

			<!-- Scale or Fade title + CTA -->
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
						onclick={() => book('ax_l1')}
						class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
					>
						{$_('landing.closing.cta')}
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</section>
</main>
