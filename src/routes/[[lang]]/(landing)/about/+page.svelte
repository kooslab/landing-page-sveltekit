<script lang="ts">
	import { _ } from 'svelte-i18n';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title={$_('profile.seo.title')}
	description={$_('profile.seo.description')}
	ogImage="/og-image-landing.png"
/>

<main class="w-full">
	<div class="mx-auto max-w-3xl px-4">
		<!-- HERO -->
		<section class="pb-20 pt-28 md:pb-28 md:pt-36">
			<p class="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.badge')}
			</p>
			<h1 class="text-3xl font-bold leading-[1.25] tracking-tight md:text-4xl lg:text-5xl">
				{$_('profile.hero.title')}
			</h1>
			<p class="mt-6 text-xl leading-relaxed md:text-2xl">
				{$_('profile.hero.subtitle')}
			</p>
		</section>

		<!-- MISSION -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.mission.title')}
			</p>
			<div class="space-y-5 text-xl leading-relaxed">
				<p>{$_('profile.mission.p1')}</p>
				<p>{$_('profile.mission.p2')}</p>
				<p class="font-bold">{$_('profile.mission.p3')}</p>
			</div>
		</section>

		<!-- WHAT WE DON'T DO -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.wontDo.title')}
			</p>
			<div class="space-y-5 text-xl leading-relaxed">
				<p>{$_('profile.wontDo.p1')}</p>
				<p>{$_('profile.wontDo.p2')}</p>
				<p>{$_('profile.wontDo.p3')}</p>
				<p class="font-bold">{$_('profile.wontDo.p4')}</p>
			</div>
		</section>

		<!-- BEHIND THE COMPANY -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.about.title')}
			</p>
			<div class="space-y-8">
				<p class="text-xl leading-relaxed">{$_('profile.about.p1')}</p>

				<!-- Growth bar -->
				<div class="py-2">
					<div class="relative h-px bg-border">
						<div
							class="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-foreground/40"
						></div>
						<div
							class="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-foreground"
						></div>
					</div>
					<div class="mt-3 flex justify-between">
						<div>
							<span class="text-2xl font-bold tabular-nums">{$_('profile.about.growthFrom')}</span>
							<span class="ml-1.5 text-base text-muted-foreground"
								>{$_('profile.about.growthFromLabel')}</span
							>
						</div>
						<div class="text-right">
							<span class="text-2xl font-bold tabular-nums">{$_('profile.about.growthTo')}</span>
							<span class="ml-1.5 text-base text-muted-foreground"
								>{$_('profile.about.growthToLabel')}</span
							>
						</div>
					</div>
				</div>

				<div class="space-y-5 text-xl leading-relaxed">
					<p>{$_('profile.about.p2')}</p>
					<p>{$_('profile.about.p3')}</p>
				</div>
			</div>
		</section>
	</div>
</main>
