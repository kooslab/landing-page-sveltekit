<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Briefcase, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import ContactForm from '@/components/contact-form.svelte';

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	// All use case keys for carousel with emojis
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

	const painKeys = ['excel', 'knowledge', 'offtheshelf', 'start'] as const;
	const aiKeys = ['architecture', 'tested', 'owned', 'compliant'] as const;
	const processKeys = ['workshop', 'document', 'build', 'own'] as const;
	const founderKeys = ['startup', 'bootcamp', 'requirements', 'berlin'] as const;
	const koreaStatKeys = ['government', 'internet', 'innovation'] as const;
	const deliverableKeys = ['userstory', 'processmap', 'roadmap'] as const;

	// Portfolio carousel state
	let isPaused = $state(false);
	let currentIndex = $state(0);
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

	// Testimonial carousel state
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
</script>

<SEO
	title={isKorean
		? 'KooStory - 베를린 기반 중소기업 소프트웨어 개발'
		: 'KooStory - Berlin-Based Custom Software Development for SMBs'}
	description={isKorean
		? '베를린에 위치한 소프트웨어 개발 에이전시. 독일과 유럽 전역의 중소기업을 위한 맞춤형 솔루션. 100% 만족 보장.'
		: 'Berlin-based software development agency serving SMBs across Germany and Europe. We solve real business problems with practical solutions. Custom development tailored for your business. 100% satisfaction guaranteed.'}
	keywords={isKorean
		? '소프트웨어 개발 베를린, 맞춤형 소프트웨어, 중소기업, 독일, 유럽, 비즈니스 솔루션, 웹 개발, 앱 개발'
		: 'software development Berlin, custom software Germany, Berlin tech agency, SMB solutions Europe, web development Berlin, app development Germany, business automation Berlin, IT outsourcing Germany'}
	ogImage="/og-image-landing.png"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'KooStory',
		url: 'https://koostory.net',
		description: isKorean
			? '중소기업을 위한 맞춤형 소프트웨어 개발 전문 기업'
			: 'Custom software development agency for small and medium businesses',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: 'https://koostory.net/search?q={search_term_string}'
			},
			'query-input': 'required name=search_term_string'
		},
		publisher: {
			'@type': 'Organization',
			name: 'KooStory',
			logo: { '@type': 'ImageObject', url: 'https://koostory.net/logo.png' }
		}
	}}
/>

