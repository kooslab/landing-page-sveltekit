<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import PromoPopup from '$lib/components/sections/promo-popup.svelte';
	import DiagnosisModal from './workshops/components/diagnosis-modal.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();

	let diagnosisOpen = $state(false);

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	function book() {
		diagnosisOpen = true;
	}

	$effect(() => {
		const handler = () => book();
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

<PromoPopup showPromo={data.showPromo} onBook={book} />
<DiagnosisModal bind:open={diagnosisOpen} />

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
					{$_('landing.hero.titleLine1')}<br class="hidden sm:block" />
					<span class="text-brand-violet">{$_('landing.hero.titleLine2')}</span>
				</h1>
				<p class="mt-6 max-w-md text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl">
					{$_('landing.hero.subtitle')}
				</p>
				<div class="mt-10 md:mt-12">
					<button
						onclick={() =>
							document
								.getElementById('diagnosis')
								?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
						class="inline-flex items-center gap-2 rounded-full bg-brand-violet px-7 py-3.5 text-base font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
					>
						{$_('landing.hero.cta')}
						<ArrowRight class="h-4 w-4" />
					</button>
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

	<!-- ═══════════════════════════════════ 2. AI GAP ══ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-6xl">
			<div class="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
				<!-- Left: copy -->
				<div class="lg:w-2/5">
					<span class="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand/40">
						{$_('landing.aiGap.eyebrow')}
					</span>
					<h2
						class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl"
					>
						{$_('landing.aiGap.title1')}<br />{$_('landing.aiGap.title2')}
					</h2>
					<div class="mt-10 space-y-6">
						<div class="flex items-baseline gap-4">
							<span class="text-5xl font-bold tracking-tight text-brand-violet md:text-6xl"
								>85%</span
							>
							<p class="text-lg leading-snug text-ink/70">
								{$_('landing.aiGap.stat85desc')}
							</p>
						</div>
						<div class="flex items-baseline gap-4">
							<span class="text-5xl font-bold tracking-tight text-ink/25 md:text-6xl">25%</span>
							<p class="text-lg leading-snug text-ink/70">{$_('landing.aiGap.stat25desc')}</p>
						</div>
						<div class="border-l-4 border-brand-violet pl-5 pt-1">
							<p class="text-xl font-bold text-brand">{$_('landing.aiGap.gapLabel')}</p>
							<p class="mt-1 text-lg text-ink/60">
								{$_('landing.aiGap.gapDesc')}
							</p>
						</div>
					</div>
				</div>

				<!-- Right: dot matrix (10×10 = 100 people) -->
				<div class="lg:w-3/5">
					<div class="grid grid-cols-10 gap-2 md:gap-3">
						{#each Array.from({ length: 100 }) as _, i}
							<svg
								viewBox="0 0 24 28"
								class="w-full {i < 25
									? 'text-brand-violet'
									: i < 85
										? 'text-brand/20'
										: 'text-brand/[0.07]'}"
								fill="currentColor"
								aria-hidden="true"
							>
								<circle cx="12" cy="6" r="5" />
								<path d="M3 28v-2a9 9 0 0 1 18 0v2z" />
							</svg>
						{/each}
					</div>
					<div class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/50 md:text-sm">
						<span class="flex items-center gap-2">
							<span class="inline-block h-2.5 w-2.5 rounded-full bg-brand-violet"></span>
							{$_('landing.aiGap.legendUsing')}
						</span>
						<span class="flex items-center gap-2">
							<span class="inline-block h-2.5 w-2.5 rounded-full bg-brand/20"></span>
							{$_('landing.aiGap.legendCapable')}
						</span>
						<span class="flex items-center gap-2">
							<span class="inline-block h-2.5 w-2.5 rounded-full bg-brand/[0.07]"></span>
							{$_('landing.aiGap.legendNotReady')}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 3. EISENHOWER MATRIX ══ -->
	<section class="bg-canvas-soft px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-6xl">
			<div class="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
				<!-- Left: copy -->
				<div class="lg:w-[40%]">
					<span class="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand/40">
						{$_('landing.matrix.eyebrow')}
					</span>
					<h2
						class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl"
					>
						{$_('landing.matrix.title')}
					</h2>
					<div class="mt-8 space-y-5 text-lg leading-relaxed">
						<p class="text-ink">
							{$_('landing.matrix.p3')}
						</p>
					</div>
					<p class="mt-8 text-lg font-bold text-brand">
						{$_('landing.matrix.tagline')}
					</p>
				</div>

				<!-- Right: Eisenhower matrix SVG -->
				<div class="lg:w-[60%]">
					<svg
						viewBox="0 0 500 465"
						class="w-full"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<defs>
							<filter id="pencil-ef" x="-5%" y="-5%" width="110%" height="110%">
								<feTurbulence
									type="fractalNoise"
									baseFrequency="0.045 0.04"
									numOctaves="3"
									seed="7"
									result="noise"
								/>
								<feDisplacementMap
									in="SourceGraphic"
									in2="noise"
									scale="3"
									xChannelSelector="R"
									yChannelSelector="G"
								/>
							</filter>
						</defs>

						<!-- Quadrant backgrounds (no filter — stays crisp) -->
						<!-- Top-left: Low Effort + High Impact = QUICK WINS -->
						<rect x="75" y="15" width="195" height="180" fill="#f0fdf4" />
						<!-- Top-right: High Effort + High Impact = WORTH IT -->
						<rect x="270" y="15" width="195" height="180" fill="#fffbeb" />
						<!-- Bottom-left: Low Effort + Low Impact = FILLER -->
						<rect x="75" y="195" width="195" height="180" fill="#f9fafb" />
						<!-- Bottom-right: High Effort + Low Impact = THE TRAP -->
						<rect x="270" y="195" width="195" height="180" fill="#fff1f2" />

						<!-- Grid lines with pencil/sketch effect -->
						<g filter="url(#pencil-ef)" fill="none" stroke="#1B1938" opacity="0.45">
							<!-- Outer box -->
							<rect x="75" y="15" width="390" height="360" stroke-width="2.5" />
							<!-- Vertical center line -->
							<line x1="270" y1="15" x2="270" y2="375" stroke-width="1.5" />
							<!-- Horizontal center line -->
							<line x1="75" y1="195" x2="465" y2="195" stroke-width="1.5" />
						</g>

						<!-- Y-axis arrow -->
						<g filter="url(#pencil-ef)" opacity="0.3">
							<line
								x1="47"
								y1="378"
								x2="47"
								y2="18"
								stroke="#1B1938"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<polygon points="47,12 44,26 50,26" fill="#1B1938" />
						</g>
						<!-- Y-axis labels -->
						<text
							x="22"
							y="205"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="700"
							fill="#1B1938"
							letter-spacing="2.5"
							text-anchor="middle"
							transform="rotate(-90 22 205)">IMPACT</text
						>
						<text
							x="62"
							y="28"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="600"
							fill="#1B1938"
							text-anchor="end">High</text
						>
						<text
							x="62"
							y="380"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="600"
							fill="#1B1938"
							text-anchor="end">Low</text
						>

						<!-- X-axis arrow -->
						<g filter="url(#pencil-ef)" opacity="0.3">
							<line
								x1="72"
								y1="412"
								x2="468"
								y2="412"
								stroke="#1B1938"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<polygon points="474,412 460,409 460,415" fill="#1B1938" />
						</g>
						<!-- X-axis labels -->
						<text
							x="270"
							y="455"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="700"
							fill="#1B1938"
							letter-spacing="2.5"
							text-anchor="middle">EFFORT</text
						>
						<text
							x="82"
							y="402"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="600"
							fill="#1B1938">Low</text
						>
						<text
							x="458"
							y="402"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							font-weight="600"
							fill="#1B1938"
							text-anchor="end">High</text
						>

						<!-- Quadrant label: Quick Wins (top-left) — center y=105 -->
						<text
							x="172"
							y="96"
							font-family="'DM Sans', sans-serif"
							font-size="18"
							font-weight="700"
							fill="#15803d"
							text-anchor="middle">{$_('landing.matrix.quickWins')}</text
						>
						<text
							x="172"
							y="118"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							fill="#15803d"
							fill-opacity="0.65"
							text-anchor="middle">{$_('landing.matrix.quickWinsSub')}</text
						>

						<!-- Quadrant label: Worth It (top-right) — center y=105 -->
						<text
							x="367"
							y="96"
							font-family="'DM Sans', sans-serif"
							font-size="18"
							font-weight="700"
							fill="#92400e"
							text-anchor="middle">{$_('landing.matrix.worthIt')}</text
						>
						<text
							x="367"
							y="118"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							fill="#92400e"
							fill-opacity="0.65"
							text-anchor="middle">{$_('landing.matrix.worthItSub')}</text
						>

						<!-- Quadrant label: Nice to Have (bottom-left) — center y=285 -->
						<text
							x="172"
							y="276"
							font-family="'DM Sans', sans-serif"
							font-size="17"
							font-weight="700"
							fill="#6b7280"
							text-anchor="middle">{$_('landing.matrix.niceToHave')}</text
						>
						<text
							x="172"
							y="298"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							fill="#6b7280"
							fill-opacity="0.7"
							text-anchor="middle">{$_('landing.matrix.niceToHaveSub')}</text
						>

						<!-- Quadrant label: THE TRAP (bottom-right) — center y=285, 3 lines -->
						<text
							x="367"
							y="263"
							font-family="'DM Sans', sans-serif"
							font-size="20"
							font-weight="800"
							fill="#dc2626"
							text-anchor="middle">{$_('landing.matrix.trap')}</text
						>
						<text
							x="367"
							y="284"
							font-family="'DM Sans', sans-serif"
							font-size="14"
							font-weight="600"
							fill="#dc2626"
							text-anchor="middle">{$_('landing.matrix.trapSub')}</text
						>
						<text
							x="367"
							y="302"
							font-family="'DM Sans', sans-serif"
							font-size="13"
							fill="#dc2626"
							fill-opacity="0.65"
							text-anchor="middle">{$_('landing.matrix.trapDesc')}</text
						>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 4. HONEST TRUTH ══ -->
	<section class="bg-brand px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-3xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				{$_('landing.honest.eyebrow')}
			</span>
			<h2
				class="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl"
			>
				{$_('landing.honest.title')}
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-white md:text-xl">
				{$_('landing.honest.p1')}
			</p>
			<div class="mt-10 border-t border-white/10 pt-10">
				<p class="text-xl font-bold text-white md:text-2xl">
					{$_('landing.honest.but')}
				</p>
				<p class="mt-3 text-lg leading-relaxed text-white md:text-xl">
					{$_('landing.honest.intro')}
				</p>
				<div class="mt-10 grid gap-5 sm:grid-cols-2">
					<div class="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
						<span
							class="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-brand-violet"
						>
							{$_('landing.honest.path1Label')}
						</span>
						<h3 class="text-2xl font-bold text-white">{$_('landing.honest.path1Title')}</h3>
						<p class="mt-3 text-lg leading-relaxed text-white/60">
							{$_('landing.honest.path1Desc')}
						</p>
						<a
							href="/workshops"
							class="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-violet hover:opacity-80"
						>
							{$_('landing.honest.path1Cta')}
							<ArrowRight class="h-4 w-4" />
						</a>
					</div>
					<div class="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
						<span
							class="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-brand-violet"
						>
							{$_('landing.honest.path2Label')}
						</span>
						<h3 class="text-2xl font-bold text-white">{$_('landing.honest.path2Title')}</h3>
						<p class="mt-3 text-lg leading-relaxed text-white/60">
							{$_('landing.honest.path2Desc')}
						</p>
						<button
							onclick={book}
							class="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-violet hover:opacity-80"
						>
							{$_('landing.honest.path2Cta')}
							<ArrowRight class="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════ 5. PROBLEM FIRST ══ -->
	<section class="bg-white px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-5xl">
			<span class="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-brand">
				{$_('landing.fomo.eyebrow')}
			</span>
			<h2 class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl">
				{$_('landing.fomo.title')}
			</h2>

			<!-- Full-width stacked comparison -->
			<div class="mt-12 flex flex-col gap-10">
				<!-- FOMO loop -->
				<div>
					<p class="mb-4 text-sm font-bold uppercase tracking-widest text-red-600">
						{$_('landing.fomo.loopLabel')}
					</p>
					<div class="flex flex-col items-stretch gap-2 sm:flex-row">
						{#each [$_('landing.fomo.loop1'), $_('landing.fomo.loop2'), $_('landing.fomo.loop3')] as step, i}
							{#if i > 0}
								<span
									class="flex flex-shrink-0 items-center justify-center text-xl font-bold text-red-400 sm:px-1"
									><span class="inline-block rotate-90 sm:rotate-0">→</span></span
								>
							{/if}
							<div class="flex flex-1 items-center rounded-xl bg-red-500 px-5 py-5">
								<span class="text-base font-medium text-white">{step}</span>
							</div>
						{/each}
					</div>
					<p class="mt-4 text-base font-bold text-red-600">— {$_('landing.fomo.loopRepeat')}</p>
				</div>

				<!-- Problem-first path -->
				<div>
					<p class="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
						{$_('landing.fomo.pathLabel')}
					</p>
					<div class="flex flex-col items-stretch gap-2 sm:flex-row">
						{#each [$_('landing.fomo.path1'), $_('landing.fomo.path2'), $_('landing.fomo.path3')] as step, i}
							{#if i > 0}
								<span
									class="flex flex-shrink-0 items-center justify-center text-xl font-bold text-brand sm:px-1"
									><span class="inline-block rotate-90 sm:rotate-0">→</span></span
								>
							{/if}
							<div class="flex flex-1 items-center rounded-xl bg-brand px-5 py-5">
								<span class="text-base font-medium text-white">{step}</span>
							</div>
						{/each}
					</div>
					<p class="mt-6 max-w-2xl text-lg font-medium text-ink">
						{$_('landing.fomo.pathTagline')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════ 6. CLOSING ══ -->
	<section class="bg-brand px-5 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28 lg:pb-40 lg:pt-36">
		<div class="mx-auto max-w-4xl">
			<!-- Profile -->
			<div class="mt-16 md:mt-20">
				<div class="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
					<img
						src="/images/ilmo-koo.jpg"
						alt="Ilmo Koo"
						class="h-24 w-24 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-white/20 sm:h-28 sm:w-28"
					/>
					<div>
						<p class="text-lg font-bold text-white">{$_('landing.profile.name')}</p>
						<p class="mt-0.5 text-base text-brand-violet">{$_('landing.profile.role')}</p>
						<p class="mt-4 text-lg leading-relaxed text-white/70">
							{$_('landing.profile.bio')}
						</p>
						<div class="mt-5 flex flex-wrap gap-x-8 gap-y-3">
							{#each [{ years: $_('landing.profile.stat1Years'), label: $_('landing.profile.stat1Label') }, { years: $_('landing.profile.stat2Years'), label: $_('landing.profile.stat2Label') }, { years: $_('landing.profile.stat3Years'), label: $_('landing.profile.stat3Label') }] as stat}
								<div class="flex items-baseline gap-2">
									<span class="text-xl font-bold text-brand-violet">{stat.years}</span>
									<span class="text-base text-white/50">{stat.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div id="diagnosis" class="mt-16 scroll-mt-8 md:mt-20">
				<div class="rounded-2xl bg-white p-8 md:p-12">
					<!-- Header -->
					<div class="text-center">
						<span
							class="mb-5 inline-block rounded-full border border-brand/20 bg-brand/[0.06] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.15em] text-brand"
						>
							{$_('landing.diagnosis.badge')}
						</span>
						<h2 class="text-3xl font-bold text-ink md:text-4xl">{$_('landing.diagnosis.title')}</h2>
						<p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink">
							{$_('landing.diagnosis.intro')}
						</p>
					</div>

					<!-- 3-row steps -->
					<div class="mt-10 flex flex-col gap-4">
						<!-- Step 1: neutral workflow nodes (unmapped) -->
						<div
							class="flex flex-col gap-4 rounded-xl border border-brand/10 bg-brand/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8"
						>
							<div class="flex items-center gap-2 sm:w-48 sm:flex-shrink-0">
								<div
									class="h-10 w-10 flex-shrink-0 rounded-full border-2 border-brand bg-white"
								></div>
								<div class="flex-1 border-t-2 border-dashed border-brand/60"></div>
								<div
									class="h-10 w-10 flex-shrink-0 rounded-full border-2 border-brand bg-white"
								></div>
								<div class="flex-1 border-t-2 border-dashed border-brand/60"></div>
								<div
									class="h-10 w-10 flex-shrink-0 rounded-full border-2 border-brand bg-white"
								></div>
							</div>
							<div class="flex-1">
								<span
									class="mb-2 inline-block rounded-full border border-brand px-3 py-1 text-sm font-bold text-brand"
								>
									{$_('landing.diagnosis.step1Time')}
								</span>
								<h3 class="text-lg font-bold text-ink">{$_('landing.diagnosis.step1Title')}</h3>
								<p class="mt-1 text-base leading-relaxed text-ink">
									{$_('landing.diagnosis.step1Desc')}
								</p>
							</div>
						</div>

						<!-- Step 2: friction detected on middle node -->
						<div
							class="flex flex-col gap-4 rounded-xl border border-brand/10 bg-brand/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8"
						>
							<div class="flex items-center gap-2 sm:w-48 sm:flex-shrink-0">
								<div
									class="h-10 w-10 flex-shrink-0 rounded-full border-2 border-brand bg-white"
								></div>
								<div class="flex-1 border-t-2 border-dashed border-brand/60"></div>
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-orange-50"
								>
									<span class="text-sm font-bold text-orange-500">!</span>
								</div>
								<div class="flex-1 border-t-2 border-dashed border-brand/60"></div>
								<div
									class="h-10 w-10 flex-shrink-0 rounded-full border-2 border-brand bg-white"
								></div>
							</div>
							<div class="flex-1">
								<span
									class="mb-2 inline-block rounded-full border border-brand px-3 py-1 text-sm font-bold text-brand"
								>
									{$_('landing.diagnosis.step2Time')}
								</span>
								<h3 class="text-lg font-bold text-ink">{$_('landing.diagnosis.step2Title')}</h3>
								<p class="mt-1 text-base leading-relaxed text-ink">
									{$_('landing.diagnosis.step2Desc')}
								</p>
							</div>
						</div>

						<!-- Step 3: all nodes resolved -->
						<div
							class="flex flex-col gap-4 rounded-xl border border-brand/10 bg-brand/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8"
						>
							<div class="flex items-center gap-2 sm:w-48 sm:flex-shrink-0">
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand bg-brand"
								>
									<span class="text-sm font-bold text-white">✓</span>
								</div>
								<div class="flex-1 border-t-2 border-brand/40"></div>
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand bg-brand"
								>
									<span class="text-sm font-bold text-white">✓</span>
								</div>
								<div class="flex-1 border-t-2 border-brand/40"></div>
								<div
									class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand bg-brand"
								>
									<span class="text-sm font-bold text-white">✓</span>
								</div>
							</div>
							<div class="flex-1">
								<span
									class="mb-2 inline-block rounded-full border border-brand px-3 py-1 text-sm font-bold text-brand"
								>
									{$_('landing.diagnosis.step3Time')}
								</span>
								<h3 class="text-lg font-bold text-ink">{$_('landing.diagnosis.step3Title')}</h3>
								<p class="mt-1 text-base leading-relaxed text-ink">
									{$_('landing.diagnosis.step3Desc')}
								</p>
							</div>
						</div>
					</div>

					<!-- CTA -->
					<div class="mt-8 text-center">
						<button
							onclick={book}
							class="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
						>
							{$_('landing.diagnosis.cta')}
							<ArrowRight class="h-4 w-4" />
						</button>
						<p class="mt-3 text-base text-ink">{$_('landing.diagnosis.ctaSub')}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
