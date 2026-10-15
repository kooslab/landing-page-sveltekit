<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const sectionKeys = [
		'controller',
		'whatWeCollect',
		'retention',
		'thirdParties',
		'rights',
		'changes'
	] as const;

	const sections: Record<string, { heading: string; body: string }> = {
		controller: {
			heading: '1. Data Controller',
			body: 'Koostory UG (haftungsbeschränkt)\nAkazienstraße 3a, 10827 Berlin, Germany\nEmail: ilmokoo@koostory.net'
		},
		whatWeCollect: {
			heading: '2. What We Collect and Why',
			body: 'We collect personal data only when you actively provide it:\n\n• Contact form: name, email, message — to respond to your inquiry (Art. 6(1)(b) GDPR, pre-contractual measures).\n• Workshop reservation: name, email, message, preferred dates — to manage your booking (Art. 6(1)(b) GDPR).\n• Sample report request: email address — to send you the document and follow up about our services, based on your explicit consent (Art. 6(1)(a) GDPR).\n\nWe do not use tracking or analytics cookies. Only technically necessary session cookies are set for authentication.'
		},
		retention: {
			heading: '3. Data Retention',
			body: 'We retain your data only as long as necessary: contact and reservation data for up to 24 months for business follow-up and legal compliance. You may request earlier deletion at any time.'
		},
		thirdParties: {
			heading: '4. Third-Party Processors',
			body: '• Vercel Inc. (hosting, USA) — EU-region servers where possible\n• Resend Inc. (transactional email, USA) — processes email delivery\n• Neon Inc. (database, USA) — encrypted data at rest\n\nAll processors are bound by data processing agreements. Transfers outside the EU are covered under the EU–US Data Privacy Framework or Standard Contractual Clauses.'
		},
		rights: {
			heading: '5. Your Rights',
			body: 'Under the GDPR you have the right to access (Art. 15), rectify (Art. 16), erase (Art. 17), restrict (Art. 18), and port (Art. 20) your data, and to object to processing (Art. 21). You may also withdraw consent at any time without affecting prior processing.\n\nTo exercise any right, email ilmokoo@koostory.net. You also have the right to lodge a complaint with a supervisory authority — in Germany: Berliner Beauftragte für Datenschutz und Informationsfreiheit (www.datenschutz-berlin.de).'
		},
		changes: {
			heading: '6. Changes to This Policy',
			body: 'We may update this policy to reflect changes in our practices or applicable law. The date at the top of this page will be updated accordingly.'
		}
	};
</script>

<SEO title="Privacy Policy — KooStory" description="How KooStory collects, uses, and protects your personal data under the GDPR." />

<main class="w-full">
	<div class="container max-w-[720px] py-16 md:py-24">
		<div class="mb-2 text-sm text-foreground/50">Last updated: April 2026</div>
		<h1 class="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Privacy Policy</h1>
		<p class="mb-12 text-foreground/70 md:text-lg">Koostory UG (haftungsbeschränkt), Akazienstraße 3a, 10827 Berlin, Germany ('KooStory', 'we', 'us') operates koostory.net. This policy explains what personal data we collect, why, and your rights under the GDPR.</p>

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
