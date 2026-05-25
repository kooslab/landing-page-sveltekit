<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
	import DiagnosisModal from './discovery/components/diagnosis-modal.svelte';
	import AiOsFlow from '$lib/components/sections/ai-os-flow.svelte';
	import EisenhowerMatrix from '$lib/components/sections/eisenhower-matrix.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	let diagnosisOpen = $state(false);
	let lang = $derived($page.params?.lang || 'en');
	let isKorean = $derived(lang === 'ko');

	function book() {
		diagnosisOpen = true;
	}

	$effect(() => {
		const handler = () => book();
		document.addEventListener('open-booking-modal', handler);
		return () => document.removeEventListener('open-booking-modal', handler);
	});
</script>

<SEO
	title={isKorean
		? 'KooStory — SME를 위한 AI 운영 파트너 | 베를린'
		: 'KooStory — AI Operations Partner for SMEs | Berlin'}
	description={isKorean
		? 'AI 자동화로 인력 충원 없이 비즈니스를 확장하세요. 베를린 기반 AI 운영 파트너.'
		: 'We identify the workflows costing you time and replace them with AI automations that run without you. Berlin-based AI operations partner.'}
	ogImage="/og-image-landing.png"
/>

<!-- ══════════════════════════════════════════ HERO ══ -->
<section class="relative px-6 md:px-12 lg:px-16">
	<div
		class="mx-auto grid min-h-[92vh] w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-8"
	>
		<div class="py-24 lg:py-0">
			<p class="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
				AI Operations Partner · Berlin
			</p>
			<h1
				class="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.92] tracking-tighter text-foreground"
			>
				We help your<br />business run<br />on AI —<br /><span class="text-brand-violet"
					>not just use it.</span
				>
			</h1>
			<p class="mt-10 max-w-lg text-xl leading-relaxed text-foreground/80">
				We identify the workflows bleeding your time and replace them with AI automations that run
				without you.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-5">
				<button
					onclick={book}
					class="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground"
				>
					Book a free Discovery
					<ArrowRight class="h-4 w-4" />
				</button>
				<a
					href="#how"
					class="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					See how it works ↓
				</a>
			</div>
		</div>

		<div class="flex items-center pb-12 pt-4 lg:py-6">
			<AiOsFlow />
		</div>
	</div>

	<div class="absolute bottom-10 left-1/2 -translate-x-1/2">
		<div class="h-12 w-px bg-gradient-to-b from-transparent to-border"></div>
	</div>
</section>

<!-- ══════════════════════════════════ 01 · THE PROBLEM ══ -->
<section id="how" class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
			<div>
				<p class="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
					01
				</p>
				<h2
					class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
				>
					Every problem<br />becomes a<br />hiring decision.
				</h2>
			</div>
			<div
				class="flex flex-col justify-center space-y-6 text-xl leading-relaxed text-foreground/80"
			>
				<p>
					Support volumes up? Hire support staff. New product line? Add a coordinator. Reports
					unclear? Get an analyst. For most SMEs, every operational problem turns into headcount.
				</p>
				<p>
					More people solve short-term problems and create long-term ones: onboarding time,
					coordination overhead, and work that depends on specific individuals instead of systems.
				</p>
				<p class="font-semibold text-foreground">
					A lot of that recurring work shouldn't need a human. It needs a well-built automation.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════ 02 · WHAT AIOS MEANS ══ -->
<section class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<p class="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">02</p>
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-20">
			<h2
				class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
			>
				Your AI<br />Operating<br />System
			</h2>
			<p class="flex items-center text-xl leading-relaxed text-foreground/80">
				Not a platform. Not a migration. A set of AI automations — purpose-built around your actual
				workflows — that handle the recurring work so your team can focus on what actually needs
				them.
			</p>
		</div>

		<div class="mt-16 grid border border-border md:grid-cols-3">
			<div class="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
				<p class="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-violet">
					Recurring Work
				</p>
				<h3 class="mb-3 font-display text-2xl font-bold text-foreground">Automated & running</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					The tasks your team does every week without thinking — email follow-ups, meeting
					summaries, report generation. Identified, automated, running 24/7.
				</p>
			</div>
			<div class="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
				<p class="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-violet">
					Your Data
				</p>
				<h3 class="mb-3 font-display text-2xl font-bold text-foreground">Connected & queryable</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					CRM, inbox, documents — not merged into one system, but wired together so the right
					information reaches the right person automatically.
				</p>
			</div>
			<div class="p-8 md:p-10">
				<p class="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-violet">
					Your Expertise
				</p>
				<h3 class="mb-3 font-display text-2xl font-bold text-foreground">Codified & accessible</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					The knowledge that lives in one person's head or one person's files — structured so it
					doesn't walk out the door when they do.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════ 03 · QUICK WINS FIRST (MATRIX) ══ -->
