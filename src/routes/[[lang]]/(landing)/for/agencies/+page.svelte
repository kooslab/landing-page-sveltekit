<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		Building2,
		Monitor,
		Car,
		Globe,
		CalendarDays,
		Users,
		Zap,
		Laptop,
		Layers,
		Rocket,
		Search,
		Clock,
		RefreshCw,
		FolderPlus,
		LogIn,
		FileText,
		Bell,
		Inbox,
		UserPlus,
		KanbanSquare,
		BadgeCheck,
		Send,
		Pencil,
		FolderLock,
		MousePointerClick
	} from 'lucide-svelte';
	import ReservationModal from '../../discovery/components/reservation-modal.svelte';

	let reservationOpen = $state(false);
	let reservationType = $state<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('diagnosis');

	let lang = $derived($page.params?.lang || 'en');

	function openBooking() {
		reservationType = 'diagnosis';
		reservationOpen = true;
	}

	const painIcons = [Search, Clock, RefreshCw];

	const solutionCards = [
		{ key: 'portal', icon: Users, flowIcons: [FolderPlus, LogIn, FileText, Bell] },
		{ key: 'crm', icon: Zap, flowIcons: [Inbox, UserPlus, KanbanSquare, BadgeCheck] },
		{ key: 'esign', icon: Pencil, flowIcons: [Send, Pencil, FolderLock, MousePointerClick] }
	];

	const trackRecordItems = [
		{ icon: Building2, key: 'office' },
		{ icon: Monitor, key: 'kiosk' },
		{ icon: Car, key: 'parking' },
		{ icon: Globe, key: 'cms' },
		{ icon: CalendarDays, key: 'events' }
	];

	const processSteps = [
		{ icon: Laptop, key: 'call' },
		{ icon: Layers, key: 'prototype' },
		{ icon: Rocket, key: 'launch' }
	];
</script>

<SEO
	title={lang === 'de'
		? 'Individuelle Tools für Agenturen — KooStory'
		: 'Custom Tools for Agencies — KooStory'}
	description={lang === 'de'
		? 'Wir entwickeln Kundenportale, interne Tools und Workflow-Automatisierung für Agenturen und Beratungen in Berlin.'
		: 'We build client portals, internal tools, and workflow automation for agencies and consultancies in Berlin.'}
	keywords="agency tools Berlin, client portal, internal dashboard, workflow automation, custom software agency, Agentur Tools Berlin, Kundenportal, interne Tools"
/>

<ReservationModal bind:open={reservationOpen} bind:workshopType={reservationType} />

