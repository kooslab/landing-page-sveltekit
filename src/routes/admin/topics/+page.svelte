<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Lightbulb, Send, Trash2, Sparkles, Square } from 'lucide-svelte';
	import { tick } from 'svelte';
	import ThinkingIndicator from '$lib/components/ThinkingIndicator.svelte';
	import Markdown from '$lib/components/Markdown.svelte';

	type ChatTurn = {
		id: string;
		role: 'user' | 'assistant';
		content: string;
		loading?: boolean;
		error?: string | null;
	};

	const MODELS = [
		{ value: 'claude-haiku-4-5', label: 'Haiku 4.5 — fastest & cheapest' },
		{ value: 'claude-sonnet-4-6', label: 'Sonnet 4.6 — balanced (default)' },
		{ value: 'claude-opus-4-7', label: 'Opus 4.7 — most capable' }
	] as const;

	const QUICK_PROMPTS = [
		'Suggest 5 vertical extensions of my recent posts.',
		'Suggest 5 brand-new directions that fit my existing audience.',
		'What gaps or unanswered questions exist in my published posts?',
		'Looking at my catalog, which topic could I credibly own as a niche?'
	];

	let model = $state<(typeof MODELS)[number]['value']>('claude-sonnet-4-6');
	let thread = $state<ChatTurn[]>([]);
	let input = $state('');
	let loading = $state(false);
	let scrollContainer: HTMLDivElement | undefined = $state();
	let abortCtrl: AbortController | null = $state(null);

	async function send(message?: string) {
		const text = (message ?? input).trim();
		if (!text || loading) return;

		const userTurn: ChatTurn = {
			id: `u-${Date.now()}`,
			role: 'user',
			content: text
		};
		const newAssistantTurn: ChatTurn = {
			id: `a-${Date.now()}`,
			role: 'assistant',
			content: '',
			loading: true,
			error: null
		};

		thread = [...thread, userTurn, newAssistantTurn];
		// Reactive proxy reference — mutations via assistantTurn.* now trigger re-renders.
		// Mutating newAssistantTurn directly would bypass the $state proxy.
		const assistantTurn = thread[thread.length - 1];
		input = '';
		loading = true;
		abortCtrl = new AbortController();

		await tick();
		scrollToBottom();

		try {
			// Build messages array (only completed turns, drop the loading assistant placeholder)
			const apiMessages = thread
				.filter((t) => !t.loading)
				.map((t) => ({ role: t.role, content: t.content }));

			const res = await fetch('/api/admin/topics/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: apiMessages, model }),
				signal: abortCtrl.signal
			});
			if (!res.ok) {
				let errMsg = 'Chat failed';
				try {
					const data = await res.json();
					errMsg = data.error ?? errMsg;
				} catch {
					/* ignore */
				}
				assistantTurn.error = errMsg;
				return;
			}
			const reader = res.body?.getReader();
			if (!reader) {
				assistantTurn.error = 'No response body';
				return;
			}
			const decoder = new TextDecoder();
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				assistantTurn.content += decoder.decode(value, { stream: true });
				await tick();
				scrollToBottom();
			}
			assistantTurn.content += decoder.decode();
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') {
				// User stopped — keep partial content; don't mark as error
			} else {
				assistantTurn.error = e instanceof Error ? e.message : 'Chat failed';
			}
		} finally {
			assistantTurn.loading = false;
			loading = false;
			abortCtrl = null;
			await tick();
			scrollToBottom();
		}
	}

	function stop() {
		abortCtrl?.abort();
	}

	function scrollToBottom() {
		if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
	}

	function clearThread() {
		thread = [];
	}
</script>

<div class="flex h-screen flex-1 flex-col">
	<!-- Header -->
	<header class="border-b bg-background px-8 py-4">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-2">
				<Lightbulb class="text-primary" size={22} />
				<h1 class="text-xl font-semibold">Topic Explorer</h1>
			</div>
			<div class="flex items-center gap-2">
				<select bind:value={model} class="rounded-md border bg-background px-2 py-1 text-xs">
					{#each MODELS as m}
						<option value={m.value}>{m.label}</option>
					{/each}
				</select>
				{#if thread.length > 0}
					<button
						type="button"
						onclick={clearThread}
						class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
					>
						<Trash2 size={12} />
						Clear
					</button>
				{/if}
			</div>
		</div>
		<p class="mt-1 text-xs text-muted-foreground">
			Brainstorm next post topics with full awareness of what you've already published.
		</p>
	</header>

	<!-- Thread (scrollable) -->
	<div bind:this={scrollContainer} class="flex-1 overflow-y-auto px-8 py-6">
		{#if thread.length === 0}
			<div class="mx-auto max-w-2xl space-y-4 text-center">
				<Sparkles class="mx-auto text-primary/60" size={36} />
				<p class="text-sm text-muted-foreground">
					Start with a quick prompt or type your own question. Claude has your full post catalog
					(published + drafts) and your voice reference posts as context.
				</p>
				<div class="mx-auto flex max-w-xl flex-col gap-2 pt-2 text-left">
					{#each QUICK_PROMPTS as prompt}
						<button
							type="button"
							onclick={() => send(prompt)}
							class="rounded-lg border bg-card px-4 py-3 text-sm transition-colors hover:bg-accent"
						>
							{prompt}
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="mx-auto max-w-3xl space-y-5">
				{#each thread as turn (turn.id)}
					{#if turn.role === 'user'}
						<div class="flex justify-end">
							<div class="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-2.5 text-sm">
								{turn.content}
							</div>
						</div>
					{:else}
						<div class="flex justify-start">
							<div class="max-w-[85%] space-y-1">
								<div class="text-[10px] uppercase tracking-wider text-muted-foreground">Claude</div>
								{#if turn.error}
									<div
										class="rounded-2xl rounded-tl-sm border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
									>
										{turn.error}
									</div>
								{:else if turn.loading && !turn.content}
									<ThinkingIndicator
										messages={[
											'Reading your catalog…',
											'Looking for gaps in your published posts…',
											'Cross-referencing voice baseline…',
											'Drafting suggestions…',
											'Almost there…'
										]}
									/>
								{:else}
									<div class="rounded-2xl rounded-tl-sm border bg-card px-4 py-2.5 text-sm">
										<Markdown source={turn.content} />
										{#if turn.loading}
											<span
												class="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle"
											></span>
										{/if}
									</div>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<!-- Input -->
	<form
		onsubmit={(e) => {
			e.preventDefault();
			send();
		}}
		class="border-t bg-background px-8 py-3"
	>
		<div class="mx-auto flex max-w-3xl items-end gap-2">
			<textarea
				bind:value={input}
				placeholder="Ask about topics… ('What's a vertical extension of my last post?')"
				rows="2"
				disabled={loading}
				class="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
				onkeydown={(e) => {
					if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
						e.preventDefault();
						send();
					}
				}}
			></textarea>
			{#if loading}
				<Button type="button" onclick={stop} variant="destructive" class="h-10">
					<Square size={14} class="fill-current" />
					<span class="ml-1">Stop</span>
				</Button>
			{:else}
				<Button type="submit" disabled={!input.trim()} class="h-10">
					<Send size={14} />
					<span class="ml-1">Send</span>
				</Button>
			{/if}
		</div>
		<p class="mt-1 text-center text-[10px] text-muted-foreground/70">
			⌘+Enter to send · thread is ephemeral (clears on refresh)
		</p>
	</form>
</div>
