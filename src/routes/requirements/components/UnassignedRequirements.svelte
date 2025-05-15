<script lang="ts">
	import RequirementTable from './RequirementTable.svelte';
	import type { Requirement } from '../types';

	export let requirements: Requirement[] = [];
	export let epicOptions: string[] = [];
	export let userOptions: string[] = [];
	export let onEditRequirement: (requirement: Requirement) => void = () => {};
	export let onDeleteRequirement: (id: string) => void = () => {};
	export let onCellEdit: (
		e: Event,
		field: keyof Requirement,
		requirement: Requirement
	) => void = () => {};

	// Filter requirements without an epic
	$: unassignedRequirements = requirements.filter((r) => !r.epic);
</script>

{#if unassignedRequirements.length > 0}
	<div class="mb-4 rounded border dark:border-gray-700">
		<div class="bg-gray-100 p-3 dark:bg-gray-700">
			<h3 class="font-semibold dark:text-gray-200">Unassigned Requirements</h3>
		</div>

		<RequirementTable
			requirements={unassignedRequirements}
			{epicOptions}
			{userOptions}
			showEpicColumn={true}
			onEdit={onEditRequirement}
			onDelete={onDeleteRequirement}
			{onCellEdit}
		/>
	</div>
{/if}
