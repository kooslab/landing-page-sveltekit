<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { _ } from 'svelte-i18n';

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
					to: 'johnnykoo@koostory.net', // Direct email to avoid Google Groups bounce
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
		<Label for="name">{$_('contact.form.name')}</Label>
		<Input
			id="name"
			type="text"
			bind:value={formData.name}
			placeholder={$_('contact.form.namePlaceholder')}
			required
			disabled={isSubmitting}
		/>
	</div>

	<div class="space-y-2">
		<Label for="email">{$_('contact.form.email')}</Label>
		<Input
			id="email"
			type="email"
			bind:value={formData.email}
			placeholder={$_('contact.form.emailPlaceholder')}
			required
			disabled={isSubmitting}
		/>
	</div>

	<div class="space-y-2">
		<Label for="message">{$_('contact.form.message')}</Label>
		<Textarea
			id="message"
			bind:value={formData.message}
			placeholder={$_('contact.form.messagePlaceholder')}
			rows={5}
			required
			disabled={isSubmitting}
		/>
	</div>

	<Button type="submit" class="w-full" disabled={isSubmitting}>
		{isSubmitting ? $_('contact.form.sending') : $_('contact.form.submit')}
	</Button>
</form>
