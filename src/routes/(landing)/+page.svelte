<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import {
		CheckIcon,
		ArrowRight,
		ClipboardCheck,
		Users2,
		FileWarning,
		Bolt,
		Link2Icon,
		FileCheck,
		CodeIcon,
		CalendarIcon,
		Pencil,
		FileText,
		Hash,
		Bell,
		MessageSquare,
		History,
		ThumbsUp,
		Paperclip,
		Smile
	} from 'lucide-svelte';
	import ThemeToggle from '$lib/components/theme-controller/theme-toggle.svelte';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import RequirementsPreview from '$lib/components/ui/requirements-preview.svelte';
	import { browser } from '$app/environment';
	import TestimonialCarousel from '$lib/components/ui/testimonial-carousel.svelte';
	import { testimonials } from '$lib/data/testimonials';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	let formData = $state({
		name: '',
		email: '',
		phone: '',
		projectOutline: '',
		privacyConsent: false,
		marketingConsent: false,
		website: ''
	});

	let isSubmitting = $state(false);
	let submitError = $state('');
	let submitSuccess = $state(false);
	let currentExampleIndex = $state(0);

	// Custom demo toast notification
	let toast = $state({
		show: false,
		message: '',
		timeout: null as number | null
	});

	function showToast(message: string) {
		// Clear any existing timeout
		if (toast.timeout) clearTimeout(toast.timeout);

		// Show the toast with the message
		toast.message = message;
		toast.show = true;

		// Set a timeout to hide the toast after 3 seconds
		toast.timeout = setTimeout(() => {
			toast.show = false;
		}, 3000) as unknown as number;
	}

	function demoClick(featureName: string = 'This feature') {
		showToast(`${featureName} is just a demo and not functional`);
		return false;
	}

	// Examples of detailed requirements with acceptance criteria
	const exampleRequirements = [
		{
			id: 'USR-042',
			title: 'User Authentication System',
			user: 'Security Engineer',
			priority: 'High',
			status: 'In Progress',
			badgeVariant: 'destructive' as const,
			story:
				'As a security engineer, I want to implement a secure authentication system that supports multi-factor authentication to protect user accounts.',
			description:
				'The authentication system is a critical security component that will protect user accounts and sensitive data within the application. It must follow industry best practices for security.',
			acceptanceCriteria: [
				{
					id: 'AC-1',
					title: 'Password Requirements',
					content:
						'- Passwords must be at least 10 characters long\n- Must contain at least one uppercase letter\n- Must contain at least one lowercase letter\n- Must contain at least one number\n- Must contain at least one special character\n- Cannot be one of the last 5 passwords used'
				},
				{
					id: 'AC-2',
					title: 'Multi-Factor Authentication',
					content:
						'- System must support SMS-based verification codes\n- System must support authentication apps (Google Authenticator, Authy)\n- System must support hardware security keys (YubiKey)\n- Users must be able to enable/disable MFA from account settings\n- Backup recovery codes must be provided when MFA is enabled'
				},
				{
					id: 'AC-3',
					title: 'Login Attempt Security',
					content:
						'- Account should lock after 5 failed login attempts\n- Time-based escalating lockout periods (1min, 5min, 30min, 24hrs)\n- Email notifications must be sent on suspicious login attempts\n- IP address and device information should be logged for each login attempt'
				},
				{
					id: 'AC-4',
					title: 'Session Management',
					content:
						'- Sessions must timeout after 30 minutes of inactivity\n- Users must be able to view and terminate active sessions\n- Remember me option extends session lifetime to 30 days\n- Sessions must be invalidated when a user changes their password'
				}
			],
			relatedRequirements: ['USR-046', 'SEC-018', 'API-023'],
			assignedTo: 'Jane Smith',
			created: '2023-06-15',
			updated: '2023-07-02'
		},
		{
			id: 'PAY-031',
			title: 'Payment Processing Integration',
			user: 'Financial Analyst',
			priority: 'High',
			status: 'Approved',
			badgeVariant: 'destructive' as const,
			story:
				'As a financial analyst, I want to integrate with multiple payment processors to provide flexible payment options to customers.',
			description:
				'The payment system needs to support various payment methods and processors while maintaining security compliance and providing a seamless checkout experience.',
			acceptanceCriteria: [
				{
					id: 'AC-1',
					title: 'Payment Processor Support',
					content:
						'- Must integrate with Stripe, PayPal, and Square\n- Support for credit/debit cards (Visa, Mastercard, Amex, Discover)\n- Support for digital wallets (Apple Pay, Google Pay)\n- Support for ACH bank transfers\n- International currency conversion for at least USD, EUR, GBP, JPY, CAD'
				},
				{
					id: 'AC-2',
					title: 'Security & Compliance',
					content:
						'- PCI DSS Level 1 compliance for all transactions\n- Card data must never be stored on our servers\n- 3D Secure 2.0 support for all eligible transactions\n- Address Verification System (AVS) for fraud prevention\n- Transaction data must be encrypted in transit and at rest'
				},
				{
					id: 'AC-3',
					title: 'Payment Workflow',
					content:
						'- Pre-authorization capability for holding funds\n- Capture/void/refund functionality\n- Partial refunds must be supported\n- Payment retry mechanism for failed transactions\n- Webhook support for asynchronous payment events'
				},
				{
					id: 'AC-4',
					title: 'Reporting & Reconciliation',
					content:
						'- Daily settlement reports\n- Transaction history with filtering and search\n- Exportable reports in CSV and PDF formats\n- Fee calculation and breakdown for each processor\n- Automatic reconciliation with accounting system'
				}
			],
			relatedRequirements: ['INV-025', 'REP-042', 'SEC-020'],
			assignedTo: 'Michael Johnson',
			created: '2023-05-10',
			updated: '2023-06-28'
		},
		{
			id: 'RPT-056',
			title: 'Analytics Dashboard',
			user: 'Marketing Manager',
			priority: 'Medium',
			status: 'Planned',
			badgeVariant: 'secondary' as const,
			story:
				'As a marketing manager, I want a customizable analytics dashboard to track campaign performance and customer engagement metrics.',
			description:
				'The analytics dashboard will provide real-time and historical data visualization for key performance indicators that help marketing teams optimize their campaigns and understand user behavior.',
			acceptanceCriteria: [
				{
					id: 'AC-1',
					title: 'Data Visualization',
					content:
						'- Must include line charts, bar graphs, pie charts, and heat maps\n- Time-series data with adjustable time ranges (day, week, month, quarter, year)\n- Comparative analysis between time periods\n- Drill-down capability from summary to detailed data\n- Export visualizations as PNG, JPG, and SVG'
				},
				{
					id: 'AC-2',
					title: 'Dashboard Customization',
					content:
						'- Users can add, remove, and rearrange dashboard widgets\n- Custom widgets can be created from existing data sources\n- Saved dashboard configurations per user\n- Dashboard sharing with role-based permissions\n- Mobile-responsive design for all dashboard elements'
				},
				{
					id: 'AC-3',
					title: 'Marketing Metrics',
					content:
						'- Campaign attribution tracking\n- Conversion funnel visualization\n- Customer acquisition cost calculation\n- Lifetime value metrics\n- Channel performance comparison\n- Social media engagement metrics\n- Email campaign metrics (open rates, click-through rates, conversions)'
				},
				{
					id: 'AC-4',
					title: 'Alerting & Automation',
					content:
						'- Threshold-based alerts for key metrics\n- Scheduled report delivery via email\n- Anomaly detection with notification\n- Automated insights based on significant data changes\n- Integration with task management system for actionable insights'
				}
			],
			relatedRequirements: ['API-034', 'USR-028', 'DAT-067'],
			assignedTo: 'Sarah Chen',
			created: '2023-07-05',
			updated: '2023-07-12'
		}
	];

	function nextExample() {
		currentExampleIndex = (currentExampleIndex + 1) % exampleRequirements.length;
	}

	function prevExample() {
		currentExampleIndex =
			(currentExampleIndex - 1 + exampleRequirements.length) % exampleRequirements.length;
	}

	async function handleSubmit() {
		isSubmitting = true;
		submitError = '';
		submitSuccess = false;

		if (formData.website) {
			submitSuccess = true;
			isSubmitting = false;
			return;
		}

		try {
			const { error } = await supabase.from('tickets').insert([
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					content: formData.projectOutline,
					privacy_consent: formData.privacyConsent,
					marketing_consent: formData.marketingConsent
				}
			]);

			if (error) throw error;

			submitSuccess = true;
			formData = {
				name: '',
				email: '',
				phone: '',
				projectOutline: '',
				privacyConsent: false,
				marketingConsent: false,
				website: ''
			};
		} catch (error) {
			submitError = 'Failed to submit form. Please try again.';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<main class="min-h-screen bg-white dark:bg-gray-900">
	<!-- Custom Toast Component -->
	{#if toast.show}
		<div class="animate-in slide-in-from-top-5 fixed right-4 top-4 z-50 max-w-sm">
			<div class="rounded-md bg-slate-900 p-4 shadow-lg dark:bg-slate-50">
				<div class="flex items-center gap-3">
					<div class="text-white dark:text-slate-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-5 w-5"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p class="text-sm font-medium text-white dark:text-slate-900">{toast.message}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Mobile Optimization Notice - Only visible on mobile -->
	<div
		class="fixed bottom-0 left-0 right-0 z-40 block bg-blue-600 px-4 py-3 text-center text-white shadow-lg md:hidden"
	>
		<div class="flex items-center justify-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-5 w-5"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
					clip-rule="evenodd"
				/>
			</svg>
			<p class="text-sm font-medium">This site is optimized for desktop viewing</p>
		</div>
	</div>

	<!-- Hero Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center text-center">
				<h1
					class="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
				>
					Requirements Management System
				</h1>
				<p class="mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
					Manage your project requirements with an intuitive interface. Track user stories, epics,
					and acceptance criteria with ease.
				</p>
				<Button
					href="#"
					variant="default"
					size="lg"
					class="font-semibold"
					onclick={() => demoClick('Try It Now')}>Try It Now</Button
				>
			</div>
		</div>
	</section>

	<!-- Problem & Solution Section -->
	<section class="bg-gray-50 py-20 dark:bg-gray-800">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
					The Pain of Requirements Management
				</h2>
				<p class="mb-10 text-xl text-gray-600 dark:text-gray-300">
					Managing software requirements is often time-consuming, error-prone, and frustrating.
				</p>
			</div>

			<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader>
						<div class="mb-2 flex items-center justify-center">
							<div class="rounded-full bg-red-100 p-3 dark:bg-red-900">
								<FileWarning size={24} class="text-red-600 dark:text-red-300" />
							</div>
						</div>
						<CardTitle class="text-center">Documentation Chaos</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-center text-gray-600 dark:text-gray-300">
							Requirements scattered across documents, emails, and messaging apps, making it
							impossible to track changes and maintain a single source of truth.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-2 flex items-center justify-center">
							<div class="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
								<Users2 size={24} class="text-orange-600 dark:text-orange-300" />
							</div>
						</div>
						<CardTitle class="text-center">Stakeholder Confusion</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-center text-gray-600 dark:text-gray-300">
							Miscommunication between business and development teams, leading to misaligned
							expectations and project delays.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-2 flex items-center justify-center">
							<div class="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
								<ClipboardCheck size={24} class="text-yellow-600 dark:text-yellow-300" />
							</div>
						</div>
						<CardTitle class="text-center">Traceability Gaps</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-center text-gray-600 dark:text-gray-300">
							Unable to track which requirements are implemented, tested, or have dependencies,
							creating risk of overlooked features.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-2 flex items-center justify-center">
							<div class="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
								<Bolt size={24} class="text-blue-600 dark:text-blue-300" />
							</div>
						</div>
						<CardTitle class="text-center">Inefficient Changes</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-center text-gray-600 dark:text-gray-300">
							Requirement changes cause ripple effects that are difficult to manage, leading to
							scope creep and budget overruns.
						</p>
					</CardContent>
				</Card>
			</div>

			<div class="mx-auto mt-16 max-w-4xl">
				<h3 class="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
					Our Solution: A Unified Requirements Platform
				</h3>
				<div class="grid gap-6 md:grid-cols-2">
					<div class="flex items-start">
						<div class="mr-4 mt-1 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900">
							<CheckIcon size={16} class="text-green-600 dark:text-green-300" />
						</div>
						<div>
							<h4 class="font-semibold">Centralized Requirements Repository</h4>
							<p class="text-gray-600 dark:text-gray-300">
								Keep all requirements in one place with full versioning and change history.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="mr-4 mt-1 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900">
							<CheckIcon size={16} class="text-green-600 dark:text-green-300" />
						</div>
						<div>
							<h4 class="font-semibold">Real-time Collaboration</h4>
							<p class="text-gray-600 dark:text-gray-300">
								Work together with stakeholders to refine requirements with instant feedback.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="mr-4 mt-1 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900">
							<CheckIcon size={16} class="text-green-600 dark:text-green-300" />
						</div>
						<div>
							<h4 class="font-semibold">Automated Traceability</h4>
							<p class="text-gray-600 dark:text-gray-300">
								Track connections between requirements, code, tests, and releases automatically.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="mr-4 mt-1 flex-shrink-0 rounded-full bg-green-100 p-1 dark:bg-green-900">
							<CheckIcon size={16} class="text-green-600 dark:text-green-300" />
						</div>
						<div>
							<h4 class="font-semibold">Impact Analysis</h4>
							<p class="text-gray-600 dark:text-gray-300">
								Instantly see how changes affect related requirements and project timelines.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-10 text-center">
					<Button
						href="#"
						variant="default"
						size="lg"
						onclick={() => demoClick('Start Managing Requirements')}
					>
						Start Managing Requirements Better
						<ArrowRight class="ml-2" size={18} />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- User Stories Sheet Example -->
	<section class="mx-auto mb-16 max-w-6xl px-4">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
			Organize Your Requirements
		</h2>
		<div class="mx-auto max-w-6xl overflow-hidden">
			<Card class="p-4">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div>
							<CardTitle>Project Requirements</CardTitle>
							<CardDescription class="mt-1">
								Track, assign, and prioritize user stories across your project
							</CardDescription>
						</div>
						<div class="flex items-center space-x-3">
							<div class="flex -space-x-2">
								<Avatar class="border-2 border-white dark:border-gray-900">
									<AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Team member" />
									<AvatarFallback>JS</AvatarFallback>
								</Avatar>
								<Avatar class="border-2 border-white dark:border-gray-900">
									<AvatarImage src="https://ui.shadcn.com/avatars/02.png" alt="Team member" />
									<AvatarFallback>MC</AvatarFallback>
								</Avatar>
								<Avatar class="border-2 border-white dark:border-gray-900">
									<AvatarImage src="https://ui.shadcn.com/avatars/03.png" alt="Team member" />
									<AvatarFallback>KL</AvatarFallback>
								</Avatar>
								<div
									class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-medium dark:bg-gray-800"
								>
									+3
								</div>
							</div>
							<Button variant="outline" size="sm" class="ml-2">
								<Users2 size={14} class="mr-1" />
								Invite Team
							</Button>
							<div class="flex space-x-2">
								<Badge variant="outline">Sprint 4</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<Badge variant="secondary" class="text-xs">6 Active</Badge>
							<Badge variant="outline" class="text-xs">4 Completed</Badge>
							<Badge variant="outline" class="text-xs">2 Blocked</Badge>
						</div>
						<div class="text-sm text-gray-500 dark:text-gray-400">
							<span class="font-medium text-gray-900 dark:text-white">Sprint Progress:</span> 65% Complete
						</div>
					</div>

					<div class="rounded border dark:border-gray-700">
						<div class="flex items-center justify-between bg-gray-100 p-3 dark:bg-gray-700">
							<h3 class="font-semibold dark:text-gray-200">User Stories</h3>
							<span class="text-sm text-gray-500 dark:text-gray-400">12 requirements</span>
						</div>
						<div class="overflow-x-auto">
							<table class="w-full text-sm">
								<thead class="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th class="p-2 text-left">ID</th>
										<th class="p-2 text-left">User</th>
										<th class="p-2 text-left">User Story</th>
										<th class="p-2 text-left">Epic</th>
										<th class="p-2 text-left">Priority</th>
										<th class="p-2 text-left">Status</th>
										<th class="p-2 text-left">Assignee</th>
										<th class="p-2 text-left">Due Date</th>
									</tr>
								</thead>
								<tbody class="text-left">
									<tr class="border-t dark:border-gray-700">
										<td class="p-2">USR-042</td>
										<td class="p-2">Security Engineer</td>
										<td class="max-w-md p-2"
											>As a security engineer, I want to implement a secure authentication system
											that supports multi-factor authentication to protect user accounts.</td
										>
										<td class="p-2">Auth</td>
										<td class="p-2"><Badge variant="destructive">High</Badge></td>
										<td class="p-2">In Progress</td>
										<td class="p-2">
											<div class="flex items-center">
												<Avatar class="mr-2 h-6 w-6">
													<AvatarImage
														src="https://ui.shadcn.com/avatars/01.png"
														alt="Jane Smith"
													/>
													<AvatarFallback>JS</AvatarFallback>
												</Avatar>
												<span>Jane S.</span>
											</div>
										</td>
										<td class="p-2">
											<div class="flex items-center">
												<span class="text-yellow-600 dark:text-yellow-400">Oct 15, 2023</span>
												<span
													class="ml-2 rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
													>2 days left</span
												>
											</div>
										</td>
									</tr>
									<tr class="border-t dark:border-gray-700">
										<td class="p-2">PAY-031</td>
										<td class="p-2">Financial Analyst</td>
										<td class="max-w-md p-2"
											>As a financial analyst, I want to integrate with multiple payment processors
											to provide flexible payment options to customers.</td
										>
										<td class="p-2">Payments</td>
										<td class="p-2"><Badge variant="destructive">High</Badge></td>
										<td class="p-2">Approved</td>
										<td class="p-2">
											<div class="flex items-center">
												<Avatar class="mr-2 h-6 w-6">
													<AvatarImage
														src="https://ui.shadcn.com/avatars/02.png"
														alt="Michael Johnson"
													/>
													<AvatarFallback>MJ</AvatarFallback>
												</Avatar>
												<span>Michael J.</span>
											</div>
										</td>
										<td class="p-2">
											<div class="flex items-center">
												<span class="text-green-600 dark:text-green-400">Oct 30, 2023</span>
												<span
													class="ml-2 rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-300"
													>17 days left</span
												>
											</div>
										</td>
									</tr>
									<tr class="border-t dark:border-gray-700">
										<td class="p-2">RPT-056</td>
										<td class="p-2">Marketing Manager</td>
										<td class="max-w-md p-2"
											>As a marketing manager, I want a customizable analytics dashboard to track
											campaign performance and customer engagement metrics.</td
										>
										<td class="p-2">Analytics</td>
										<td class="p-2"><Badge variant="secondary">Medium</Badge></td>
										<td class="p-2">Planned</td>
										<td class="p-2">
											<div class="flex items-center">
												<Avatar class="mr-2 h-6 w-6">
													<AvatarImage
														src="https://ui.shadcn.com/avatars/03.png"
														alt="Sarah Chen"
													/>
													<AvatarFallback>SC</AvatarFallback>
												</Avatar>
												<span>Sarah C.</span>
											</div>
										</td>
										<td class="p-2">
											<div class="flex items-center">
												<span class="text-gray-600 dark:text-gray-400">Nov 12, 2023</span>
												<span
													class="ml-2 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300"
													>30 days left</span
												>
											</div>
										</td>
									</tr>
									<tr class="border-t dark:border-gray-700">
										<td class="p-2">API-023</td>
										<td class="p-2">Backend Developer</td>
										<td class="max-w-md p-2"
											>As a backend developer, I want to create a rate-limited API that prevents
											abuse while ensuring legitimate requests are processed.</td
										>
										<td class="p-2">API</td>
										<td class="p-2"><Badge variant="secondary">Medium</Badge></td>
										<td class="p-2">In Review</td>
										<td class="p-2">
											<div class="flex items-center">
												<Avatar class="mr-2 h-6 w-6">
													<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="Alex Tran" />
													<AvatarFallback>AT</AvatarFallback>
												</Avatar>
												<span>Alex T.</span>
											</div>
										</td>
										<td class="p-2">
											<div class="flex items-center">
												<span class="text-red-600 dark:text-red-400">Oct 10, 2023</span>
												<span
													class="ml-2 rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-800 dark:bg-red-900 dark:text-red-300"
													>Overdue</span
												>
											</div>
										</td>
									</tr>
									<tr class="border-t dark:border-gray-700">
										<td class="p-2">USR-046</td>
										<td class="p-2">Product Owner</td>
										<td class="max-w-md p-2"
											>As a product owner, I want to define role-based access controls to restrict
											sensitive features to authorized personnel only.</td
										>
										<td class="p-2">Auth</td>
										<td class="p-2"><Badge variant="destructive">High</Badge></td>
										<td class="p-2">Backlog</td>
										<td class="p-2">
											<Button
												variant="ghost"
												size="sm"
												class="h-7 rounded-full px-2 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
												onclick={() => demoClick('Assign button')}
											>
												+ Assign
											</Button>
										</td>
										<td class="p-2">
											<span class="text-gray-500 dark:text-gray-400">Not scheduled</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div class="mx-auto mt-2 max-w-2xl rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
						<h4 class="mb-2 text-center text-sm font-semibold text-blue-800 dark:text-blue-300">
							Collaborate Seamlessly with Your Team
						</h4>
						<div
							class="flex flex-wrap justify-center gap-4 text-center text-xs text-blue-700 dark:text-blue-300"
						>
							<div class="flex items-center">
								<Users2 size={16} class="mr-1.5" />
								<span>Invite unlimited team members</span>
							</div>
							<div class="flex items-center">
								<Bell size={16} class="mr-1.5" />
								<span>Deadline notifications</span>
							</div>
							<div class="flex items-center">
								<MessageSquare size={16} class="mr-1.5" />
								<span>Comment on requirements</span>
							</div>
							<div class="flex items-center">
								<History size={16} class="mr-1.5" />
								<span>Track changes history</span>
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	</section>

	<!-- Preview Section with Detailed Requirements -->
	<section class="mx-auto my-16 max-w-6xl px-4">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
			Define Detailed Acceptance Criteria
		</h2>
		<div class="mx-auto max-w-6xl">
			<Card class="overflow-hidden bg-white dark:bg-gray-900">
				<div class="flex flex-col lg:flex-row">
					<!-- Left sidebar - Requirement details -->
					<div
						class="border-b border-gray-200 p-6 dark:border-gray-700 lg:w-1/3 lg:border-b-0 lg:border-r"
					>
						<div class="mb-6">
							<div class="mb-2 flex items-center justify-between">
								<Badge variant={exampleRequirements[currentExampleIndex].badgeVariant}>
									{exampleRequirements[currentExampleIndex].priority}
								</Badge>
								<span class="text-sm text-gray-500 dark:text-gray-400">
									{exampleRequirements[currentExampleIndex].status}
								</span>
							</div>
							<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
								{exampleRequirements[currentExampleIndex].title}
							</h3>
							<div class="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
								<Hash size={16} class="mr-1" />
								<span>{exampleRequirements[currentExampleIndex].id}</span>
							</div>
						</div>

						<div class="mb-6">
							<div
								class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Users2 size={16} class="mr-2" />
								<span>User</span>
							</div>
							<p class="text-gray-800 dark:text-gray-200">
								{exampleRequirements[currentExampleIndex].user}
							</p>
						</div>

						<div class="mb-6">
							<div
								class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<FileText size={16} class="mr-2" />
								<span>User Story</span>
							</div>
							<p class="text-gray-800 dark:text-gray-200">
								{exampleRequirements[currentExampleIndex].story}
							</p>
						</div>

						<div class="mb-6">
							<div
								class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Link2Icon size={16} class="mr-2" />
								<span>Related Requirements</span>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each exampleRequirements[currentExampleIndex].relatedRequirements as id}
									<Badge variant="outline">{id}</Badge>
								{/each}
							</div>
						</div>

						<div class="mb-6">
							<div
								class="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<CalendarIcon size={16} class="mr-2" />
								<span>Updated</span>
							</div>
							<p class="text-gray-800 dark:text-gray-200">
								{exampleRequirements[currentExampleIndex].updated}
							</p>
						</div>

						<div class="flex justify-between pt-4">
							<Button variant="outline" size="sm" onclick={prevExample}>Previous Example</Button>
							<Button variant="outline" size="sm" onclick={nextExample}>Next Example</Button>
						</div>
					</div>

					<!-- Right side - Acceptance Criteria -->
					<div class="flex-1 p-6">
						<div class="mb-4 flex items-center">
							<ClipboardCheck size={20} class="mr-2 text-blue-600 dark:text-blue-400" />
							<h3 class="text-lg font-bold text-gray-900 dark:text-white">Acceptance Criteria</h3>
						</div>

						<div
							class="markdown-preview rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800"
						>
							{#each exampleRequirements[currentExampleIndex].acceptanceCriteria as criteria}
								<div class="mb-6 last:mb-0">
									<div class="mb-2 flex items-center">
										<h4 class="text-base font-semibold text-gray-900 dark:text-white">
											{criteria.id}: {criteria.title}
										</h4>
									</div>
									<div class="prose prose-sm dark:prose-invert max-w-none">
										{#each criteria.content.split('\n') as line}
											<div class="flex items-baseline">
												{#if line.startsWith('-')}
													<span class="ml-4 mr-2 inline-block">•</span>
													<span>{line.substring(1).trim()}</span>
												{:else}
													<span>{line}</span>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>

						<div class="mt-6">
							<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
								Our requirements management system provides a structured way to define, track, and
								collaborate on requirements with rich acceptance criteria that everyone understands.
							</p>
							<div class="text-center">
								<Button
									href="#"
									variant="default"
									class="px-6 py-3 font-medium"
									onclick={() => demoClick('Try Requirements Management')}
								>
									Try Requirements Management
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<!-- Discussion Feature Section -->
	<section class="mx-auto mb-16 max-w-6xl px-4">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
			Collaborate Through Discussions
		</h2>
		<div class="mx-auto max-w-6xl">
			<Card class="overflow-hidden">
				<div class="flex flex-col lg:flex-row">
					<!-- Left side - Requirement summary -->
					<div
						class="border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 lg:w-1/3 lg:border-b-0 lg:border-r"
					>
						<div class="mb-4 flex items-center justify-between">
							<Badge variant="destructive">High Priority</Badge>
							<span class="text-sm text-gray-500 dark:text-gray-400">In Progress</span>
						</div>

						<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
							Payment Processing Integration
						</h3>
						<div class="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
							<Hash size={16} class="mr-1" />
							<span>PAY-031</span>
						</div>

						<div
							class="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
						>
							<p class="text-gray-800 dark:text-gray-200">
								<span class="font-medium">As a</span> financial analyst,
								<span class="font-medium">I want to</span>
								integrate with multiple payment processors <span class="font-medium">so that</span> I
								can provide flexible payment options to customers.
							</p>
						</div>

						<div class="mb-4">
							<div class="mb-2 flex items-center">
								<Users2 size={16} class="mr-2 text-gray-500" />
								<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Assigned to</span
								>
							</div>
							<div class="flex items-center">
								<Avatar class="mr-2 h-6 w-6">
									<AvatarImage src="https://ui.shadcn.com/avatars/02.png" alt="Michael Johnson" />
									<AvatarFallback>MJ</AvatarFallback>
								</Avatar>
								<span class="text-gray-800 dark:text-gray-200">Michael Johnson</span>
							</div>
						</div>

						<div>
							<div class="mb-2 flex items-center">
								<CalendarIcon size={16} class="mr-2 text-gray-500" />
								<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</span>
							</div>
							<div
								class="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-300"
							>
								<span>October 30, 2023</span>
								<span
									class="ml-2 rounded-full bg-white px-1.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-800"
									>17 days left</span
								>
							</div>
						</div>
					</div>

					<!-- Right side - Discussion thread -->
					<div class="flex-1 p-6">
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center">
								<MessageSquare size={20} class="mr-2 text-blue-600 dark:text-blue-400" />
								<h3 class="text-lg font-bold text-gray-900 dark:text-white">
									Requirement Discussion
								</h3>
							</div>
							<Badge
								variant="outline"
								class="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
							>
								<span class="h-2 w-2 rounded-full bg-blue-500"></span> Live Updates
							</Badge>
						</div>

						<div class="mb-6 space-y-4">
							<!-- Comment 1 -->
							<div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
								<div class="mb-2 flex items-start justify-between">
									<div class="flex items-center">
										<Avatar class="mr-2 h-8 w-8">
											<AvatarImage
												src="https://ui.shadcn.com/avatars/02.png"
												alt="Michael Johnson"
											/>
											<AvatarFallback>MJ</AvatarFallback>
										</Avatar>
										<div>
											<div class="font-medium text-gray-900 dark:text-white">Michael Johnson</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">
												Financial Analyst • 2 days ago
											</div>
										</div>
									</div>
									<Badge variant="outline" class="text-xs">Author</Badge>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										I've drafted acceptance criteria for the Stripe integration. Can stakeholders
										review the security requirements section? We need to ensure PCI DSS Level 1
										compliance for all transactions.
									</p>
								</div>
							</div>

							<!-- Comment 2 -->
							<div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
								<div class="mb-2 flex items-start justify-between">
									<div class="flex items-center">
										<Avatar class="mr-2 h-8 w-8">
											<AvatarImage src="https://ui.shadcn.com/avatars/03.png" alt="Sarah Chen" />
											<AvatarFallback>SC</AvatarFallback>
										</Avatar>
										<div>
											<div class="font-medium text-gray-900 dark:text-white">Sarah Chen</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">
												Security Engineer • Yesterday
											</div>
										</div>
									</div>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										The security requirements look good, but we need to add AVS (Address
										Verification System) as an acceptance criterion. Also, 3D Secure 2.0 should be
										mandatory for all eligible transactions to meet regulatory requirements.
									</p>
									<div class="mt-2 flex items-center gap-2">
										<Button
											variant="ghost"
											size="sm"
											class="h-7 text-xs"
											onclick={() => demoClick('Like button')}
										>
											<ThumbsUp size={14} class="mr-1" /> 3
										</Button>
										<Button
											variant="ghost"
											size="sm"
											class="h-7 text-xs"
											onclick={() => demoClick('Reply button')}>Reply</Button
										>
									</div>
								</div>
							</div>

							<!-- Comment 3 -->
							<div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
								<div class="mb-2 flex items-start justify-between">
									<div class="flex items-center">
										<Avatar class="mr-2 h-8 w-8">
											<AvatarImage src="https://ui.shadcn.com/avatars/05.png" alt="Taylor Kim" />
											<AvatarFallback>TK</AvatarFallback>
										</Avatar>
										<div>
											<div class="font-medium text-gray-900 dark:text-white">Taylor Kim</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">
												Product Manager • 2 hours ago
											</div>
										</div>
									</div>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										I've updated the acceptance criteria to include both AVS and 3D Secure 2.0. We
										also need to clarify the requirement for international payment support - our
										survey showed customers need support for these currencies: USD, EUR, GBP, JPY,
										CAD.
									</p>
									<div class="mt-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
										<div class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
											Updated Acceptance Criteria
										</div>
										<div class="text-xs text-gray-700 dark:text-gray-300">
											<p class="mb-1 font-medium">AC-2: Security & Compliance</p>
											<p class="mb-0.5">• PCI DSS Level 1 compliance for all transactions</p>
											<p class="mb-0.5">• Card data must never be stored on our servers</p>
											<p class="mb-0.5 font-semibold text-blue-600 dark:text-blue-400">
												• 3D Secure 2.0 support for all eligible transactions
											</p>
											<p class="mb-0.5 font-semibold text-blue-600 dark:text-blue-400">
												• Address Verification System (AVS) for fraud prevention
											</p>
											<p>• Transaction data must be encrypted in transit and at rest</p>
										</div>
									</div>
									<div class="mt-2 flex items-center gap-2">
										<Button
											variant="ghost"
											size="sm"
											class="h-7 text-xs"
											onclick={() => demoClick('Like button')}
										>
											<ThumbsUp size={14} class="mr-1" /> 5
										</Button>
										<Button
											variant="ghost"
											size="sm"
											class="h-7 text-xs"
											onclick={() => demoClick('Reply button')}>Reply</Button
										>
									</div>
								</div>
							</div>

							<!-- New comment form -->
							<div class="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
								<div class="mb-2 flex items-center">
									<Avatar class="mr-2 h-8 w-8">
										<AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="You" />
										<AvatarFallback>You</AvatarFallback>
									</Avatar>
									<div class="text-sm font-medium text-gray-900 dark:text-white">
										Add requirement feedback...
									</div>
								</div>
								<div class="pl-10">
									<Textarea
										placeholder="Comment on this requirement..."
										class="mb-2 min-h-[80px] resize-none"
									/>
									<div class="flex items-center justify-between">
										<div class="flex items-center space-x-2">
											<Button
												variant="ghost"
												size="sm"
												class="h-8 w-8 rounded-full p-0"
												onclick={() => demoClick('Attachment button')}
											>
												<Paperclip size={16} class="text-gray-500" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												class="h-8 w-8 rounded-full p-0"
												onclick={() => demoClick('Link button')}
											>
												<Link2Icon size={16} class="text-gray-500" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												class="h-8 w-8 rounded-full p-0"
												onclick={() => demoClick('Code button')}
											>
												<CodeIcon size={16} class="text-gray-500" />
											</Button>
										</div>
										<Button size="sm" onclick={() => demoClick('Post Feedback button')}
											>Post Feedback</Button
										>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
							<div class="flex items-start">
								<FileCheck size={20} class="mr-3 mt-0.5 text-blue-600 dark:text-blue-300" />
								<div>
									<h4 class="mb-1 font-medium text-blue-900 dark:text-blue-300">
										Requirement Validation
									</h4>
									<p class="text-sm text-blue-800 dark:text-blue-200">
										All stakeholders must review and approve requirement changes before
										implementation. Track requirements from ideation to acceptance testing.
									</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									class="ml-auto whitespace-nowrap border-blue-300 bg-white text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
									onclick={() => demoClick('Approve button')}
								>
									Approve
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<!-- AI Assistant Section -->
	<section class="mx-auto mb-16 max-w-6xl px-4">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
			Your AI Requirements Assistant
		</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Left side - AI Assistant UI -->
			<Card class="overflow-hidden">
				<div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									class="h-6 w-6 text-blue-600"
								>
									<path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z"></path>
									<path d="M12 8v8"></path>
									<path d="M8 12h8"></path>
								</svg>
							</div>
							<h3 class="ml-2 text-lg font-bold text-white">ReqsAI Assistant</h3>
						</div>
						<Badge variant="outline" class="border-white/30 bg-white/10 text-white">Beta</Badge>
					</div>
				</div>

				<CardContent class="p-0">
					<div class="space-y-4 p-4">
						<div class="flex items-start space-x-3">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600"
							>
								<span class="font-semibold">AI</span>
							</div>
							<div class="flex-1 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
								<p class="text-sm text-gray-700 dark:text-gray-300">
									What kind of requirement can I help you with today?
								</p>
							</div>
						</div>

						<div class="flex items-start justify-end space-x-3">
							<div class="flex-1 rounded-lg bg-blue-600 p-3 text-right">
								<p class="text-sm text-white">
									We need a user authentication feature for our SaaS platform.
								</p>
							</div>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-800"
							>
								<span class="font-semibold">U</span>
							</div>
						</div>

						<div class="flex items-start space-x-3">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600"
							>
								<span class="font-semibold">AI</span>
							</div>
							<div class="flex-1 space-y-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
								<p class="text-sm text-gray-700 dark:text-gray-300">
									I've created 5 user stories for authentication:
								</p>
								<ol class="ml-5 list-decimal text-xs text-gray-700 dark:text-gray-300">
									<li class="mb-1.5">
										<strong>As a user</strong>, I want to create an account so I can access the
										platform.
									</li>
									<li class="mb-1.5">
										<strong>As a user</strong>, I want to login securely with MFA so I can protect
										my account.
									</li>
									<li class="mb-1.5">
										<strong>As a user</strong>, I want to reset my password so I can regain access
										if I forget it.
									</li>
									<li class="mb-1.5">
										<strong>As an admin</strong>, I want to manage user access and permissions.
									</li>
									<li>
										<strong>As a security engineer</strong>, I want to implement OAuth SSO so users
										can login with existing accounts.
									</li>
								</ol>
								<p class="text-sm text-gray-700 dark:text-gray-300">
									Would you like me to add acceptance criteria for any of these?
								</p>
							</div>
						</div>
					</div>

					<div class="border-t border-gray-200 p-4 dark:border-gray-700">
						<div class="flex items-center space-x-2">
							<Input type="text" placeholder="Tell the AI what you need..." class="flex-1" />
							<Button size="sm" onclick={() => demoClick('AI Assistant')}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path d="m22 2-7 20-4-9-9-4 20-7Z"></path>
									<path d="M22 2 11 13"></path>
								</svg>
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Right side - Feature highlights -->
			<div class="flex flex-col justify-center space-y-6">
				<div>
					<h3 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
						Let AI Do the Heavy Lifting
					</h3>
					<p class="mb-6 text-gray-600 dark:text-gray-300">
						Our AI assistant helps you create professional requirements in seconds, not hours. Boost
						your productivity with intelligent automation.
					</p>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
								></path>
								<path d="m9 12 2 2 4-4"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">
							Auto-Generate Stories
						</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Create complete professional user stories from simple keywords or descriptions
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
								></path>
								<path d="M12 9v4"></path>
								<path d="M12 17h.01"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Gap Analysis</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Identify missing or redundant requirements across your project
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M9 11l3 3L22 4"></path>
								<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Smart Criteria</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Auto-generate detailed acceptance criteria based on industry best practices
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path
									d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"
								></path>
								<path d="M14 3v4a2 2 0 0 0 2 2h4"></path>
								<path d="M8 12h8"></path>
								<path d="M8 16h8"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Domain Templates</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Domain-specific templates for ecommerce, SaaS, auth, RBAC, and more
						</p>
					</div>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M8 2h8"></path>
								<path d="M9 2v2.5L12 7l3-2.5V2"></path>
								<path d="M12 17V7"></path>
								<path d="M9 22 6 19l3-3"></path>
								<path d="m15 22 3-3-3-3"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Auto-Prioritize</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Get AI-suggested priority levels based on business impact and dependencies
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Auto-Fix</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Fix typos, improve clarity, and refine user story formatting
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M3 3h7v7H3z"></path>
								<path d="M14 3h7v7h-7z"></path>
								<path d="M14 14h7v7h-7z"></path>
								<path d="M3 14h7v7H3z"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Story Refinement</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Intelligently combine or break down user stories for optimal organization
						</p>
					</div>

					<div
						class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div
							class="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path d="M7 22h10"></path>
								<path d="M12 17v5"></path>
								<path d="M22 8.5V12A10 10 0 1 1 2 12V8.5a3 3 0 1 1 0-6H22a3 3 0 1 1 0 6Z"></path>
								<path d="M19 8.5v9a3 3 0 1 1-6 0v-9"></path>
								<path d="M5 8.5v1a7 7 0 1 0 14 0v-1"></path>
							</svg>
						</div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Team-Ready Content</h4>
						<p class="text-xs text-gray-600 dark:text-gray-300">
							Generate comprehensive documentation that's immediately actionable
						</p>
					</div>
				</div>

				<div class="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
					<p class="mb-2 text-sm font-medium text-blue-900 dark:text-blue-300">
						Popular Domain Templates
					</p>
					<div class="flex flex-wrap gap-2">
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>User Authentication</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>E-commerce</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>SaaS Platform</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>Multi-tenant</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>RBAC</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>API Gateway</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>Payment Processing</Badge
						>
						<Badge
							variant="outline"
							class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
							>Analytics Dashboard</Badge
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="bg-white py-16 dark:bg-gray-900">
		<div class="container mx-auto px-4">
			<h2 class="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
				What Our Clients Say
			</h2>

			<TestimonialCarousel {testimonials} />
		</div>
	</section>
</main>
