<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		Package,
		ShoppingCart,
		Contact,
		BarChart3,
		BellRing,
		RefreshCw,
		Truck,
		Receipt,
		Search,
		FolderOpen,
		UserCheck,
		Database,
		UsersRound,
		FileText,
		Globe,
		Laptop,
		Layers,
		Rocket
	} from 'lucide-svelte';
	import ReservationModal from '../../workshops/components/reservation-modal.svelte';

	let reservationOpen = $state(false);
	let reservationType = $state<'requirements' | 'vibe' | 'free'>('free');
	let checked = $state([false, false, false, false, false, false]);
	let checkedCount = $derived(checked.filter(Boolean).length);

	let lang = $derived($page.params?.lang || 'en');

	function openBooking() {
		reservationType = 'free';
		reservationOpen = true;
	}

	const solutionCards = [
		{ key: 'inventory', icon: Package, flowIcons: [BarChart3, RefreshCw, BellRing, Truck] },
		{ key: 'orders', icon: ShoppingCart, flowIcons: [Receipt, Search, FolderOpen, FileText] },
		{ key: 'clients', icon: Contact, flowIcons: [UserCheck, Database, UsersRound, Globe] }
	];

	const processSteps = [
		{ icon: Laptop, key: 'consult' },
		{ icon: Layers, key: 'design' },
		{ icon: Rocket, key: 'build' }
	];
</script>

<SEO
	title={lang === 'de'
		? 'Ihre Tabellen wachsen Ihnen über den Kopf? — KooStory'
		: 'Outgrown Your Spreadsheets? Custom Internal Tools — KooStory'}
	description={lang === 'de'
		? 'Wir ersetzen Ihr Excel-Chaos durch maßgeschneiderte interne Systeme.'
		: 'We replace your spreadsheet chaos with custom internal management systems for inventory, orders, and client tracking.'}
	keywords="replace spreadsheets, custom internal tools, spreadsheet alternative, internal management system, inventory management, order tracking, Excel replacement, Google Sheets alternative, custom business software Berlin"
/>

<ReservationModal bind:open={reservationOpen} bind:workshopType={reservationType} />

