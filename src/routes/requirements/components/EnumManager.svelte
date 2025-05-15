<script lang="ts">
	export let title: string;
	export let values: string[] = [];
	export let onAdd: (value: string) => void;
	export let onDelete: (value: string) => void;

	let newValue = '';

	function handleAdd() {
		if (newValue && !values.includes(newValue)) {
			onAdd(newValue);
			newValue = '';
		}
	}
</script>

<div class="rounded border p-4 dark:border-gray-700 dark:bg-gray-800">
	<h2 class="mb-2 text-lg font-semibold dark:text-gray-200">{title}</h2>
	<div class="mb-2 flex">
		<input
			type="text"
			bind:value={newValue}
			placeholder="New value"
			class="mr-2 flex-grow rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
		/>
		<button
			class="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
			onclick={handleAdd}
		>
			Add
		</button>
	</div>
	<ul class="max-h-32 overflow-y-auto dark:text-gray-300">
		{#each values as value}
			<li class="mb-1 flex items-center justify-between">
				<span>{value}</span>
				<button
					class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
					onclick={() => onDelete(value)}
				>
					✕
				</button>
			</li>
		{/each}
	</ul>
</div>
