<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ChevronRight, ArrowRight } from 'lucide-svelte';

	type Case = {
		industry: string;
		client: string;
		label: string;
		pain: string;
		did: string;
		result: string;
		features: string[];
	};

	const cases: Record<string, Case> = {
		safety: {
			industry: 'Safety Compliance',
			client: 'SafetyOn Solutions',
			label: 'Software Requirements',
			pain: "Had deep domain expertise in safety solutions but no idea how to turn it into a software product. Didn't know what to ask for or how to brief developers.",
			did: "Ran requirements workshops, wrote detailed user stories, created wireframes and process maps. Discovered features and pages the client hadn't even considered.",
			result:
				'<strong>Result:</strong> Client got a clear development roadmap and requirements document. Successfully outsourced development to an agency with zero confusion.',
			features: ['Requirements Workshop', 'User Stories', 'Wireframes', 'Process Mapping']
		},
		onui: {
			industry: 'Customer Relationship Management',
			client: 'Onui',
			label: 'CRM Software Requirements',
			pain: "Needed a custom CRM but couldn't articulate what they needed. Previous attempts with dev agencies failed because requirements were unclear.",
			did: 'Consulted on the full CRM requirements — workflows, data models, user stories. Created a comprehensive requirements document.',
			result:
				'<strong>Result:</strong> Successfully outsourced to a dev agency with a clear brief. No back-and-forth, no scope creep.',
			features: ['Requirements Doc', 'Data Modeling', 'Workflow Design', 'User Stories']
		},
		mindlogic: {
			industry: 'AI / EdTech',
			client: 'MindLogic',
			label: 'SSO Integration Requirements',
			pain: "Their AI product (FactChat, similar to ChatGPT) needed to integrate with each university's own authentication system (SSO). Every university had a different login system.",
			did: 'Created an improved client requirements questionnaire that standardized the information gathering across universities.',
			result:
				'<strong>Result:</strong> Made the SSO integration project <strong>50% faster</strong> by eliminating back-and-forth communication. One questionnaire, clear answers, straight to implementation.',
			features: ['SSO Integration', 'Requirements Template', 'Process Standardization']
		},
		finnest: {
			industry: 'Finance Outsourcing',
			client: 'Finnest.ai',
			label: 'Finance Automation',
			pain: '100% of financial data lived in Excel spreadsheets with complicated formulas. People edited and broke formulas. Hard to operate, hard to scale. Getting data from banks and card companies was manual.',
			did: 'Built automated data extraction/scraping that runs every 24 hours, pulling data from banks and card systems. Integrated the extracted data into live operational spreadsheets with their existing complex formulas. Used n8n for workflow automation.',
			result:
				'<strong>Result:</strong> Eliminated daily manual data entry. Financial operations run automatically with reliable data.',
			features: ['Web Scraping', 'Data Extraction', 'n8n Automation', 'Spreadsheet Integration']
		},
		workspace: {
			industry: 'Shared Office / Co-working',
			client: 'MY WORKSPACE',
			label: 'Shared Office Operations',
			pain: 'Shared office in Seoul managed all contracts and payments the traditional way — manual spreadsheet work for everything.',
			did: 'Built custom subscription payment and contract management software with e-signature for online contract signing.',
			result:
				'<strong>Result:</strong> <strong>90% of manual operations eliminated.</strong> Contracts, billing, and payments now automated.',
			features: ['Subscription Payments', 'E-Signature', 'Contract Management']
		},
		grocery: {
			industry: 'Retail / Logistics',
			client: 'Grocery Delivery Kiosk',
			label: 'Delivery Kiosk',
			pain: 'At a major grocery department in Seoul, customers wrote their delivery addresses by hand. Slow process (60–100 seconds per order), required a dedicated staff member.',
			did: 'Built a touch-based kiosk connected to a logistics API with a favorite address feature. Customers enter their mobile number, load their saved address, and complete the order.',
			result:
				'<strong>Result:</strong> Order time dropped from 60–100 seconds to <strong>10 seconds</strong>. Eliminated one full-time hire — customers now self-serve.',
			features: ['Touch Kiosk UI', 'Logistics API', 'Mobile Lookup', 'Self-Service']
		},
		tour: {
			industry: 'Travel / Tourism',
			client: 'Private Tour Platform',
			label: 'Tour Booking Platform',
			pain: 'Tour guides in Berlin and across Europe managed private tours completely by hand — bookings, payments, communication, everything manual.',
			did: 'Built a platform where tour guides upload their tour products online. Travelers can browse, pay, and reserve online, with automatic messenger notifications.',
			result:
				'<strong>Result:</strong> Tour guides went from manual operations to an automated booking and payment system.',
			features: [
				'Online Booking',
				'Payment Integration',
				'Messenger Notifications',
				'Guide Marketplace'
			]
		},
		parking: {
			industry: 'Property Management',
			client: 'AI Parking Management',
			label: 'LPR Integration',
			pain: 'Client wanted a CCTV-based AI parking management system but needed License Plate Recognition integrated into their existing cloud-based parking software.',
			did: 'Integrated a License Plate Recognition (LPR) module into their cloud-based parking management software.',
			result:
				'<strong>Result:</strong> Automated vehicle identification and parking management through CCTV.',
			features: ['License Plate Recognition', 'CCTV AI', 'Cloud Integration']
		}
	};

	const products = [
		{
			key: 'billsplit',
			href: 'https://n.koostory.net',
			title: 'N — Bill Split',
			description: 'Group expense splitting app. Scan receipts, split by item, send payment links.'
		},
		{
			key: 'blitzdoc',
			href: 'https://req.koostory.net',
			title: 'Blitzdoc',
			description:
				'Software requirements management tool. User story-based with AI generation. Define, organize, and track requirements.'
		},
		{
			key: 'quote',
			href: 'https://quote.koostory.net',
			title: 'Quote',
			description: 'Quotation, invoice, and timesheet management for freelancers and agencies.'
		},
		{
			key: 'equest',
			href: 'https://equest.koostory.net',
			title: 'eQuest',
			description:
				'Interactive questionnaire & communication tool for freelancers, consultants, salespeople, and agencies. Replace back-and-forth emails with structured data collection.'
		}
	];

	const groupA = ['safety', 'onui', 'mindlogic'] as const;
	const groupB = ['finnest', 'workspace', 'grocery', 'tour', 'parking'] as const;

	let selectedCase = $state<string | null>(null);
	let dialogOpen = $state(false);

	function openCase(key: string) {
		selectedCase = key;
		dialogOpen = true;
	}
