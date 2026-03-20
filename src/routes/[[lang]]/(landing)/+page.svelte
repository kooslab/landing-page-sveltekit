<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-svelte';
	import DxReportSample from '$lib/components/sections/dx-report-sample.svelte';
	import PromoPopup from '$lib/components/sections/promo-popup.svelte';

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	// Portfolio
	const useCaseKeys = [
		'equest',
		'inventory',
		'scheduling',
		'reporting',
		'contract',
		'delivery',
		'parking',
		'billsplit',
		'ordermap',
		'travel',
		'indoor',
		'payment',
		'survey',
		'quote',
		'requirements'
	];

	const caseEmojis: Record<string, string> = {
		equest: '📋',
		inventory: '📦',
		scheduling: '📅',
		reporting: '📊',
		contract: '📝',
		delivery: '🚚',
		parking: '🚗',
		billsplit: '💰',
		ordermap: '🗺️',
		travel: '✈️',
		indoor: '🏢',
		payment: '💳',
		survey: '📋',
		quote: '💼',
		requirements: '📄'
	};

	let currentIndex = $state(0);
	let isPaused = $state(false);
	let intervalId: number;

	$effect(() => {
		if (!isPaused) {
			intervalId = window.setInterval(() => {
				currentIndex = (currentIndex + 1) % useCaseKeys.length;
			}, 10000);
		} else {
			if (intervalId) clearInterval(intervalId);
		}
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	function goToSlide(index: number) {
		currentIndex = index;
		isPaused = true;
		setTimeout(() => {
			isPaused = false;
		}, 15000);
	}

	// Testimonials
	const testimonialKeys = [
		'workspace',
		'safety1',
		'bunnyrate',
		'association1',
		'healthcare1',
		'aicompany1',
		'logistics1',
		'safety3',
		'healthcare2',
		'safety2',
		'aicompany2',
		'association2',
		'safety4',
		'logistics2'
	];

	let tIndex = $state(0);
	let tPaused = $state(false);
	let tIntervalId: number;

	$effect(() => {
		if (!tPaused) {
			tIntervalId = window.setInterval(() => {
				tIndex = (tIndex + 1) % testimonialKeys.length;
			}, 6000);
		} else {
			if (tIntervalId) clearInterval(tIntervalId);
		}
		return () => {
			if (tIntervalId) clearInterval(tIntervalId);
		};
	});

	function goToTestimonial(index: number) {
		tIndex = index;
		tPaused = true;
		setTimeout(() => {
			tPaused = false;
		}, 12000);
	}

	// Process steps
	const processKeys = ['workshop', 'document', 'build'] as const;
	const deliverableKeys = ['diagnosis', 'processmap', 'roadmap'] as const;

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<SEO
	title={isKorean
		? 'KooStory - 중소기업 DX/AX 컨설팅 | 베를린'
		: 'KooStory - DX/AX Consulting for Small Business | Berlin'}
	description={isKorean
		? '기술이 아니라 비즈니스부터. 중소기업을 위한 맞춤형 DX/AX 컨설팅. 무료 진단 제공.'
		: 'Business first, technology second. Custom DX/AX consulting for small businesses. Free diagnosis available.'}
	ogImage="/og-image-landing.png"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'KooStory',
		url: 'https://koostory.net',
		description: 'DX/AX consulting for small businesses',
		publisher: {
			'@type': 'Organization',
			name: 'KooStory',
			logo: { '@type': 'ImageObject', url: 'https://koostory.net/logo.png' }
		}
	}}
/>

<PromoPopup />

