<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SEO from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		Zap,
		GraduationCap,
		CreditCard,
		LayoutDashboard,
		CheckCircle2,
		Shield
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
	title="Automate Your Training Business - KooStory"
	description="Enrollments, payments, and student data scattered across tools? We build the system that connects it all automatically."
	keywords="education automation, training business tools, enrollment system, student management, course automation, bootcamp tools"
/>

<ReservationModal
	bind:open={reservationOpen}
	bind:workshopType={reservationType}
	segment="education"
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
					For Education & Training Businesses
				</span>
			</div>

			<h1
				class="mx-auto max-w-4xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
			>
				Student data in one app.
				<span class="text-primary">Payments in another.</span>
			</h1>

			<p
				class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 md:mt-10 md:text-xl"
			>
				We build custom tools for training businesses - enrollment systems, payment automation,
				student dashboards. So your team stops chasing data and starts focusing on students.
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
	<!-- 2. FOUNDER CREDIBILITY                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-20 md:px-10 md:pb-32">
		<div class="mx-auto max-w-4xl">
			<div
				class="flex flex-col items-center gap-8 rounded-2xl border border-primary/15 bg-primary/[0.03] p-8 md:flex-row md:gap-12 md:p-12"
			>
				<img
					src="/images/ilmo-koo.jpg"
					alt="Ilmo Koo, Founder"
					class="h-28 w-28 flex-shrink-0 rounded-full object-cover md:h-36 md:w-36"
				/>
				<div>
					<p class="text-xl font-bold text-foreground md:text-2xl">
						Requirements expert who lived it.
					</p>
					<p class="mt-3 text-lg leading-relaxed text-foreground/80">
						Our founder was CPO at Code States - South Korea's pioneer coding bootcamp. 9,000+
						graduates, 76% year-over-year growth, and 6 years of scaling enrollment, payment, and
						student ops from the inside. In the AI era, well-documented requirements are the
						difference between a project that ships in weeks and one that drags for months.
					</p>
					<div class="mt-5 flex flex-wrap gap-6">
						<div>
							<p class="text-2xl font-extrabold text-primary md:text-3xl">9,000+</p>
							<p class="text-sm text-foreground/60">graduates</p>
						</div>
						<div>
							<p class="text-2xl font-extrabold text-primary md:text-3xl">76%</p>
							<p class="text-sm text-foreground/60">YoY growth</p>
						</div>
						<div>
							<p class="text-2xl font-extrabold text-primary md:text-3xl">6 yrs</p>
							<p class="text-sm text-foreground/60">as CPO</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 2b. THE PROBLEM (blog images)                 -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 pb-16 md:px-10 md:pb-24">
		<div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
			<div class="flex flex-col overflow-hidden rounded-2xl border border-border">
				<img
					src="https://pub-caf0ad9bf20f4066a8f86c89d611ae69.r2.dev/blog/1791922163943-3d4526d8.png"
					alt="Sales, Ops, and Finance each holding different definitions of Active Client"
					class="h-56 w-full object-cover md:h-64"
				/>
				<p class="flex-1 px-5 py-4 text-base text-foreground/80">
					Every team defines "active student" differently. Enrollment, attendance, payment - three
					different answers.
				</p>
			</div>
			<div class="flex flex-col overflow-hidden rounded-2xl border border-border">
				<img
					src="https://pub-caf0ad9bf20f4066a8f86c89d611ae69.r2.dev/blog/1791921337614-e0542363.png"
					alt="Repeated attempts to fix data problems that keep coming back"
					class="h-56 w-full object-cover md:h-64"
				/>
				<p class="flex-1 px-5 py-4 text-base text-foreground/80">
					New dashboard, data cleanup, migration project - each fix works for a while, then the same
					problems return.
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 3. VISUAL BEFORE/AFTER                        -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="bg-muted/50 px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-5xl">
			<ChaosToSystem
				tools={['Enrollment', 'Payments', 'Student Data', 'LMS', 'Email', 'Calendar']}
				hubLabel="Data Hub"
				phased
				toolPhases={[1, 1, 1, 2, 2, 2]}
				toolReplaced={[false, false, true, false, false, false]}
				afterCaption="Step by step - important metrics first"
			/>
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
					<p class="text-7xl font-extrabold tracking-tight text-primary md:text-8xl">100+</p>
					<p class="mt-2 text-lg text-foreground/80">universities onboarded</p>
				</div>
				<div class="hidden h-20 w-px bg-border md:block"></div>
				<div>
					<p class="text-7xl font-extrabold tracking-tight text-foreground md:text-8xl">11x</p>
					<p class="mt-2 text-lg text-foreground/80">revenue growth in one year</p>
				</div>
			</div>

			<div
				class="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-background p-8 text-left md:p-10"
			>
				<p class="text-lg leading-relaxed text-foreground md:text-xl">
					"KooStory built 52 custom SSO integrations so every university could onboard with their
					own portal credentials. That foundation helped us scale from 28 to
					<strong>100+ universities and grow revenue 11x</strong> in a single year."
				</p>
				<div class="mt-6 flex items-center gap-4">
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

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 5. MID-PAGE CTA                               -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="bg-muted/50 px-5 py-16 md:px-10 md:py-24">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold tracking-tight md:text-4xl">
				Curious what we'd automate for you?
			</h2>
			<p class="mt-4 text-lg text-foreground/70 md:text-xl">
				We'll map your student lifecycle in 30 minutes and tell you exactly what we'd build.
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
	<!-- 6. WHAT WE BUILD                              -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-5xl">
			<div class="text-center">
				<p class="text-sm font-bold uppercase tracking-widest text-muted-foreground">
					What we build
				</p>
				<h2 class="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
					Custom tools for training businesses.
				</h2>
			</div>

			<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
				{#each [{ icon: GraduationCap, title: 'Enrollment Systems', desc: 'End-to-end enrollment flow: application, approval, payment, and access - all automated.' }, { icon: CreditCard, title: 'Payment Automation', desc: 'Recurring billing, installment plans, reminders, and receipts - handled by the system.' }, { icon: LayoutDashboard, title: 'Student Dashboards', desc: 'Live overview of cohorts, progress, payments, and engagement in one place.' }, { icon: Shield, title: 'SSO & Auth', desc: 'SAML, OIDC, and custom SSO integrations for enterprise and university clients.' }, { icon: Zap, title: 'Onboarding Flows', desc: 'Automated student onboarding: contracts, LMS access, welcome sequences - all handled.' }, { icon: CheckCircle2, title: 'Reporting & Exports', desc: 'Automated reports for compliance, funding, and stakeholder updates.' }] as card}
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
	<!-- 7. HOW IT WORKS                               -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-16 md:px-10 md:py-24">
		<div class="mx-auto max-w-4xl">
			<h2 class="text-2xl font-bold tracking-tight md:text-3xl">How it works</h2>
			<div class="mt-8 grid gap-6 sm:grid-cols-3">
				<div>
					<p class="text-base font-bold text-foreground">30-min call</p>
					<p class="mt-1 text-base text-foreground/80">
						We map how you manage enrollments, payments, and student data today. What's manual? What
						breaks?
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
	<!-- 8. SECOND TESTIMONIAL                         -->
	<!-- ═══════════════════════════════════════════════ -->
	<section class="px-5 py-20 md:px-10 md:py-32">
		<div class="mx-auto max-w-4xl">
			<div class="rounded-2xl border border-border bg-background p-8 md:p-12">
				<p class="text-xl leading-relaxed text-foreground md:text-2xl">
					"We needed an AI-powered landing page for apartment buyers and a payment system to handle
					transactions. KooStory built both - the AI interface and the full payment flow - so we
					could launch fast without hiring a separate dev team."
				</p>
				<div class="mt-8 flex items-center gap-4">
					<img
						src="/images/logos/verse144_logo.png"
						alt="Verse 144"
						class="h-12 w-12 rounded-full object-contain"
					/>
					<div>
						<p class="text-base font-bold text-foreground">Verse 144</p>
						<p class="text-base text-foreground/60">Real Estate & Event Management Platform</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<TrustedBy />

	<!-- ═══════════════════════════════════════════════ -->
	<!-- 10. CLOSING CTA                               -->
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
				Ready to stop chasing student data by hand?
			</h2>
			<p
				class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/70 md:mt-8 md:text-xl"
			>
				Book a free 30-minute call. We'll map your student lifecycle and tell you exactly what we'd
				automate - no commitment.
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
