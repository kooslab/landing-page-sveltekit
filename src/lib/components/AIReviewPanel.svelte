<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Sparkles, X, Settings, CheckCircle2, Send, MessageCircle, Square } from 'lucide-svelte';
	import WordDiff from './WordDiff.svelte';
	import ThinkingIndicator from './ThinkingIndicator.svelte';
	import Markdown from './Markdown.svelte';

	type SuggestionType =
		| 'typo'
		| 'clarity'
		| 'markdown'
		| 'broken_ref'
		| 'undefined_term'
		| 'unfinished'
		| 'narrative'
		| 'consistency';
	type Suggestion = {
		id: string;
		type: SuggestionType;
		original: string;
		suggestion: string;
		reason: string;
		dismissed: boolean;
		applied: boolean;
	};

	const MODELS = [
		{ value: 'claude-haiku-4-5', label: 'Haiku 4.5 — fastest & cheapest' },
		{ value: 'claude-sonnet-4-6', label: 'Sonnet 4.6 — balanced (default)' },
		{ value: 'claude-opus-4-7', label: 'Opus 4.7 — most capable' }
	] as const;

	const CATEGORIES: {
		value: SuggestionType;
		label: string;
		defaultOn: boolean;
		statusMsg: string;
	}[] = [
		{ value: 'typo', label: 'Typo', defaultOn: true, statusMsg: 'Scanning for typos…' },
		{ value: 'clarity', label: 'Clarity', defaultOn: true, statusMsg: 'Checking clarity…' },
		{
			value: 'markdown',
			label: 'Markdown syntax',
			defaultOn: true,
			statusMsg: 'Validating markdown syntax…'
		},
		{
			value: 'broken_ref',
			label: 'Broken refs',
			defaultOn: true,
			statusMsg: 'Following internal references…'
		},
		{
			value: 'undefined_term',
			label: 'Undefined terms',
			defaultOn: false,
			statusMsg: 'Looking for undefined terms…'
		},
		{
			value: 'unfinished',
			label: 'Unfinished thoughts',
			defaultOn: false,
			statusMsg: 'Hunting unfinished thoughts…'
		},
		{
			value: 'narrative',
			label: 'Narrative flow',
			defaultOn: false,
			statusMsg: 'Reading paragraph transitions…'
		},
		{
			value: 'consistency',
			label: 'Self-consistency',
			defaultOn: false,
			statusMsg: 'Cross-checking for contradictions…'
		}
	];

	let {
		open = $bindable(false),
		content = $bindable(''),
		model = $bindable<(typeof MODELS)[number]['value']>('claude-sonnet-4-6'),
		onHighlight = undefined as ((range: { start: number; end: number } | null) => void) | undefined
	}: {
		open: boolean;
		content: string;
		model: (typeof MODELS)[number]['value'];
		onHighlight?: (range: { start: number; end: number } | null) => void;
	} = $props();
	let suggestions = $state<Suggestion[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let lastReviewedAt = $state<Date | null>(null);
	let selectedSuggestionId = $state<string | null>(null);
	let reviewAbort: AbortController | null = null;
	let askAbort: AbortController | null = null;

	let activeCategories = $state<Record<SuggestionType, boolean>>(
		Object.fromEntries(CATEGORIES.map((c) => [c.value, c.defaultOn])) as Record<
			SuggestionType,
			boolean
		>
	);
	let activeCategoryList = $derived(
		CATEGORIES.filter((c) => activeCategories[c.value]).map((c) => c.value)
	);
	let reviewStatusMessages = $derived([
		'Reading your draft…',
		...CATEGORIES.filter((c) => activeCategories[c.value]).map((c) => c.statusMsg),
		'Drafting suggestions…',
		'Almost there…'
	]);

	// "Ask about this draft" — free-form Q&A thread (separate from structured review)
	type AskTurn = {
		id: string;
		question: string;
		answer: string | null;
		error: string | null;
		loading: boolean;
	};
	let askInput = $state('');
	let askThread = $state<AskTurn[]>([]);

	async function submitAsk() {
		const q = askInput.trim();
		if (!q || !content.trim()) return;
		// One in-flight ask at a time; stop any prior call first
		askAbort?.abort();
		askAbort = new AbortController();
		const newTurn: AskTurn = {
			id: `${Date.now()}`,
			question: q,
			answer: null,
			error: null,
			loading: true
		};
		askThread = [...askThread, newTurn];
		// Reactive proxy reference — mutations via turn.* now trigger re-renders.
		// Mutating newTurn directly would bypass the $state proxy.
		const turn = askThread[askThread.length - 1];
		askInput = '';
		try {
			const res = await fetch('/api/admin/blog/ai-ask', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content, question: q, model }),
				signal: askAbort.signal
			});
			if (!res.ok) {
				// JSON error path (validation, auth, rate limit before stream starts)
				let errMsg = 'Ask failed';
				try {
					const data = await res.json();
					errMsg = data.error ?? errMsg;
				} catch {
					/* ignore JSON parse error */
				}
				turn.error = errMsg;
				turn.loading = false;
				return;
			}
			// Stream the body
			turn.answer = '';
			const reader = res.body?.getReader();
			if (!reader) {
				turn.error = 'No response body';
				turn.loading = false;
				return;
			}
			const decoder = new TextDecoder();
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				turn.answer = (turn.answer ?? '') + decoder.decode(value, { stream: true });
			}
			turn.answer = (turn.answer ?? '') + decoder.decode();
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') {
				// User stopped — keep partial answer; don't mark as error
			} else {
				turn.error = e instanceof Error ? e.message : 'Ask failed';
			}
		} finally {
			turn.loading = false;
			askAbort = null;
		}
	}

	function clearThread() {
		askThread = [];
	}

	function selectSuggestion(s: Suggestion) {
		// Toggle: clicking the same one again deselects
		if (selectedSuggestionId === s.id) {
			selectedSuggestionId = null;
			onHighlight?.(null);
			return;
		}
		const start = content.indexOf(s.original);
		if (start === -1) {
			// stale — text was edited, don't try to highlight
			selectedSuggestionId = s.id;
			onHighlight?.(null);
			return;
		}
		selectedSuggestionId = s.id;
		onHighlight?.({ start, end: start + s.original.length });
	}

	function isStale(s: Suggestion): boolean {
		if (s.dismissed || s.applied) return false;
		return !content.includes(s.original);
	}

	async function runReview() {
		loading = true;
		error = null;
		selectedSuggestionId = null;
		onHighlight?.(null);
		reviewAbort = new AbortController();
		try {
			const res = await fetch('/api/admin/blog/ai-review', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content, model, categories: activeCategoryList }),
				signal: reviewAbort.signal
			});
			const data = await res.json();
			if (!res.ok) {
				error = data.error ?? 'Review failed';
				return;
			}
			suggestions = (
				data.suggestions as Array<Omit<Suggestion, 'id' | 'dismissed' | 'applied'>>
			).map((s, i) => ({
				...s,
				id: `${Date.now()}-${i}`,
				dismissed: false,
				applied: false
			}));
			lastReviewedAt = new Date();
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') {
				// User stopped — leave state as-is, no error
			} else {
				error = e instanceof Error ? e.message : 'Review failed';
			}
		} finally {
			loading = false;
			reviewAbort = null;
		}
	}

	function stopReview() {
		reviewAbort?.abort();
	}

	function stopAsk() {
		askAbort?.abort();
	}

	function applySuggestion(s: Suggestion) {
		if (isStale(s)) return;
		content = content.replace(s.original, s.suggestion);
		s.applied = true;
		if (selectedSuggestionId === s.id) {
			selectedSuggestionId = null;
			onHighlight?.(null);
		}
	}

	function dismiss(s: Suggestion) {
		s.dismissed = true;
		if (selectedSuggestionId === s.id) {
			selectedSuggestionId = null;
			onHighlight?.(null);
		}
	}

	let activeSuggestions = $derived(suggestions.filter((s) => !s.dismissed && !s.applied));
	let staleCount = $derived(activeSuggestions.filter(isStale).length);
	let liveCount = $derived(activeSuggestions.filter((s) => !isStale(s)).length);

	const TYPE_LABELS: Record<SuggestionType, string> = {
		typo: 'TYPO',
		clarity: 'CLARITY',
		markdown: 'MARKDOWN',
		broken_ref: 'BROKEN REF',
		undefined_term: 'UNDEFINED TERM',
		unfinished: 'UNFINISHED',
		narrative: 'NARRATIVE',
		consistency: 'CONSISTENCY'
	};

	const TYPE_BADGE: Record<SuggestionType, string> = {
		typo: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
		clarity: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
		markdown: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
		broken_ref: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
		undefined_term: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
		unfinished: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
		narrative: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
		consistency: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
	};
