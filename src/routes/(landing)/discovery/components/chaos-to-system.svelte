<script lang="ts">
	let {
		tools,
		hubLabel = 'One System',
		phased = false,
		toolPhases = [] as number[],
		toolReplaced = [] as boolean[],
		afterCaption = 'Everything flows through one system'
	}: {
		tools: string[];
		hubLabel?: string;
		phased?: boolean;
		toolPhases?: number[];
		toolReplaced?: boolean[];
		afterCaption?: string;
	} = $props();

	// Whether each tool is replaced (absorbed into hub) or connected
	let replaced = $derived(
		toolReplaced.length === tools.length ? toolReplaced : tools.map(() => false)
	);
	let hasReplaced = $derived(replaced.some(Boolean));

	const W = 440;
	const H = 340;
	const cx = W / 2;
	const cy = H / 2;

	// ---- BEFORE: scattered positions (hand-tuned for max crossing) ----
	const chaosAllPos = [
		{ x: 100, y: 52 },
		{ x: 340, y: 44 },
		{ x: 375, y: 185 },
		{ x: 290, y: 295 },
		{ x: 112, y: 290 },
		{ x: 55, y: 175 }
	];
	let chaosPos = $derived(chaosAllPos.slice(0, tools.length));

	// Connections designed so lines cross each other
	const allConns: [number, number][] = [
		[0, 1],
		[0, 3],
		[0, 4],
		[1, 2],
		[1, 4],
		[1, 5],
		[2, 3],
		[2, 5],
		[3, 4],
		[4, 5],
		[0, 2]
	];
	let chaosConns = $derived(allConns.filter(([a, b]) => a < tools.length && b < tools.length));

	// Curved spaghetti paths (alternating offsets for organic feel)
	const curveOff = [28, -32, 22, -28, 36, -22, 18, -36, 30, -20, 25];
	function chaosPath(idx: number): string {
		const [a, b] = chaosConns[idx];
		const from = chaosPos[a];
		const to = chaosPos[b];
		const mx = (from.x + to.x) / 2;
		const my = (from.y + to.y) / 2;
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const len = Math.sqrt(dx * dx + dy * dy) || 1;
		const off = curveOff[idx % curveOff.length];
		return `M ${from.x} ${from.y} Q ${mx + (-dy / len) * off} ${my + (dx / len) * off} ${to.x} ${to.y}`;
	}

	// ---- AFTER: clean circle arrangement ----
	const hubR = 118;
	let hubPos = $derived(
		tools.map((_, i) => {
			const a = (Math.PI * 2 * i) / tools.length - Math.PI / 2;
			return { x: cx + hubR * Math.cos(a), y: cy + hubR * Math.sin(a) };
		})
	);

	// Phase for each tool (defaults to all phase 1)
	let phases = $derived(toolPhases.length === tools.length ? toolPhases : tools.map(() => 1));

	// Node dimensions
	const nodeH = 30;
	function nw(label: string): number {
		return Math.max(80, label.length * 7.5 + 24);
	}
</script>

