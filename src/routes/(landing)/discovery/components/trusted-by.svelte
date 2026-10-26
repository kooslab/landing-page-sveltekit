<script lang="ts">
	const logos = [
		{ src: '/images/logos/codestates-main.svg', alt: 'Code States' },
		{ src: '/images/logos/mindlogic.webp', alt: 'MindLogic', light: true },
		{ src: '/images/logos/finnestai.png', alt: 'FinnestAI', light: true },
		{ src: '/images/logos/logisna.svg', alt: 'Logisna' },
		{ src: '/images/logos/agentt.png', alt: 'Agentt' },
		{ src: '/images/logos/aec-berlin.png', alt: 'AEC Berlin' },
		{ src: '/images/logos/parkingai.webp', alt: 'Parking AI' },
		{ src: '/images/logos/myworkspace-logo.png', alt: 'MY WORKSPACE' },
		{ src: '/images/logos/verse144_logo.png', alt: 'Verse 144' },
		{ src: '/images/logos/safetyonsolution.avif', alt: 'SafetyOn Solution' },
		{ src: '/images/logos/welade.png', alt: 'Welade' }
	];
</script>

<section class="px-5 py-16 md:px-10 md:py-24">
	<div class="mx-auto max-w-5xl text-center">
		<p class="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trusted by</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
			{#each logos as logo}
				<img
					src={logo.src}
					alt={logo.alt}
					class="{logo.light
						? 'logo-light'
						: 'logo-muted'} h-7 max-w-[120px] object-contain transition-all md:h-9 md:max-w-[140px]"
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	.logo-muted {
		filter: grayscale(1) opacity(0.5);
	}
	.logo-muted:hover {
		filter: none;
	}
	.logo-light {
		filter: brightness(0) opacity(0.4);
	}
	.logo-light:hover {
		filter: brightness(0) opacity(0.8);
	}
</style>
