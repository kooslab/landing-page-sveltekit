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
			// Send email via API
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					to: 'johnnykoo@kooslab.net', // Direct email to avoid Google Groups bounce
					subject: `New Contact Form Submission from ${formData.name}`,
					text: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
					html: `
						<h2>New Contact Form Submission</h2>
						<p><strong>Name:</strong> ${formData.name}</p>
						<p><strong>Email:</strong> ${formData.email}</p>
						<p><strong>Message:</strong></p>
						<p>${formData.message.replace(/\n/g, '<br>')}</p>
					`
				})
			});

			const result = await response.json();

			if (response.ok && result.success) {
				toast.success("Thank you for your message! We'll get back to you soon.");
				// Reset form
				formData = {
					name: '',
					email: '',
					message: ''
				};
			} else {
				throw new Error(result.message || 'Failed to send email');
			}
		} catch (error) {
			console.error('Error sending email:', error);
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
