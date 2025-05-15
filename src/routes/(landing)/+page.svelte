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
	import AIAssistantSection from './components/AIAssistantSection.svelte';
	import PricingSection from './components/PricingSection.svelte';

	// Add CSS for custom toast animation
	const toastAnimationCSS = `
		@keyframes slideUpAndStop {
			0% {
				opacity: 0;
				transform: translateY(40px);
			}
			20% {
				opacity: 1;
			}
			100% {
				transform: translateY(0);
			}
		}
		.toast-animation {
			animation: slideUpAndStop 0.6s ease-out forwards;
		}
	`;

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

	// Function to send email notification using server action
	async function sendEmailNotification(formData: any) {
		try {
			// Send notification to admin
			const adminResponse = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					to: 'johnnykoo@kooslab.net',
					subject: '🚨 URGENT: New Inquiry Received - Action Required',
					text: `
NEW INQUIRY RECEIVED - ACTION REQUIRED

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Message: ${formData.projectOutline}

Please respond to this inquiry as soon as possible.
					`,
					html: `
<h1 style="color: #ff0000;">NEW INQUIRY RECEIVED - ACTION REQUIRED</h1>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
<h2>Message:</h2>
<p>${formData.projectOutline}</p>
<p style="font-weight: bold;">Please respond to this inquiry as soon as possible.</p>
					`
				})
			});

			// Send confirmation to customer
			let customerResponse = { ok: true };
			if (formData.email) {
				customerResponse = await fetch('/api/send-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						to: formData.email,
						subject: 'We Have Received Your Inquiry',
						text: `
Dear ${formData.name},

Thank you for contacting us. We have received your inquiry and will get back to you shortly.

Best regards,
Requirements Management System Team
					`,
						html: `
<h1>Thank You for Contacting Us</h1>
<p>Dear ${formData.name},</p>
<p>Thank you for contacting us. We have received your inquiry and will get back to you shortly.</p>
<p>Best regards,<br/>Requirements Management System Team</p>
					`
					})
				});
			}

			return adminResponse.ok && customerResponse.ok;
		} catch (error) {
			console.error('Email notification error:', error);
			return false;
		}
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
						'- Minimum 10 characters\n- Include uppercase, lowercase, number, and special character\n- Cannot reuse last 5 passwords'
				},
				{
					id: 'AC-2',
					title: 'Multi-Factor Authentication',
					content:
						'- Support SMS codes and authentication apps\n- Support hardware security keys\n- Provide backup recovery codes'
				},
				{
					id: 'AC-3',
					title: 'Login Security',
					content:
						'- Lock after 5 failed attempts\n- Send email for suspicious logins\n- Log IP and device info'
				},
				{
					id: 'AC-4',
					title: 'Session Management',
					content:
						'- 30-minute inactivity timeout\n- View/terminate active sessions\n- Invalidate on password change'
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
						'- Integrate with Stripe, PayPal, and Square\n- Support credit/debit cards and digital wallets\n- Support major international currencies'
				},
				{
					id: 'AC-2',
					title: 'Security & Compliance',
					content:
						'- PCI DSS Level 1 compliance\n- No card storage on servers\n- 3D Secure and AVS support'
				},
				{
					id: 'AC-3',
					title: 'Payment Workflow',
					content:
						'- Pre-authorization and capture/void/refund\n- Support partial refunds\n- Webhook integration'
				},
				{
					id: 'AC-4',
					title: 'Reporting',
					content:
						'- Daily settlement reports\n- Exportable transaction history\n- Fee breakdown by processor'
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
						'- Support charts, graphs, and heatmaps\n- Adjustable time ranges\n- Export as PNG, JPG, SVG'
				},
				{
					id: 'AC-2',
					title: 'Dashboard Customization',
					content:
						'- Add/remove/rearrange widgets\n- Save configurations per user\n- Mobile-responsive design'
				},
				{
					id: 'AC-3',
					title: 'Marketing Metrics',
					content:
						'- Campaign attribution tracking\n- Conversion funnel visualization\n- Email and social metrics'
				},
				{
					id: 'AC-4',
					title: 'Alerts',
					content: '- Threshold-based alerts\n- Scheduled report delivery\n- Anomaly detection'
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
			// This is a honeypot field to catch bots
			submitSuccess = true;
			isSubmitting = false;
			return;
		}

		try {
			// First, insert the submission into Supabase
			const { error } = await supabase.from('tickets').insert([
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					content: formData.projectOutline
				}
			]);

			if (error) throw error;

			// Then send email notification
			const emailSent = await sendEmailNotification({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				projectOutline: formData.projectOutline
			});

			if (!emailSent) {
				console.warn('Email notification could not be sent, but form was submitted');
			}

			submitSuccess = true;
			// Reset form after successful submission
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

	// In the script section, add a currency state and update the toggleCurrency function
	let currency = $state('usd');

	function toggleCurrency(newCurrency: 'usd' | 'eur') {
		currency = newCurrency;
	}

	// Add a state variable to track the active tab in the AI Assistant section
	let activeTab = $state('create-stories'); // Possible values: 'create-stories', 'break-down', 'find-redundancy'

	function setActiveTab(tabId: string) {
		activeTab = tabId;
	}
