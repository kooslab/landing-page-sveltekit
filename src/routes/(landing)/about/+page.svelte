<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="About — KooStory"
	description="KooStory is a Berlin-based AI operations agency. We help SMEs scale without headcount — through workshops or custom AI systems."
	ogImage="/og?title=About+KooStory&subtitle=AI+Operations+Partner+%7C+Berlin"
/>

<main class="w-full">
	<div class="mx-auto max-w-3xl px-4">
		<!-- HERO -->
		<section class="pb-20 pt-28 md:pb-28 md:pt-36">
			<p class="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">About</p>
			<h1 class="text-3xl font-bold leading-[1.25] tracking-tight md:text-4xl lg:text-5xl">
				We are the AI operations partner for SMEs.
			</h1>
			<p class="mt-6 text-xl leading-relaxed md:text-2xl">
				Every SME should have access to the same operational leverage that enterprise companies get
				from large teams. AI is that lever.
			</p>
		</section>

		<!-- MISSION -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				Our mission
			</p>
			<div class="space-y-5 text-xl leading-relaxed">
				<p>
					We help growing businesses do more with the team they already have. Not by adding tools —
					by embedding AI into how they actually operate. So the work gets done, without the
					headcount.
				</p>
				<p>
					More people bring more complexity. More coordination, more miscommunication, more things
					that can go wrong. The businesses that scale well aren't the ones that hired fastest —
					they're the ones that built smarter operations.
				</p>
				<p class="font-bold">That's what we do.</p>
			</div>
		</section>

		<!-- WHAT WE DON'T DO -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				What we don't do
			</p>
			<div class="space-y-5 text-xl leading-relaxed">
				<p>We don't run generic AI training.</p>
				<p>We don't demo tools disconnected from your business.</p>
				<p>We don't start with a solution and work backwards.</p>
				<p class="font-bold">
					Every engagement starts with: what is the actual problem costing you time or money right
					now?
				</p>
			</div>
		</section>

		<!-- BEHIND THE COMPANY -->
		<section class="pb-20 md:pb-28">
			<p class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				Behind the company
			</p>
			<div class="space-y-8">
				<p class="text-xl leading-relaxed">
					KooStory was founded by Ilmo Koo — someone who has built companies from scratch, scaled
					operations under pressure, and written the code to fix what kept breaking.
				</p>

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
							<span class="text-2xl font-bold tabular-nums">5</span>
							<span class="ml-1.5 text-base text-muted-foreground">people at founding</span>
						</div>
						<div class="text-right">
							<span class="text-2xl font-bold tabular-nums">270</span>
							<span class="ml-1.5 text-base text-muted-foreground">employees at peak</span>
						</div>
					</div>
				</div>

				<div class="space-y-5 text-xl leading-relaxed">
					<p>
						As a co-founder, he grew a company from 5 people to 270. It was operations-heavy from
						day one — and every scaling problem came with the same default answer: hire more people.
						Sometimes it worked. But often, 1+1 wasn't 2. Sometimes not even 1.5. Occasionally,
						adding someone made things slower.
					</p>
					<p>
						The hard lesson: hiring without an operational foundation doesn't compound. It's like
						building a sand castle — each wave of growth erodes what you built before.
					</p>
				</div>
			</div>
		</section>
	</div>
</main>
