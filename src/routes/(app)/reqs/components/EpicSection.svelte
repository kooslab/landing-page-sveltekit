<script lang="ts">
	import RequirementTable from './RequirementTable.svelte';
	import type { Requirement } from '../types';

	export let epicName: string;
	export let requirements: Requirement[] = [];
	export let userOptions: string[] = [];
	export let onAddRequirement: (epicName: string) => void = () => {};
	export let onEditRequirement: (requirement: Requirement) => void = () => {};
	export let onDeleteRequirement: (id: string) => void = () => {};
	export let onCellEdit: (
		e: Event,
		field: keyof Requirement,
		requirement: Requirement
	) => void = () => {};

	// Filter requirements for this epic
	$: epicRequirements = requirements.filter((r) => r.epic === epicName);
</script>

<div class="mb-4 rounded border dark:border-gray-700">
	<div class="flex items-center justify-between bg-gray-100 p-2 dark:bg-gray-700 sm:p-3">
		<h3 class="text-sm font-semibold dark:text-gray-200 sm:text-base">{epicName}</h3>
		<button
			class="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 sm:text-sm"
			onclick={() => onAddRequirement(epicName)}
		>
			+ Add Requirement
		</button>
	</div>

	<RequirementTable
		requirements={epicRequirements}
		{userOptions}
		showEpicColumn={false}
		onEdit={onEditRequirement}
		onDelete={onDeleteRequirement}
		{onCellEdit}
	/>
</div>