<main class="w-full overflow-hidden">
	<!-- ══════════════════════════��════════════════════ -->
	<!-- 1. HERO                                        -->
	<!-- ══════���════════════════════════════════════════ -->
	<section class="px-5 pb-20 pt-16 md:px-10 md:pb-36 md:pt-36 lg:pb-44 lg:pt-44">
		<div class="mx-auto max-w-4xl">
			<div
				class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 md:mb-8"
			>
				<span class="h-2 w-2 rounded-full bg-primary"></span>
				<span class="text-xs font-medium tracking-wide text-primary md:text-sm">
					{$_('noMoreOffices.hero.badge')}
				</span>
			</div>

			<h1
				class="text-[2.25rem] font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
			>
				{$_('noMoreOffices.hero.title')}
			</h1>

			<p
				class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-8 md:text-xl lg:text-2xl lg:leading-relaxed"
			>
				{$_('noMoreOffices.hero.subtitle')}
			</p>

			<div class="mt-10 flex items-center gap-5 md:mt-14">
				<Button
					size="lg"
					class="group h-12 px-7 text-sm font-medium md:h-14 md:px-9 md:text-base"
					onclick={openBooking}
				>
					{$_('noMoreOffices.hero.cta')}
					<ArrowRight
						class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
					/>
				</Button>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 2. RESEARCH STATS                              -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		class="relative border-y border-border bg-muted/40 px-5 py-16 md:px-10 md:py-28 lg:py-36"
	>
		<div class="mx-auto max-w-5xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('noMoreOffices.research.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('noMoreOffices.research.title')}
			</h2>

			<div class="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
				<!-- Card 1: 94% Error Rate — Bar Chart -->
				<div class="rounded-2xl border border-border bg-card p-6 md:p-8">
					<div class="flex h-36 items-end justify-center gap-4 md:h-44">
						<div class="flex flex-col items-center gap-2">
							<span class="text-xs font-medium text-primary">94%</span>
							<div class="w-14 rounded-t-md bg-primary md:w-16" style="height: 132px"></div>
						</div>
						<div class="flex flex-col items-center gap-2">
							<span class="text-xs font-medium text-muted-foreground">6%</span>
							<div class="w-14 rounded-t-md bg-border md:w-16" style="height: 8px"></div>
						</div>
					</div>
					<div class="mt-2 flex justify-center gap-4 text-[10px] text-muted-foreground">
						<span>With errors</span>
						<span>Error-free</span>
					</div>
					<div class="mt-6">
						<span class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
							{$_('noMoreOffices.research.cards.0.stat')}
						</span>
						<p class="mt-1 text-sm font-medium text-foreground/80 md:text-base">
							{$_('noMoreOffices.research.cards.0.label')}
						</p>
						<p class="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
							{$_('noMoreOffices.research.cards.0.sub')}
						</p>
						<p
							class="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
						>
							{$_('noMoreOffices.research.cards.0.source')}
						</p>
					</div>
				</div>

				<!-- Card 2: 9 hrs/week — Exponential Curve -->
				<div class="rounded-2xl border border-border bg-card p-6 md:p-8">
					<div class="flex h-36 items-end justify-center md:h-44">
						<svg viewBox="0 0 200 120" class="h-full w-full" preserveAspectRatio="xMidYMid meet">
							<!-- Grid lines -->
							<line x1="30" y1="10" x2="30" y2="100" class="stroke-border" stroke-width="1" />
							<line x1="30" y1="100" x2="190" y2="100" class="stroke-border" stroke-width="1" />
							<line
								x1="30"
								y1="70"
								x2="190"
								y2="70"
								class="stroke-border/50"
								stroke-width="0.5"
								stroke-dasharray="4,4"
							/>
							<line
								x1="30"
								y1="40"
								x2="190"
								y2="40"
								class="stroke-border/50"
								stroke-width="0.5"
								stroke-dasharray="4,4"
							/>
							<!-- Curve: flat at small teams, exponential at scale -->
							<path
								d="M 30 95 Q 70 92, 90 85 Q 120 70, 145 45 Q 165 20, 190 10"
								fill="none"
								class="stroke-primary"
								stroke-width="2.5"
								stroke-linecap="round"
							/>
							<!-- Filled area under curve -->
							<path
								d="M 30 95 Q 70 92, 90 85 Q 120 70, 145 45 Q 165 20, 190 10 L 190 100 L 30 100 Z"
								class="fill-primary/10"
							/>
							<!-- Axis labels -->
							<text x="110" y="115" text-anchor="middle" class="fill-muted-foreground" font-size="8"
								>Team size →</text
							>
							<text
								x="12"
								y="55"
								text-anchor="middle"
								class="fill-muted-foreground"
								font-size="8"
								transform="rotate(-90, 12, 55)">Hours lost →</text
							>
						</svg>
					</div>
					<div class="mt-6">
						<span class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
							{$_('noMoreOffices.research.cards.1.stat')}
						</span>
						<p class="mt-1 text-sm font-medium text-foreground/80 md:text-base">
							{$_('noMoreOffices.research.cards.1.label')}
						</p>
						<p class="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
							{$_('noMoreOffices.research.cards.1.sub')}
						</p>
						<p
							class="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
						>
							{$_('noMoreOffices.research.cards.1.source')}
						</p>
					</div>
				</div>

				<!-- Card 3: 60% Automation Gap — Donut -->
				<div class="rounded-2xl border border-border bg-card p-6 md:p-8">
					<div class="flex h-36 items-center justify-center md:h-44">
						<svg viewBox="0 0 120 120" class="h-28 w-28 md:h-36 md:w-36">
							<!-- Background ring -->
							<circle cx="60" cy="60" r="48" fill="none" class="stroke-border" stroke-width="12" />
							<!-- Filled ring: 60% = 0.6 * 2π * 48 ≈ 181 -->
							<circle
								cx="60"
								cy="60"
								r="48"
								fill="none"
								class="stroke-primary"
								stroke-width="12"
								stroke-dasharray="181 301.6"
								stroke-dashoffset="0"
								stroke-linecap="round"
								transform="rotate(-90 60 60)"
							/>
							<!-- Center text -->
							<text
								x="60"
								y="56"
								text-anchor="middle"
								class="fill-foreground"
								font-size="24"
								font-weight="700">60</text
							>
							<text x="60" y="72" text-anchor="middle" class="fill-muted-foreground" font-size="10"
								>percent</text
							>
						</svg>
					</div>
					<div class="mt-6">
						<span class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
							{$_('noMoreOffices.research.cards.2.stat')}
						</span>
						<p class="mt-1 text-sm font-medium text-foreground/80 md:text-base">
							{$_('noMoreOffices.research.cards.2.label')}
						</p>
						<p class="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
							{$_('noMoreOffices.research.cards.2.sub')}
						</p>
						<p
							class="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
						>
							{$_('noMoreOffices.research.cards.2.source')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. INTERACTIVE CHECKLIST                       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('noMoreOffices.symptoms.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('noMoreOffices.symptoms.title')}
			</h2>

			<div class="mt-10 space-y-3 md:mt-14 md:space-y-4">
				{#each [0, 1, 2, 3, 4, 5] as i}
					<button
						type="button"
						class="group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all md:px-6 md:py-5 {checked[
							i
						]
							? 'border-primary/40 bg-primary/5 shadow-sm'
							: 'border-border bg-card hover:border-primary/20 hover:bg-muted/30'}"
						onclick={() => (checked[i] = !checked[i])}
					>
						<div
							class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all md:h-7 md:w-7 {checked[
								i
							]
								? 'border-primary bg-primary'
								: 'border-border group-hover:border-primary/40'}"
						>
							{#if checked[i]}
								<svg
									class="h-3.5 w-3.5 text-primary-foreground md:h-4 md:w-4"
									viewBox="0 0 16 16"
									fill="none"
								>
									<path
										d="M3.5 8.5L6.5 11.5L12.5 4.5"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							{/if}
						</div>
						<span
							class="text-sm font-medium leading-snug md:text-base {checked[i]
								? 'text-foreground'
								: 'text-foreground/70'}"
						>
							{$_(`noMoreOffices.symptoms.items.${i}`)}
						</span>
					</button>
				{/each}
			</div>

			<!-- Result bar -->
			<div
				class="mt-8 overflow-hidden rounded-xl border border-border transition-all md:mt-10 {checkedCount >=
				3
					? 'border-primary/30 bg-primary/5'
					: 'bg-card'}"
			>
				<div class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
					<!-- Progress dots -->
					<div class="flex gap-1.5">
						{#each [0, 1, 2, 3, 4, 5] as i}
							<div
								class="h-2.5 w-2.5 rounded-full transition-all {i < checkedCount
									? 'scale-110 bg-primary'
									: 'bg-border'}"
							></div>
						{/each}
					</div>
					<span class="text-sm font-medium text-foreground/60 md:text-base">
						{checkedCount} / 6
					</span>
					<div class="mx-2 h-5 w-px bg-border"></div>
					<p class="text-sm text-foreground/70 md:text-base">
						{#if checkedCount === 0}
							{$_('noMoreOffices.symptoms.result0')}
						{:else if checkedCount <= 2}
							{$_('noMoreOffices.symptoms.result1')}
						{:else if checkedCount <= 4}
							{$_('noMoreOffices.symptoms.result2')}
						{:else}
							{$_('noMoreOffices.symptoms.result3')}
						{/if}
					</p>
				</div>
				{#if checkedCount >= 3}
					<div class="border-t border-primary/20 px-5 py-4 md:px-6">
						<Button
							size="lg"
							class="group h-11 px-6 text-sm font-medium md:h-12 md:px-8 md:text-base"
							onclick={openBooking}
						>
							{$_('noMoreOffices.symptoms.resultCta')}
							<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- ══���════════════════════════════════════════════ -->
	<!-- 4. SOLUTIONS                                   -->
	<!-- ��════════════════���═════════════════════════════ -->
	<section class="border-y border-border bg-muted/40 px-5 py-16 md:px-10 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('noMoreOffices.solutions.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('noMoreOffices.solutions.title')}
			</h2>

			<div class="mt-12 space-y-6 md:mt-16 md:space-y-8">
				{#each solutionCards as card}
					{@const CardIcon = card.icon}
					<div
						class="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] md:p-10"
					>
						<!-- Problem -->
						<h3 class="text-lg font-bold md:text-2xl">
							{$_(`noMoreOffices.solutions.${card.key}.problem`)}
						</h3>
						<p
							class="mt-2 text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base md:leading-relaxed"
						>
							{$_(`noMoreOffices.solutions.${card.key}.pain`)}
						</p>
						<!-- Fix -->
						<div class="mt-4 flex items-start gap-2.5 md:mt-5 md:gap-3">
							<div
								class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 md:h-8 md:w-8"
							>
								<CardIcon class="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
							</div>
							<p
								class="text-sm font-medium leading-relaxed text-foreground md:text-base md:leading-relaxed"
							>
								{$_(`noMoreOffices.solutions.${card.key}.fix`)}
							</p>
						</div>

						<!-- Flow Pipeline -->
						<!-- Mobile: vertical stack -->
						<div class="mt-5 md:hidden">
							<div class="flex flex-col items-start gap-0">
								{#each [0, 1, 2, 3] as stepIndex}
									{@const StepFlowIcon = card.flowIcons[stepIndex]}
									<div
										class="flex w-full items-center gap-3 rounded-lg border border-border bg-background/60 px-3.5 py-2.5 dark:bg-muted/30"
									>
										<StepFlowIcon class="h-4 w-4 flex-shrink-0 text-primary/70" />
										<span class="text-xs font-medium text-foreground/80">
											{$_(`noMoreOffices.solutions.${card.key}.flow.${stepIndex}`)}
										</span>
									</div>
									{#if stepIndex < 3}
										<div class="flex justify-center pl-5">
											<div class="h-3 w-px bg-primary/30"></div>
										</div>
									{/if}
								{/each}
							</div>
						</div>
						<!-- Desktop: fills available width -->
						<div class="mt-6 hidden md:mt-8 md:block">
							<div class="flex items-start">
								{#each [0, 1, 2, 3] as stepIndex}
									{@const StepFlowIcon = card.flowIcons[stepIndex]}
									<div class="flex flex-1 items-start">
										<div
											class="flex w-full items-start gap-3 rounded-xl border border-border bg-background/60 px-5 py-4 transition-colors group-hover:border-primary/15 dark:bg-muted/30"
										>
											<StepFlowIcon class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary/70" />
											<span class="text-[15px] font-medium leading-snug text-foreground/80">
												{$_(`noMoreOffices.solutions.${card.key}.flow.${stepIndex}`)}
											</span>
										</div>
										{#if stepIndex < 3}
											<div class="flex flex-shrink-0 items-center px-2 pt-5">
												<div class="h-px w-6 bg-primary/30"></div>
												<div
													class="h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-primary/30"
												></div>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════���════════ -->
	<!-- 5. PROCESS                                     -->
	<!-- ═════════════��═════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('noMoreOffices.process.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('noMoreOffices.process.title')}
			</h2>

			<!-- Desktop: horizontal connected -->
			<div class="mt-12 hidden md:mt-16 md:block">
				<div class="relative grid grid-cols-3 gap-10">
					<!-- Connecting line -->
					<div class="absolute left-[16.7%] right-[16.7%] top-8 h-px bg-border"></div>

					{#each processSteps as step, i}
						{@const StepIcon = step.icon}
						<div class="relative text-center">
							<div
								class="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background"
							>
								<StepIcon class="h-7 w-7 text-primary" />
							</div>
							<h3 class="mt-6 text-xl font-bold">
								{$_(`noMoreOffices.process.steps.${step.key}.title`)}
							</h3>
							<p class="mt-3 text-base leading-relaxed text-muted-foreground">
								{$_(`noMoreOffices.process.steps.${step.key}.description`)}
							</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Mobile: vertical timeline -->
			<div class="mt-10 md:hidden">
				<div class="relative">
					<div class="absolute bottom-0 left-5 top-0 w-px bg-border"></div>

					<div class="space-y-8">
						{#each processSteps as step, i}
							{@const StepIcon = step.icon}
							<div class="relative flex gap-6">
								<div
									class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
								>
									<StepIcon class="h-5 w-5 text-primary" />
								</div>
								<div class="pt-1">
									<h3 class="text-base font-bold">
										{$_(`noMoreOffices.process.steps.${step.key}.title`)}
									</h3>
									<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
										{$_(`noMoreOffices.process.steps.${step.key}.description`)}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ════��══════════════════════════════════════════ -->
	<!-- 6. CLOSING CTA                                 -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		class="relative overflow-hidden border-t border-border bg-foreground px-5 py-16 text-background md:px-10 md:py-28 lg:py-36"
	>
		<div
			class="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"
		></div>

		<div class="relative mx-auto max-w-4xl text-center">
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('noMoreOffices.cta.title')}
			</h2>
			<p
				class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-background/60 md:mt-6 md:text-xl"
			>
				{$_('noMoreOffices.cta.subtitle')}
			</p>
			<div class="mt-8 md:mt-12">
				<button
					onclick={openBooking}
					class="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 md:h-14 md:px-9 md:text-base"
				>
					{$_('noMoreOffices.cta.button')}
					<ArrowRight
						class="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
					/>
				</button>
			</div>
			<p class="mt-5 text-sm text-background/40 md:mt-6 md:text-base">
				{$_('noMoreOffices.cta.trust')}
			</p>
		</div>
	</section>
</main>
