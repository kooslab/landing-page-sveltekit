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
	import {
		ArrowRight,
		Rocket,
		Target,
		Eye,
		Briefcase,
		ExternalLink,
		CheckCircle,
		Sparkles,
		BarChart,
		Calendar,
		Users,
		Quote,
		Lightbulb,
		TrendingUp,
		Clock,
		ChevronLeft,
		ChevronRight
	} from 'lucide-svelte';
	import ContactForm from '@/components/contact-form.svelte';

	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	// Debug current locale
	$effect(() => {
		console.log('Page lang param:', lang);
		console.log('Current locale:', $locale);
		console.log('Is Korean:', isKorean);
	});

	// Portfolio items (completed client projects)
	const portfolioItems = [
		{
			id: 'inventory',
			emoji: '📦',
			status: 'deployed'
		},
		{
			id: 'scheduling',
			emoji: '📅',
			status: 'deployed'
		},
		{
			id: 'reporting',
			emoji: '📊',
			status: 'deployed'
		},
		{
			id: 'contract',
			emoji: '📝',
			status: 'deployed'
		},
		{
			id: 'delivery',
			emoji: '🚚',
			status: 'deployed'
		},
		{
			id: 'parking',
			emoji: '🚗',
			status: 'deployed'
		},
		{
			id: 'ordermap',
			emoji: '🗺️',
			status: 'deployed'
		},
		{
			id: 'travel',
			emoji: '✈️',
			status: 'deployed'
		},
		{
			id: 'indoor',
			emoji: '🏢',
			status: 'deployed'
		},
		{
			id: 'payment',
			emoji: '💳',
			status: 'deployed'
		},
		{
			id: 'survey',
			emoji: '📋',
			status: 'deployed'
		},
		{
			id: 'quote',
			emoji: '💼',
			status: 'deployed'
		}
	];

	// Our products (SaaS tools)
	const ourProducts = [
		{
			id: 'equest',
			icon: Calendar,
			link: 'https://equest.koostory.net',
			status: 'live',
			name: 'eQuest',
			description: 'Client onboarding questionnaire platform'
		},
		{
			id: 'requirements',
			icon: CheckCircle,
			link: 'https://docs.koostory.net',
			status: 'live',
			name: 'Requirements Management',
			description: 'AI-powered requirements documentation tool'
		},
		{
			id: 'quotation',
			icon: BarChart,
			link: 'https://quote.koostory.net',
			status: 'live',
			name: 'Quotation Management',
			description: 'Professional quote generation and tracking'
		},
		{
			id: 'billsplit',
			icon: Users,
			link: 'https://n.koostory.net',
			status: 'live',
			name: 'Bill Split (Mobile)',
			description: 'Free bill splitting app for groups'
		}
	];

	// Mission values with icons
	const missionIcons = {
		saveTime: Rocket,
		workRight: Target,
		boost: Users
	};

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

	// Map case keys to emojis
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

	// Testimonial keys - using real customer testimonials (shuffled to avoid consecutive duplicates)
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

	// Portfolio pagination state
	let portfolioPage = $state(0);
	let portfolioItemsPerPage = $state(4);
	let portfolioTotalPages = $derived(Math.ceil(portfolioItems.length / portfolioItemsPerPage));
	let portfolioVisibleItems = $derived(() => {
		const start = portfolioPage * portfolioItemsPerPage;
		const end = start + portfolioItemsPerPage;
		return portfolioItems.slice(start, end);
	});

	// Carousel state
	let carouselContainer: HTMLDivElement;
	let isPaused = $state(false);
	let currentIndex = $state(0);
	let testimonialIndex = $state(0);
	let intervalId: number;
	let testimonialIntervalId: number;
	let cardWidth = 424; // 400px card + 24px gap
	let isMobile = $state(false);

	// Check if mobile
	$effect(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	});

	// Start carousel animation
	$effect(() => {
		if (!isPaused) {
			intervalId = window.setInterval(() => {
				currentIndex = (currentIndex + 1) % useCaseKeys.length;
			}, 10000); // Move every 10 seconds
		} else {
			if (intervalId) clearInterval(intervalId);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	// Reset pause state when user manually navigates
	function goToSlide(index: number) {
		currentIndex = index;
		isPaused = true;
		// Resume auto-play after 15 seconds
		setTimeout(() => {
			isPaused = false;
		}, 15000);
	}

	// Testimonial carousel auto-play (mobile only)
	$effect(() => {
		if (isMobile) {
			testimonialIntervalId = window.setInterval(() => {
				testimonialIndex = (testimonialIndex + 1) % testimonialKeys.length;
			}, 8000); // Change every 8 seconds
		}

		return () => {
			if (testimonialIntervalId) clearInterval(testimonialIntervalId);
		};
	});
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
			logo: {
				'@type': 'ImageObject',
				url: 'https://koostory.net/logo.png'
			}
		}
	}}
/>

