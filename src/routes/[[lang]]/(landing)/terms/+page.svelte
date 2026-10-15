<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const sectionKeys = ['services', 'workshops', 'liability', 'ip', 'law', 'contact'] as const;

	const sections: Record<string, { heading: string; body: string }> = {
		services: {
			heading: '1. Services',
			body: 'KooStory provides software consulting, requirements workshops, and related digital services. Specific deliverables, scope, and pricing are agreed upon in individual contracts or workshop bookings.'
		},
		workshops: {
			heading: '2. Workshop Reservations',
			body: 'Submitting a reservation form is a request, not a binding contract. A booking is confirmed only upon written confirmation from KooStory. Paid workshops require payment before the session unless otherwise agreed in writing. Cancellations with less than 48 hours notice may incur a cancellation fee of 50% of the session price.'
		},
		liability: {
			heading: '3. Limitation of Liability',
			body: "To the extent permitted by German law, KooStory's liability is limited to cases of intent and gross negligence. We are not liable for indirect, consequential, or incidental damages. Our total liability for any claim shall not exceed the amount paid for the relevant service."
		},
		ip: {
			heading: '4. Intellectual Property',
			body: 'Deliverables produced under a paid engagement transfer to the client upon full payment, unless otherwise specified in writing. Website content, templates, and tools created by KooStory remain our intellectual property unless explicitly transferred.'
		},
		law: {
			heading: '5. Governing Law',
			body: 'These terms are governed by German law. Any disputes shall be subject to the exclusive jurisdiction of the courts of Berlin, Germany, to the extent permitted by applicable law.'
		},
		contact: {
			heading: '6. Contact',
			body: 'Koostory UG (haftungsbeschränkt)\nAkazienstraße 3a, 10827 Berlin, Germany\nEmail: ilmokoo@koostory.net'
		}
	};
</script>

<SEO title="Terms of Service — KooStory" description="Terms and conditions for using KooStory services and website." />

<main class="w-full">
	<div class="container max-w-[720px] py-16 md:py-24">
		<div class="mb-2 text-sm text-foreground/50">Last updated: April 2026</div>
		<h1 class="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Terms of Service</h1>
		<p class="mb-12 text-foreground/70 md:text-lg">These terms govern your use of koostory.net and any services provided by Koostory UG (haftungsbeschränkt) ('KooStory'). By using this website or submitting a form, you agree to these terms.</p>

		<div class="space-y-10">
			{#each sectionKeys as key}
				<section>
					<h2 class="mb-3 text-xl font-semibold">{sections[key].heading}</h2>
					<p class="whitespace-pre-line leading-relaxed text-foreground/70">
						{sections[key].body}
					</p>
				</section>
			{/each}
		</div>

		<div class="mt-16 border-t pt-8">
			<a
				href="/"
				class="text-sm text-foreground/50 transition-colors hover:text-foreground/70"
			>
				← Back to home
			</a>
		</div>
	</div>
</main>
