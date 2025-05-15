<script lang="ts">
	import type { Requirement } from '../types';
	import * as Select from '$lib/components/ui/select';

	// Define types for select items
	type SelectItem = { value: string; label: string };

	// Create reactive stores for selected values
	$: epicSelections = requirements.map((req) =>
		req.epic ? { value: req.epic, label: req.epic } : undefined
	);

	$: userSelections = requirements.map((req) =>
		req.user ? { value: req.user, label: req.user } : undefined
	);

	$: prioritySelections = requirements.map((req) =>
		req.priority ? { value: req.priority, label: req.priority } : undefined
	);

	// Handler functions
	function updateEpic(selection: SelectItem | undefined, req: Requirement) {
		if (selection) req.epic = selection.value;
	}

	function updateUser(selection: SelectItem | undefined, req: Requirement) {
		if (selection) req.user = selection.value;
	}

	function updatePriority(selection: SelectItem | undefined, req: Requirement) {
		if (selection) req.priority = selection.value;
	}

	export let requirements: Requirement[] = [];
	export let userOptions: string[] = [];
	export let epicOptions: string[] = []; // Only used for unassigned requirements
	export let showEpicColumn = false;
	export let onEdit: (requirement: Requirement) => void = () => {};
	export let onDelete: (id: string) => void = () => {};
	export let onCellEdit: (
		e: Event,
		field: keyof Requirement,
		requirement: Requirement
	) => void = () => {};
</script>

<div class="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
	<table class="w-full text-sm">
		<thead class="bg-gray-100 dark:bg-gray-800">
			<tr>
				<th
					class="border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:p-2"
					>ID</th
				>
				{#if showEpicColumn}
					<th
						class="border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:p-2"
						>Epic</th
					>
				{/if}
				<th
					class="border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:p-2"
					>User</th
				>
				<th
					class="hidden border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:table-cell sm:p-2"
					>User Story</th
				>
				<th
					class="border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:p-2"
					>Priority</th
				>
				<th
					class="border-b border-gray-200 p-1 text-left font-medium dark:border-gray-700 dark:text-gray-200 sm:p-2"
					>Actions</th
				>
			</tr>
		</thead>
		<tbody>
			{#each requirements as requirement (requirement.id)}
				<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
					<td class="border-b border-gray-200 p-1 dark:border-gray-700 dark:text-gray-300 sm:p-2"
						>{requirement.id}</td
					>

					{#if showEpicColumn}
						<td class="border-b border-gray-200 p-1 dark:border-gray-700 sm:p-2">
							<div class="relative">
								<select
									value={requirement.epic}
									class="h-9 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25 sm:text-sm"
									onchange={(e) => (requirement.epic = e.currentTarget.value)}
								>
									<option value="" disabled selected={!requirement.epic}>Select Epic</option>
									{#each epicOptions as option}
										<option value={option} selected={requirement.epic === option}>{option}</option>
									{/each}
								</select>
								<div
									class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"
								>
									<svg
										class="h-4 w-4 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										/>
									</svg>
								</div>
							</div>
						</td>
					{/if}

					<td class="border-b border-gray-200 p-1 dark:border-gray-700 sm:p-2">
						<div class="relative">
							<select
								value={requirement.user}
								class="h-9 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25 sm:text-sm"
								onchange={(e) => (requirement.user = e.currentTarget.value)}
							>
								<option value="" disabled selected={!requirement.user}>Select User</option>
								{#each userOptions as option}
									<option value={option} selected={requirement.user === option}>{option}</option>
								{/each}
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"
							>
								<svg
									class="h-4 w-4 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									/>
								</svg>
							</div>
						</div>
					</td>

					<td class="hidden border-b border-gray-200 p-1 dark:border-gray-700 sm:table-cell sm:p-2">
						<div
							class="contenteditable-cell min-h-[1.5rem] w-full rounded p-1 dark:text-gray-300 sm:min-h-[2rem]"
							contenteditable="true"
							onblur={(e) => onCellEdit(e, 'userStory', requirement)}
						>
							{requirement.userStory}
						</div>
					</td>

					<td class="border-b border-gray-200 p-1 dark:border-gray-700 sm:p-2">
						<div class="relative">
							<select
								value={requirement.priority}
								class="h-9 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25 sm:text-sm"
								onchange={(e) => (requirement.priority = e.currentTarget.value)}
							>
								<option value="" disabled selected={!requirement.priority}>Select Priority</option>
								<option value="High" selected={requirement.priority === 'High'}>High</option>
								<option value="Medium" selected={requirement.priority === 'Medium'}>Medium</option>
								<option value="Low" selected={requirement.priority === 'Low'}>Low</option>
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"
							>
								<svg
									class="h-4 w-4 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									/>
								</svg>
							</div>
						</div>
					</td>

					<td
						class="space-x-1 border-b border-gray-200 p-1 dark:border-gray-700 sm:space-x-2 sm:p-2"
					>
						<button
							class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 sm:px-3 sm:text-sm"
							onclick={() => onEdit(requirement)}
						>
							Details
						</button>
						<button
							class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/50 sm:px-3 sm:text-sm"
							onclick={() => onDelete(requirement.id)}
						>
							Delete
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.contenteditable-cell:focus {
		outline: 2px solid #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
		border-radius: 0.25rem;
	}

	:global(.dark) .contenteditable-cell:focus {
		outline-color: #60a5fa;
		box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
	}

	.contenteditable-cell:hover:not(:focus) {
		background-color: rgba(243, 244, 246, 0.7);
		transition: all 150ms ease;
	}

	:global(.dark) .contenteditable-cell:hover:not(:focus) {
		background-color: rgba(55, 65, 81, 0.3);
	}
</style>
