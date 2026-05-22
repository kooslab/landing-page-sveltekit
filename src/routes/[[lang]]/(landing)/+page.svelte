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
					Berlin · AI for SMEs
				</span>
				<h1
					class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[52px] xl:text-[58px]"
					style="line-height: 1.08;"
				>
					Your business needs an AI layer.<br class="hidden sm:block" />
					<span class="text-brand-violet">We'll build it with you — or for you.</span>
				</h1>
				<p class="mt-6 max-w-md text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl">
					85% of your team is already capable of using AI. The bottleneck isn't your people — it's
					not knowing where to point them first.
				</p>
				<div class="mt-10 md:mt-12">
					<button
						onclick={() =>
							document
								.getElementById('diagnosis')
								?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
						class="inline-flex items-center gap-2 rounded-full bg-brand-violet px-7 py-3.5 text-base font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
					>
						Find out where to start
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
						IBM CEO Study · 2026 · 2,000 CEOs surveyed
					</span>
					<h2
						class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl"
					>
						Your team is ready.<br />They're just not moving.
					</h2>
					<div class="mt-10 space-y-6">
						<div class="flex items-baseline gap-4">
							<span class="text-5xl font-bold tracking-tight text-brand-violet md:text-6xl"
								>85%</span
							>
							<p class="text-lg leading-snug text-ink/70">
								of employees are capable of using AI — their CEOs say so
							</p>
						</div>
						<div class="flex items-baseline gap-4">
							<span class="text-5xl font-bold tracking-tight text-ink/25 md:text-6xl">25%</span>
							<p class="text-lg leading-snug text-ink/70">are actually using it regularly</p>
						</div>
						<div class="border-l-4 border-brand-violet pl-5 pt-1">
							<p class="text-xl font-bold text-brand">60-point gap.</p>
							<p class="mt-1 text-lg text-ink/60">
								That's untapped potential sitting in your team right now.
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
							Using AI regularly (25%)
						</span>
						<span class="flex items-center gap-2">
							<span class="inline-block h-2.5 w-2.5 rounded-full bg-brand/20"></span>
							Capable but not using (60%)
						</span>
						<span class="flex items-center gap-2">
							<span class="inline-block h-2.5 w-2.5 rounded-full bg-brand/[0.07]"></span>
							Not yet ready (15%)
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
						The adoption gap, explained
					</span>
					<h2
						class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl"
					>
						Most teams don't fail at AI. They just start in the wrong place.
					</h2>
					<div class="mt-8 space-y-5 text-lg leading-relaxed text-ink/70">
						<p>
							Without a clear picture of their operations, businesses naturally gravitate toward the
							most impressive-sounding AI projects — custom models, complex pipelines, fancy
							dashboards.
						</p>
						<p>High effort. And usually not what's draining the most time.</p>
						<p class="font-semibold text-ink">
							The highest-ROI tasks are boring: the weekly report no one wants to compile, the
							proposal template rebuilt from scratch every time. Easy to automate. Hours saved every
							week.
						</p>
					</div>
					<p class="mt-8 text-lg font-bold text-brand">
						The bottleneck isn't AI capability. It's knowing where to start.
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

						<!-- Trap zone emphasis (soft red glow) -->
						<ellipse
							cx="367"
							cy="285"
							rx="88"
							ry="78"
							fill="#fca5a5"
							opacity="0.28"
							filter="url(#pencil-ef)"
						/>

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
							font-size="10"
							font-weight="700"
							fill="#1B1938"
							fill-opacity="0.35"
							letter-spacing="2.5"
							text-anchor="middle"
							transform="rotate(-90 22 205)">IMPACT</text
						>
						<text
							x="62"
							y="26"
							font-family="'DM Sans', sans-serif"
							font-size="10"
							fill="#1B1938"
							fill-opacity="0.4"
							text-anchor="end">High</text
						>
						<text
							x="62"
							y="378"
							font-family="'DM Sans', sans-serif"
							font-size="10"
							fill="#1B1938"
							fill-opacity="0.4"
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
							y="452"
							font-family="'DM Sans', sans-serif"
							font-size="10"
							font-weight="700"
							fill="#1B1938"
							fill-opacity="0.35"
							letter-spacing="2.5"
							text-anchor="middle">EFFORT</text
						>
						<text
							x="82"
							y="400"
							font-family="'DM Sans', sans-serif"
							font-size="10"
							fill="#1B1938"
							fill-opacity="0.4">Low</text
						>
						<text
							x="458"
							y="400"
							font-family="'DM Sans', sans-serif"
							font-size="10"
							fill="#1B1938"
							fill-opacity="0.4"
							text-anchor="end">High</text
						>

						<!-- Quadrant label: Quick Wins (top-left) -->
						<text
							x="172"
							y="68"
							font-family="'DM Sans', sans-serif"
							font-size="15"
							font-weight="700"
							fill="#15803d"
							text-anchor="middle">🎯 Quick Wins</text
						>
						<text
							x="172"
							y="88"
							font-family="'DM Sans', sans-serif"
							font-size="11"
							fill="#15803d"
							fill-opacity="0.65"
							text-anchor="middle">Start here</text
						>

						<!-- Quadrant label: Worth It (top-right) -->
						<text
							x="367"
							y="68"
							font-family="'DM Sans', sans-serif"
							font-size="15"
							font-weight="700"
							fill="#92400e"
							text-anchor="middle">💡 Worth It</text
						>
						<text
							x="367"
							y="88"
							font-family="'DM Sans', sans-serif"
							font-size="11"
							fill="#92400e"
							fill-opacity="0.65"
							text-anchor="middle">High effort, high return</text
						>

						<!-- Quadrant label: Nice to Have (bottom-left) -->
						<text
							x="172"
							y="268"
							font-family="'DM Sans', sans-serif"
							font-size="14"
							font-weight="700"
							fill="#6b7280"
							text-anchor="middle">😐 Nice to Have</text
						>
						<text
							x="172"
							y="288"
							font-family="'DM Sans', sans-serif"
							font-size="11"
							fill="#6b7280"
							fill-opacity="0.7"
							text-anchor="middle">Easy but not impactful</text
						>

						<!-- Quadrant label: THE TRAP (bottom-right) -->
						<text
							x="367"
							y="248"
							font-family="'DM Sans', sans-serif"
							font-size="16"
							font-weight="800"
							fill="#dc2626"
							text-anchor="middle">⚠️ The Trap</text
						>
						<text
							x="367"
							y="268"
							font-family="'DM Sans', sans-serif"
							font-size="12"
							font-weight="600"
							fill="#dc2626"
							text-anchor="middle">Hard. Low impact.</text
						>
						<text
							x="367"
							y="285"
							font-family="'DM Sans', sans-serif"
							font-size="11"
							fill="#dc2626"
							fill-opacity="0.65"
							text-anchor="middle">Where most businesses land.</text
						>

						<!-- Red dots: The Trap zone (many) -->
						{#each [[288, 215], [310, 210], [333, 217], [356, 211], [378, 216], [400, 211], [423, 218], [446, 212], [282, 244], [305, 250], [328, 243], [352, 249], [374, 242], [397, 248], [420, 242], [444, 249], [290, 273], [314, 279], [340, 272], [366, 278], [392, 271], [418, 277], [443, 271], [296, 302], [322, 309], [350, 301], [376, 307], [404, 300], [430, 306], [303, 334], [332, 340], [362, 333], [392, 339], [420, 332], [314, 362], [348, 357], [380, 362]] as [x, y]}
							<circle cx={x} cy={y} r="3.5" fill="#dc2626" opacity="0.32" />
						{/each}

						<!-- Green dots: Quick Wins zone (few) -->
						{#each [[108, 52], [150, 46], [178, 58], [118, 94], [165, 82]] as [x, y]}
							<circle cx={x} cy={y} r="3.5" fill="#16a34a" opacity="0.5" />
						{/each}
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════ 4. HONEST TRUTH ══ -->
	<section class="bg-brand px-5 py-20 md:px-12 md:py-28 lg:py-36">
		<div class="mx-auto max-w-3xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				The honest take
			</span>
			<h2
				class="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl"
			>
				Honestly? You could learn this yourself.
			</h2>
			<div class="mt-8 space-y-5 text-lg leading-relaxed text-white/70 md:text-xl">
				<p>
					The resources are free. YouTube, ChatGPT, a handful of good courses — that's genuinely all
					you need. Most AI skills aren't complicated once you sit down and try.
				</p>
				<p>
					If you have 3–6 months of consistent learning time, do it. Seriously. It's the best
					long-term investment you can make.
				</p>
			</div>
			<div class="mt-10 border-t border-white/10 pt-10">
				<p class="text-lg font-semibold text-white md:text-xl">
					But if you're running a team, closing deals, and firefighting daily — that time doesn't
					exist.
				</p>
				<p class="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
					That's where we come in. Two paths. Same outcome: your business running on AI.
				</p>
				<div class="mt-10 grid gap-5 sm:grid-cols-2">
					<div class="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
						<span
							class="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-brand-violet"
						>
							Path 1
						</span>
						<h3 class="text-2xl font-bold text-white">AI Workshops</h3>
						<p class="mt-3 text-lg leading-relaxed text-white/60">
							Your team learns by solving their actual problems. Hands-on, in-person, one day.
						</p>
						<a
							href="/workshops"
							class="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-violet hover:opacity-80"
						>
							See how it works <ArrowRight class="h-4 w-4" />
						</a>
					</div>
					<div class="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
						<span
							class="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-brand-violet"
						>
							Path 2
						</span>
						<h3 class="text-2xl font-bold text-white">Turnkey AI Setup</h3>
						<p class="mt-3 text-lg leading-relaxed text-white/60">
							We build and install your AI operating system. You run the business. We handle the
							tech.
						</p>
						<button
							onclick={book}
							class="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-violet hover:opacity-80"
						>
							Book a 45-min video call <ArrowRight class="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════ 5. CLOSING ══ -->
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

			<!-- Profile -->
			<div class="mt-16 md:mt-20">
				<div class="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
					<img
						src="/images/ilmo-koo.jpg"
						alt="Ilmo Koo"
						class="h-24 w-24 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-white/20 sm:h-28 sm:w-28"
					/>
					<div>
						<p class="text-lg font-bold text-white">Ilmo Koo</p>
						<p class="mt-0.5 text-base text-brand-violet">Founder, KooStory · Berlin</p>
						<p class="mt-4 text-lg leading-relaxed text-white/70">
							Ten years in sales, operations, and management taught me exactly what repetitive work
							costs a team. For the last seven years I've been the person who comes in and fixes it
							— with automations that fit the way real businesses run, not just tech demos.
						</p>
						<div class="mt-5 flex flex-wrap gap-x-8 gap-y-3">
							{#each [{ years: '10 yrs', label: 'Sales, ops & management' }, { years: '7 yrs', label: 'Workflow & AI automation' }, { years: '5 yrs', label: 'Fullstack engineering' }] as stat}
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
							Free until July 31, 2026
						</span>
						<h2 class="text-3xl font-bold text-ink md:text-4xl">Business AI Diagnosis</h2>
						<div class="mt-3 flex items-center justify-center gap-3">
							<span class="text-xl text-ink/30 line-through">€100</span>
							<span class="text-3xl font-bold text-brand">Free</span>
							<span class="text-base text-ink/40">· 45 min · Video call</span>
						</div>
					</div>

					<!-- 3-step flow -->
					<div class="mt-10 space-y-3">
						{#each [{ step: '01', time: '15 min', title: 'You talk', desc: 'Tell us how your operations work today. No prep, no jargon — just walk us through a normal week.' }, { step: '02', time: '15 min', title: 'We map', desc: 'We identify your top 2–3 time wasters and show you exactly where AI fits your specific setup.' }, { step: '03', time: '15 min', title: 'You leave with', desc: 'A prioritized action list — what to fix first and how. Yours to keep, whether you work with us or not.' }] as s}
							<div
								class="flex items-start gap-6 rounded-xl border border-brand/10 bg-brand/[0.03] px-6 py-5"
							>
								<span class="w-8 flex-shrink-0 text-2xl font-bold text-brand/20">{s.step}</span>
								<span
									class="mt-0.5 flex-shrink-0 rounded-full bg-brand/10 px-3 py-1 text-sm font-bold text-brand"
									>{s.time}</span
								>
								<div class="flex-1">
									<h3 class="text-lg font-bold text-ink">{s.title}</h3>
									<p class="mt-1 text-base leading-relaxed text-ink/60">{s.desc}</p>
								</div>
							</div>
						{/each}
					</div>

					<!-- CTA -->
					<div class="mt-8 text-center">
						<button
							onclick={book}
							class="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:translate-y-px"
						>
							Book Free Diagnosis
							<ArrowRight class="h-4 w-4" />
						</button>
						<p class="mt-3 text-base text-ink/40">No commitment. No pitch. Just clarity.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