<main class="w-full">
	<!-- ═══════════════════════════════════════════════ -->
	<!-- 1. HERO                                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-28 lg:pb-32 lg:pt-36">
		<div class="mx-auto max-w-3xl">
			<h1
				class="whitespace-pre-line text-[2.25rem] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]"
			>
				{$_('landing.hero.title')}
			</h1>
			<p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-6 md:text-xl">
				{$_('landing.hero.subtitle')}
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
				<Button size="lg" class="group text-sm" href="mailto:ilmokoo@koostory.net">
					{$_('landing.hero.cta')}
					<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 2. THE REALITY — dark, confrontational         -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		id="reality"
		class="border-y border-border bg-muted/50 px-5 py-16 md:px-8 md:py-24 lg:py-32"
	>
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
				{$_('landing.reality.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
				{$_('landing.reality.title')}
			</h2>
			<div class="mt-8 space-y-6 md:mt-10">
				{#each [0, 1, 2] as i}
					<p class="text-base leading-relaxed text-muted-foreground md:text-lg">
						{$_(`landing.reality.points.${i}`)}
					</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. WHEN TECHNOLOGY HELPS — the multiplier      -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-b border-border px-5 py-16 md:px-8 md:py-24 lg:py-32">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
				{$_('landing.when.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
				{$_('landing.when.title')}
			</h2>
			<p class="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
				{$_('landing.when.intro')}
			</p>

			<div class="mt-10 space-y-6 md:mt-12">
				{#each [0, 1] as i}
					<div class="border-l-2 border-border py-1 pl-5 transition-colors hover:border-primary/50">
						<p class="text-[15px] leading-relaxed text-foreground/80 md:text-base">
							{$_(`landing.when.items.${i}`)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 4. WHAT WE DO — DX + AX                       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="services" class="px-5 py-16 md:px-8 md:py-24 lg:py-32">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
				{$_('landing.services.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
				{$_('landing.services.title')}
			</h2>
			<p class="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
				{$_('landing.services.intro')}
			</p>

			<div class="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
				<!-- Path A -->
				<div class="rounded-xl border border-border p-6 md:p-7">
					<p class="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
						{$_('landing.services.pathA.label')}
					</p>
					<h3 class="mb-3 text-lg font-semibold">{$_('landing.services.pathA.title')}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{$_('landing.services.pathA.description')}
					</p>
				</div>
				<!-- Path B -->
				<div class="rounded-xl border border-border p-6 md:p-7">
					<p class="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
						{$_('landing.services.pathB.label')}
					</p>
					<h3 class="mb-3 text-lg font-semibold">{$_('landing.services.pathB.title')}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{$_('landing.services.pathB.description')}
					</p>
				</div>
			</div>

			<div class="mt-8 rounded-lg bg-muted/40 px-5 py-4 md:mt-10">
				<p class="text-sm font-medium leading-relaxed text-foreground/70">
					{$_('landing.services.difference')}
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 5. HOW WE WORK — 4 steps                      -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="process" class="border-y border-border px-5 py-16 md:px-8 md:py-24 lg:py-32">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
				{$_('landing.process.badge')}
			</p>
			<h2
				class="mb-10 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:mb-14 md:text-4xl"
			>
				{$_('landing.process.title')}
			</h2>

			<div class="relative">
				<div class="absolute bottom-0 left-4 top-0 w-px bg-border md:left-5"></div>

				<div class="space-y-8 md:space-y-12">
					{#each processKeys as key, i}
						<div class="relative flex gap-5 md:gap-7">
							<div
								class="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background text-xs font-bold tabular-nums md:h-11 md:w-11 md:text-sm"
							>
								{i + 1}
							</div>
							<div class="pt-1 md:pt-2">
								<h3 class="mb-1 text-base font-semibold md:text-lg">
									{$_(`process.steps.${key}.title`)}
								</h3>
								<p class="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
									{$_(`process.steps.${key}.description`)}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 6. PORTFOLIO                                   -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="portfolio" class="py-16 md:py-24 lg:py-32">
		<div class="px-5 md:px-8">
			<div class="mx-auto max-w-3xl">
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
					{$_('portfolio.badge')}
				</p>
				<h2 class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
					{$_('portfolio.title')}
				</h2>
			</div>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mt-10 md:mt-14"
			onmouseenter={() => (isPaused = true)}
			onmouseleave={() => (isPaused = false)}
		>
			<!-- Mobile: swipeable cards -->
			<div class="px-5 md:hidden">
				<div class="overflow-hidden">
					<div
						class="flex transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{currentIndex * 100}%)"
					>
						{#each useCaseKeys as caseKey}
							<div class="w-full flex-shrink-0 pr-4">
								<div class="rounded-xl border border-border bg-card p-5">
									<div class="mb-3 flex items-start justify-between">
										<Badge variant="outline" class="text-[11px]">
											{$_(`portfolio.cases.${caseKey}.industry`)}
										</Badge>
										<span class="text-2xl">{caseEmojis[caseKey]}</span>
									</div>
									<h3 class="mb-2 text-base font-bold">{$_(`portfolio.cases.${caseKey}.title`)}</h3>
									<p class="mb-3 text-xs text-muted-foreground">
										{$_(`portfolio.cases.${caseKey}.problem`)}
									</p>
									<div class="border-t border-border pt-3">
										<ul class="space-y-1.5">
											{#each $_(`portfolio.cases.${caseKey}.results`).slice(0, 2) as result}
												<li class="flex items-start gap-2 text-xs">
													<CheckCircle class="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
													<span class="text-foreground/70">{result}</span>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-5 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 rounded-full"
						onclick={() =>
							goToSlide(currentIndex === 0 ? useCaseKeys.length - 1 : currentIndex - 1)}
					>
						<ChevronLeft class="h-4 w-4" />
					</Button>
					<span class="text-xs tabular-nums text-muted-foreground"
						>{currentIndex + 1} / {useCaseKeys.length}</span
					>
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 rounded-full"
						onclick={() => goToSlide((currentIndex + 1) % useCaseKeys.length)}
					>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Desktop: 3-card carousel -->
			<div class="hidden md:block">
				<div class="mx-auto overflow-hidden" style="width: 1272px;">
					<div
						class="flex gap-2 transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{currentIndex * 388}px)"
					>
						{#each [...useCaseKeys, ...useCaseKeys.slice(0, 3)] as caseKey}
							<div class="flex-shrink-0" style="width: 380px;">
								<div class="h-full rounded-xl border border-border bg-card p-6">
									<div class="mb-4 flex items-start justify-between">
										<Badge variant="outline" class="text-xs">
											{$_(`portfolio.cases.${caseKey}.industry`)}
										</Badge>
										<span class="text-3xl">{caseEmojis[caseKey]}</span>
									</div>
									<h3 class="mb-2 text-lg font-bold">{$_(`portfolio.cases.${caseKey}.title`)}</h3>
									<p class="mb-3 text-sm text-muted-foreground">
										{$_(`portfolio.cases.${caseKey}.problem`)}
									</p>
									<div class="border-t border-border pt-4">
										<ul class="space-y-2">
											{#each $_(`portfolio.cases.${caseKey}.results`).slice(0, 3) as result}
												<li class="flex items-start gap-2 text-sm">
													<CheckCircle class="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
													<span class="text-foreground/70">{result}</span>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-8 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onclick={() =>
							goToSlide(currentIndex === 0 ? useCaseKeys.length - 1 : currentIndex - 1)}
						class="rounded-full"
					>
						<ChevronLeft class="h-5 w-5" />
					</Button>
					<div class="flex gap-1.5">
						{#each useCaseKeys as _, index}
							<button
								class="h-1.5 rounded-full transition-all duration-300 {currentIndex === index
									? 'w-6 bg-primary'
									: 'w-1.5 bg-primary/20 hover:bg-primary/40'}"
								onclick={() => goToSlide(index)}
								aria-label="Go to slide {index + 1}"
							></button>
						{/each}
					</div>
					<Button
						variant="outline"
						size="icon"
						onclick={() => goToSlide((currentIndex + 1) % useCaseKeys.length)}
						class="rounded-full"
					>
						<ChevronRight class="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 7. TESTIMONIALS                                -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="testimonials" class="border-y border-border py-16 md:py-24 lg:py-32">
		<div class="px-5 md:px-8">
			<div class="mx-auto max-w-3xl">
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
					{$_('testimonials.badge')}
				</p>
				<h2 class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
					{$_('testimonials.title')}
				</h2>
			</div>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mt-10 md:mt-14"
			onmouseenter={() => (tPaused = true)}
			onmouseleave={() => (tPaused = false)}
		>
			<!-- Mobile -->
			<div class="px-5 md:hidden">
				<div class="overflow-hidden">
					<div
						class="flex transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{tIndex * 100}%)"
					>
						{#each testimonialKeys as clientKey}
							<div class="w-full flex-shrink-0 pr-4">
								<div class="rounded-xl border border-border/60 bg-card p-5">
									<span class="select-none text-3xl leading-none text-primary/15" aria-hidden="true"
										>"</span
									>
									<blockquote class="mt-1 text-[15px] leading-relaxed text-foreground/80">
										{$_(`testimonials.clients.${clientKey}.quote`)}
									</blockquote>
									<div class="mt-4 flex items-center gap-3 border-t border-border/30 pt-4">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
										>
											{$_(`testimonials.clients.${clientKey}.author`).charAt(0)}
										</div>
										<div>
											<p class="text-sm font-semibold">
												{$_(`testimonials.clients.${clientKey}.author`)}
											</p>
											<p class="text-xs text-muted-foreground">
												{$_(`testimonials.clients.${clientKey}.role`)}, {$_(
													`testimonials.clients.${clientKey}.company`
												)}
											</p>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-5 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 rounded-full"
						onclick={() => goToTestimonial(tIndex === 0 ? testimonialKeys.length - 1 : tIndex - 1)}
					>
						<ChevronLeft class="h-4 w-4" />
					</Button>
					<span class="text-xs tabular-nums text-muted-foreground"
						>{tIndex + 1} / {testimonialKeys.length}</span
					>
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 rounded-full"
						onclick={() => goToTestimonial((tIndex + 1) % testimonialKeys.length)}
					>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Desktop -->
			<div class="hidden md:block">
				<div class="mx-auto overflow-hidden" style="width: 1240px;">
					<div
						class="flex gap-5 transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{tIndex * 418}px)"
					>
						{#each [...testimonialKeys, ...testimonialKeys.slice(0, 3)] as clientKey}
							<div
								class="flex flex-shrink-0 flex-col rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20"
								style="width: 398px;"
							>
								<span class="select-none text-4xl leading-none text-primary/15" aria-hidden="true"
									>"</span
								>
								<blockquote class="mb-6 mt-1 flex-1 text-[15px] leading-relaxed text-foreground/80">
									{$_(`testimonials.clients.${clientKey}.quote`)}
								</blockquote>
								<div class="flex items-center gap-3 border-t border-border/30 pt-4">
									<div
										class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
									>
										{$_(`testimonials.clients.${clientKey}.author`).charAt(0)}
									</div>
									<div>
										<p class="text-sm font-semibold">
											{$_(`testimonials.clients.${clientKey}.author`)}
										</p>
										<p class="text-xs text-muted-foreground">
											{$_(`testimonials.clients.${clientKey}.role`)}, {$_(
												`testimonials.clients.${clientKey}.company`
											)}
										</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-8 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onclick={() => goToTestimonial(tIndex === 0 ? testimonialKeys.length - 1 : tIndex - 1)}
						class="rounded-full"
					>
						<ChevronLeft class="h-5 w-5" />
					</Button>
					<div class="flex gap-1.5">
						{#each Array(Math.ceil(testimonialKeys.length / 3)) as _, index}
							<button
								class="h-1.5 rounded-full transition-all duration-300 {Math.floor(tIndex / 3) ===
								index
									? 'w-6 bg-primary'
									: 'w-1.5 bg-primary/20 hover:bg-primary/40'}"
								onclick={() => goToTestimonial(index * 3)}
								aria-label="Go to testimonial page {index + 1}"
							></button>
						{/each}
					</div>
					<Button
						variant="outline"
						size="icon"
						onclick={() => goToTestimonial((tIndex + 1) % testimonialKeys.length)}
						class="rounded-full"
					>
						<ChevronRight class="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 8. FREE DX/AX DIAGNOSIS CTA                   -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="workshop" class="px-5 py-16 md:px-8 md:py-24 lg:py-32">
		<div class="mx-auto max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
				{$_('workshop.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
				{$_('workshop.title')}
			</h2>
			<p class="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
				{$_('workshop.description')}
			</p>

			<p class="mt-6 text-sm font-medium text-foreground/80">
				{$_('workshop.how')}
			</p>

			<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
				{$_('workshop.focus')}
			</p>

			<div class="mt-8 space-y-2.5 border-l-2 border-border pl-5 md:mt-10">
				{#each deliverableKeys as key}
					<p class="text-sm font-medium md:text-base">
						{$_(`workshop.deliverables.${key}`)}
					</p>
				{/each}
			</div>

			<p class="mt-6 text-sm leading-relaxed text-foreground/70">
				{$_('workshop.ownership')}
			</p>

			<DxReportSample />

			<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
				<Button size="lg" class="group text-sm" href="mailto:ilmokoo@koostory.net">
					{$_('workshop.cta')}
					<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</div>
			<p class="mt-3 text-sm text-muted-foreground">
				{$_('workshop.trust')}
			</p>
		</div>
	</section>
</main>
