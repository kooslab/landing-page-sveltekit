<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ArrowRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let open = $state(false);
	let email = $state('');
	let submitting = $state(false);
	let consent = $state(false);
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim() || !email.includes('@')) {
			error = 'Please enter a valid email';
			return;
		}
		if (!consent) {
			error = 'Please agree to continue';
			return;
		}
		error = '';
		submitting = true;

		try {
			await fetch('/api/sample-report', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email.trim(),
					consentText: 'I agree that KooStory may store my email and contact me about their services. I can withdraw consent at any time.'
				})
			});
		} catch {
			// Don't block — still show the report
		}

		submitting = false;
		open = false;
		goto('/sample-report');
	}
</script>

<!-- Inline preview: 2 highlight cards -->
<div class="mt-10 md:mt-12">
	<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
		Sample from a real project
	</p>

	<div class="grid gap-4 sm:grid-cols-2">
		<!-- Highlight 1: A bottleneck -->
		<div class="rounded-xl border border-border bg-card p-5">
			<p class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
				Bottleneck found
			</p>
			<p class="mb-2 text-sm font-semibold">Inquiry reply depends on one person</p>
			<p class="text-xs leading-relaxed text-muted-foreground">
				Customer submits inquiry on landing page. Contact person receives email and has to reply manually. If they're busy or forget — the customer waits. Or leaves.
			</p>
			<p class="mt-3 border-t border-border pt-2.5 text-xs text-muted-foreground">
				Customer complaint: slow response, no confirmation
			</p>
		</div>

		<!-- Highlight 2: A suggestion -->
		<div class="rounded-xl border border-border bg-card p-5">
			<p class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
				Suggested action
			</p>
			<p class="mb-2 text-sm font-semibold">Automate inquiry response + contract flow</p>
			<p class="text-xs leading-relaxed text-muted-foreground">
				Customer gets instant confirmation with pricing and contract link. No human bottleneck at the first touchpoint.
			</p>
			<p class="mt-3 border-t border-border pt-2.5 text-xs font-medium text-foreground/70">
				No more waiting. No lost inquiries.
			</p>
		</div>
	</div>

	<!-- See full report CTA -->
	<Button
		size="lg"
		variant="outline"
		class="group mt-6 w-full text-sm sm:w-auto"
		onclick={() => (open = true)}
	>
		See full sample report
		<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
	</Button>

	<p class="mt-3 text-xs text-muted-foreground">Sample from a real project. Your report will be tailored to your business.</p>
</div>

<!-- Email capture dialog -->
<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-sm">
		<Dialog.Header>
			<Dialog.Title>View the full report</Dialog.Title>
			<Dialog.Description>Enter your email to see the complete sample report.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<Input
					type="email"
					bind:value={email}
					placeholder="you@company.com"
				/>
				{#if error}
					<p class="mt-1.5 text-xs text-destructive">{error}</p>
				{/if}
			</div>
			<label class="flex cursor-pointer items-start gap-2.5">
				<input
					type="checkbox"
					bind:checked={consent}
					class="mt-0.5 h-4 w-4 rounded border-border"
				/>
				<span class="text-xs leading-relaxed text-muted-foreground">
					I agree that KooStory may store my email and contact me about their services. I can withdraw consent at any time.
				</span>
			</label>
			<Button type="submit" class="w-full" disabled={submitting || !consent}>
				{submitting ? 'Loading...' : 'View Report'}
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
