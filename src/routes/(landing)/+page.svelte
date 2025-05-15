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
	import { CheckIcon, TriangleAlert } from 'lucide-svelte';
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

	<!-- Testimonials Section -->
	<section class="bg-gray-900 py-16">
		<div class="container mx-auto px-4">
			<h2 class="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
				What Our Clients Say
			</h2>

			<TestimonialCarousel {testimonials} />
		</div>
	</section>

	<!-- Preview Section -->
	<section class="mx-auto my-12 max-w-6xl px-4 text-center">
		<Card class="p-4">
			<CardHeader>
				<CardTitle>Requirements Management Tool</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="mb-6 rounded border dark:border-gray-700">
					<div class="flex items-center justify-between bg-gray-100 p-3 dark:bg-gray-700">
						<h3 class="font-semibold dark:text-gray-200">User Management</h3>
						<span class="text-sm text-gray-500 dark:text-gray-400">3 requirements</span>
					</div>
					<div class="overflow-hidden">
						<table class="w-full text-sm">
							<thead class="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th class="p-2 text-left">ID</th>
									<th class="p-2 text-left">User</th>
									<th class="hidden p-2 text-left sm:table-cell">User Story</th>
									<th class="p-2 text-left">Priority</th>
								</tr>
							</thead>
							<tbody class="text-left">
								<tr class="border-t dark:border-gray-700">
									<td class="p-2">USM-001</td>
									<td class="p-2">Admin</td>
									<td class="hidden p-2 sm:table-cell">
										As an admin, I want to create user accounts...
									</td>
									<td class="p-2">
										<Badge variant="destructive">High</Badge>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</CardContent>
			<CardFooter class="flex justify-center">
				<Button href="/reqs" variant="default" class="px-6 py-3 font-medium">
					Try Requirements Management
				</Button>
			</CardFooter>
		</Card>
	</section>
</main>
