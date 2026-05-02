<script lang="ts">
	type DiffOp = { kind: 'eq' | 'del' | 'ins'; text: string };

	let { original, suggestion }: { original: string; suggestion: string } = $props();

	function tokenize(s: string): string[] {
		// keep whitespace as its own token so reconstruction preserves spacing
		return s.split(/(\s+)/).filter((t) => t.length > 0);
	}

	function diffWords(a: string[], b: string[]): DiffOp[] {
		const m = a.length;
		const n = b.length;
		// LCS table
		const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
		for (let i = 1; i <= m; i++) {
			for (let j = 1; j <= n; j++) {
				if (a[i - 1] === b[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1] + 1;
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
				}
			}
		}
		// backtrack
		const ops: DiffOp[] = [];
		let i = m;
		let j = n;
		while (i > 0 && j > 0) {
			if (a[i - 1] === b[j - 1]) {
				ops.push({ kind: 'eq', text: a[i - 1] });
				i--;
				j--;
			} else if (dp[i - 1][j] >= dp[i][j - 1]) {
				ops.push({ kind: 'del', text: a[i - 1] });
				i--;
			} else {
				ops.push({ kind: 'ins', text: b[j - 1] });
				j--;
			}
		}
		while (i > 0) {
			ops.push({ kind: 'del', text: a[--i] });
		}
		while (j > 0) {
			ops.push({ kind: 'ins', text: b[--j] });
		}
		return ops.reverse();
	}

	let ops = $derived(diffWords(tokenize(original), tokenize(suggestion)));
</script>

<div class="font-mono text-sm leading-relaxed">
	{#each ops as op}
		{#if op.kind === 'eq'}
			<span>{op.text}</span>
		{:else if op.kind === 'del'}
			<span
				class="bg-red-100 text-red-900 line-through decoration-red-500/70 dark:bg-red-950/50 dark:text-red-300"
				>{op.text}</span
			>
		{:else}
			<span
				class="bg-green-100 text-green-900 underline decoration-green-500/70 dark:bg-green-950/50 dark:text-green-300"
				>{op.text}</span
			>
		{/if}
	{/each}
</div>
