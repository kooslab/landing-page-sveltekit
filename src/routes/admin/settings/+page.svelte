<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Check, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedIds = $state<string[]>([...data.selectedIds]);
	let showApiKey = $state(false);

	let savingApiKey = $state(false);
	let removingApiKey = $state(false);
	let savingVoice = $state(false);

	let apiKeyInput = $state('');

	let voiceHasChanges = $derived.by(() => {
		const current = [...selectedIds].sort().join('|');
		const saved = [...data.selectedIds].sort().join('|');
		return current !== saved;
	});

	const PAGE_SIZE = 5;
	let currentPage = $state(0);

	let totalPages = $derived(Math.max(1, Math.ceil(data.allPosts.length / PAGE_SIZE)));
	let visiblePosts = $derived(
		data.allPosts.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
	);
	let visibleIds = $derived(new Set(visiblePosts.map((p) => p.id)));
	let offPageSelectedIds = $derived(selectedIds.filter((id) => !visibleIds.has(id)));

	function toggle(id: string) {
		const idx = selectedIds.indexOf(id);
		if (idx >= 0) {
			selectedIds = selectedIds.filter((x) => x !== id);
		} else {
			if (selectedIds.length >= 3) return;
			selectedIds = [...selectedIds, id];
		}
	}

	function goPrev() {
		if (currentPage > 0) currentPage -= 1;
	}
	function goNext() {
		if (currentPage < totalPages - 1) currentPage += 1;
	}
</script>

<div class="max-w-3xl flex-1 px-8 py-8">
	<h1 class="mb-8 text-3xl font-bold">Settings</h1>

	{#if form && 'error' in form && form.error}
		<div
			class="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
		>
			{form.error}
		</div>
	{/if}
	{#if form && 'saved' in form && form.saved}
		<div
			class="mb-4 flex items-center gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
		>
			<Check size={16} />
			Saved.
		</div>
	{/if}

	<!-- Anthropic API Key -->
	<section class="mb-10 space-y-3 rounded-lg border bg-card p-6">
		<h2 class="text-lg font-semibold">Anthropic API Key</h2>
		<p class="text-sm text-muted-foreground">
			Used for AI review and vocabulary suggestions in the blog editor. Stored encrypted at rest
			(AES-256-GCM).
		</p>

		{#if data.apiKeyConfigured}
			<div class="flex items-center justify-between rounded-md border bg-muted/30 px-4 py-3">
				<div class="text-sm">
					<span class="text-green-600 dark:text-green-400">✓ Configured</span>
					<span class="ml-2 font-mono text-muted-foreground">{data.apiKeyMask}</span>
				</div>
				<form
					method="POST"
					action="?/removeApiKey"
					use:enhance={() => {
						removingApiKey = true;
						return async ({ update }) => {
							await update();
							removingApiKey = false;
						};
					}}
				>
					<Button type="submit" variant="outline" size="sm" disabled={removingApiKey}>
						{removingApiKey ? 'Removing…' : 'Remove'}
					</Button>
				</form>
			</div>
		{/if}

		<form
			method="POST"
			action="?/saveApiKey"
			use:enhance={() => {
				savingApiKey = true;
				return async ({ update, result }) => {
					await update();
					savingApiKey = false;
					if (result.type === 'success') apiKeyInput = '';
				};
			}}
			class="space-y-3"
		>
			<Label for="apiKey">{data.apiKeyConfigured ? 'Replace with new key' : 'Add API key'}</Label>
			<div class="relative">
				<Input
					id="apiKey"
					name="apiKey"
					type={showApiKey ? 'text' : 'password'}
					placeholder="sk-ant-api03-..."
					autocomplete="off"
					class="pr-10 font-mono"
					bind:value={apiKeyInput}
				/>
				<button
					type="button"
					onclick={() => (showApiKey = !showApiKey)}
					class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
					aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
					title={showApiKey ? 'Hide' : 'Show'}
				>
					{#if showApiKey}
						<EyeOff size={16} />
					{:else}
						<Eye size={16} />
					{/if}
				</button>
			</div>
			<Button type="submit" disabled={savingApiKey || apiKeyInput.trim().length === 0}>
				{savingApiKey ? 'Saving…' : 'Save key'}
			</Button>
		</form>
	</section>

	<!-- Voice Reference Posts -->
	<section class="space-y-3 rounded-lg border bg-card p-6">
		<h2 class="text-lg font-semibold">Voice Reference Posts</h2>
		<p class="text-sm text-muted-foreground">
			Pick up to 3 of your posts that sound <em>most you</em>. Claude will use these as the baseline
			for what your authentic voice looks like, so it doesn't try to "polish" your drafts into
			generic AI-flavored writing.
		</p>
		<p class="text-xs text-muted-foreground">
			Selected: {selectedIds.length} / 3
		</p>

		<form
			method="POST"
			action="?/saveVoicePosts"
			use:enhance={() => {
				savingVoice = true;
				return async ({ update }) => {
					await update();
					savingVoice = false;
				};
			}}
			class="space-y-2"
		>
			{#each visiblePosts as post}
				{@const checked = selectedIds.includes(post.id)}
				{@const disabled = !checked && selectedIds.length >= 3}
				<label
					class="flex items-center gap-3 rounded-md border px-4 py-3 transition-colors {checked
						? 'border-primary/40 bg-primary/5'
						: 'hover:bg-accent/30'} {disabled ? 'opacity-40' : 'cursor-pointer'}"
				>
					<input
						type="checkbox"
						name="postId"
						value={post.id}
						{checked}
						{disabled}
						onchange={() => toggle(post.id)}
						class="h-4 w-4 rounded border-input"
					/>
					<div class="flex-1">
						<div class="font-medium">{post.title}</div>
						<div class="text-xs text-muted-foreground">
							{new Date(post.createdAt).toLocaleDateString()}
							{#if !post.published}
								· <span class="text-amber-600 dark:text-amber-400">draft</span>
							{/if}
						</div>
					</div>
				</label>
			{:else}
				<p class="text-sm text-muted-foreground">
					No posts yet — write your first one and come back.
				</p>
			{/each}

			<!-- Hidden inputs preserve selections that are on other pages -->
			{#each offPageSelectedIds as id}
				<input type="hidden" name="postId" value={id} />
			{/each}

			{#if data.allPosts.length > PAGE_SIZE}
				<div class="flex items-center justify-between border-t pt-3">
					<button
						type="button"
						onclick={goPrev}
						disabled={currentPage === 0}
						class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
					>
						<ChevronLeft size={16} />
						Prev
					</button>
					<span class="text-xs text-muted-foreground">
						Page {currentPage + 1} of {totalPages}
					</span>
					<button
						type="button"
						onclick={goNext}
						disabled={currentPage >= totalPages - 1}
						class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
					>
						Next
						<ChevronRight size={16} />
					</button>
				</div>
			{/if}

			<div class="pt-3">
				<Button type="submit" disabled={savingVoice || !voiceHasChanges}>
					{savingVoice ? 'Saving…' : voiceHasChanges ? 'Save selection' : 'No changes'}
				</Button>
			</div>
		</form>
	</section>
</div>