<main class="w-full overflow-hidden">
	<!-- ═══════════════════════════════════════════════ -->
	<!-- 1. HERO                                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-20 pt-16 md:px-10 md:pb-36 md:pt-36 lg:pb-44 lg:pt-44">
		<div class="mx-auto max-w-4xl">
			<div
				class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 md:mb-8"
			>
				<span class="h-2 w-2 rounded-full bg-primary"></span>
				<span class="text-xs font-medium tracking-wide text-primary md:text-sm">
					{$_('agencies.hero.badge')}
				</span>
			</div>

			<h1
				class="text-[2.25rem] font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
			>
				{$_('agencies.hero.title')}
			</h1>

			<p
				class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-8 md:text-xl lg:text-2xl lg:leading-relaxed"
			>
				{$_('agencies.hero.subtitle')}
			</p>

			<div class="mt-10 flex items-center gap-5 md:mt-14">
				<Button
					size="lg"
					class="group h-12 px-7 text-sm font-medium md:h-14 md:px-9 md:text-base"
					onclick={openBooking}
				>
					{$_('agencies.hero.cta')}
					<ArrowRight
						class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
					/>
				</Button>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 2. PAIN POINTS                                 -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		class="relative border-y border-border bg-muted/40 px-5 py-16 md:px-10 md:py-28 lg:py-36"
	>
		<div class="mx-auto max-w-4xl">
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('agencies.pain.title')}
			</h2>

			<div class="mt-10 space-y-0 md:mt-14">
				{#each [0, 1, 2] as i}
					{@const PainIcon = painIcons[i]}
					<div
						class="group flex gap-5 border-l-2 border-border py-6 pl-6 transition-colors hover:border-primary md:gap-8 md:py-10 md:pl-10"
					>
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm ring-1 ring-border transition-colors group-hover:text-primary group-hover:ring-primary/30 md:h-12 md:w-12 md:rounded-xl"
						>
							<PainIcon class="h-5 w-5 md:h-6 md:w-6" />
						</div>
						<p class="text-[15px] leading-relaxed text-foreground/75 md:text-lg md:leading-relaxed">
							{$_(`agencies.pain.items.${i}`)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. SOLUTIONS                                   -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('agencies.solutions.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('agencies.solutions.title')}
			</h2>

			<div class="mt-12 space-y-6 md:mt-16 md:space-y-8">
				{#each solutionCards as card}
					{@const CardIcon = card.icon}
					<div
						class="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] md:p-10"
					>
						<!-- Problem -->
						<h3 class="text-lg font-bold md:text-2xl">
							{$_(`agencies.solutions.${card.key}.problem`)}
						</h3>
						<p
							class="mt-2 text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base md:leading-relaxed"
						>
							{$_(`agencies.solutions.${card.key}.pain`)}
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
								{$_(`agencies.solutions.${card.key}.fix`)}
							</p>
						</div>

						<!-- Flow Pipeline -->
						<!-- Mobile: vertical stack -->
						<div class="mt-5 md:hidden">
							<div class="flex flex-col items-start gap-0">
								{#each [0, 1, 2, 3] as stepIndex}
									{@const StepFlowIcon = card.flowIcons[stepIndex]}
									<div
										class="flex w-full items-center gap-3 rounded-lg border border-border bg-muted/60 px-3.5 py-2.5 dark:bg-muted/30"
									>
										<StepFlowIcon class="h-4 w-4 flex-shrink-0 text-primary/70" />
										<span class="text-xs font-medium text-foreground/80">
											{$_(`agencies.solutions.${card.key}.flow.${stepIndex}`)}
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
											class="flex w-full items-start gap-3 rounded-xl border border-border bg-muted/60 px-5 py-4 transition-colors group-hover:border-primary/15 dark:bg-muted/30"
										>
											<StepFlowIcon class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary/70" />
											<span class="text-[15px] font-medium leading-snug text-foreground/80">
												{$_(`agencies.solutions.${card.key}.flow.${stepIndex}`)}
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

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 4. TRACK RECORD                                -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="border-y border-border bg-muted/40 px-5 py-14 md:px-10 md:py-24">
		<div class="mx-auto max-w-4xl">
			<div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-10">
				<div class="flex-shrink-0">
					<h2 class="text-xl font-bold tracking-tight md:text-3xl">
						{$_('agencies.track.title')}
					</h2>
					<p class="mt-1 text-xs text-muted-foreground md:mt-2 md:text-base">
						{$_('agencies.track.summary')}
					</p>
				</div>

				<div class="mt-4 h-px w-full bg-border md:mt-0 md:h-16 md:w-px"></div>

				<div class="flex flex-wrap gap-4 md:gap-6">
					{#each trackRecordItems as item}
						{@const TrackIcon = item.icon}
						<div class="flex items-center gap-2.5 text-foreground/60">
							<TrackIcon class="h-4 w-4 text-primary/70 md:h-5 md:w-5" />
							<span class="whitespace-nowrap text-xs font-medium md:text-base">
								{$_(`agencies.track.items.${item.key}`)}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 5. PROCESS                                     -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<p
				class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-5 md:text-sm"
			>
				{$_('agencies.process.badge')}
			</p>
			<h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
				{$_('agencies.process.title')}
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
								{$_(`agencies.process.steps.${step.key}.title`)}
							</h3>
							<p class="mt-3 text-base leading-relaxed text-muted-foreground">
								{$_(`agencies.process.steps.${step.key}.description`)}
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
										{$_(`agencies.process.steps.${step.key}.title`)}
									</h3>
									<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
										{$_(`agencies.process.steps.${step.key}.description`)}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
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
				{$_('agencies.cta.title')}
			</h2>
			<p
				class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-background/60 md:mt-6 md:text-xl"
			>
				{$_('agencies.cta.subtitle')}
			</p>
			<div class="mt-8 md:mt-12">
				<button
					onclick={openBooking}
					class="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 md:h-14 md:px-9 md:text-base"
				>
					{$_('agencies.cta.button')}
					<ArrowRight
						class="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
					/>
				</button>
			</div>
			<p class="mt-5 text-sm text-background/40 md:mt-6 md:text-base">
				{$_('agencies.cta.trust')}
			</p>
		</div>
	</section>
</main>
