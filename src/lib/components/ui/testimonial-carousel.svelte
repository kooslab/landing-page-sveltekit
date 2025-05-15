<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import type { Testimonial } from '$lib/data/testimonials';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const { testimonials } = $props<{
		testimonials: Testimonial[];
	}>();

	let currentIndex = $state(0);
	let transitioning = $state(false);
	let visibleCount = $state(3); // Show 3 testimonials at once
	let isMobile = $state(false);
	let carouselTrack: HTMLElement | null = null;

	onMount(() => {
		// Check screen size initially
		checkScreenSize();

		// Add window resize listener
		window.addEventListener('resize', checkScreenSize);

		// Initial positioning
		updateCarouselPosition(false);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	function checkScreenSize() {
		isMobile = window.innerWidth < 768;
		// On mobile show only 1 testimonial
		visibleCount = isMobile ? 1 : 3;

		// Update position after screen size change
		if (carouselTrack) {
			updateCarouselPosition(false);
		}
	}

	function updateCarouselPosition(withTransition = true) {
		if (!carouselTrack) return;

		// Calculate the percentage to move based on testimonial width
		const slidePercentage = isMobile ? 100 : 100 / visibleCount;
		const movePercentage = -currentIndex * slidePercentage;

		if (withTransition) {
			carouselTrack.style.transition = 'transform 0.8s ease';
		} else {
			carouselTrack.style.transition = 'none';
		}

		carouselTrack.style.transform = `translateX(${movePercentage}%)`;
	}

	function nextSlide() {
		if (transitioning || currentIndex >= testimonials.length - visibleCount) return;

		transitioning = true;
		currentIndex += 1;

		updateCarouselPosition();

		setTimeout(() => {
			transitioning = false;
		}, 800);
	}

	function prevSlide() {
		if (transitioning || currentIndex <= 0) return;

		transitioning = true;
		currentIndex -= 1;

		updateCarouselPosition();

		setTimeout(() => {
			transitioning = false;
		}, 800);
	}

	function goToSlide(index: number) {
		if (transitioning || index === currentIndex || index > testimonials.length - visibleCount)
			return;

		transitioning = true;
		currentIndex = index;

		updateCarouselPosition();

		setTimeout(() => {
			transitioning = false;
		}, 800);
	}

	// Calculate if we should disable navigation buttons
	const disablePrev = $derived(transitioning || currentIndex <= 0);
	const disableNext = $derived(transitioning || currentIndex >= testimonials.length - visibleCount);
</script>

<div class="carousel-container mx-auto max-w-6xl">
	{#if testimonials.length > 0}
		<!-- Carousel with smooth sliding transition -->
		<div class="relative overflow-hidden py-4">
			<div class="carousel-viewport overflow-hidden">
				<div class="carousel-track flex" bind:this={carouselTrack}>
					{#each testimonials as testimonial}
						<div class="carousel-slide flex-shrink-0 {isMobile ? 'w-full' : 'w-1/3'}">
							<div class="p-2">
								<Card class="h-full bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
									<CardContent class="p-6">
										<p class="mb-6 text-lg italic">"{testimonial.quote}"</p>
										<div class="flex items-center">
											<Avatar class="mr-4 h-12 w-12 border-2 border-gray-200 dark:border-gray-700">
												<AvatarImage src={testimonial.avatar} alt={testimonial.name} />
												<AvatarFallback
													class="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white"
													>{testimonial.name.charAt(0)}</AvatarFallback
												>
											</Avatar>
											<div>
												<p class="font-semibold text-gray-900 dark:text-white">
													{testimonial.name}
												</p>
												<p class="text-sm text-gray-600 dark:text-gray-300">{testimonial.title}</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Left arrow -->
			<button
				class="absolute bottom-0 left-2 z-10 rounded-full bg-white p-2 text-gray-900 shadow-lg transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:bottom-0 sm:left-4 sm:p-3"
				onclick={prevSlide}
				disabled={disablePrev}
				aria-label="Previous testimonials"
			>
				<ChevronLeft size={20} class="sm:hidden" />
				<ChevronLeft size={24} class="hidden sm:block" />
			</button>

			<!-- Right arrow -->
			<button
				class="absolute bottom-0 right-2 z-10 rounded-full bg-white p-2 text-gray-900 shadow-lg transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:bottom-0 sm:right-4 sm:p-3"
				onclick={nextSlide}
				disabled={disableNext}
				aria-label="Next testimonials"
			>
				<ChevronRight size={20} class="sm:hidden" />
				<ChevronRight size={24} class="hidden sm:block" />
			</button>
		</div>

		<!-- Indicators showing current position -->
		<div class="mt-6 flex justify-center space-x-2">
			{#each testimonials as _, i}
				{#if i <= testimonials.length - visibleCount}
					<button
						class="h-2 w-2 rounded-full transition-colors {i === currentIndex
							? 'bg-blue-500 dark:bg-blue-400'
							: 'bg-gray-400 dark:bg-gray-600'} {transitioning ? 'pointer-events-none' : ''}"
						onclick={() => goToSlide(i)}
						aria-label={`Go to testimonial set starting at ${i + 1}`}
					></button>
				{/if}
			{/each}
		</div>
	{:else}
		<div class="py-10 text-center text-gray-500 dark:text-gray-400">No testimonials available.</div>
	{/if}
</div>

<style>
	.carousel-viewport {
		position: relative;
		overflow: hidden;
	}

	.carousel-track {
		will-change: transform;
	}

	.carousel-slide {
		min-height: 280px;
	}
</style>