</script>

{#if open}
	<!-- Backdrop click-to-close on small screens -->
	<button
		aria-label="Close panel"
		class="fixed inset-0 z-30 bg-black/20 lg:hidden"
		onclick={() => (open = false)}
	></button>

	<aside
		class="fixed right-0 top-0 z-40 flex h-screen w-full max-w-md flex-col border-l bg-background shadow-xl"
	>
		<header class="flex items-center justify-between border-b px-4 py-3">
			<div class="flex items-center gap-2">
				<Sparkles size={18} class="text-primary" />
				<h2 class="text-base font-semibold">AI Review</h2>
			</div>
			<div class="flex items-center gap-1">
				<a
					href="/admin/settings"
					target="_blank"
					rel="noopener"
					class="rounded p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
					aria-label="Settings"
				>
					<Settings size={16} />
				</a>
				<button
					onclick={() => (open = false)}
					class="rounded p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
					aria-label="Close panel"
				>
					<X size={16} />
				</button>
			</div>
		</header>

		<!-- Controls -->
		<div class="space-y-3 border-b px-4 py-3">
			<div class="space-y-1.5">
				<label for="ai-model" class="text-xs font-medium text-muted-foreground">Model</label>
				<select
					id="ai-model"
					bind:value={model}
					class="w-full rounded-md border bg-background px-3 py-2 text-sm"
				>
					{#each MODELS as m}
						<option value={m.value}>{m.label}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-1.5">
				<div class="text-xs font-medium text-muted-foreground">Categories</div>
				<div class="grid grid-cols-2 gap-x-3 gap-y-1.5">
					{#each CATEGORIES as cat}
						<label class="flex cursor-pointer items-center gap-2 text-xs">
							<input
								type="checkbox"
								bind:checked={activeCategories[cat.value]}
								class="h-3.5 w-3.5 rounded border-input"
							/>
							{cat.label}
						</label>
					{/each}
				</div>
			</div>

			{#if loading}
				<Button onclick={stopReview} variant="destructive" class="w-full">
					<Square size={14} class="fill-current" />
					<span class="ml-2">Stop</span>
				</Button>
			{:else}
				<Button
					onclick={runReview}
					disabled={!content.trim() || activeCategoryList.length === 0}
					class="w-full"
				>
					{#if suggestions.length === 0}
						Review with AI
					{:else}
						Re-run review
					{/if}
				</Button>
			{/if}

			{#if lastReviewedAt}
				<p class="text-xs text-muted-foreground">
					Last review: {lastReviewedAt.toLocaleTimeString()} · {liveCount} active
					{#if staleCount > 0}
						· {staleCount} stale
					{/if}
				</p>
			{/if}
		</div>

		<!-- Body (scrolls; sticky ask-input below) -->
		<div class="flex-1 overflow-y-auto px-4 py-4">
			{#if error}
				<div
					class="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
				>
					{error}
				</div>
			{:else if loading && suggestions.length === 0}
				<ThinkingIndicator messages={reviewStatusMessages} />
			{:else if !lastReviewedAt}
				<div class="space-y-3 text-sm text-muted-foreground">
					<p>Click <b>Review with AI</b> to get a pass over your draft.</p>
					<p>
						Claude is configured to flag only the categories above — never to "polish" your voice.
					</p>
					<p class="text-xs">
						If you want vocabulary alternatives, select a word in the editor and click the floating
						button.
					</p>
				</div>
			{:else if suggestions.length === 0}
				<div
					class="rounded-lg border border-green-300 bg-green-50 px-4 py-6 text-center dark:border-green-800 dark:bg-green-950/40"
				>
					<CheckCircle2 size={32} class="mx-auto mb-2 text-green-600 dark:text-green-400" />
					<p class="font-semibold text-green-800 dark:text-green-300">No issues found</p>
					<p class="mt-1 text-xs text-green-700/80 dark:text-green-400/70">
						Claude reviewed your draft against the active categories and found nothing to flag. Your
						voice came through clean.
					</p>
				</div>
			{:else if activeSuggestions.length === 0}
				<div
					class="rounded-md border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground"
				>
					All suggestions handled. Re-run review if you've made changes.
				</div>
			{:else}
				<ul class="space-y-3">
					{#each activeSuggestions as s (s.id)}
						{@const stale = isStale(s)}
						{@const selected = selectedSuggestionId === s.id}
						<li
							class="rounded-lg border transition-colors {stale ? 'opacity-50' : ''} {selected
								? 'border-primary bg-primary/5 ring-1 ring-primary/40'
								: 'hover:bg-accent/30'}"
						>
							<button
								type="button"
								onclick={() => selectSuggestion(s)}
								class="block w-full p-3 text-left"
							>
								<div class="mb-2 flex items-center justify-between">
									<span
										class="rounded px-2 py-0.5 text-[10px] font-bold tracking-wider {TYPE_BADGE[
											s.type
										]}"
									>
										{TYPE_LABELS[s.type]}
									</span>
									{#if stale}
										<span class="text-[10px] uppercase tracking-wider text-muted-foreground"
											>stale</span
										>
									{:else if selected}
										<span class="text-[10px] uppercase tracking-wider text-primary">selected</span>
									{/if}
								</div>

								<div class="mb-2 rounded bg-muted/40 px-3 py-2 {stale ? 'line-through' : ''}">
									<WordDiff original={s.original} suggestion={s.suggestion} />
								</div>

								<p class="text-xs text-muted-foreground">
									<span class="font-medium">Why:</span>
									{s.reason}
								</p>
							</button>

							<div class="flex gap-2 border-t px-3 py-2">
								<Button size="sm" onclick={() => applySuggestion(s)} disabled={stale}>Apply</Button>
								<Button size="sm" variant="ghost" onclick={() => dismiss(s)}>Dismiss</Button>
							</div>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Ask thread (free-form Q&A) -->
			{#if askThread.length > 0}
				<div class="mt-6 space-y-3 border-t pt-4">
					<div class="flex items-center justify-between">
						<div
							class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
						>
							<MessageCircle size={14} />
							Ask thread
						</div>
						<button
							type="button"
							onclick={clearThread}
							class="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
						>
							Clear
						</button>
					</div>
					{#each askThread as turn (turn.id)}
						<div class="space-y-2">
							<div class="ml-6 rounded-lg rounded-tr-sm bg-primary/10 px-3 py-2 text-sm">
								{turn.question}
							</div>
							{#if turn.error}
								<div
									class="mr-6 rounded-lg rounded-tl-sm border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
								>
									{turn.error}
								</div>
							{:else if turn.loading && !turn.answer}
								<div class="mr-6">
									<ThinkingIndicator label="Reading your draft" />
								</div>
							{:else}
								<div class="mr-6 rounded-lg rounded-tl-sm border bg-card px-3 py-2 text-sm">
									<Markdown source={turn.answer ?? ''} />
									{#if turn.loading}
										<span
											class="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle"
										></span>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Sticky ask input -->
		<form
			onsubmit={(e) => {
				e.preventDefault();
				submitAsk();
			}}
			class="border-t bg-background px-3 py-2"
		>
			<div class="flex items-end gap-2">
				<textarea
					bind:value={askInput}
					placeholder={'Ask about this draft… ("Does paragraph 3 make sense?")'}
					rows="2"
					class="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
					onkeydown={(e) => {
						if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
							e.preventDefault();
							submitAsk();
						}
					}}
				></textarea>
				{#if askAbort}
					<button
						type="button"
						onclick={stopAsk}
						class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:opacity-90"
						aria-label="Stop"
						title="Stop"
					>
						<Square size={14} class="fill-current" />
					</button>
				{:else}
					<button
						type="submit"
						disabled={!askInput.trim() || !content.trim()}
						class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
						aria-label="Send"
					>
						<Send size={14} />
					</button>
				{/if}
			</div>
			<p class="mt-1 text-[10px] text-muted-foreground/70">⌘+Enter to send</p>
		</form>
	</aside>
{/if}
