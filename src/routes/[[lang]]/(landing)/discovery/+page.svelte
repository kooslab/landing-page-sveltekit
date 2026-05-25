<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import DiagnosisModal from './components/diagnosis-modal.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let modalOpen = $state(false);

	function book() {
		modalOpen = true;
	}
</script>

<SEO
	title="AI OS Discovery — KooStory Berlin"
	description="Free 45-min diagnostic. We map your recurring workflows, find your Quick Wins, and give you a prioritised build order — whether you work with us after or not."
	ogImage="/og-image-landing.png"
/>

<DiagnosisModal bind:open={modalOpen} />

<!-- ══════════════════════════════════════════ HERO ══ -->
<section class="px-6 md:px-12 lg:px-16">
	<div
		class="mx-auto grid min-h-[92vh] w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
	>
		<!-- Left: value prop -->
		<div class="py-24 lg:py-0">
			<p class="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
				Free · 45 min · Video call
			</p>
			<h1
				class="font-display text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.92] tracking-tighter text-foreground"
			>
				Find out what's<br />worth automating<br />in your business.
			</h1>
			<p class="mt-10 max-w-lg text-xl leading-relaxed text-foreground/80">
				We map your recurring work, run the impact/effort analysis, and give you a clear build order
				— whether you work with us after or not.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-5">
				<button
					onclick={book}
					class="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground"
				>
					Book a free Discovery
					<ArrowRight class="h-4 w-4" />
				</button>
				<p class="text-base text-muted-foreground">No pitch. No commitment.</p>
			</div>
		</div>

		<!-- Right: what you get card -->
		<div class="pb-12 lg:py-0">
			<div class="border border-border p-8 md:p-10">
				<p class="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
					What you walk away with
				</p>
				<div class="space-y-5">
					{#each [{ title: 'Impact/effort map', desc: 'Your top workflows plotted by time cost vs. automation complexity.' }, { title: 'Prioritised build order', desc: 'Quick Wins first. What to plan. What to skip entirely.' }, { title: 'Honest "don\'t build" list', desc: "We tell you what's not worth automating — most consultants won't." }, { title: 'Yours to keep', desc: 'No commitment required. Take the map and do whatever you want with it.' }] as item}
						<div class="flex items-start gap-4">
							<ArrowRight class="mt-1 h-4 w-4 flex-shrink-0 text-brand-violet" />
							<div>
								<p class="font-semibold text-foreground">{item.title}</p>
								<p class="mt-0.5 text-sm leading-relaxed text-foreground/70">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="my-7 border-t border-border"></div>

				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
					Good fit if you —
				</p>
				<div class="space-y-2">
					{#each ['Run or manage a small business and ops work is eating your week', "Know something should be automated but don't know where to start", 'Want a clear answer, not a project that grows into months'] as item}
						<div class="flex items-start gap-3">
							<span class="mt-0.5 text-brand-violet">—</span>
							<p class="text-sm leading-relaxed text-foreground/80">{item}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════ FAQ ══ -->
<section class="border-t border-border px-6 py-16 md:px-12 md:py-20">
	<div class="mx-auto max-w-6xl">
		<p class="mb-10 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
			Common questions
		</p>
		<dl class="grid gap-x-16 gap-y-8 md:grid-cols-2">
			<div>
				<dt class="font-semibold text-foreground">How long is the session?</dt>
				<dd class="mt-2 text-base leading-relaxed text-foreground/70">
					45 minutes over video call. No prep needed — just show up with one or two workflows on
					your mind.
				</dd>
			</div>
			<div>
				<dt class="font-semibold text-foreground">Is it really free?</dt>
				<dd class="mt-2 text-base leading-relaxed text-foreground/70">
					Yes, free until July 31, 2026. After that it becomes a paid audit. Book now to lock in the
					free slot.
				</dd>
			</div>
			<div>
				<dt class="font-semibold text-foreground">What if I don't want to work with you after?</dt>
				<dd class="mt-2 text-base leading-relaxed text-foreground/70">
					The map and build order are yours to keep, no strings. We'd rather give you useful clarity
					than a sales pitch.
				</dd>
			</div>
			<div>
				<dt class="font-semibold text-foreground">Do I need to be technical?</dt>
				<dd class="mt-2 text-base leading-relaxed text-foreground/70">
					No. We work with operators, owners, and managers — not engineers. If you know where time
					is being wasted, that's all we need.
				</dd>
			</div>
		</dl>
	</div>
</section>

<!-- ══════════════════════════════════════════ CTA ══ -->
<section class="border-t border-border px-6 py-12 md:px-12 md:py-16">
	<div class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<h2
			class="font-display text-3xl font-black leading-tight tracking-tighter text-foreground md:text-4xl"
		>
			Ready to find your Quick Wins?
		</h2>
		<button
			onclick={book}
			class="inline-flex flex-shrink-0 items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-transparent hover:text-foreground"
		>
			Book a free Discovery
			<ArrowRight class="h-4 w-4" />
		</button>
	</div>
</section>
