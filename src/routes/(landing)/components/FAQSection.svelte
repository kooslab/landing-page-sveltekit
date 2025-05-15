<script lang="ts">
	import { Accordion } from 'bits-ui'; // Correct import for bits-ui
	// You might need an icon for the trigger, e.g., from lucide-svelte or phosphor-svelte if desired
	// import CaretDown from "phosphor-svelte/lib/CaretDown"; // Example if you add an icon

	const faqs = [
		{
			value: 'faq-1', // bits-ui Accordion.Item typically uses a unique value prop
			question: 'What is this Requirements Management System?',
			answer:
				"It's a platform designed to help you create, track, and manage software requirements efficiently, from user stories and epics to detailed acceptance criteria, with AI-powered assistance."
		},
		{
			value: 'faq-2',
			question: 'Who is this tool for?',
			answer:
				"It's ideal for product managers, project managers, business analysts, development teams, and anyone involved in defining and managing software project scope. If you're spending too much time on requirement documentation, this tool is for you!"
		},
		{
			value: 'faq-3',
			question: 'How does the AI assistant help?',
			answer:
				'The AI assistant can help you generate user stories, break down complex requirements into manageable tasks, identify potential redundancies, and ensure your requirements are well-defined and MECE (Mutually Exclusive, Collectively Exhaustive).'
		},
		{
			value: 'faq-4',
			question: 'Can I import my existing requirements?',
			answer:
				'We are actively working on import features. For now, you can easily copy and paste your existing requirements into the system. Stay tuned for updates!'
		},
		{
			value: 'faq-5',
			question: 'Is there a free trial or a free plan?',
			answer:
				'Yes! You can sign up for our Free plan to explore the core features and get a feel for the platform. The Free plan includes 5 AI uses per day.'
		},
		{
			value: 'faq-6',
			question: 'How secure is my data?',
			answer:
				'We take data security very seriously. All data is encrypted in transit and at rest. We follow industry best practices to ensure your project information is safe and secure.'
		},
		{
			value: 'faq-7',
			question: 'What kind of support do you offer?',
			answer:
				'We offer email support for all users. Pro plan users receive priority support and access to dedicated support channels. We also have a comprehensive knowledge base and community forum.'
		}
	];
</script>

<section id="faq" class="bg-gray-50 py-16 dark:bg-gray-800 md:py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
					Frequently Asked Questions
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
					Find answers to common questions about our platform and services.
				</p>
			</div>

			<Accordion.Root class="w-full" type="single" collapsible>
				{#each faqs as faq (faq.value)}
					<Accordion.Item value={faq.value} class="border-b border-gray-200 dark:border-gray-700">
						<Accordion.Header class="w-full">
							<Accordion.Trigger
								class="flex w-full items-center justify-between py-4 text-left text-lg font-medium hover:no-underline"
							>
								<span>{faq.question}</span>
								<!-- Basic text-based indicator, replace with an icon if desired -->
								<span class="transition-transform duration-200 data-[state=open]:rotate-180">
									▼
								</span>
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content
							class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-base text-gray-700 dark:text-gray-300"
						>
							<div class="pb-4 pt-2">
								{faq.answer}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</div>
</section>