</script>

<SEO
	title="Use Cases — KooStory"
	description="Real problems solved by KooStory. Requirements consulting, process automation, and custom software development."
	ogImage="/og-image-landing.png"
/>

<main class="w-full">
	<div class="mx-auto max-w-3xl px-4">
		<!-- HERO -->
		<section class="pb-20 pt-28 md:pb-28 md:pt-36">
			<p class="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				Use Cases
			</p>
			<h1 class="text-3xl font-bold leading-[1.25] tracking-tight md:text-4xl lg:text-5xl">
				Real Problems We've Solved
			</h1>
			<p class="mt-6 max-w-xl text-lg leading-relaxed">
				Every project below started with a business problem, not a feature request. Here's what the
				customer was struggling with, what we did, and what changed.
			</p>
		</section>

		<!-- CASES -->
		<section class="pb-20 md:pb-28">
			<div class="space-y-16">
				<!-- Group A -->
				<div>
					<h2 class="mb-1 text-xl font-bold tracking-tight">
						We defined it — so the client could build it right
					</h2>
					<p class="mb-8 text-base">
						Requirements consulting projects where we created the requirements document, and the
						client used it to successfully outsource to a dev agency.
					</p>
					<div class="divide-y divide-border">
						{#each groupA as key}
							<button
								class="group flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary"
								onclick={() => openCase(key)}
							>
								<div class="min-w-0 flex-1">
									<div class="mb-1.5 flex flex-wrap items-center gap-2">
										<span class="text-base font-semibold">{cases[key].client}</span>
										<span
											class="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
										>
											{cases[key].label}
										</span>
									</div>
									<p class="line-clamp-2 text-base">{cases[key].pain}</p>
								</div>
								<ChevronRight
									class="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
								/>
							</button>
						{/each}
					</div>
				</div>

				<!-- Group B -->
				<div>
					<h2 class="mb-1 text-xl font-bold tracking-tight">We built it</h2>
					<p class="mb-8 text-base">End-to-end projects where we defined AND built the solution.</p>
					<div class="divide-y divide-border">
						{#each groupB as key}
							<button
								class="group flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary"
								onclick={() => openCase(key)}
							>
								<div class="min-w-0 flex-1">
									<div class="mb-1.5 flex flex-wrap items-center gap-2">
										<span class="text-base font-semibold">{cases[key].client}</span>
										<span
											class="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
										>
											{cases[key].label}
										</span>
									</div>
									<p class="line-clamp-2 text-base">{cases[key].pain}</p>
								</div>
								<ChevronRight
									class="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
								/>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- OUR PRODUCTS -->
		<section class="pb-24 md:pb-32">
			<p class="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
				Products We Built & Run
			</p>
			<p class="mb-10 text-lg leading-relaxed">
				We don't just build for clients — we build and operate our own products. These are live,
				used by real people every day.
			</p>
			<div class="grid gap-5 sm:grid-cols-2">
				{#each products as product}
					<a
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						class="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
					>
						<div class="mb-2 flex items-center justify-between">
							<h4 class="text-base font-semibold">{product.title}</h4>
							<ArrowRight
								class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
							/>
						</div>
						<p class="text-base leading-relaxed">{product.description}</p>
					</a>
				{/each}
			</div>
		</section>
	</div>
</main>

<!-- Case Detail Modal -->
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="max-w-xl">
		{#if selectedCase}
			<Dialog.Header>
				<Dialog.Title class="text-xl">
					{cases[selectedCase].client}
				</Dialog.Title>
				<Dialog.Description>
					{cases[selectedCase].industry} · {cases[selectedCase].label}
				</Dialog.Description>
			</Dialog.Header>

			<div class="mt-2 space-y-5">
				<div>
					<p class="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Problem
					</p>
					<p class="text-base leading-relaxed">{cases[selectedCase].pain}</p>
				</div>

				<div>
					<p class="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						What We Did
					</p>
					<p class="text-base leading-relaxed">{cases[selectedCase].did}</p>
				</div>

				<div class="rounded-lg bg-muted/50 p-4">
					<p class="text-base font-medium leading-relaxed">
						{@html cases[selectedCase].result}
					</p>
				</div>

				<div class="flex flex-wrap gap-2 pt-1">
					{#each cases[selectedCase].features as feature}
						<span class="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium">
							{feature}
						</span>
					{/each}
				</div>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
