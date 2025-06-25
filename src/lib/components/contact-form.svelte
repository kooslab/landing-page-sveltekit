<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let isSubmitting = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		try {
			// For now, just show a success message
			// You can implement actual form submission logic here
			toast.success("Thank you for your message! We'll get back to you soon.");

			// Reset form
			formData = {
				name: '',
				email: '',
				message: ''
			};
		} catch (error) {
			toast.error('Something went wrong. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<div class="space-y-2">
		<Label for="name">Name</Label>
		<Input
			id="name"
			type="text"
			bind:value={formData.name}
			placeholder="Your name"
			required
			disabled={isSubmitting}
		/>
	</div>

	<div class="space-y-2">
		<Label for="email">Email</Label>
		<Input
			id="email"
			type="email"
			bind:value={formData.email}
			placeholder="your@email.com"
			required
			disabled={isSubmitting}
		/>
	</div>

	<div class="space-y-2">
		<Label for="message">Message</Label>
		<Textarea
			id="message"
			bind:value={formData.message}
			placeholder="Tell us about your project..."
			rows={5}
			required
			disabled={isSubmitting}
		/>
	</div>

	<Button type="submit" class="w-full" disabled={isSubmitting}>
		{isSubmitting ? 'Sending...' : 'Send Message'}
	</Button>
</form>