<section class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<p class="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">03</p>
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
			<div>
				<h2
					class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
				>
					We find your<br />Quick Wins<br />first.
				</h2>
				<p class="mt-8 text-xl leading-relaxed text-foreground/80">
					Every business has 3–5 workflows that cost hours every week and are straightforward to
					automate. Those are the ones worth starting with — not the complex migration, not the full
					platform.
				</p>
				<p class="mt-5 text-xl leading-relaxed text-foreground/80">
					We map your recurring work against two axes: how much time it costs you, and how hard it
					is to automate. The top-left is where we start.
				</p>
			</div>
			<div class="flex items-center">
				<EisenhowerMatrix />
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════ 04 · HOW WE WORK ══ -->
<section class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<p class="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">04</p>
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
			<h2
				class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
			>
				Problem first.<br />Always.
			</h2>
			<div class="flex flex-col justify-center">
				<p class="text-xl leading-relaxed text-foreground/80">
					We never start with a tool. We start with: <span class="font-semibold text-foreground"
						>what is the actual workflow costing you time or money right now?</span
					>
				</p>
				<p class="mt-5 text-xl leading-relaxed text-foreground/80">
					Most AI projects fail because they start with the technology. Ours succeed because we
					start with your operation — then build only what earns its keep.
				</p>
			</div>
		</div>

		<div class="mt-16 grid border border-border md:grid-cols-3">
			<div class="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
				<p class="mb-5 font-display text-5xl font-black text-muted-foreground/40">01</p>
				<h3 class="mb-3 font-display text-xl font-bold text-foreground">Diagnose</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					We map your workflows, time the bottlenecks, and identify exactly where automation creates
					real leverage — not where it looks impressive on a slide.
				</p>
			</div>
			<div class="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
				<p class="mb-5 font-display text-5xl font-black text-muted-foreground/40">02</p>
				<h3 class="mb-3 font-display text-xl font-bold text-foreground">Prioritise</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					We rank every opportunity by impact versus effort. You get a clear build order — start
					with Quick Wins, plan the bigger bets, skip The Trap entirely.
				</p>
			</div>
			<div class="p-8 md:p-10">
				<p class="mb-5 font-display text-5xl font-black text-muted-foreground/40">03</p>
				<h3 class="mb-3 font-display text-xl font-bold text-foreground">Build</h3>
				<p class="text-base leading-relaxed text-foreground/70">
					We build it together or we build it for you. Either way, you end up with a working
					automation — not a strategy document.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════ 05 · TWO PATHS ══ -->
<section class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<p class="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">05</p>
		<h2
			class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
		>
			Two ways to<br />work with us
		</h2>
		<div class="mt-16 grid gap-4 md:grid-cols-2">
			<div class="border border-border p-8 md:p-12">
				<p class="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-violet">
					Guided
				</p>
				<h3 class="mb-5 font-display text-3xl font-bold text-foreground">
					You build it.<br />We guide you.
				</h3>
				<p class="text-lg leading-relaxed text-foreground/70">
					Your team, your problem, our facilitation. We run hands-on sessions — you leave with a
					working automation and the understanding to keep building.
				</p>
				<p class="mt-4 text-base text-foreground/50">
					Best for: teams who want to own their AI OS from day one.
				</p>
			</div>
			<div class="border border-border bg-foreground p-8 text-background md:p-12">
				<p class="mb-6 text-xs font-semibold uppercase tracking-[0.3em] opacity-50">Managed</p>
				<h3 class="mb-5 font-display text-3xl font-bold">We build it.<br />You run it.</h3>
				<p class="text-lg leading-relaxed opacity-70">
					You bring the problem. We design and build the automation end-to-end — and hand it over
					ready to run. No technical overhead on your side.
				</p>
				<p class="mt-4 text-base opacity-50">
					Best for: owners who want results without the implementation work.
				</p>
			</div>
		</div>
		<p class="mt-6 text-base font-semibold text-brand-violet">
			Either way — it starts with the problem, never the tool.
		</p>
	</div>
</section>

<!-- ══════════════════════════════════════ CTA ══ -->
<section class="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:py-36">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
			<div>
				<h2
					class="font-display text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-6xl"
				>
					Find out what's<br />worth automating<br />in your business.
				</h2>
			</div>
			<div class="flex flex-col justify-center space-y-6">
				<p class="text-xl leading-relaxed text-foreground/80">
					Start with a free 45-min Discovery. We map your recurring work, run the impact/effort
					analysis, and tell you exactly what to build first — and what to skip.
				</p>
				<p class="text-base text-foreground/50">No pitch. No commitment. Just clarity.</p>
				<div>
					<button
						onclick={book}
						class="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground"
					>
						Book a free Discovery
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<DiagnosisModal bind:open={diagnosisOpen} />
