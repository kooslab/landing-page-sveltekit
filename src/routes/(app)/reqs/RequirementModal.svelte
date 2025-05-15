<script lang="ts">
	import type { Requirement } from './types';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	export let requirement: Requirement;
	export let epicOptions: string[] = [];
	export let userOptions: string[] = [];
	export let onClose: () => void = () => {};
	export let onSave: (requirement: Requirement) => void = () => {};

	let localRequirement: Requirement = { ...requirement };
	let editor: HTMLDivElement;
	let isInitialized = false;

	onMount(async () => {
		await tick();
		if (editor) {
			editor.innerHTML = localRequirement.acceptanceCriteria.replace(/\n/g, '<br>');
			isInitialized = true;
		}
	});

	function handleEditorInput() {
		if (isInitialized && editor) {
			localRequirement.acceptanceCriteria = editor.innerHTML
				.replace(/<br>/g, '\n')
				.replace(/<div>/g, '\n')
				.replace(/<\/div>/g, '');
		}
	}

	function saveAndClose() {
		onSave(localRequirement);
	}
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
	<div
		class="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
	>
		<div class="mb-5 flex items-center justify-between">
			<h2 class="text-xl font-bold dark:text-white">
				{localRequirement.id === 'NEW-001' ? 'New Requirement' : `Edit: ${localRequirement.id}`}
			</h2>
			<button
				class="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
				onclick={onClose}
			>
				✕
			</button>
		</div>

		<div class="space-y-4">
			<!-- Epic dropdown -->
			<div>
				<label for="epic" class="mb-1 block font-medium dark:text-gray-200">Epic</label>
				<select
					id="epic"
					class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					bind:value={localRequirement.epic}
				>
					<option value="" disabled>Select Epic</option>
					{#each epicOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<!-- User dropdown -->
			<div>
				<label for="user" class="mb-1 block font-medium dark:text-gray-200">User</label>
				<select
					id="user"
					class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					bind:value={localRequirement.user}
				>
					<option value="" disabled>Select User</option>
					{#each userOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<!-- User Story -->
			<div>
				<label for="userStory" class="mb-1 block font-medium dark:text-gray-200">User Story</label>
				<textarea
					id="userStory"
					class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					rows="2"
					bind:value={localRequirement.userStory}
				></textarea>
			</div>

			<!-- Priority -->
			<div>
				<label for="priority" class="mb-1 block font-medium dark:text-gray-200">Priority</label>
				<select
					id="priority"
					class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					bind:value={localRequirement.priority}
				>
					<option value="High">High</option>
					<option value="Medium">Medium</option>
					<option value="Low">Low</option>
				</select>
			</div>

			<!-- Acceptance Criteria with markdown editor -->
			<div>
				<label for="acceptanceCriteria" class="mb-1 block font-medium dark:text-gray-200"
					>Acceptance Criteria</label
				>
				<div class="rounded-md border border-gray-300 dark:border-gray-600">
					<div
						bind:this={editor}
						contenteditable="true"
						oninput={handleEditorInput}
						class="min-h-[150px] w-full rounded-md p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
					></div>
				</div>
				<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
					Supports basic formatting. Use - for bullet points and # for headings.
				</p>
			</div>

			<div class="mt-6 flex justify-end space-x-3">
				<button
					class="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
					onclick={onClose}
				>
					Cancel
				</button>
				<button
					class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
					onclick={saveAndClose}
				>
					Save Requirement
				</button>
			</div>
		</div>
	</div>
</div>
