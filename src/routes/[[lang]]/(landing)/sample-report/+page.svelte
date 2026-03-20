<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';

	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
</script>

<main class="w-full px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
	<div class="mx-auto max-w-2xl md:max-w-3xl">
		<!-- Back button -->
		<a
			href="{langPrefix}/"
			class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:text-base"
		>
			<ArrowLeft class="h-4 w-4" />
			{$_('dxReport.backToHome')}
		</a>

		<!-- Report header -->
		<div class="mb-6 border-b border-border pb-6 md:mb-8 md:pb-8">
			<p
				class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-sm"
			>
				{$_('dxReport.reportLabel')}
			</p>
			<h1 class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
				{$_('dxReport.title')}
			</h1>
			<p class="mt-2 text-sm text-muted-foreground md:text-base">{$_('dxReport.subtitle')}</p>
		</div>

		<!-- Case info -->
		<div class="mb-8 rounded-xl bg-muted/30 p-5 md:mb-10 md:p-6">
			<p class="text-xs font-medium text-muted-foreground md:text-sm">
				{$_('dxReport.case.industry')}
			</p>
			<p class="mt-1 text-base font-semibold md:text-lg">{$_('dxReport.case.title')}</p>
		</div>

		<!-- 1. EXECUTIVE SUMMARY -->
		<div class="mb-10 md:mb-12">
			<h2 class="mb-4 text-lg font-bold md:text-xl">{$_('dxReport.report.summary.title')}</h2>
			<p class="text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
				{$_('dxReport.report.summary.text')}
			</p>
			<div class="mt-5 grid grid-cols-3 gap-3 md:mt-6 md:gap-4">
				{#each [0, 1, 2] as i}
					<div class="rounded-lg border border-border p-3 text-center md:p-4">
						<p class="text-xl font-bold text-primary md:text-2xl">
							{$_(`dxReport.report.summary.stats.${i}.value`)}
						</p>
						<p class="mt-1 text-[11px] leading-tight text-muted-foreground md:text-xs">
							{$_(`dxReport.report.summary.stats.${i}.label`)}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- 2. AS-IS PROCESS FLOW -->
		<div class="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
			<h2 class="mb-2 text-lg font-bold md:text-xl">{$_('dxReport.case.asIs.title')}</h2>
			<p class="mb-6 text-sm text-muted-foreground md:text-base">
				{$_('dxReport.report.asIsIntro')}
			</p>

			<div class="space-y-0">
				{#each [0, 1, 2, 3, 4] as i}
					{@const step = $_(`dxReport.case.asIs.steps.${i}`)}
					{@const problem = $_(`dxReport.case.asIs.problems.${i}`)}
					<div class="relative flex gap-4 pb-6 md:gap-5">
						{#if i < 4}
							<div class="absolute bottom-0 left-[13px] top-7 w-px bg-border md:left-[15px]"></div>
						{/if}
						<div
							class="relative z-10 mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground md:h-8 md:w-8 md:text-sm"
						>
							{i + 1}
						</div>
						<div class="flex-1">
							<p class="text-sm font-medium text-foreground/90 md:text-base">{step}</p>
							{#if problem && problem !== '-'}
								<p
									class="mt-2 border-l-2 border-muted-foreground/30 pl-3 text-xs leading-relaxed text-muted-foreground md:text-sm md:leading-relaxed"
								>
									{problem}
								</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- 3. CUSTOMER PAIN POINTS -->
		<div class="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
			<h2 class="mb-2 text-lg font-bold md:text-xl">{$_('dxReport.report.painPoints.title')}</h2>
			<p class="mb-5 text-sm text-muted-foreground md:text-base">
				{$_('dxReport.report.painPoints.intro')}
			</p>

			<div class="space-y-3 md:space-y-4">
				{#each [0, 1, 2] as i}
					<div class="rounded-lg border border-border p-4 md:p-5">
						<div class="mb-1 flex items-center gap-2">
							<span
								class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs"
							>
								{$_(`dxReport.report.painPoints.items.${i}.severity`)}
							</span>
							<p class="text-sm font-semibold md:text-base">
								{$_(`dxReport.report.painPoints.items.${i}.title`)}
							</p>
						</div>
						<p class="text-xs leading-relaxed text-muted-foreground md:text-sm md:leading-relaxed">
							{$_(`dxReport.report.painPoints.items.${i}.description`)}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- 4. OUR SUGGESTIONS -->
		<div class="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
			<h2 class="mb-2 text-lg font-bold md:text-xl">{$_('dxReport.case.suggestions.title')}</h2>
			<p class="mb-5 text-sm text-muted-foreground md:text-base">
				{$_('dxReport.report.suggestionsIntro')}
			</p>

			<div class="space-y-5 md:space-y-6">
				{#each [0, 1, 2] as i}
					<div class="rounded-xl border border-border p-5 md:p-6">
						<div class="mb-2 flex items-start gap-3">
							<span
								class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-muted-foreground md:h-8 md:w-8 md:text-sm"
								>{i + 1}</span
							>
							<div>
								<p class="text-sm font-bold md:text-base">
									{$_(`dxReport.case.suggestions.items.${i}.action`)}
								</p>
								<p class="mt-0.5 text-xs text-muted-foreground md:text-sm">
									{$_(`dxReport.report.suggestions.items.${i}.category`)}
								</p>
							</div>
						</div>
						<p
							class="ml-10 text-sm leading-relaxed text-muted-foreground md:ml-11 md:text-base md:leading-relaxed"
						>
							{$_(`dxReport.case.suggestions.items.${i}.detail`)}
						</p>
						<p class="ml-10 mt-2 text-xs font-medium text-foreground/70 md:ml-11 md:text-sm">
							{$_(`dxReport.case.suggestions.items.${i}.value`)}
						</p>

						<!-- DIY vs Pro options -->
						<div class="ml-10 mt-4 grid gap-3 sm:grid-cols-2 md:ml-11">
							<div class="rounded-lg border border-border bg-muted/20 p-3 md:p-4">
								<p
									class="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground md:text-xs"
								>
									DIY
								</p>
								<p
									class="text-xs leading-relaxed text-muted-foreground md:text-sm md:leading-relaxed"
								>
									{$_(`dxReport.case.suggestions.items.${i}.diy`)}
								</p>
							</div>
							<div class="rounded-lg border border-primary/20 bg-primary/5 p-3 md:p-4">
								<p
									class="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary md:text-xs"
								>
									Full solution
								</p>
								<p class="text-xs leading-relaxed text-foreground/70 md:text-sm md:leading-relaxed">
									{$_(`dxReport.case.suggestions.items.${i}.pro`)}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- 5. PRIORITY MATRIX -->
		<div class="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
			<h2 class="mb-2 text-lg font-bold md:text-xl">{$_('dxReport.report.priority.title')}</h2>
			<p class="mb-5 text-sm text-muted-foreground md:text-base">
				{$_('dxReport.report.priority.intro')}
			</p>

			<!-- Mobile: cards -->
			<div class="space-y-3 md:hidden">
				{#each [0, 1, 2] as i}
					<div class="flex items-start gap-4 rounded-xl border border-border p-4">
						<span
							class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground"
						>
							{$_(`dxReport.report.priority.rows.${i}.order`)}
						</span>
						<div class="flex-1">
							<p class="text-sm font-semibold">{$_(`dxReport.report.priority.rows.${i}.action`)}</p>
							<div class="mt-2 flex flex-wrap gap-2">
								<span class="rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground/70">
									{$_('dxReport.report.priority.impact')}: {$_(
										`dxReport.report.priority.rows.${i}.impact`
									)}
								</span>
								<span
									class="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
								>
									{$_('dxReport.report.priority.effort')}: {$_(
										`dxReport.report.priority.rows.${i}.effort`
									)}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Desktop: table -->
			<div class="hidden overflow-hidden rounded-xl border border-border md:block">
				<table class="w-full text-base">
					<thead>
						<tr class="border-b bg-muted/30">
							<th class="px-5 py-3.5 text-left text-sm font-semibold"
								>{$_('dxReport.report.priority.action')}</th
							>
							<th class="px-5 py-3.5 text-left text-sm font-semibold"
								>{$_('dxReport.report.priority.impact')}</th
							>
							<th class="px-5 py-3.5 text-left text-sm font-semibold"
								>{$_('dxReport.report.priority.effort')}</th
							>
							<th class="px-5 py-3.5 text-left text-sm font-semibold"
								>{$_('dxReport.report.priority.order')}</th
							>
						</tr>
					</thead>
					<tbody>
						{#each [0, 1, 2] as i}
							<tr class="border-b last:border-0">
								<td class="px-5 py-4 font-medium"
									>{$_(`dxReport.report.priority.rows.${i}.action`)}</td
								>
								<td class="px-5 py-4">
									<span class="rounded bg-muted px-2.5 py-1 text-sm font-medium">
										{$_(`dxReport.report.priority.rows.${i}.impact`)}
									</span>
								</td>
								<td class="px-5 py-4 text-muted-foreground"
									>{$_(`dxReport.report.priority.rows.${i}.effort`)}</td
								>
								<td class="px-5 py-4 font-bold">{$_(`dxReport.report.priority.rows.${i}.order`)}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- 6. NEXT STEPS -->
		<div class="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
			<h2 class="mb-4 text-lg font-bold md:text-xl">{$_('dxReport.report.nextSteps.title')}</h2>
			<div class="space-y-3 md:space-y-4">
				{#each [0, 1, 2] as i}
					<div class="flex items-start gap-3">
						<span
							class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-muted-foreground md:h-7 md:w-7 md:text-sm"
							>{i + 1}</span
						>
						<p class="text-sm leading-relaxed text-foreground/80 md:text-base md:leading-relaxed">
							{$_(`dxReport.report.nextSteps.items.${i}`)}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Disclaimer -->
		<p class="mb-10 text-xs text-muted-foreground md:text-sm">{$_('dxReport.disclaimer')}</p>

		<!-- CTA -->
		<div class="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center md:p-8">
			<p class="mb-3 text-lg font-bold md:text-xl">{$_('dxReport.reportCta.title')}</p>
			<p class="mb-5 text-sm text-muted-foreground md:text-base">
				{$_('dxReport.reportCta.description')}
			</p>
			<Button size="lg" class="text-sm md:text-base" href="mailto:ilmokoo@koostory.net">
				{$_('dxReport.reportCta.button')}
			</Button>
		</div>
	</div>
</main>