<main class="w-full">
	<!-- ═══════════════════════════════════════════════ -->
	<!-- HERO — big type, minimal chrome                -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		class="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]"
	>
		<div class="hero-gradient absolute inset-0"></div>
		<div class="hero-grid absolute inset-0 opacity-5"></div>

		<div class="container relative z-10 mx-auto px-4 py-16 text-center md:py-20">
			<div class="mx-auto max-w-4xl space-y-6 md:space-y-8">
				<p
					class="animate-fade-in text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
				>
					{$_('hero.tagline')}
				</p>

				<h1
					class="animate-fade-in break-keep text-3xl font-bold leading-[1.1] tracking-tight [animation-delay:100ms] sm:text-4xl md:text-5xl lg:text-6xl"
				>
					{$_('hero.title')}
				</h1>

				<p
					class="animate-fade-in mx-auto max-w-2xl break-keep text-base leading-relaxed text-muted-foreground [animation-delay:200ms] md:text-lg lg:text-xl"
				>
					{$_('hero.description')}
				</p>

				<div
					class="animate-fade-in flex flex-col justify-center gap-3 pt-4 [animation-delay:300ms] sm:flex-row sm:gap-4 sm:pt-6"
				>
					<Button
						size="lg"
						class="group text-sm md:text-base"
						onclick={() =>
							document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
					>
						{$_('hero.cta.workshop')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						class="text-sm md:text-base"
						onclick={() =>
							document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
					>
						{$_('hero.cta.portfolio')}
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- PAIN POINTS — raw list, no cards, no icons     -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="pain-points" class="px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-3xl">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-destructive">
					{$_('pain.badge')}
				</p>
				<h2
					class="mb-12 text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl lg:text-5xl"
				>
					{$_('pain.title')}
				</h2>

				<div class="space-y-10 md:space-y-12">
					{#each painKeys as key, i}
						<div class="group">
							<div class="flex items-baseline gap-4 md:gap-6">
								<span class="font-mono text-3xl font-light tabular-nums text-border md:text-4xl">
									{String(i + 1).padStart(2, '0')}
								</span>
								<div
									class="flex-1 border-b border-border pb-8 transition-colors group-hover:border-foreground/20 md:pb-10"
								>
									<h3 class="mb-2 text-xl font-semibold md:text-2xl">
										{$_(`pain.items.${key}.title`)}
									</h3>
									<p class="max-w-xl text-muted-foreground">
										{$_(`pain.items.${key}.description`)}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- FOUNDER STORY — personal, editorial feel       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="about" class="border-y border-border px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-4xl">
				<div class="md:grid md:grid-cols-5 md:gap-12 lg:gap-16">
					<!-- Left column: the personal intro -->
					<div class="md:col-span-2">
						<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
							{$_('founder.badge')}
						</p>
						<h2 class="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
							{$_('founder.title')}
						</h2>
						<p class="mb-8 text-muted-foreground md:mb-0">
							{$_('founder.intro')}
						</p>
					</div>

					<!-- Right column: credibility points -->
					<div class="space-y-6 md:col-span-3 md:space-y-8">
						{#each founderKeys as key}
							<div
								class="border-l-2 border-border pl-5 transition-colors hover:border-foreground/30 md:pl-6"
							>
								<h3 class="mb-1 font-semibold">{$_(`founder.points.${key}.title`)}</h3>
								<p class="text-sm leading-relaxed text-muted-foreground">
									{$_(`founder.points.${key}.description`)}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- PROCESS — conversational, flowing steps        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="process" class="px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-3xl">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
					{$_('process.badge')}
				</p>
				<h2
					class="mb-14 text-3xl font-bold leading-tight tracking-tight md:mb-20 md:text-4xl lg:text-5xl"
				>
					{$_('process.title')}
				</h2>

				<div class="relative">
					<!-- Vertical line -->
					<div class="absolute bottom-0 left-[19px] top-0 w-px bg-border md:left-[23px]"></div>

					<div class="space-y-10 md:space-y-14">
						{#each processKeys as key, i}
							<div class="relative flex gap-6 md:gap-8">
								<!-- Step marker -->
								<div
									class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background font-mono text-sm font-bold md:h-12 md:w-12 md:text-base"
								>
									{i + 1}
								</div>
								<div class="pb-2 pt-1.5 md:pt-2.5">
									<h3 class="mb-1.5 text-lg font-semibold md:text-xl">
										{$_(`process.steps.${key}.title`)}
									</h3>
									<p class="text-muted-foreground">{$_(`process.steps.${key}.description`)}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- AI-DRIVEN DEV — numbered list, echoes Pain Pts -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="ai-dev" class="px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-3xl">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
					{$_('ai.badge')}
				</p>
				<h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
					{$_('ai.title')}
				</h2>
				<p class="mb-12 max-w-xl text-muted-foreground md:mb-16 md:text-lg">
					{$_('ai.description')}
				</p>

				<div class="space-y-10 md:space-y-12">
					{#each aiKeys as key, i}
						<div class="group">
							<div class="flex items-baseline gap-4 md:gap-6">
								<span class="font-mono text-3xl font-light tabular-nums text-border md:text-4xl">
									{String(i + 1).padStart(2, '0')}
								</span>
								<div
									class="flex-1 border-b border-border pb-8 transition-colors group-hover:border-foreground/20 md:pb-10"
								>
									<h3 class="mb-2 text-xl font-semibold md:text-2xl">
										{$_(`ai.items.${key}.title`)}
									</h3>
									<p class="max-w-xl text-muted-foreground">{$_(`ai.items.${key}.description`)}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- KOREA — typographic emphasis, no icon cards    -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		id="korea"
		class="overflow-hidden border-y border-border bg-neutral-900 px-4 py-20 text-neutral-50 md:py-28"
	>
		<div class="container mx-auto">
			<div class="mx-auto max-w-4xl">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
					{$_('korea.badge')}
				</p>
				<h2 class="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
					{$_('korea.title')}
				</h2>
				<p class="mb-14 max-w-2xl text-neutral-300 md:mb-20 md:text-lg">
					{$_('korea.description')}
				</p>

				<div
					class="grid gap-px overflow-hidden rounded-lg border border-neutral-700 bg-neutral-700 md:grid-cols-3"
				>
					{#each koreaStatKeys as key}
						<div class="bg-neutral-900 p-8 text-center md:p-10">
							<p class="text-4xl font-bold tracking-tight md:text-5xl">
								{$_(`korea.stats.${key}.value`)}
							</p>
							<p class="mt-2 text-sm font-medium text-neutral-300 md:text-base">
								{$_(`korea.stats.${key}.label`)}
							</p>
							<p class="mt-1 text-xs text-neutral-500">{$_(`korea.stats.${key}.source`)}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- PORTFOLIO — keep existing carousel as-is       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="portfolio" class="py-20 md:py-28">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
					{$_('portfolio.badge')}
				</p>
				<h2 class="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
					{$_('portfolio.title')}
				</h2>
				<p class="mx-auto max-w-2xl text-muted-foreground md:text-lg">
					{$_('portfolio.description')}
				</p>
			</div>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative mt-12"
			onmouseenter={() => (isPaused = true)}
			onmouseleave={() => (isPaused = false)}
		>
			<div class="overflow-hidden">
				<!-- Mobile: Single card view -->
				<div class="px-4 md:hidden">
					<div
						class="flex transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{currentIndex * 100}%)"
					>
						{#each useCaseKeys as caseKey}
							<div class="w-full flex-shrink-0 px-2">
								<Card class="h-full">
									<CardHeader>
										<div class="mb-4 flex items-start justify-between gap-2">
											<h3 class="flex-1 text-lg font-bold">
												{$_(`portfolio.cases.${caseKey}.title`)}
											</h3>
											<span class="flex-shrink-0 text-3xl" role="img" aria-label="{caseKey} icon">
												{caseEmojis[caseKey]}
											</span>
										</div>
										<Badge variant="outline" class="mb-4 w-fit text-xs">
											{$_(`portfolio.cases.${caseKey}.industry`)}
										</Badge>
									</CardHeader>
									<CardContent class="space-y-4">
										<div>
											<p class="mb-2 font-semibold text-destructive">Problem:</p>
											<p class="text-sm text-muted-foreground">
												{$_(`portfolio.cases.${caseKey}.problem`)}
											</p>
										</div>
										<div>
											<p class="mb-2 font-semibold text-primary">Solution:</p>
											<p class="text-sm text-muted-foreground">
												{$_(`portfolio.cases.${caseKey}.solution`)}
											</p>
										</div>
										<div class="border-t pt-4">
											<p class="mb-3 font-semibold">Results:</p>
											<ul class="space-y-2">
												{#each $_(`portfolio.cases.${caseKey}.results`) as result}
													<li class="flex items-start gap-2 text-sm">
														<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
														<span>{result}</span>
													</li>
												{/each}
											</ul>
										</div>
									</CardContent>
								</Card>
							</div>
						{/each}
					</div>
				</div>

				<!-- Desktop: 3 cards view -->
				<div class="hidden md:block">
					<div class="mx-auto" style="width: 1272px; overflow: visible;">
						<div
							class="flex gap-2 transition-transform duration-500 ease-in-out"
							style="transform: translateX(-{currentIndex * 388}px)"
						>
							{#each [...useCaseKeys, ...useCaseKeys.slice(0, 3)] as caseKey}
								<div class="flex-shrink-0" style="width: 380px;">
									<Card class="h-full">
										<CardHeader>
											<div class="mb-4 flex items-start justify-between gap-3">
												<h3 class="flex-1 text-xl font-bold">
													{$_(`portfolio.cases.${caseKey}.title`)}
												</h3>
												<span class="flex-shrink-0 text-4xl" role="img" aria-label="{caseKey} icon">
													{caseEmojis[caseKey]}
												</span>
											</div>
											<Badge variant="outline" class="mb-4 w-fit">
												{$_(`portfolio.cases.${caseKey}.industry`)}
											</Badge>
										</CardHeader>
										<CardContent class="space-y-4">
											<div>
												<p class="mb-2 font-semibold text-destructive">Problem:</p>
												<p class="text-sm text-muted-foreground">
													{$_(`portfolio.cases.${caseKey}.problem`)}
												</p>
											</div>
											<div>
												<p class="mb-2 font-semibold text-primary">Solution:</p>
												<p class="text-sm text-muted-foreground">
													{$_(`portfolio.cases.${caseKey}.solution`)}
												</p>
											</div>
											<div class="border-t pt-4">
												<p class="mb-3 font-semibold">Results:</p>
												<ul class="space-y-2">
													{#each $_(`portfolio.cases.${caseKey}.results`).slice(0, 3) as result}
														<li class="flex items-start gap-2 text-sm">
															<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
															<span>{result}</span>
														</li>
													{/each}
												</ul>
											</div>
										</CardContent>
									</Card>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Navigation Controls -->
			<div class="mt-8 flex items-center justify-center gap-4">
				<Button
					variant="outline"
					size="icon"
					onclick={() => goToSlide(currentIndex === 0 ? useCaseKeys.length - 1 : currentIndex - 1)}
					class="rounded-full"
				>
					<ChevronLeft class="h-5 w-5" />
				</Button>
				<div class="flex gap-2">
					{#each useCaseKeys as _, index}
						<button
							class="h-2 w-2 rounded-full transition-all duration-300 {currentIndex === index
								? 'w-8 bg-primary'
								: 'bg-primary/30 hover:bg-primary/50'}"
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
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- TESTIMONIALS — 3-card carousel, clean cards   -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="testimonials" class="border-t border-border py-20 md:py-28">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
					{$_('testimonials.badge')}
				</p>
				<h2 class="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
					{$_('testimonials.title')}
				</h2>
				<p class="mx-auto max-w-2xl text-muted-foreground md:text-lg">
					{$_('testimonials.description')}
				</p>
			</div>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative mt-12"
			onmouseenter={() => (tPaused = true)}
			onmouseleave={() => (tPaused = false)}
		>
			<!-- Mobile: single card -->
			<div class="px-4 md:hidden">
				<div class="overflow-hidden">
					<div
						class="flex transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{tIndex * 100}%)"
					>
						{#each testimonialKeys as clientKey}
							<div class="w-full flex-shrink-0 px-2">
								<div class="flex flex-col rounded-xl border border-border/60 bg-card p-5">
									<span
										class="select-none font-serif text-4xl leading-none text-primary/20"
										aria-hidden="true">"</span
									>
									<blockquote
										class="mb-5 mt-1 flex-1 text-[15px] leading-relaxed text-foreground/80"
									>
										{$_(`testimonials.clients.${clientKey}.quote`)}
									</blockquote>
									<div class="flex items-center gap-3 border-t border-border/40 pt-4">
										<div
											class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
										>
											{$_(`testimonials.clients.${clientKey}.author`).charAt(0)}
										</div>
										<div class="min-w-0">
											<p class="truncate text-sm font-semibold">
												{$_(`testimonials.clients.${clientKey}.author`)}
											</p>
											<p class="truncate text-xs text-muted-foreground">
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

				<div class="mt-6 flex items-center justify-center gap-5">
					<Button
						variant="outline"
						size="icon"
						onclick={() => goToTestimonial(tIndex === 0 ? testimonialKeys.length - 1 : tIndex - 1)}
						class="h-8 w-8 rounded-full"
					>
						<ChevronLeft class="h-4 w-4" />
					</Button>
					<span class="text-sm tabular-nums text-muted-foreground">
						{tIndex + 1} / {testimonialKeys.length}
					</span>
					<Button
						variant="outline"
						size="icon"
						onclick={() => goToTestimonial((tIndex + 1) % testimonialKeys.length)}
						class="h-8 w-8 rounded-full"
					>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Desktop: 3-card carousel -->
			<div class="hidden md:block">
				<div class="mx-auto overflow-hidden" style="width: 1240px;">
					<div
						class="flex gap-5 transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{tIndex * 418}px)"
					>
						{#each [...testimonialKeys, ...testimonialKeys.slice(0, 3)] as clientKey}
							<div
								class="flex flex-shrink-0 flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
								style="width: 398px;"
							>
								<span
									class="select-none font-serif text-5xl leading-none text-primary/20"
									aria-hidden="true">"</span
								>
								<blockquote class="mb-6 mt-1 flex-1 text-[15px] leading-relaxed text-foreground/80">
									{$_(`testimonials.clients.${clientKey}.quote`)}
								</blockquote>
								<div class="flex items-center gap-3 border-t border-border/40 pt-4">
									<div
										class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
									>
										{$_(`testimonials.clients.${clientKey}.author`).charAt(0)}
									</div>
									<div class="min-w-0">
										<p class="truncate text-sm font-semibold">
											{$_(`testimonials.clients.${clientKey}.author`)}
										</p>
										<p class="truncate text-xs text-muted-foreground">
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
					<div class="flex gap-2">
						{#each Array(Math.ceil(testimonialKeys.length / 3)) as _, index}
							<button
								class="h-2 w-2 rounded-full transition-all duration-300 {Math.floor(tIndex / 3) ===
								index
									? 'w-8 bg-primary'
									: 'bg-primary/30 hover:bg-primary/50'}"
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
	<!-- CHECKLIST — do you really need custom SW?      -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="checklist" class="border-t border-border px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-3xl">
				<p class="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
					{$_('checklist.badge')}
				</p>
				<h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
					{$_('checklist.title')}
				</h2>
				<p class="mb-14 max-w-xl text-muted-foreground md:mb-20 md:text-lg">
					{$_('checklist.intro')}
				</p>

				<div class="relative">
					<div class="absolute bottom-0 left-[19px] top-0 w-px bg-border md:left-[23px]"></div>

					<div class="space-y-10 md:space-y-14">
						<!-- Step 1 -->
						<div class="relative flex gap-6 md:gap-8">
							<div
								class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background font-mono text-sm font-bold md:h-12 md:w-12"
							>
								1
							</div>
							<div class="pb-2 pt-1.5 md:pt-2.5">
								<h3 class="mb-1.5 text-lg font-semibold md:text-xl">
									{$_('checklist.step1.title')}
								</h3>
								<p class="text-muted-foreground">{$_('checklist.step1.description')}</p>
							</div>
						</div>

						<!-- Step 2 -->
						<div class="relative flex gap-6 md:gap-8">
							<div
								class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background font-mono text-sm font-bold md:h-12 md:w-12"
							>
								2
							</div>
							<div class="pb-2 pt-1.5 md:pt-2.5">
								<h3 class="mb-1.5 text-lg font-semibold md:text-xl">
									{$_('checklist.step2.title')}
								</h3>
								<p class="text-muted-foreground">{$_('checklist.step2.description')}</p>
								<p class="mt-3 font-medium">
									{$_('checklist.step2.workshop_before_link')}
									<button
										class="font-semibold underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary"
										onclick={() =>
											document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
										>{$_('checklist.step2.workshop_link_text')}</button
									>{$_('checklist.step2.workshop_after_link')}
								</p>
							</div>
						</div>

						<!-- Step 3 -->
						<div class="relative flex gap-6 md:gap-8">
							<div
								class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background font-mono text-sm font-bold md:h-12 md:w-12"
							>
								3
							</div>
							<div class="pb-2 pt-1.5 md:pt-2.5">
								<h3 class="mb-1.5 text-lg font-semibold md:text-xl">
									{$_('checklist.step3.title')}
								</h3>
								<p class="text-muted-foreground">{$_('checklist.step3.description')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- WORKSHOP CTA — bold, direct, no fluff          -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="workshop" class="border-t border-border px-4 py-20 md:py-28">
		<div class="container mx-auto">
			<div class="mx-auto max-w-3xl">
				<h2 class="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
					{$_('workshop.title')}
				</h2>
				<p class="mb-10 max-w-xl text-muted-foreground md:mb-12 md:text-lg">
					{$_('workshop.description')}
				</p>

				<div class="mb-10 space-y-3 border-l-2 border-border pl-5 md:mb-12 md:pl-6">
					{#each deliverableKeys as key}
						<p class="text-sm font-medium md:text-base">
							{$_(`workshop.deliverables.${key}`)}
						</p>
					{/each}
				</div>

				<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
					<Button
						size="lg"
						class="group text-sm md:text-base"
						onclick={() =>
							document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
					>
						{$_('workshop.cta')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<p class="text-sm text-muted-foreground">
						{$_('workshop.trust')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- CONTACT                                         -->
	<!-- ═══════════════════════════════════════════════ -->
	<section id="contact" class="border-t border-border px-4 py-20 md:py-28">
		<div class="container mx-auto max-w-2xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{$_('contact.title')}</h2>
				<p class="text-muted-foreground md:text-lg">{$_('contact.description')}</p>
			</div>
			<ContactForm />
		</div>
	</section>
</main>

<style>
	.hero-gradient {
		background:
			radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 70%),
			radial-gradient(ellipse 60% 40% at 80% 50%, hsl(210 80% 60% / 0.04) 0%, transparent 60%);
	}

	.hero-grid {
		background-image:
			linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
			linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
	}

	.animate-fade-in {
		animation: fadeInUp 0.5s ease-out both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
