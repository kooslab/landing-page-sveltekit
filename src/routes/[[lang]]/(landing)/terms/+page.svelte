<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);

	const sectionKeys = ['services', 'workshops', 'liability', 'ip', 'law', 'contact'] as const;
</script>

<SEO title={$_('terms.seo.title')} description={$_('terms.seo.description')} />

<main class="w-full">
	<div class="container max-w-[720px] py-16 md:py-24">
		<div class="mb-2 text-sm text-foreground/50">{$_('terms.lastUpdated')}</div>
		<h1 class="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{$_('terms.title')}</h1>
		<p class="mb-12 text-foreground/70 md:text-lg">{$_('terms.intro')}</p>

		<div class="space-y-10">
			{#each sectionKeys as key}
				<section>
					<h2 class="mb-3 text-xl font-semibold">{$_(`terms.sections.${key}.heading`)}</h2>
					<p class="whitespace-pre-line leading-relaxed text-foreground/70">
						{$_(`terms.sections.${key}.body`)}
					</p>
				</section>
			{/each}
		</div>

		<div class="mt-16 border-t pt-8">
			<a
				href="{langPrefix}/"
				class="text-sm text-foreground/50 transition-colors hover:text-foreground/70"
			>
				← {$_('nav.backHome')}
			</a>
		</div>
	</div>
</main>
