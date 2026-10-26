<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		Zap,
		Clock,
		RefreshCw,
		BarChart3,
		CheckCircle2,
		Users,
		Database
	} from 'lucide-svelte';
	import ReservationModal from '../../discovery/components/reservation-modal.svelte';
	import ChaosToSystem from '../../discovery/components/chaos-to-system.svelte';
	import TrustedBy from '../../discovery/components/trusted-by.svelte';

	let reservationOpen = $state(false);
	let reservationType = $state('custom');

	function openBooking() {
		reservationType = 'custom';
		reservationOpen = true;
	}
</script>

<SEO
	title="Automate Your Agency Ops - KooStory"
	description="Off-the-shelf CRMs are expensive and never fit. We build your custom CRM and customer portal with AI - one database, your workflow, ready in weeks."
	keywords="custom CRM, client portal, agency automation, CRM alternative, custom software agency, workflow automation"
/>

<ReservationModal
	bind:open={reservationOpen}
	bind:workshopType={reservationType}
	segment="agencies"
	simple
/>

<main class="w-full overflow-hidden">
	<!-- ═══════════════════════════════════════════════ -->
	<!-- 1. HERO                                       -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="relative px-5 pb-20 pt-20 md:px-10 md:pb-32 md:pt-40 lg:pt-48">
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent"
		></div>
		<div class="relative mx-auto max-w-5xl text-center">
			<div
				class="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 md:mb-10"
			>
				<span class="h-2 w-2 rounded-full bg-primary"></span>
				<span class="text-sm font-medium tracking-wide text-primary">
					For Agencies & Consultancies
				</span>
			</div>

			<h1
				class="mx-auto max-w-4xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
			>
				Your own CRM.
				<span class="text-primary">Not someone else's.</span>
			</h1>

			<p
				class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 md:mt-10 md:text-xl"
			>
				Off-the-shelf CRMs are expensive, slow to configure, and never quite fit. We build your
				custom CRM and customer portal with AI - one database, your workflow, ready in weeks.
			</p>

			<div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-12">
				<Button
					size="lg"
					class="group h-14 px-9 text-base font-semibold md:h-16 md:px-11 md:text-lg"
					onclick={openBooking}
				>
					Book a Free 30-Min Call
					<ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
				</Button>
				<p class="text-base text-foreground/50">No commitment. No pitch.</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 2. THE PROBLEM (blog images)                  -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-16 md:px-10 md:pb-24">
		<div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
			<div class="flex flex-col overflow-hidden rounded-2xl border border-border">
				<img
					src="https://pub-caf0ad9bf20f4066a8f86c89d611ae69.r2.dev/blog/1791920141245-ee73eba2.png"
					alt="Manual calculations next to a dashboard - the gap between spreadsheet work and real systems"
					class="h-56 w-full object-cover md:h-64"
				/>
				<p class="flex-1 px-5 py-4 text-base text-foreground/80">
					Your team calculates numbers by hand while the dashboard shows something else.
				</p>
			</div>
			<div class="flex flex-col overflow-hidden rounded-2xl border border-border">
				<img
					src="https://pub-caf0ad9bf20f4066a8f86c89d611ae69.r2.dev/blog/1791920167824-6e0f7d2a.png"
					alt="Two people holding conflicting reports"
					class="h-56 w-full object-cover md:h-64"
				/>
				<p class="flex-1 px-5 py-4 text-base text-foreground/80">
					Sales says one number, finance says another. No single source of truth.
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. VISUAL BEFORE/AFTER                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-20 md:px-10 md:pb-32">
		<div class="mx-auto max-w-5xl">
			<ChaosToSystem
				tools={['CRM', 'Invoicing', 'Spreadsheets', 'Email', 'Slack', 'Project Tool']}
				hubLabel="Your CRM"
				phased
				toolPhases={[1, 1, 1, 2, 2, 2]}
				toolReplaced={[true, false, true, false, false, false]}
				afterCaption="Step by step - core business data first"
			/>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. FOUNDER CREDIBILITY                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="bg-muted/50 px-5 py-16 md:px-10 md:py-24">
		<div
			class="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-left"
		>
			<img
				src="/images/ilmo-koo.jpg"
				alt="Ilmo Koo, Founder"
				class="h-20 w-20 flex-shrink-0 rounded-full object-cover md:h-24 md:w-24"
			/>
			<div>
				<p class="text-lg font-bold text-foreground md:text-xl">
					Requirements expert who scaled ops for 9,000+ users.
				</p>
				<p class="mt-1 text-base text-foreground/80">
					Ex-CPO at Code States, South Korea's pioneer coding bootcamp. 6 years of turning messy
					operations into clean systems. In the AI era, well-documented requirements are the
					difference between a project that ships in weeks and one that drags for months.
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 4. BIG STAT + PROOF                           -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-5xl text-center">
			<p class="text-sm font-bold uppercase tracking-widest text-muted-foreground">Real results</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-20">
				<div>
					<p class="text-7xl font-extrabold tracking-tight text-primary md:text-8xl">3x</p>
					<p class="mt-2 text-lg text-foreground/80">more clients managed</p>
				</div>
				<div class="hidden h-20 w-px bg-border md:block"></div>
				<div>
					<p class="text-7xl font-extrabold tracking-tight text-foreground md:text-8xl">67%</p>
					<p class="mt-2 text-lg text-foreground/80">less admin overhead</p>
				</div>
			</div>

			<div
				class="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-background p-8 text-left md:p-10"
			>
				<p class="text-lg leading-relaxed text-foreground md:text-xl">
					"Our accountants were pulling bank statements from APIs, matching transactions to
					chart-of-accounts manually. KooStory built an AI-based matching system - our team now
					manages
					<strong>3x more clients</strong> without adding staff."
				</p>
				<div class="mt-6 flex items-center gap-4">
					<img
						src="/images/logos/finnestai.png"
						alt="FinnestAI"
						class="h-12 w-12 rounded-full object-contain"
					/>
					<div>
						<p class="text-base font-bold text-foreground">FinnestAI</p>
						<p class="text-base text-foreground/60">Finance Team Outsourcing Agency</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 4. MID-PAGE CTA                               -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-24">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold tracking-tight md:text-4xl">
				Curious what we'd automate for you?
			</h2>
			<p class="mt-4 text-lg text-foreground/70 md:text-xl">
				We'll map your workflow in 30 minutes and tell you exactly what we'd build.
			</p>
			<div class="mt-8">
				<Button size="lg" class="group h-14 px-9 text-base font-semibold" onclick={openBooking}>
					Book Your Free Call
					<ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 5. WHAT WE BUILD                              -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="bg-muted/50 px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-5xl">
			<div class="text-center">
				<p class="text-sm font-bold uppercase tracking-widest text-muted-foreground">
					What we build
				</p>
				<h2 class="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
					Your CRM. Your portal. One database.
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
					No more adapting expensive CRMs that never fit. No months of configuration and training.
					With AI, we build a hyper-customized system for your business in weeks.
				</p>
			</div>

			<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
				{#each [{ icon: Database, title: 'Custom CRM', desc: 'Built around your workflow - not the other way around. No per-seat fees, no bloated features you never use.' }, { icon: Users, title: 'Customer Portal', desc: 'Self-service portals where clients check progress, approve deliverables, upload files, and pay.' }, { icon: BarChart3, title: 'Live Dashboards', desc: 'Real-time overview of projects, revenue, and team workload in one place.' }, { icon: Zap, title: 'Invoice Workflows', desc: 'Generate, send, and track invoices automatically from your project data.' }, { icon: Clock, title: 'Time & Billing', desc: 'Connect time tracking to billing so nothing falls through the cracks.' }, { icon: CheckCircle2, title: 'Onboarding Flows', desc: 'Automated client onboarding: contracts, access, kickoff tasks - all handled.' }] as card}
					{@const CardIcon = card.icon}
					<div
						class="rounded-2xl border border-border bg-background p-7 transition-shadow hover:shadow-lg md:p-8"
					>
						<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
							<CardIcon class="h-6 w-6 text-primary" />
						</div>
						<h3 class="mt-5 text-xl font-bold text-foreground">{card.title}</h3>
						<p class="mt-2 text-base leading-relaxed text-foreground/80">{card.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 6. HOW IT WORKS                               -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-24">
		<div class="mx-auto max-w-4xl">
			<h2 class="text-2xl font-bold tracking-tight md:text-3xl">How it works</h2>
			<div class="mt-8 grid gap-6 sm:grid-cols-3">
				<div>
					<p class="text-base font-bold text-foreground">30-min call</p>
					<p class="mt-1 text-base text-foreground/80">
						We map what tools you're duct-taping together and where your team wastes time.
					</p>
				</div>
				<div>
					<p class="text-base font-bold text-foreground">Requirements doc in a week</p>
					<p class="mt-1 text-base text-foreground/80">
						We write the requirements that make AI-powered development fast. Clear spec = quick
						value, no wasted cycles.
					</p>
				</div>
				<div>
					<p class="text-base font-bold text-foreground">Live in 2-4 weeks</p>
					<p class="mt-1 text-base text-foreground/80">
						AI builds fast when requirements are right. You see progress every week.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 7. SECOND TESTIMONIAL                         -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="bg-muted/50 px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-4xl">
			<div class="rounded-2xl border border-border bg-background p-8 md:p-12">
				<p class="text-xl leading-relaxed text-foreground md:text-2xl">
					"KooStory built 52 custom SSO integrations so every university could onboard with their
					own portal credentials. That foundation helped us scale from 28 to
					<strong>100+ universities and grow revenue 11x</strong> in a single year."
				</p>
				<div class="mt-8 flex items-center gap-4">
					<img
						src="/images/logos/mindlogic.webp"
						alt="MindLogic"
						class="h-12 w-12 rounded-full bg-blue-700 object-contain p-1"
					/>
					<div>
						<p class="text-base font-bold text-foreground">MindLogic</p>
						<p class="text-base text-foreground/60">AI Education Platform - 100+ universities</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<TrustedBy />

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 9. CLOSING CTA                                -->
	<!-- ═══════════════════════════════════════════════ -->
	<section
		class="relative overflow-hidden bg-foreground px-5 py-20 text-background md:px-10 md:py-32"
	>
		<div
			class="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
		></div>

		<div class="relative mx-auto max-w-4xl text-center">
			<h2
				class="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
			>
				Your own CRM and portal - built in weeks, not months.
			</h2>
			<p
				class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/70 md:mt-8 md:text-xl"
			>
				Book a free 30-minute call. We'll map your client workflow and show you exactly what your
				custom system would look like - no commitment.
			</p>
			<div class="mt-10 md:mt-12">
				<button
					onclick={openBooking}
					class="group inline-flex h-14 items-center gap-2 rounded-xl bg-primary px-9 text-base font-bold text-primary-foreground transition-all hover:brightness-110 md:h-16 md:px-11 md:text-lg"
				>
					Book a Free 30-Min Call
					<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
				</button>
			</div>
			<p class="mt-6 text-base text-background/40">No commitment. No pitch. Just honest answers.</p>
		</div>
	</section>
</main>