</script>

<main class="min-h-screen bg-white dark:bg-gray-900">
	<!-- Custom Toast Component -->
	<style>
		@keyframes slideUpAndStop {
			0% {
				opacity: 0;
				transform: translateY(40px);
			}
			20% {
				opacity: 1;
			}
			100% {
				transform: translateY(0);
			}
		}
		.toast-animation {
			animation: slideUpAndStop 0.6s ease-out forwards;
		}
	</style>

	{#if toast.show}
		<div class="toast-animation fixed bottom-6 right-6 z-50 max-w-sm">
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
	<!-- Removed desktop optimization notice to properly support mobile views -->

	<!-- Hero Section -->
	<section class="py-12 md:py-20">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center text-center">
				<h1
					class="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:mb-6 md:text-5xl lg:text-6xl"
				>
					Requirements Management System
				</h1>
				<p class="mb-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:mb-8 md:text-xl">
					Manage your project requirements with an intuitive interface. Track user stories, epics,
					and acceptance criteria with ease.
				</p>
				<Button href="/reqs" variant="default" size="lg" class="font-semibold">Try Demo Now</Button>
			</div>
		</div>
	</section>

	<!-- Problem & Solution Section -->
	<section class="bg-gray-50 py-12 dark:bg-gray-800 md:py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2
					class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:mb-6 md:text-3xl lg:text-4xl"
				>
					The Pain of Requirements Management
				</h2>
				<p class="mb-8 text-base text-gray-600 dark:text-gray-300 md:mb-10 md:text-xl">
					Managing software requirements is often time-consuming, error-prone, and frustrating.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
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
					<Button href="#contact" variant="default" size="lg">
						Start Managing Requirements Better
						<ArrowRight class="ml-2" size={18} />
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- User Stories Sheet Example -->
	<section id="services" class="mx-auto mb-16 max-w-6xl px-4">
		<h2 class="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
			Organize Your Requirements
		</h2>
		<div class="mx-auto max-w-6xl overflow-hidden">
			<Card class="p-2 md:p-4">
				<CardHeader>
					<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
					<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div class="flex flex-wrap items-center gap-2">
							<Badge variant="secondary" class="text-xs">6 Active</Badge>
							<Badge variant="outline" class="text-xs">4 Completed</Badge>
							<Badge variant="outline" class="text-xs">2 Blocked</Badge>
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
											<div class="mb-1 flex items-center">
												<span class="mr-1 text-green-600 dark:text-green-400">Oct 15</span>
												<span
													class="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-300"
													>in 2 days</span
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
											<div class="mb-1 flex items-center">
												<span class="mr-1 text-green-600 dark:text-green-400">Oct 30</span>
												<span
													class="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-300"
													>in 17 days</span
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
											<div class="mb-1 flex items-center">
												<span class="mr-1 text-gray-600 dark:text-gray-400">Nov 12</span>
												<span
													class="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300"
													>in 30 days</span
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
									<div class="prose prose-sm max-w-none dark:prose-invert">
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
							User Authentication System
						</h3>
						<div class="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
							<Hash size={16} class="mr-1" />
							<span>USR-042</span>
						</div>

						<div
							class="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
						>
							<p class="text-gray-800 dark:text-gray-200">
								<span class="font-medium">As a</span> user,
								<span class="font-medium">I want to</span>
								sign up and log in easily <span class="font-medium">so that</span> I can access the platform
								securely.
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
									<AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Jane Smith" />
									<AvatarFallback>JS</AvatarFallback>
								</Avatar>
								<span class="text-gray-800 dark:text-gray-200">Jane Smith</span>
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
								<span>October 15, 2023</span>
								<span
									class="ml-2 rounded-full bg-white px-1.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-800"
									>in 2 days</span
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
											<AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Jane Smith" />
											<AvatarFallback>JS</AvatarFallback>
										</Avatar>
										<div>
											<div class="font-medium text-gray-900 dark:text-white">Jane Smith</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
										</div>
									</div>
									<Badge variant="outline" class="text-xs">Author</Badge>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										I've drafted the basic auth requirements. Focusing on email/password
										authentication with secure password rules for now.
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
											<div class="text-xs text-gray-500 dark:text-gray-400">Yesterday</div>
										</div>
									</div>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										Hey Jane! The client just emailed - they want social login options too. They
										specifically mentioned Google, but said we should add Apple and Microsoft as
										well. Can we fit this into the sprint?
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
											<AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Jane Smith" />
											<AvatarFallback>JS</AvatarFallback>
										</Avatar>
										<div>
											<div class="font-medium text-gray-900 dark:text-white">Jane Smith</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">2 hours ago</div>
										</div>
									</div>
								</div>
								<div class="pl-10 text-sm text-gray-700 dark:text-gray-300">
									<p>
										I'll update the requirements to include social login options. We should estimate
										development effort for each one to help prioritize for the first release.
									</p>
									<div class="mt-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
										<div class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
											Updated Auth Requirements
										</div>
										<div class="text-xs text-gray-700 dark:text-gray-300">
											<p class="mb-0.5">• Email/password authentication</p>
											<p class="mb-0.5 font-semibold text-blue-600 dark:text-blue-400">
												• Google OAuth integration (high priority)
											</p>
											<p class="mb-0.5 font-semibold text-blue-600 dark:text-blue-400">
												• Apple ID integration (medium priority)
											</p>
											<p>• Microsoft account integration (low priority)</p>
										</div>
									</div>
									<div class="mt-2 flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											class="text-xs"
											onclick={() => demoClick('Refine button')}
										>
											Refine
										</Button>
										<Button
											variant="outline"
											size="sm"
											class="text-xs"
											onclick={() => demoClick('Break Down button')}
										>
											Break Down
										</Button>
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
	<AIAssistantSection />

	<!-- Pricing Section -->
	<PricingSection />

	<!-- Contact Form Section -->
	<section id="contact" class="py-16 md:py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<div class="mb-12 text-center">
					<h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
						Get Your Custom Requirements Document
					</h2>
					<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
						Tell us about your project and we'll help you create comprehensive requirements that
						ensure successful development.
					</p>
				</div>

				<div class="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900 md:p-10">
					<div id="contact-form">
						<form
							onsubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
							class="space-y-6"
						>
							<div class="grid gap-6 md:grid-cols-2">
								<div>
									<label
										for="name"
										class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Your Name
									</label>
									<Input
										type="text"
										id="name"
										placeholder="John Doe"
										bind:value={formData.name}
										required
										class="w-full"
									/>
								</div>
								<div>
									<label
										for="email"
										class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Your Email
									</label>
									<Input
										type="email"
										id="email"
										placeholder="john@example.com"
										bind:value={formData.email}
										required
										class="w-full"
									/>
								</div>
							</div>

							<div>
								<label
									for="phone"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Phone Number (Optional)
								</label>
								<Input
									type="tel"
									id="phone"
									placeholder="+1 (555) 123-4567"
									bind:value={formData.phone}
									class="w-full"
								/>
							</div>

							<div>
								<label
									for="project-outline"
									class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>
									Project Outline
								</label>
								<Textarea
									id="project-outline"
									placeholder="Tell us about your project's requirements, goals, and timeline..."
									class="min-h-[150px]"
									bind:value={formData.projectOutline}
									required
								/>
							</div>

							<!-- Honeypot field to catch bots -->
							<div class="hidden">
								<label for="website">Website</label>
								<Input id="website" bind:value={formData.website} />
							</div>

							<div class="flex items-start">
								<div class="flex h-5 items-center">
									<input
										id="privacy"
										type="checkbox"
										bind:checked={formData.privacyConsent}
										required
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
									/>
								</div>
								<div class="ml-3 text-sm">
									<label for="privacy" class="font-medium text-gray-900 dark:text-white">
										I agree to the
										<a href="/privacy" class="text-blue-600 hover:underline dark:text-blue-500"
											>privacy policy</a
										>
									</label>
								</div>
							</div>

							{#if submitError}
								<div class="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
									<div class="flex">
										<div class="flex-shrink-0">
											<svg
												class="h-5 w-5 text-red-400 dark:text-red-500"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div class="ml-3">
											<h3 class="text-sm font-medium text-red-800 dark:text-red-400">
												Form submission error
											</h3>
											<div class="mt-2 text-sm text-red-700 dark:text-red-300">
												<p>{submitError}</p>
											</div>
										</div>
									</div>
								</div>
							{/if}

							<Button
								type="submit"
								disabled={isSubmitting}
								class="w-full bg-blue-600 font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
							>
								{#if isSubmitting}
									<svg
										class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Submitting...
								{:else}
									Get Your Requirements Document
								{/if}
							</Button>
						</form>

						{#if submitSuccess}
							<div class="mt-8 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
								<div class="flex">
									<div class="flex-shrink-0">
										<svg
											class="h-5 w-5 text-green-400 dark:text-green-500"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-green-800 dark:text-green-400">
											Thank you for your inquiry!
										</h3>
										<div class="mt-2 text-sm text-green-700 dark:text-green-300">
											<p>
												We've received your message and will get back to you shortly. Check your
												email for a confirmation.
											</p>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
