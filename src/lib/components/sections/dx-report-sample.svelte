<script lang="ts">
	import { _ } from 'svelte-i18n';
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
			error = $_('dxReport.emailError');
			return;
		}
		if (!consent) {
			error = $_('dxReport.emailDialog.consentError');
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
					consentText: $_('dxReport.emailDialog.consent')
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
		{$_('dxReport.previewLabel')}
	</p>

	<div class="grid gap-4 sm:grid-cols-2">
		<!-- Highlight 1: A bottleneck -->
		<div class="rounded-xl border border-border bg-card p-5">
			<p class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
				{$_('dxReport.case.bottleneck')}
			</p>
			<p class="mb-2 text-sm font-semibold">{$_('dxReport.case.highlight1.title')}</p>
			<p class="text-xs leading-relaxed text-muted-foreground">
				{$_('dxReport.case.highlight1.description')}
			</p>
			<p class="mt-3 border-t border-border pt-2.5 text-xs text-muted-foreground">
				{$_('dxReport.case.highlight1.impact')}
			</p>
		</div>

		<!-- Highlight 2: A suggestion -->
		<div class="rounded-xl border border-border bg-card p-5">
			<p class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
				{$_('dxReport.case.suggestion')}
			</p>
			<p class="mb-2 text-sm font-semibold">{$_('dxReport.case.highlight2.title')}</p>
			<p class="text-xs leading-relaxed text-muted-foreground">
				{$_('dxReport.case.highlight2.description')}
			</p>
			<p class="mt-3 border-t border-border pt-2.5 text-xs font-medium text-foreground/70">
				{$_('dxReport.case.highlight2.value')}
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
		{$_('dxReport.seeFullReport')}
		<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
	</Button>

	<p class="mt-3 text-xs text-muted-foreground">{$_('dxReport.disclaimer')}</p>
</div>

<!-- Email capture dialog -->
<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-sm">
		<Dialog.Header>
			<Dialog.Title>{$_('dxReport.emailDialog.title')}</Dialog.Title>
			<Dialog.Description>{$_('dxReport.emailDialog.description')}</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<Input
					type="email"
					bind:value={email}
					placeholder={$_('dxReport.emailDialog.placeholder')}
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
					{$_('dxReport.emailDialog.consent')}
				</span>
			</label>
			<Button type="submit" class="w-full" disabled={submitting || !consent}>
				{submitting ? $_('dxReport.emailDialog.submitting') : $_('dxReport.emailDialog.submit')}
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
