<script lang="ts">
	export let title: string;
	export let values: string[] = [];
	export let onAdd: () => void = () => {};
	export let onDelete: (value: string) => void = () => {};

	export let newValue: string = '';
</script>

<div class="rounded-md border p-4 shadow dark:border-gray-700 dark:bg-gray-800">
	<h3 class="mb-3 text-lg font-medium dark:text-gray-200">{title}</h3>

	<!-- Add new enum input -->
	<div class="mb-3 flex space-x-2">
		<input
			type="text"
			bind:value={newValue}
			placeholder="Add new value"
			class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
		/>
		<button
			onclick={() => {
				if (newValue.trim()) onAdd();
			}}
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-800"
			disabled={!newValue.trim()}
		>
			Add
		</button>
	</div>

	<!-- Display enum values -->
	<div class="space-y-2">
		{#if values.length === 0}
			<p class="text-sm text-gray-500 dark:text-gray-400">No values defined yet</p>
		{:else}
			<ul class="max-h-40 overflow-y-auto">
				{#each values as value}
					<li
						class="mb-1 flex items-center justify-between rounded-md bg-gray-100 p-2 dark:bg-gray-700"
					>
						<span class="dark:text-gray-200">{value}</span>
						<button
							onclick={() => onDelete(value)}
							class="ml-2 rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
						>
							✕
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