<main class="w-full">
	<!-- Hero Section -->
	<section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
		<div class="absolute inset-0"></div>
		<div class="bg-grid-pattern absolute inset-0 opacity-5"></div>

		<div class="container relative z-10 mx-auto px-4 py-20 text-center">
			<div class="mx-auto max-w-4xl space-y-8">
				<div
					class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Sparkles class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('hero.tagline')}</span>
				</div>

				<h1 class="text-5xl font-bold md:text-7xl">
					{#if isKorean}
						<span class="md:hidden">
							<span class="block">소규모 기업을</span>
							<span class="block">위한 맞춤형</span>
							<span class="block">디지털 솔루션</span>
						</span>
						<span class="hidden md:block">
							<span class="block">소규모 기업을 위한</span>
							<span class="block">맞춤형 디지털 솔루션</span>
						</span>
					{:else}
						{$_('hero.title')}
					{/if}
				</h1>

				<p class="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl">
					{$_('hero.description')}
				</p>

				<div class="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
					<Button
						size="lg"
						class="group"
						onclick={() =>
							document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
					>
						{$_('hero.cta.explore')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						onclick={() =>
							document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
					>
						<Briefcase class="mr-2 h-4 w-4" />
						{$_('hero.cta.portfolio')}
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Vision Section -->
	<section id="vision" class="px-4 py-20">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Eye class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('vision.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('vision.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('vision.description')}
				</p>
			</div>

			<div class="mt-16 grid gap-8 md:grid-cols-3">
				{#each ['affordable', 'lightweight', 'timeSaving'] as pointKey}
					<Card class="border-2 transition-colors hover:border-primary/50">
						<CardHeader>
							<CardTitle class="text-2xl">{$_(`vision.points.${pointKey}.title`)}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-muted-foreground">{$_(`vision.points.${pointKey}.description`)}</p>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Mission Section -->
	<section id="mission" class="bg-secondary/5 px-4 py-20">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Target class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('mission.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('mission.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('mission.description')}
				</p>
			</div>

			<div class="mt-16 grid gap-8 md:grid-cols-3">
				{#each Object.entries(missionIcons) as [valueKey, IconComponent]}
					<div class="space-y-4 text-center">
						<div
							class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
						>
							<svelte:component this={IconComponent} class="h-8 w-8 text-primary" />
						</div>
						<h3 class="text-xl font-semibold">{$_(`mission.values.${valueKey}.title`)}</h3>
						<p class="text-muted-foreground">{$_(`mission.values.${valueKey}.description`)}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Products Section (Our SaaS Tools) -->
	<section id="products" class="bg-secondary/5 px-4 py-20">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Rocket class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('products.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('products.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('products.description')}
				</p>
			</div>

			<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each ourProducts as product}
					<Card class="group overflow-hidden transition-all duration-300 hover:shadow-xl">
						<CardHeader class="pb-4">
							<div class="mb-4 flex items-start justify-between">
								<div
									class="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20"
								>
									<svelte:component this={product.icon} class="h-6 w-6 text-primary" />
								</div>
								<Badge variant="default" class="bg-green-500">{$_('products.status.live')}</Badge>
							</div>
							<CardTitle class="mb-2 text-2xl">{$_(`products.items.${product.id}.name`)}</CardTitle>
							<CardDescription class="text-base">
								{$_(`products.items.${product.id}.description`)}
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="space-y-2">
								{#each $_(`products.items.${product.id}.features`) as feature}
									<div class="flex items-center gap-2 text-sm text-muted-foreground">
										<CheckCircle class="h-4 w-4 flex-shrink-0 text-primary" />
										<span>{feature}</span>
									</div>
								{/each}
							</div>

							<Button
								variant="outline"
								class="group/btn w-full"
								href={product.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{#if product.id === 'billsplit'}
									{$_('products.cta.free')}
								{:else}
									{$_('products.cta.trial')}
								{/if}
								<ExternalLink
									class="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
								/>
							</Button>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-muted/50 px-4 py-20">
		<div class="container mx-auto text-center">
			<h2 class="mb-6 text-4xl font-bold md:text-5xl">
				{$_('cta.title')}
			</h2>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
				{$_('cta.description')}
			</p>
			<div class="flex justify-center">
				<Button
					size="lg"
					class="group"
					onclick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
				>
					{$_('cta.buttons.trial')}
					<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section id="testimonials" class="px-4 py-20">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Quote class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('testimonials.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('testimonials.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('testimonials.description')}
				</p>
			</div>

			<!-- Mobile: Carousel view -->
			<div class="mt-16 md:hidden">
				<div class="overflow-hidden">
					<div
						class="flex transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{testimonialIndex * 100}%)"
					>
						{#each testimonialKeys as clientKey}
							<div class="w-full flex-shrink-0 px-4">
								<Card class="relative overflow-hidden">
									<div
										class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary"
									></div>
									<CardContent class="pt-8">
										<Quote class="mb-4 h-8 w-8 text-primary/20" />
										<p class="mb-6 text-base italic text-muted-foreground">
											"{$_(`testimonials.clients.${clientKey}.quote`)}"
										</p>
										<div class="border-t pt-4">
											<p class="font-semibold">{$_(`testimonials.clients.${clientKey}.author`)}</p>
											<p class="text-sm text-muted-foreground">
												{$_(`testimonials.clients.${clientKey}.role`)}
											</p>
											<p class="text-sm font-medium">
												{$_(`testimonials.clients.${clientKey}.company`)}
											</p>
											<Badge variant="secondary" class="mt-2">
												{$_(`testimonials.clients.${clientKey}.industry`)}
											</Badge>
										</div>
									</CardContent>
								</Card>
							</div>
						{/each}
					</div>
				</div>

				<!-- Mobile Navigation Controls -->
				<div class="mt-6 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onclick={() =>
							(testimonialIndex =
								testimonialIndex === 0 ? testimonialKeys.length - 1 : testimonialIndex - 1)}
						class="h-8 w-8 rounded-full"
					>
						<ChevronLeft class="h-4 w-4" />
					</Button>

					<div class="flex gap-2">
						{#each testimonialKeys as _, index}
							<button
								class="h-2 w-2 rounded-full transition-all duration-300 {testimonialIndex === index
									? 'w-8 bg-primary'
									: 'bg-primary/30'}"
								onclick={() => (testimonialIndex = index)}
								aria-label="Go to testimonial {index + 1}"
							/>
						{/each}
					</div>

					<Button
						variant="outline"
						size="icon"
						onclick={() => (testimonialIndex = (testimonialIndex + 1) % testimonialKeys.length)}
						class="h-8 w-8 rounded-full"
					>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Desktop: 4-card carousel view -->
			<div class="mt-16 hidden md:block">
				<div class="relative overflow-hidden">
					<div
						class="flex gap-4 transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{testimonialIndex * 25}%)"
					>
						{#each [...testimonialKeys, ...testimonialKeys.slice(0, 4)] as clientKey}
							<div class="w-1/4 flex-shrink-0 px-2">
								<Card class="relative h-full overflow-hidden">
									<div
										class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary"
									></div>
									<CardContent class="pt-8">
										<Quote class="mb-4 h-8 w-8 text-primary/20" />
										<p class="mb-6 line-clamp-4 text-base italic text-muted-foreground">
											"{$_(`testimonials.clients.${clientKey}.quote`)}"
										</p>
										<div class="border-t pt-4">
											<p class="font-semibold">{$_(`testimonials.clients.${clientKey}.author`)}</p>
											<p class="text-sm text-muted-foreground">
												{$_(`testimonials.clients.${clientKey}.role`)}
											</p>
											<p class="text-sm font-medium">
												{$_(`testimonials.clients.${clientKey}.company`)}
											</p>
											<Badge variant="secondary" class="mt-2">
												{$_(`testimonials.clients.${clientKey}.industry`)}
											</Badge>
										</div>
									</CardContent>
								</Card>
							</div>
						{/each}
					</div>
				</div>

				<!-- Desktop Navigation Controls -->
				<div class="mt-8 flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onclick={() =>
							(testimonialIndex =
								testimonialIndex === 0 ? testimonialKeys.length - 1 : testimonialIndex - 1)}
						class="rounded-full"
					>
						<ChevronLeft class="h-5 w-5" />
					</Button>

					<div class="flex gap-2">
						{#each Array(Math.ceil(testimonialKeys.length / 4)) as _, index}
							<button
								class="h-2 w-2 rounded-full transition-all duration-300 {Math.floor(
									testimonialIndex / 4
								) === index
									? 'w-8 bg-primary'
									: 'bg-primary/30 hover:bg-primary/50'}"
								onclick={() => (testimonialIndex = index * 4)}
								aria-label="Go to testimonial page {index + 1}"
							/>
						{/each}
					</div>

					<Button
						variant="outline"
						size="icon"
						onclick={() => (testimonialIndex = (testimonialIndex + 1) % testimonialKeys.length)}
						class="rounded-full"
					>
						<ChevronRight class="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Client Portfolio Section -->
	<section id="portfolio" class="bg-secondary/5 py-20">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Briefcase class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('portfolio.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('portfolio.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('portfolio.description')}
				</p>
			</div>
		</div>

		<!-- Carousel Container -->
		<div
			class="relative mt-16"
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
								<Card class="h-full transition-all duration-300 hover:shadow-xl">
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
							<!-- Cards with infinite loop setup -->
							{#each [...useCaseKeys, ...useCaseKeys.slice(0, 3)] as caseKey}
								<div class="flex-shrink-0" style="width: 380px;">
									<Card class="h-full transition-all duration-300 hover:shadow-xl">
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
						/>
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

	<!-- Contact Section -->
	<section id="contact" class="px-4 py-20">
		<div class="container mx-auto max-w-2xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold">{$_('contact.title')}</h2>
				<p class="text-xl text-muted-foreground">
					{$_('contact.description')}
				</p>
			</div>
			<ContactForm />
		</div>
	</section>
</main>

<style>
	.bg-grid-pattern {
		background-image:
			linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
			linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
		background-size: 50px 50px;
	}
</style>
