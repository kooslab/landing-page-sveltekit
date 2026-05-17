<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
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
			<p class="mt-6 max-w-xl text-lg leading-relaxed">
				{@html $_('profile.hero.subtitle')}
			</p>
		</section>

		<!-- HOW WE WORK -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.howWeWork.title')}
			</p>
			<div class="space-y-4 text-lg leading-relaxed">
				<p>{$_('profile.howWeWork.p1')}</p>
				<p>{$_('profile.howWeWork.p2')}</p>
				<p>{$_('profile.howWeWork.p3')}</p>
				<p>{$_('profile.howWeWork.p4')}</p>
			</div>
		</section>

		<!-- WHAT WE DON'T TAKE ON -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.wontDo.title')}
			</p>
			<div class="space-y-4 text-lg leading-relaxed">
				<p>{$_('profile.wontDo.p1')}</p>
				<p>{$_('profile.wontDo.p2')}</p>
				<p>{@html $_('profile.wontDo.p3')}</p>
				<p>{$_('profile.wontDo.p4')}</p>
			</div>
		</section>

		<!-- BEHIND THE COMPANY -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.about.title')}
			</p>
			<div class="space-y-8">
				<p class="text-lg leading-relaxed">{$_('profile.about.p1')}</p>

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
							<span class="ml-1.5 text-sm text-muted-foreground"
								>{$_('profile.about.growthFromLabel')}</span
							>
						</div>
						<div class="text-right">
							<span class="text-2xl font-bold tabular-nums">{$_('profile.about.growthTo')}</span>
							<span class="ml-1.5 text-sm text-muted-foreground"
								>{$_('profile.about.growthToLabel')}</span
							>
						</div>
					</div>
				</div>

				<div class="space-y-4 text-lg leading-relaxed">
					<p>{$_('profile.about.p2')}</p>
					<p>{$_('profile.about.p3')}</p>
				</div>
			</div>
		</section>

		<!-- WORKSHOPS -->
		<section class="pb-24 md:pb-32">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				{$_('profile.workshops.title')}
			</p>
			<p class="mb-8 text-lg leading-relaxed">
				{$_('profile.workshops.intro')}
			</p>

			<div class="mb-4 rounded-lg border border-dashed border-border bg-muted/20 p-6">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
							{$_('profile.workshops.free.price')}
						</p>
						<p class="font-semibold">{$_('profile.workshops.free.title')}</p>
						<p class="mt-1 text-sm">
							{$_('profile.workshops.free.description')}
						</p>
					</div>
					<Button
						size="sm"
						class="group flex-shrink-0"
						onclick={() => {
							window.location.href = `${langPrefix}/#contact`;
						}}
					>
						{$_('profile.workshops.free.cta')}
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>
			</div>

			<a
				href="{langPrefix}/workshops"
				class="group flex items-center justify-between rounded-lg border border-border p-6 transition-colors hover:border-primary/30 hover:bg-muted/30"
			>
				<div>
					<p class="font-semibold">{$_('profile.workshops.paidLink.title')}</p>
					<p class="mt-1 text-sm">
						{$_('profile.workshops.paidLink.description')}
					</p>
				</div>
				<ArrowRight
					class="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
				/>
			</a>
		</section>
	</div>
</main>
