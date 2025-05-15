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
		History
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
				<Button href="/reqs" variant="default" size="lg" class="font-semibold">Try It Now</Button>
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
					<Button href="/reqs" variant="default" size="lg">
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
								<Button href="/reqs" variant="default" class="px-6 py-3 font-medium">
									Try Requirements Management
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Card>
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
