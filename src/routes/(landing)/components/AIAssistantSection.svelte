<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Badge } from '$lib/components/ui/badge';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import {
		Card,
		CardHeader,
		CardContent,
		CardFooter,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	// Svelte 5 state management
	let activeTab = $state('create-stories');
	function setActiveTab(tabId: string) {
		activeTab = tabId;
	}

	// Demo toast notification (minimal, just for demoClick)
	function demoClick(featureName: string = 'This feature') {
		toast(`${featureName} is just a demo and not functional`);
		return false;
	}

	// Mocked user stories for MECE analysis
	const userStories = [
		{
			id: 'USER-001',
			title: 'Basic Notification Delivery',
			tag: 'Notification',
			summary: 'As a user, I want to receive notifications for important events.'
		},
		{
			id: 'USER-002',
			title: 'Notification Preferences',
			tag: 'Settings',
			summary: 'As a user, I want to customize which notifications I receive.'
		},
		{
			id: 'USER-003',
			title: 'Security Notifications',
			tag: 'Security',
			summary: 'As a user, I want to be notified about account security events.'
		}
	];
</script>

<section class="mx-auto mb-16 max-w-6xl px-4">
	<h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
		Your AI Requirements Assistant
	</h2>

	<!-- Coming Soon Banner -->
	<div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
		<div class="flex items-center justify-center space-x-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				class="h-5 w-5 text-blue-600 dark:text-blue-400"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="8" x2="12" y2="12"></line>
				<line x1="12" y1="16" x2="12.01" y2="16"></line>
			</svg>
			<p class="font-medium text-blue-800 dark:text-blue-200">
				This AI functionality is coming soon! Our team is working diligently to bring you
				state-of-the-art AI assistance.
			</p>
		</div>
	</div>

	<!-- AI Chat Interaction Demo -->
	<div class="mx-auto mb-10 mt-8 max-w-4xl rounded-lg border border-gray-200 dark:border-gray-700">
		<!-- AI Chat Header -->
		<div
			class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="flex items-center">
				<div
					class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-blue-600 dark:text-blue-400"
					>
						<path d="M12 2a5 5 0 1 0 5 5.41V7l1.41-1.41A7.5 7.5 0 1 1 12 2Z"></path>
						<rect x="6" y="12" width="12" height="3"></rect>
						<path d="M9 18h6"></path>
						<path d="M10 21h4"></path>
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900 dark:text-white">AI Requirements Assistant</h3>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						Powered by domain-specific templates
					</p>
				</div>
			</div>
			<Badge
				variant="outline"
				class="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Live Demo</Badge
			>
		</div>

		<!-- Tab Navigation -->
		<div class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
			<div class="flex">
				<button
					class={`relative ${activeTab === 'create-stories' ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'} px-4 py-2 text-sm font-medium`}
					onclick={() => setActiveTab('create-stories')}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1.5"
							><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path
								d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
							></path></svg
						>
						Create Stories
					</div>
				</button>
				<button
					class={`relative ${activeTab === 'break-down' ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'} px-4 py-2 text-sm font-medium`}
					onclick={() => setActiveTab('break-down')}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1.5"
							><rect width="8" height="8" x="2" y="2" rx="2"></rect><rect
								width="8"
								height="8"
								x="14"
								y="2"
								rx="2"
							></rect><rect width="8" height="8" x="2" y="14" rx="2"></rect><rect
								width="8"
								height="8"
								x="14"
								y="14"
								rx="2"
							></rect></svg
						>
						Break Down
					</div>
				</button>
				<button
					class={`relative ${activeTab === 'find-redundancy' ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'} px-4 py-2 text-sm font-medium`}
					onclick={() => setActiveTab('find-redundancy')}
				>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-1.5"
							><path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"></path><rect
								width="10"
								height="8"
								x="12"
								y="13"
								rx="2"
							></rect></svg
						>
						Find Redundancy
					</div>
				</button>
			</div>
		</div>

		<!-- Tab Content 1: Create Stories -->
		<div class="flex flex-col md:flex-row" class:hidden={activeTab !== 'create-stories'}>
			<!-- Left side: Chat Messages (Card) -->
			<Card
				class="w-full rounded-none rounded-bl-lg rounded-tl-lg border-r-0 border-gray-200 dark:border-gray-700 md:w-1/2 md:border-r"
			>
				<CardHeader>
					<h3 class="text-sm font-semibold text-gray-900 dark:text-white">Conversation</h3>
				</CardHeader>
				<CardContent>
					<!-- Chat bubbles -->
					<div class="mb-4 flex">
						<div class="mr-2 flex-shrink-0">
							<Avatar class="h-8 w-8">
								<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
						<div class="max-w-[80%] rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-700">
							<p class="text-gray-800 dark:text-gray-200">
								Can you generate a user story for login functionality?
							</p>
						</div>
					</div>
					<div class="mb-4 flex justify-end">
						<div class="max-w-[80%] rounded-lg rounded-tr-none bg-blue-100 p-3 dark:bg-blue-900/50">
							<p class="text-gray-800 dark:text-gray-200">
								Sure! Here is a user story for login functionality:
							</p>
						</div>
						<div class="ml-2 flex-shrink-0">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
									></path><path d="m9 12 2 2 4-4"></path></svg
								>
							</div>
						</div>
					</div>
					<!-- Second round trip -->
					<div class="mb-4 flex">
						<div class="mr-2 flex-shrink-0">
							<Avatar class="h-8 w-8">
								<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
						<div class="max-w-[80%] rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-700">
							<p class="text-gray-800 dark:text-gray-200">
								Can you add acceptance criteria for password requirements?
							</p>
						</div>
					</div>
					<div class="mb-4 flex justify-end">
						<div class="max-w-[80%] rounded-lg rounded-tr-none bg-blue-100 p-3 dark:bg-blue-900/50">
							<p class="text-gray-800 dark:text-gray-200">
								Of course! Acceptance criteria:<br />
								• Password must be at least 8 characters<br />
								• Must include a number and a special character<br />
								• Cannot reuse last 5 passwords
							</p>
						</div>
						<div class="ml-2 flex-shrink-0">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
									></path><path d="m9 12 2 2 4-4"></path></svg
								>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div class="flex w-full items-center">
						<Textarea
							placeholder="Ask the AI to generate a user story..."
							class="min-h-[44px] flex-1 resize-none rounded-lg border-gray-300 dark:border-gray-600"
						/>
						<Button
							variant="default"
							size="sm"
							class="ml-2"
							onclick={() => demoClick('Send message button')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-4 w-4"
								><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg
							>
						</Button>
					</div>
				</CardFooter>
			</Card>
			<!-- Right side: User Story Being Updated (Card, same as Find Redundancy) -->
			<Card class="w-full rounded-none rounded-br-lg rounded-tr-lg md:w-1/2">
				<CardHeader>
					<div>
						<CardTitle>User Story</CardTitle>
						<CardDescription>Generated by AI</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div class="mb-2 flex items-center gap-2">
						<Badge variant="outline">USR-101</Badge>
						<Badge variant="secondary">Authentication</Badge>
					</div>
					<h4 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
						Login Functionality
					</h4>
					<p class="mb-2 text-gray-700 dark:text-gray-300">
						As a user, I want to log in with my email and password so that I can access my account
						securely.
					</p>
					<ul class="mb-2 ml-4 list-disc text-sm text-gray-600 dark:text-gray-400">
						<li>Supports email and password login</li>
						<li>Shows error for invalid credentials</li>
						<li>Remembers session for 7 days</li>
					</ul>
					<div class="text-xs text-gray-500 dark:text-gray-400">
						Created by AI Assistant • Just now
					</div>
				</CardContent>
				<CardFooter class="flex justify-end gap-2">
					<Button variant="outline" size="sm" onclick={() => demoClick('Edit')}>Edit</Button>
					<Button variant="default" size="sm" onclick={() => demoClick('Save')}>Save</Button>
				</CardFooter>
			</Card>
		</div>
		<!-- Tab Content 2: Break Down Stories -->
		<div class="flex flex-col md:flex-row" class:hidden={activeTab !== 'break-down'}>
			<!-- Left side: Chat Messages (Card) -->
			<Card
				class="w-full rounded-none rounded-bl-lg rounded-tl-lg border-r-0 border-gray-200 dark:border-gray-700 md:w-1/2 md:border-r"
			>
				<CardHeader>
					<h3 class="text-sm font-semibold text-gray-900 dark:text-white">Conversation</h3>
				</CardHeader>
				<CardContent>
					<!-- Chat bubbles -->
					<div class="mb-4 flex">
						<div class="mr-2 flex-shrink-0">
							<Avatar class="h-8 w-8">
								<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
						<div class="max-w-[80%] rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-700">
							<p class="text-gray-800 dark:text-gray-200">
								Can you break down the login user story into smaller tasks?
							</p>
						</div>
					</div>
					<div class="mb-4 flex justify-end">
						<div class="max-w-[80%] rounded-lg rounded-tr-none bg-blue-100 p-3 dark:bg-blue-900/50">
							<p class="text-gray-800 dark:text-gray-200">
								Absolutely! Here are the broken down user stories for login functionality:
							</p>
						</div>
						<div class="ml-2 flex-shrink-0">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
									></path><path d="m9 12 2 2 4-4"></path></svg
								>
							</div>
						</div>
					</div>
					<!-- Second round trip -->
					<div class="mb-4 flex">
						<div class="mr-2 flex-shrink-0">
							<Avatar class="h-8 w-8">
								<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
						<div class="max-w-[80%] rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-700">
							<p class="text-gray-800 dark:text-gray-200">
								Can you add a story for handling login errors?
							</p>
						</div>
					</div>
					<div class="mb-4 flex justify-end">
						<div class="max-w-[80%] rounded-lg rounded-tr-none bg-blue-100 p-3 dark:bg-blue-900/50">
							<p class="text-gray-800 dark:text-gray-200">
								Added! <br />
								<span class="font-semibold">USR-101.4: Error Handling</span><br />
								As a user, I want to see a helpful error message if my login fails.
							</p>
						</div>
						<div class="ml-2 flex-shrink-0">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
									></path><path d="m9 12 2 2 4-4"></path></svg
								>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div class="flex w-full items-center">
						<Textarea
							placeholder="Ask the AI to break down a user story..."
							class="min-h-[44px] flex-1 resize-none rounded-lg border-gray-300 dark:border-gray-600"
						/>
						<Button
							variant="default"
							size="sm"
							class="ml-2"
							onclick={() => demoClick('Send message button')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-4 w-4"
								><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg
							>
						</Button>
					</div>
				</CardFooter>
			</Card>
			<!-- Right side: Broken Down User Stories (Card, same as Find Redundancy) -->
			<Card class="w-full rounded-none rounded-br-lg rounded-tr-lg md:w-1/2">
				<CardHeader>
					<div>
						<CardTitle>Broken Down Stories</CardTitle>
						<CardDescription></CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<ul class="space-y-4">
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USR-101.1</span
								>
								<Badge variant="secondary" class="text-xs">UI</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Login Form UI
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want a login form to enter my email and password.
							</p>
						</li>
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USR-101.2</span
								>
								<Badge variant="secondary" class="text-xs">Validation</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Input Validation
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to see errors if I enter invalid credentials.
							</p>
						</li>
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USR-101.3</span
								>
								<Badge variant="secondary" class="text-xs">Session</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Session Persistence
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to stay logged in for 7 days unless I log out.
							</p>
						</li>
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USR-101.4</span
								>
								<Badge variant="secondary" class="text-xs">Error</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Error Handling
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to see a helpful error message if my login fails.
							</p>
						</li>
					</ul>
				</CardContent>
				<CardFooter class="flex justify-end gap-2">
					<Button variant="outline" size="sm" onclick={() => demoClick('Edit')}>Edit</Button>
					<Button variant="default" size="sm" onclick={() => demoClick('Save')}>Save</Button>
				</CardFooter>
			</Card>
		</div>
		<!-- Tab Content 3: Find Redundancy -->
		<div class="flex flex-col md:flex-row" class:hidden={activeTab !== 'find-redundancy'}>
			<!-- Left side: Chat Messages (Card) -->
			<Card
				class="w-full rounded-none rounded-bl-lg rounded-tl-lg border-r-0 border-gray-200 dark:border-gray-700 md:w-1/2 md:border-r"
			>
				<CardHeader>
					<h3 class="text-sm font-semibold text-gray-900 dark:text-white">Conversation</h3>
				</CardHeader>
				<CardContent>
					<!-- Example MECE chat -->
					<div class="mb-4 flex">
						<div class="mr-2 flex-shrink-0">
							<Avatar class="h-8 w-8">
								<AvatarImage src="https://ui.shadcn.com/avatars/04.png" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
						<div class="max-w-[80%] rounded-lg rounded-tl-none bg-gray-100 p-3 dark:bg-gray-700">
							<p class="text-gray-800 dark:text-gray-200">
								Can you analyze our system user stories to find any redundancy or overlapping
								functionality?
							</p>
						</div>
					</div>
					<div class="mb-4 flex justify-end">
						<div class="max-w-[80%] rounded-lg rounded-tr-none bg-blue-100 p-3 dark:bg-blue-900/50">
							<p class="text-gray-800 dark:text-gray-200">
								I'll perform a MECE (Mutually Exclusive, Collectively Exhaustive) analysis on your
								system user stories to identify any redundancies or gaps.<br />
								This helps ensure each requirement is unique with no overlapping functionality while
								still covering the complete scope.
							</p>
						</div>
						<div class="ml-2 flex-shrink-0">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
									></path><path d="m9 12 2 2 4-4"></path></svg
								>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div class="flex w-full items-center">
						<Textarea
							placeholder="Ask about finding redundant requirements..."
							class="min-h-[44px] flex-1 resize-none rounded-lg border-gray-300 dark:border-gray-600"
						/>
						<Button
							variant="default"
							size="sm"
							class="ml-2"
							onclick={() => demoClick('Send message button')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-4 w-4"
								><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg
							>
						</Button>
					</div>
				</CardFooter>
			</Card>
			<!-- Right side: MECE Analysis (Card, now filled) -->
			<Card class="w-full rounded-none rounded-br-lg rounded-tr-lg md:w-1/2">
				<CardHeader>
					<div>
						<CardTitle>MECE Analysis</CardTitle>
						<CardDescription>System User Stories</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<ul class="space-y-4">
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USER-001</span
								>
								<Badge variant="secondary" class="text-xs">Notification</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Basic Notification Delivery
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to receive notifications for important events.
							</p>
						</li>
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USER-002</span
								>
								<Badge variant="secondary" class="text-xs">Settings</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Notification Preferences
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to customize which notifications I receive.
							</p>
						</li>
						<li>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USER-003</span
								>
								<Badge variant="secondary" class="text-xs">Security</Badge>
							</div>
							<h4 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
								Security Notifications
							</h4>
							<p class="text-xs text-gray-500 dark:text-gray-300">
								As a user, I want to be notified about account security events.
							</p>
						</li>
						<li
							class="relative border-l-4 border-yellow-400 bg-yellow-50 pl-4 dark:bg-yellow-900/20"
						>
							<div class="mb-1 flex items-center justify-between">
								<span
									class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
									>USER-002</span
								>
								<div class="flex items-center gap-2">
									<Badge variant="destructive" class="text-xs">Redundancy</Badge>
									<Button
										variant="destructive"
										size="sm"
										onclick={() => demoClick('Delete redundancy')}
										class="h-6 px-2 py-0"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M3 6h18"></path>
											<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
											<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
										</svg>
									</Button>
								</div>
							</div>
							<h4 class="mb-1 text-base font-semibold text-yellow-800 dark:text-yellow-200">
								Potential Overlap Detected
							</h4>
							<p class="text-xs text-yellow-800 dark:text-yellow-100">
								USER-002 and USER-001 both relate to notification delivery. Consider merging or
								clarifying their scope.
							</p>
						</li>
					</ul>
					<div
						class="mt-6 rounded bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
					>
						<strong>Summary:</strong> 3 user stories analyzed. 1 potential redundancy detected. No gaps
						found.
					</div>
				</CardContent>
				<CardFooter class="flex justify-end gap-2">
					<Button variant="outline" size="sm" onclick={() => demoClick('Edit')}>Edit</Button>
					<Button variant="default" size="sm" onclick={() => demoClick('Save')}>Save</Button>
				</CardFooter>
			</Card>
		</div>
	</div>
</section>
