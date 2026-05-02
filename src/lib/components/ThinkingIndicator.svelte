<script lang="ts">
	let {
		label = 'Thinking',
		messages = undefined as string[] | undefined
	}: {
		label?: string;
		messages?: string[];
	} = $props();

	const EMOJIS = ['🤔', '💭', '🧠', '💡', '✨'];
	const BAR_WIDTH = 10;
	const MESSAGE_INTERVAL_MS = 1800;

	let frame = $state(0);
	let sweepPos = $state(0);
	let sweepDir = $state(1);
	let elapsedMs = $state(0);
	let messageIdx = $state(0);
	let startedAt = Date.now();

	// Reset message index whenever the messages array changes
	$effect(() => {
		void messages;
		messageIdx = 0;
	});

	$effect(() => {
		startedAt = Date.now();
		const tickEmoji = setInterval(() => {
			frame = (frame + 1) % EMOJIS.length;
		}, 380);
		const tickSweep = setInterval(() => {
			sweepPos += sweepDir;
			if (sweepPos >= BAR_WIDTH - 1) sweepDir = -1;
			else if (sweepPos <= 0) sweepDir = 1;
		}, 90);
		const tickClock = setInterval(() => {
			elapsedMs = Date.now() - startedAt;
		}, 100);
		const tickMessage = setInterval(() => {
			if (messages && messages.length > 0) {
				// Advance through the list, then stick on the last one
				messageIdx = Math.min(messageIdx + 1, messages.length - 1);
			}
		}, MESSAGE_INTERVAL_MS);
		return () => {
			clearInterval(tickEmoji);
			clearInterval(tickSweep);
			clearInterval(tickClock);
			clearInterval(tickMessage);
		};
	});

	function renderBar(pos: number): string {
		let out = '';
		for (let i = 0; i < BAR_WIDTH; i++) {
			const dist = Math.abs(i - pos);
			if (dist === 0) out += '█';
			else if (dist === 1) out += '▓';
			else if (dist === 2) out += '▒';
			else out += '░';
		}
		return out;
	}

	let bar = $derived(renderBar(sweepPos));
	let seconds = $derived((elapsedMs / 1000).toFixed(1));
	let currentLabel = $derived(messages && messages.length > 0 ? messages[messageIdx] : label);
</script>

<div
	class="inline-flex items-center gap-3 rounded-md border border-emerald-500/30 bg-black/90 px-3 py-2 font-mono text-xs text-emerald-300 shadow-inner"
>
	<span class="text-base leading-none" aria-hidden="true">{EMOJIS[frame]}</span>
	<span class="tracking-wider">{currentLabel}</span>
	<span class="select-none tracking-tighter text-emerald-400" aria-hidden="true">[{bar}]</span>
	<span class="tabular-nums text-emerald-200/80">{seconds}s</span>
</div>