<div class="grid gap-6 md:grid-cols-2 md:gap-8">
	<!-- BEFORE: Chaos / Spaghetti -->
	<div class="overflow-hidden rounded-2xl border border-border p-5 md:p-7">
		<p class="mb-3 text-sm font-bold uppercase tracking-widest text-foreground/30">Today</p>
		<svg
			viewBox="0 0 440 340"
			class="w-full"
			role="img"
			aria-label="Scattered tools with no central system"
		>
			<!-- Spaghetti lines (curved, dashed) -->
			{#each chaosConns as _, i}
				<path
					d={chaosPath(i)}
					fill="none"
					stroke="#C0706A"
					stroke-width="1.5"
					stroke-dasharray={i % 2 === 0 ? '6 4' : '3 5'}
					opacity={0.3 + (i % 3) * 0.08}
				/>
			{/each}

			<!-- Center "?" symbol -->
			<circle
				{cx}
				{cy}
				r="26"
				fill="none"
				stroke="#B8706A"
				stroke-width="1.5"
				stroke-dasharray="4 3"
				opacity="0.25"
			/>
			<text
				x={cx}
				y={cy}
				text-anchor="middle"
				dominant-baseline="central"
				font-size="22"
				font-weight="700"
				fill="#B8706A"
				opacity="0.45"
				font-family="system-ui, sans-serif">?</text
			>

			<!-- Tool nodes -->
			{#each tools as tool, i}
				{@const pos = chaosPos[i]}
				{@const w = nw(tool)}
				<rect
					x={pos.x - w / 2}
					y={pos.y - nodeH / 2}
					width={w}
					height={nodeH}
					rx="15"
					fill="white"
					stroke="#CCCCCC"
					stroke-width="1"
				/>
				<text
					x={pos.x}
					y={pos.y}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="12"
					font-weight="500"
					fill="#333333"
					font-family="system-ui, sans-serif">{tool}</text
				>
			{/each}
		</svg>
		<p class="mt-3 text-center text-base font-medium text-foreground/40">
			No single source of truth
		</p>
	</div>

	<!-- AFTER: Hub-and-spoke (with optional phased mode) -->
	<div class="overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.02] p-5 md:p-7">
		<p class="mb-3 text-sm font-bold uppercase tracking-widest text-primary/50">With KooStory</p>
		<svg
			viewBox="0 0 440 340"
			class="w-full"
			role="img"
			aria-label={phased
				? 'Tools connected gradually through a data hub'
				: 'All tools connected through one central system'}
		>
			<!-- Lines from each tool to hub (only for non-replaced tools) -->
			{#each hubPos as pos, i}
				{@const phase = phases[i]}
				{#if !replaced[i]}
					<line
						x1={cx}
						y1={cy}
						x2={pos.x}
						y2={pos.y}
						stroke="#1E1A3A"
						stroke-width={phase === 1 ? '2' : '1.5'}
						stroke-dasharray={phased && phase > 1 ? '5 4' : 'none'}
						opacity={phase === 1 ? 0.18 : 0.08}
					/>
				{/if}
			{/each}

			<!-- Central hub circle -->
			<circle {cx} {cy} r="40" fill="#1E1A3A" />
			<text
				x={cx}
				y={cy}
				text-anchor="middle"
				dominant-baseline="central"
				font-size="11"
				font-weight="700"
				fill="white"
				letter-spacing="0.3"
				font-family="system-ui, sans-serif">{hubLabel}</text
			>

			<!-- Tool nodes -->
			{#each tools as tool, i}
				{@const pos = hubPos[i]}
				{@const w = nw(tool)}
				{@const phase = phases[i]}
				{@const isReplaced = replaced[i]}
				<rect
					x={pos.x - w / 2}
					y={pos.y - nodeH / 2}
					width={w}
					height={nodeH}
					rx="15"
					fill={isReplaced ? '#F5F5F5' : 'white'}
					stroke={isReplaced ? '#CCCCCC' : '#1E1A3A'}
					stroke-width="1"
					opacity={isReplaced ? 0.5 : phase === 1 ? 0.9 : 0.45}
				/>
				<text
					x={pos.x}
					y={pos.y}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="12"
					font-weight="500"
					fill={isReplaced ? '#999999' : '#1E1A3A'}
					opacity={isReplaced ? 0.7 : phase === 1 ? 1 : 0.5}
					font-family="system-ui, sans-serif"
					text-decoration={isReplaced ? 'line-through' : 'none'}>{tool}</text
				>

				{#if isReplaced}
					<!-- "Replaced" label below struck-through tool -->
					<text
						x={pos.x}
						y={pos.y + nodeH / 2 + 12}
						text-anchor="middle"
						dominant-baseline="central"
						font-size="9"
						font-weight="600"
						fill="#999999"
						font-family="system-ui, sans-serif">replaced</text
					>
				{/if}

				<!-- Phase badge (only in phased mode, not for replaced) -->
				{#if phased && !isReplaced}
					<circle
						cx={pos.x + w / 2 - 2}
						cy={pos.y - nodeH / 2 - 2}
						r="8"
						fill={phase === 1 ? '#1E1A3A' : '#999999'}
					/>
					<text
						x={pos.x + w / 2 - 2}
						y={pos.y - nodeH / 2 - 2}
						text-anchor="middle"
						dominant-baseline="central"
						font-size="9"
						font-weight="700"
						fill="white"
						font-family="system-ui, sans-serif">{phase}</text
					>
				{/if}
			{/each}

			<!-- Legend -->
			{#if phased || hasReplaced}
				{@const legendY = 310}
				{@const items = []}
				{#if phased}
					<circle cx="30" cy={legendY} r="6" fill="#1E1A3A" />
					<text
						x="42"
						y={legendY}
						dominant-baseline="central"
						font-size="10"
						fill="#666666"
						font-family="system-ui, sans-serif">Start here</text
					>
					<circle cx="120" cy={legendY} r="6" fill="#999999" />
					<text
						x="132"
						y={legendY}
						dominant-baseline="central"
						font-size="10"
						fill="#666666"
						font-family="system-ui, sans-serif">Connect next</text
					>
				{/if}
				{#if hasReplaced}
					{@const rX = phased ? 230 : 30}
					<line
						x1={rX}
						y1={legendY}
						x2={rX + 20}
						y2={legendY}
						stroke="#CCCCCC"
						stroke-width="1.5"
					/>
					<line
						x1={rX + 4}
						y1={legendY}
						x2={rX + 16}
						y2={legendY}
						stroke="#999999"
						stroke-width="1"
					/>
					<text
						x={rX + 26}
						y={legendY}
						dominant-baseline="central"
						font-size="10"
						fill="#666666"
						font-family="system-ui, sans-serif">Replaced by system</text
					>
				{/if}
			{/if}
		</svg>
		<p class="mt-3 text-center text-base font-medium text-foreground/40">
			{afterCaption}
		</p>
	</div>
</div>
