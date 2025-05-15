<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '$lib/components/ui/card';
	import { CheckIcon } from 'lucide-svelte';
	let currency = $state('usd');
	function toggleCurrency(newCurrency: 'usd' | 'eur') {
		currency = newCurrency;
	}
</script>

<!-- Free Trial Banner -->
<div class="mx-auto mb-12 max-w-3xl rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
	<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
		<div>
			<h3 class="text-lg font-semibold text-blue-800 dark:text-blue-300">
				Try All Features Free for 4 Weeks
			</h3>
			<p class="text-blue-700 dark:text-blue-200">
				Get full access to all features with no credit card required
			</p>
		</div>
		<Button
			href="#contact"
			variant="default"
			class="whitespace-nowrap"
			onclick={() =>
				document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
		>
			Start Free Trial
		</Button>
	</div>
</div>

<div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
	<!-- Free Plan -->
	<Card class="flex flex-col overflow-hidden">
		<CardHeader>
			<CardTitle class="text-center text-xl font-bold">Free</CardTitle>
			<div class="mt-4 text-center">
				<span class="text-4xl font-bold">{currency === 'usd' ? '$0' : '€0'}</span>
				<span class="text-gray-500 dark:text-gray-400">/ month</span>
			</div>
			<CardDescription class="mt-2 text-center">For individuals and small teams</CardDescription>
		</CardHeader>
		<CardContent class="flex-grow">
			<ul class="space-y-3">
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"><strong>1</strong> project</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"><strong>3</strong> team members</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">User story management</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Basic requirements documentation</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">1GB storage</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Community support</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">5 AI uses / day</span>
				</li>
			</ul>
		</CardContent>
		<CardFooter class="pt-4">
			<Button
				href="#contact"
				variant="outline"
				size="lg"
				class="w-full font-medium"
				onclick={() =>
					document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Start Free
			</Button>
		</CardFooter>
	</Card>

	<!-- Basic Plan -->
	<Card
		class="flex flex-col overflow-hidden border-blue-200 bg-white dark:border-blue-800 dark:bg-gray-900"
	>
		<div
			class="bg-blue-100 py-2 text-center text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
		>
			Most Popular
		</div>
		<CardHeader>
			<CardTitle class="text-center text-xl font-bold">Basic</CardTitle>
			<div class="mt-4 text-center">
				<span class="text-4xl font-bold">{currency === 'usd' ? '$29' : '€26'}</span>
				<span class="text-gray-500 dark:text-gray-400">/ month</span>
			</div>
			<CardDescription class="mt-2 text-center">For growing teams</CardDescription>
		</CardHeader>
		<CardContent class="flex-grow">
			<ul class="space-y-3">
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"><strong>10</strong> projects</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"><strong>15</strong> team members</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Advanced user story management</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"
						>Comprehensive requirements documentation</span
					>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">10GB storage</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Traceability matrix</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Basic AI assistance</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Email & chat support</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">100 AI Credits / day</span>
				</li>
			</ul>
		</CardContent>
		<CardFooter class="pt-4">
			<Button
				href="#contact"
				variant="default"
				size="lg"
				class="w-full font-medium"
				onclick={() =>
					document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Start Free Trial
			</Button>
		</CardFooter>
	</Card>

	<!-- Professional Plan -->
	<Card class="flex flex-col overflow-hidden">
		<CardHeader>
			<CardTitle class="text-center text-xl font-bold">Professional</CardTitle>
			<div class="mt-4 text-center">
				<span class="text-4xl font-bold">{currency === 'usd' ? '$99' : '€89'}</span>
				<span class="text-gray-500 dark:text-gray-400">/ month</span>
			</div>
			<CardDescription class="mt-2 text-center">Unlimited projects & collaborators</CardDescription>
		</CardHeader>
		<CardContent class="flex-grow">
			<ul class="space-y-3">
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"><strong>Unlimited</strong> projects</span
					>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300"
						><strong>Unlimited</strong> team members</span
					>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">All Basic features</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Enterprise-grade security</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Advanced AI-powered analysis</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">MECE redundancy analysis</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Custom integrations</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Priority 24/7 support</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Unlimited AI Usage</span>
				</li>
			</ul>
		</CardContent>
		<CardFooter class="pt-4">
			<Button
				href="#contact"
				variant="outline"
				size="lg"
				class="w-full font-medium"
				onclick={() =>
					document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Start Free Trial
			</Button>
		</CardFooter>
	</Card>

	<!-- Enterprise Plan -->
	<Card class="flex flex-col overflow-hidden">
		<CardHeader>
			<CardTitle class="text-center text-xl font-bold">Enterprise</CardTitle>
			<div class="mt-4 text-center">
				<span class="text-4xl font-bold">Contact Us</span>
				<span class="text-gray-500 dark:text-gray-400">for pricing</span>
			</div>
			<CardDescription class="mt-2 text-center"
				>Custom solutions & white-glove service</CardDescription
			>
		</CardHeader>
		<CardContent class="flex-grow">
			<ul class="space-y-3">
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="font-semibold text-gray-700 dark:text-gray-300"
						>All Professional features</span
					>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Custom onboarding & integrations</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Dedicated support manager</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">SLA & compliance</span>
				</li>
				<li class="flex items-start">
					<CheckIcon
						class="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
					/><span class="text-gray-700 dark:text-gray-300">Unlimited everything</span>
				</li>
			</ul>
		</CardContent>
		<CardFooter class="pt-4">
			<Button
				href="#contact"
				variant="outline"
				size="lg"
				class="w-full font-medium"
				onclick={() =>
					document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Contact Us
			</Button>
		</CardFooter>
	</Card>
</div>

<div class="mx-auto mt-12 max-w-xl rounded-lg bg-blue-50 p-6 dark:bg-blue-900/30">
	<div class="mb-4 flex items-center justify-center">
		<div class="flex items-center space-x-2">
			<button
				class={`rounded-l-md px-4 py-2 text-sm font-medium ${currency === 'usd' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
				onclick={() => toggleCurrency('usd')}>USD</button
			>
			<button
				class={`rounded-r-md px-4 py-2 text-sm font-medium ${currency === 'eur' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
				onclick={() => toggleCurrency('eur')}>EUR</button
			>
		</div>
	</div>
	<p class="text-center text-sm text-blue-800 dark:text-blue-200">
		All plans include a <strong>4-week free trial</strong> with full access to all features. No
		credit card required to start. <a href="#contact" class="font-semibold underline">Contact us</a>
		for custom enterprise solutions.
	</p>
</div>
