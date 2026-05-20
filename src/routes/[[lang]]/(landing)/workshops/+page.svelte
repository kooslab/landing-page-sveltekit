<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import ReservationModal from './components/reservation-modal.svelte';
	import { ArrowRight, ChevronDown } from 'lucide-svelte';

	let lang = $derived($page.params?.lang || 'en');

	let modalOpen = $state(false);
	let modalWorkshopType = $state<'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom'>('ax_l1');
	let openFaq = $state<number | null>(null);

	const axLevelKeys = ['basic', 'intermediate', 'advanced'] as const;
	const axTypes = ['ax_l1', 'ax_l2', 'ax_l3'] as const;

	function book(type: 'diagnosis' | 'ax_l1' | 'ax_l2' | 'ax_l3' | 'custom') {
		modalWorkshopType = type;
		modalOpen = true;
	}
</script>

<SEO
	title={$_('workshops.seo.title')}
	description={$_('workshops.seo.description')}
	ogImage="/og-image-landing.png"
/>

<ReservationModal bind:open={modalOpen} bind:workshopType={modalWorkshopType} />

<main class="w-full">
	<!-- ══════════════════════════════════════════════ -->
	<!-- HERO                                           -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-brand px-5 pb-20 pt-24 md:px-12 md:pb-28 md:pt-32">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				{$_('landing.ax_training.badge')}
			</span>
			<h1
				class="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[52px] lg:text-[60px]"
			>
				{$_('landing.ax_training.title')}
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl">
				{$_('landing.ax_training.intro')}
			</p>
			<div class="mt-10 md:mt-12">
				<button
					onclick={() => book('diagnosis')}
					class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-all hover:border-white/40 hover:text-white"
				>
					Not sure which level? Book a free 20-min call
					<ArrowRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- BEFORE THE SESSION                             -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-4xl">
			<span class="mb-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				Before the session
			</span>
			<h2 class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl">
				Problem discovery —<br class="hidden sm:block" /> no tech knowledge needed
			</h2>
			<p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
				3 days before the session, every participant gets three questions. Most people finish in
				under 10 minutes — no AI background required.
			</p>

			<div class="mt-14 space-y-0 divide-y divide-canvas-warm border-y border-canvas-warm">
				{#each [{ n: '01', tag: 'Spot the pattern', q: 'What do you do every week that feels mechanical or repetitive?', examples: [{ label: 'Manual data entry', note: 'Copying rows between spreadsheets by hand' }, { label: 'Status reports', note: 'Compiling the same metrics into a slide every Monday' }, { label: 'Invoice processing', note: 'Checking and logging each invoice before payment' }, { label: 'Email templates', note: 'Sending the same onboarding email to every new client' }, { label: 'Meeting notes', note: 'Transcribing and formatting notes after every call' }] }, { n: '02', tag: 'Find the bottleneck', q: 'Which task would you hand off first if you had a junior assistant?', examples: [{ label: 'Scheduling', note: 'Back-and-forth emails just to agree on a meeting time' }, { label: 'CRM updates', note: 'Logging every call and email into the system by hand' }, { label: 'Document formatting', note: 'Making every proposal look the same before sending' }, { label: 'Approval chasing', note: 'Following up with three people to sign off on one thing' }, { label: 'Research', note: 'Gathering competitor info before every client call' }] }, { n: '03', tag: 'Name the frustration', q: 'Where do you always think "there must be a better way"?', examples: [{ label: 'Print → Sign → Scan', note: 'Every contract takes a week just for approvals' }, { label: 'Employee onboarding', note: 'New hires spend day one reading PDFs and filling forms' }, { label: 'Expense reports', note: 'Collecting receipts and submitting them manually each month' }, { label: 'Client reports', note: 'Building the same PDF layout for every client, every month' }, { label: 'Data cleanup', note: 'Fixing the same formatting errors in every import file' }] }] as item}
					<div class="py-10 md:py-12">
						<div class="flex items-start gap-6 md:gap-10">
							<span
								class="mt-1 w-8 flex-shrink-0 text-sm font-bold tabular-nums text-brand/30 md:text-base"
							>
								{item.n}
							</span>
							<div class="flex-1">
								<span
									class="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-brand/60"
								>
									{item.tag}
								</span>
								<p class="text-2xl font-semibold leading-snug text-ink md:text-3xl">
									{item.q}
								</p>
								<div class="mt-6 flex flex-wrap gap-3">
									{#each item.examples as ex}
										<div class="rounded-xl border border-canvas-warm bg-canvas-soft px-4 py-3">
											<p class="text-sm font-semibold text-ink">{ex.label}</p>
											<p class="mt-0.5 text-sm text-ink/50">{ex.note}</p>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- DURING THE SESSION                             -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-brand px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-4xl">
			<span class="mb-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				During the session
			</span>
			<h2 class="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl">
				Everyone builds —<br class="hidden sm:block" /> nobody watches
			</h2>
			<p class="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
				A typical full-day schedule. L1 runs a condensed half-day version of the same structure.
			</p>

			<div class="mt-14 space-y-0">
				{#each [{ time: '09:00', title: 'Problem framing', desc: 'Everyone shares their pre-session answers. Each person picks one problem to focus on for the day.' }, { time: '10:00', title: 'First build', desc: "You build your first working attempt. It doesn't need to be good — it needs to exist." }, { time: '11:00', title: 'Critique round', desc: 'Everyone shows what they built. Honest feedback, specific suggestions — no polite nodding.' }, { time: '11:30', title: 'Second build', desc: 'Apply the feedback. Build further, break things, fix them.' }, { time: '13:00', title: 'Lunch', desc: 'A real break. Not a working lunch.' }, { time: '14:00', title: 'Final build', desc: 'The last push. Most people do their best work in this block.' }, { time: '15:30', title: 'Demo & debrief', desc: 'Everyone demos what they built. You leave knowing exactly what to do next.' }, { time: '16:00', title: 'Wrap-up', desc: 'Deployment checklist, open questions, next steps.' }] as slot, i}
					<div class="flex items-start gap-6 border-t border-white/10 py-6 md:gap-10 md:py-7">
						<span
							class="w-14 flex-shrink-0 text-sm font-bold tabular-nums text-brand-violet md:text-base"
						>
							{slot.time}
						</span>
						<div>
							<p class="text-lg font-bold text-white">{slot.title}</p>
							<p class="mt-1 text-base leading-relaxed text-white/60">{slot.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- AFTER THE SESSION                              -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-[rgb(27_25_56_/_0.04)] px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-4xl">
			<span class="mb-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				After the session
			</span>
			<h2 class="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-4xl">
				What you take home
			</h2>
			<p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
				The session doesn't end when you leave the room.
			</p>

			<div class="mt-14 grid gap-5 sm:grid-cols-2">
				{#each [{ label: 'Shared workspace', desc: "Prompts, templates, and tools saved and accessible to your whole team — not buried in someone's laptop." }, { label: '2-week check-in', desc: 'A call to review what got deployed, what got stuck, and what to fix. Keeps accountability real.' }, { label: '30-day Slack access', desc: "Async support for questions that come up after you're back at your desk and things break." }, { label: 'L3: Follow-up day on-site', desc: "A full extra day to push further, unblock what's still stuck, and ship what didn't make it on day one." }] as item}
					<div class="rounded-2xl border border-brand/10 bg-white p-7 md:p-8">
						<p class="text-lg font-bold text-ink">{item.label}</p>
						<p class="mt-2 text-base leading-relaxed text-ink/70">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- AX LEVELS                                      -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-brand px-5 py-20 md:px-8 md:py-28 lg:py-36">
		<div class="mx-auto max-w-4xl">
			<span class="mb-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-violet">
				Choose your level
			</span>
			<h2 class="mb-12 text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl">
				{$_('landing.ax_training.title')}
			</h2>
			<div class="space-y-4">
				{#each axLevelKeys as levelKey, i}
					<div class="rounded-2xl border border-white/10 bg-white/[0.05] p-7 md:p-9">
						<div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
							<div class="flex-1">
								<div class="mb-4 flex flex-wrap items-center gap-2">
									<span
										class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-violet text-xs font-bold text-brand"
									>
										{i + 1}
									</span>
									<span class="text-sm font-bold uppercase tracking-[0.15em] text-brand-violet">
										{$_(`landing.ax_training.levels.${levelKey}.level`)}
									</span>
									<span
										class="rounded-full border border-white/10 px-3 py-0.5 text-sm text-white/40"
									>
										{$_(`landing.ax_training.levels.${levelKey}.duration`)}
									</span>
								</div>
								<h3 class="mb-2 text-xl font-bold text-white md:text-2xl">
									{$_(`landing.ax_training.levels.${levelKey}.title`)}
								</h3>
								<p class="text-base leading-relaxed text-white/65">
									{$_(`landing.ax_training.levels.${levelKey}.description`)}
								</p>
								<p class="mt-3 text-sm text-white/35">
									{$_(`landing.pricing.ax.levels.${levelKey}.format`)}
								</p>
							</div>
							<div class="flex flex-row items-center gap-5 sm:flex-col sm:items-end sm:gap-3">
								<div class="text-right">
									<p class="text-3xl font-bold tracking-tight text-white md:text-4xl">
										€{$_(`landing.pricing.ax.levels.${levelKey}.price`)}
									</p>
									<p class="text-sm text-white/40">{$_('landing.pricing.ax.perGroup')}</p>
								</div>
								<button
									onclick={() => book(axTypes[i])}
									class="flex-shrink-0 rounded-full bg-brand-violet px-6 py-2.5 text-sm font-bold text-brand transition-opacity hover:opacity-90 active:translate-y-px"
								>
									Book L{i + 1}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<p
				class="mt-6 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-white/50"
			>
				{$_('landing.pricing.note')}
			</p>
			<p class="mt-3 text-sm text-white/30">{$_('landing.ax_training.note')}</p>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- FREE DIAGNOSIS CTA                             -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="border-y border-canvas-warm bg-canvas-soft px-5 py-16 md:px-12 md:py-20">
		<div class="mx-auto max-w-4xl">
			<div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
				<div>
					<p class="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-brand">
						{$_('workshops.free.badge')}
					</p>
					<h3 class="text-2xl font-bold text-ink md:text-3xl">
						{$_('workshops.free.title')}
					</h3>
					<p class="mt-2 max-w-lg text-base leading-relaxed text-ink/70">
						{$_('workshops.free.description')}
					</p>
				</div>
				<button
					onclick={() => book('diagnosis')}
					class="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
				>
					{$_('workshops.free.cta')}
					<ArrowRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</section>

	<!-- ══════════════════════════════════════════════ -->
	<!-- FAQ                                            -->
	<!-- ══════════════════════════════════════════════ -->
	<section class="bg-white px-5 py-20 md:px-8 md:py-28">
		<div class="mx-auto max-w-4xl">
			<span class="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
				{$_('landing.faq.badge')}
			</span>
			<h2 class="mb-12 text-3xl font-bold leading-[1.1] tracking-tight text-brand md:text-4xl">
				{$_('landing.faq.title')}
			</h2>
			<div class="divide-y divide-canvas-warm border-t border-canvas-warm">
				{#each [0, 1, 2, 3] as i}
					{@const isOpen = openFaq === i}
					<button
						class="flex w-full items-start justify-between gap-6 py-7 text-left md:py-8"
						onclick={() => (openFaq = isOpen ? null : i)}
					>
						<h3 class="text-lg font-semibold leading-snug text-ink md:text-xl">
							{$_(`landing.faq.items.${i}.q`)}
						</h3>
						<ChevronDown
							class="mt-1 h-6 w-6 flex-shrink-0 text-ink/60 transition-transform duration-200 {isOpen
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if isOpen}
						<div class="pb-7 md:pb-8">
							<p class="text-base leading-relaxed text-ink/80 md:text-lg">
								{$_(`landing.faq.items.${i}.a`)}
							</p>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
</main>
