<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
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
		Clock
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

	// Portfolio apps data with icons
	const portfolioApps = [
		{
			id: 'requirements',
			icon: CheckCircle,
			link: 'https://docs.kooslab.net',
			status: 'live'
		},
		{
			id: 'analytics',
			icon: BarChart,
			link: 'https://quote.kooslab.net',
			status: 'live'
		},
		{
			id: 'project',
			icon: Calendar,
			link: '#',
			status: 'coming-soon'
		}
	];

	// Mission values with icons
	const missionIcons = {
		saveTime: Rocket,
		workRight: Target,
		boost: Users
	};

	// All use case keys for carousel
	const useCaseKeys = [
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

	// Testimonial keys
	const testimonialKeys = ['manufacturer', 'consultant', 'agency'];

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

<svelte:head>
	<title
		>Kooslab - {isKorean
			? '중소기업과 프리랜서를 위한 저렴한 디지털 도구'
			: 'Affordable Digital Tools for SMBs & Freelancers'}</title
	>
	<meta
		name="description"
		content={isKorean
			? '프리랜서 가격의 엔터프라이즈급 도구. 귀하의 소규모 비즈니스가 시간을 절약하고 효율적으로 작업하며 부담스러운 비용 없이 생산성을 높일 수 있도록 도와드립니다. 14일 무료 체험.'
			: 'Enterprise-grade tools at freelancer prices. Help your small business save time, work efficiently, and boost productivity without breaking the bank. Try free for 14 days.'}
	/>
</svelte:head>

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
					<Button size="lg" class="group">
						{$_('hero.cta.explore')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button size="lg" variant="outline">
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

	<!-- Portfolio Section -->
	<section id="portfolio" class="px-4 py-20">
		<div class="container mx-auto">
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

			<div class="mt-16 grid gap-8 md:grid-cols-3">
				{#each portfolioApps as app}
					<Card class="group overflow-hidden transition-all duration-300 hover:shadow-xl">
						<CardHeader class="pb-4">
							<div class="mb-4 flex items-start justify-between">
								<div
									class="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20"
								>
									<svelte:component this={app.icon} class="h-6 w-6 text-primary" />
								</div>
								{#if app.status === 'live'}
									<Badge variant="default" class="bg-green-500">{$_('portfolio.status.live')}</Badge
									>
								{:else}
									<Badge variant="secondary">{$_('portfolio.status.comingSoon')}</Badge>
								{/if}
							</div>
							<CardTitle class="mb-2 text-2xl">{$_(`portfolio.apps.${app.id}.name`)}</CardTitle>
							<CardDescription class="text-base">
								{$_(`portfolio.apps.${app.id}.description`)}
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="space-y-2">
								{#each $_(`portfolio.apps.${app.id}.features`) as feature}
									<div class="flex items-center gap-2 text-sm text-muted-foreground">
										<CheckCircle class="h-4 w-4 flex-shrink-0 text-primary" />
										<span>{feature}</span>
									</div>
								{/each}
							</div>

							{#if app.status === 'live'}
								<Button
									variant="outline"
									class="group/btn w-full"
									href={app.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{$_('portfolio.cta.trial')}
									<ExternalLink
										class="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
									/>
								</Button>
							{:else}
								<Button variant="outline" class="w-full" disabled>
									{$_('portfolio.cta.comingSoon')}
								</Button>
							{/if}
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
				<Button size="lg" class="group">
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

				<!-- Mobile Navigation Dots -->
				<div class="mt-6 flex justify-center gap-2">
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
			</div>

			<!-- Desktop: Grid view -->
			<div class="mt-16 hidden gap-8 md:grid md:grid-cols-3">
				{#each testimonialKeys as clientKey}
					<Card class="relative overflow-hidden">
						<div
							class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary"
						></div>
						<CardContent class="pt-8">
							<Quote class="mb-4 h-8 w-8 text-primary/20" />
							<p class="mb-6 text-lg italic text-muted-foreground">
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
				{/each}
			</div>
		</div>
	</section>

	<!-- Use Cases Section -->
	<section id="use-cases" class="overflow-hidden bg-secondary/5 py-20">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
				>
					<Lightbulb class="h-4 w-4" />
					<span class="text-sm font-medium">{$_('useCases.badge')}</span>
				</div>
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">
					{$_('useCases.title')}
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					{$_('useCases.description')}
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
										<div class="mb-4 flex items-center justify-between">
											<h3 class="line-clamp-2 text-lg font-bold">
												{$_(`useCases.cases.${caseKey}.title`)}
											</h3>
											{#if caseKey === 'inventory' || caseKey === 'reporting'}
												<BarChart class="h-6 w-6 flex-shrink-0 text-primary" />
											{:else if caseKey === 'scheduling' || caseKey === 'payment'}
												<Calendar class="h-6 w-6 flex-shrink-0 text-primary" />
											{:else if caseKey === 'delivery' || caseKey === 'travel'}
												<Rocket class="h-6 w-6 flex-shrink-0 text-primary" />
											{:else if caseKey === 'parking' || caseKey === 'indoor'}
												<Target class="h-6 w-6 flex-shrink-0 text-primary" />
											{:else}
												<TrendingUp class="h-6 w-6 flex-shrink-0 text-primary" />
											{/if}
										</div>
										<Badge variant="outline" class="mb-4 w-fit text-xs">
											{$_(`useCases.cases.${caseKey}.industry`)}
										</Badge>
									</CardHeader>
									<CardContent class="space-y-4">
										<div>
											<p class="mb-2 font-semibold text-destructive">Problem:</p>
											<p class="text-sm text-muted-foreground">
												{$_(`useCases.cases.${caseKey}.problem`)}
											</p>
										</div>
										<div>
											<p class="mb-2 font-semibold text-primary">Solution:</p>
											<p class="text-sm text-muted-foreground">
												{$_(`useCases.cases.${caseKey}.solution`)}
											</p>
										</div>
										<div class="border-t pt-4">
											<p class="mb-3 font-semibold">Results:</p>
											<ul class="space-y-2">
												{#each $_(`useCases.cases.${caseKey}.results`) as result}
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
				<div class="mx-auto hidden max-w-7xl px-4 md:block">
					<div
						class="flex gap-6 transition-transform duration-500 ease-in-out"
						style="transform: translateX(-{currentIndex * 424}px)"
					>
						<!-- Cards with infinite loop setup -->
						{#each [...useCaseKeys, ...useCaseKeys.slice(0, 3)] as caseKey}
							<div class="w-[400px] flex-shrink-0">
								<Card class="h-full transition-all duration-300 hover:shadow-xl">
									<CardHeader>
										<div class="mb-4 flex items-center justify-between">
											<h3 class="line-clamp-2 text-xl font-bold">
												{$_(`useCases.cases.${caseKey}.title`)}
											</h3>
											{#if caseKey === 'inventory' || caseKey === 'reporting'}
												<BarChart class="h-8 w-8 flex-shrink-0 text-primary" />
											{:else if caseKey === 'scheduling' || caseKey === 'payment'}
												<Calendar class="h-8 w-8 flex-shrink-0 text-primary" />
											{:else if caseKey === 'delivery' || caseKey === 'travel'}
												<Rocket class="h-8 w-8 flex-shrink-0 text-primary" />
											{:else if caseKey === 'parking' || caseKey === 'indoor'}
												<Target class="h-8 w-8 flex-shrink-0 text-primary" />
											{:else}
												<TrendingUp class="h-8 w-8 flex-shrink-0 text-primary" />
											{/if}
										</div>
										<Badge variant="outline" class="mb-4 w-fit">
											{$_(`useCases.cases.${caseKey}.industry`)}
										</Badge>
									</CardHeader>
									<CardContent class="space-y-4">
										<div>
											<p class="mb-2 font-semibold text-destructive">Problem:</p>
											<p class="line-clamp-2 text-sm text-muted-foreground">
												{$_(`useCases.cases.${caseKey}.problem`)}
											</p>
										</div>
										<div>
											<p class="mb-2 font-semibold text-primary">Solution:</p>
											<p class="line-clamp-2 text-sm text-muted-foreground">
												{$_(`useCases.cases.${caseKey}.solution`)}
											</p>
										</div>
										<div class="border-t pt-4">
											<p class="mb-3 font-semibold">Results:</p>
											<ul class="space-y-2">
												{#each $_(`useCases.cases.${caseKey}.results`).slice(0, 3) as result}
													<li class="flex items-start gap-2 text-sm">
														<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
														<span class="line-clamp-1">{result}</span>
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

			<!-- Navigation Dots -->
			<div class="mt-8 flex justify-center gap-2">
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
		</div>
	</section>

	<!-- Contact Section -->
	<section class="px-4 py-20">
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
