<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';

	export let requirement: {
		id: string;
		epic: string;
		user: string;
		userStory: string;
		priority: string;
		acceptanceCriteria: string;
	};
	export let onClose: () => void;
	export let onSave: (req: typeof requirement) => void;

	// Get values from parent component
	export let epicOptions: string[] = [];
	export let userOptions: string[] = [];

	let localRequirement = { ...requirement };
	let editorElement: HTMLElement;
	let tiptapEditor: Editor;

	onMount(() => {
		document.body.style.overflow = 'hidden';

		tiptapEditor = new Editor({
			element: editorElement,
			content: localRequirement.acceptanceCriteria || '',
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Write acceptance criteria here...'
				})
			],
			onUpdate: ({ editor }) => {
				localRequirement.acceptanceCriteria = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
		if (tiptapEditor) {
			tiptapEditor.destroy();
		}
	});

	function handleSave() {
		onSave(localRequirement);
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80"
>
	<div
		class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800 dark:text-white"
	>
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-bold dark:text-gray-100">
				Requirement Details: {localRequirement.id}
			</h2>
			<button
				class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
				onclick={onClose}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<div class="mb-4 grid grid-cols-2 gap-4">
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Epic</label>
				<select
					bind:value={localRequirement.epic}
					class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				>
					{#each epicOptions as option}
						<option value={option}>{option}</option>
					{/each}
					<!-- Allow custom value entry -->
					{#if !epicOptions.includes(localRequirement.epic) && localRequirement.epic}
						<option value={localRequirement.epic}>{localRequirement.epic}</option>
					{/if}
				</select>
			</div>
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">User</label>
				<select
					bind:value={localRequirement.user}
					class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				>
					{#each userOptions as option}
						<option value={option}>{option}</option>
					{/each}
					<!-- Allow custom value entry -->
					{#if !userOptions.includes(localRequirement.user) && localRequirement.user}
						<option value={localRequirement.user}>{localRequirement.user}</option>
					{/if}
				</select>
			</div>
		</div>

		<div class="mb-4">
			<label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>User Story</label
			>
			<input
				type="text"
				bind:value={localRequirement.userStory}
				class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
		</div>

		<div class="mb-4">
			<label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label
			>
			<select
				bind:value={localRequirement.priority}
				class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			>
				<option value="High">High</option>
				<option value="Medium">Medium</option>
				<option value="Low">Low</option>
			</select>
		</div>

		<div class="mb-4">
			<label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
				Acceptance Criteria (Markdown supported)
			</label>
			<div class="rounded border dark:border-gray-600">
				<div
					class="prose min-h-[200px] max-w-none p-3 dark:prose-invert"
					bind:this={editorElement}
				></div>
			</div>
		</div>

		<div class="mt-4 flex justify-end space-x-2">
			<button
				class="rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
				onclick={onClose}
			>
				Cancel
			</button>
			<button
				class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
				onclick={handleSave}
			>
				Save
			</button>
		</div>
	</div>
</div>
