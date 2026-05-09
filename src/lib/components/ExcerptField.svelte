<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { Sparkles, Check, X } from 'lucide-svelte';

	let {
		value = $bindable(''),
		content = '',
		model = 'claude-sonnet-4-6'
	}: {
		value: string;
		content: string;
		model: string;
	} = $props();

	let loading = $state(false);
	let suggestion = $state<string | null>(null);
	let error = $state<string | null>(null);

	async function suggest() {
		if (!content.trim()) return;
		loading = true;
		suggestion = null;
		error = null;
		try {
			const res = await fetch('/api/admin/blog/ai-excerpt', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content, model })
			});
			const data = await res.json();
			if (!res.ok) {
				error = data.error ?? 'Generation failed';
			} else {
				suggestion = data.excerpt;
			}
		} catch {
			error = 'Generation failed';
		} finally {
			loading = false;
		}
	}

	function accept() {
		if (suggestion) value = suggestion;
		suggestion = null;
	}

	function dismiss() {
		suggestion = null;
	}
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-semibold text-foreground">Excerpt (optional)</h2>
		<button
			type="button"
			onclick={suggest}
			disabled={loading || !content.trim()}
			class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
		>
			{#if loading}
				<span
					class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
				></span>
				Generating…
			{:else}
				<Sparkles size={13} />
				Suggest
			{/if}
		</button>
	</div>

	<Textarea
		id="excerpt"
		bind:value
		rows={3}
		placeholder="A brief summary of your blog post that will appear in the blog listing..."
	/>

	{#if error}
		<p class="text-xs text-destructive">{error}</p>
	{/if}

	{#if suggestion}
		<div class="rounded-md border bg-muted/40 px-3 py-2.5 text-sm">
			<p class="mb-2 text-foreground">{suggestion}</p>
			<div class="flex gap-2">
				<button
					type="button"
					onclick={accept}
					class="flex items-center gap-1 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
				>
					<Check size={12} />
					Use this
				</button>
				<button
					type="button"
					onclick={dismiss}
					class="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					<X size={12} />
					Dismiss
				</button>
			</div>
		</div>
	{/if}

	<p class="text-sm text-muted-foreground">A short preview of your article (2–3 sentences)</p>
</div>
