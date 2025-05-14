<script lang="ts">
	import { onMount } from 'svelte';
	import RequirementModal from './RequirementModal.svelte';

	type Requirement = {
		id: string;
		epic: string;
		user: string;
		userStory: string;
		priority: string;
		acceptanceCriteria: string;
	};

	// Generate ID based on epic name
	function generateRequirementId(epicName: string, requirements: Requirement[]): string {
		// Create a shortened epic code (first 2-3 letters uppercase)
		const epicCode = epicName.replace(/\s+/g, '').substring(0, 3).toUpperCase();

		// Get count of requirements with this epic
		const epicRequirements = requirements.filter((r) => r.epic === epicName);
		const count = epicRequirements.length + 1;

		return `${epicCode}-${count.toString().padStart(3, '0')}`;
	}

	// Instead of hardcoded options, build them dynamically from existing values
	const getUniqueValues = (field: keyof Requirement) => {
		return [...new Set(requirements.map((r) => r[field]))].filter(Boolean);
	};

	let requirements: Requirement[] = [
		{
			id: 'USM-001',
			epic: 'User Management',
			user: 'Admin',
			userStory: 'As an admin, I want to create new user accounts',
			priority: 'High',
			acceptanceCriteria:
				'- Must validate email\n- Must send welcome email\n- Password must be secure'
		},
		{
			id: 'AUT-001',
			epic: 'Authentication',
			user: 'User',
			userStory: 'As a user, I want to reset my password',
			priority: 'Medium',
			acceptanceCriteria: '- Should send email verification\n- Should expire link after 24 hours'
		}
	];

	// Get unique epics, sorted alphabetically
	$: uniqueEpics = [...new Set(requirements.map((r) => r.epic))].filter(Boolean).sort();
	$: epicOptions = getUniqueValues('epic');
	$: userOptions = getUniqueValues('user');

	let editingRequirement: Requirement | null = null;
	let showModal = false;

	// Instead of just getting unique values, maintain manual lists with additions
	let epicEnums: string[] = [];
	let userEnums: string[] = [];

	// Get initial values from requirements
	$: {
		const uniqueEpics = [...new Set(requirements.map((r) => r.epic))].filter(Boolean);
		const uniqueUsers = [...new Set(requirements.map((r) => r.user))].filter(Boolean);

		// Add any values from requirements not already in our enums
		uniqueEpics.forEach((epic) => {
			if (!epicEnums.includes(epic)) {
				epicEnums = [...epicEnums, epic];
			}
		});

		uniqueUsers.forEach((user) => {
			if (!userEnums.includes(user)) {
				userEnums = [...userEnums, user];
			}
		});
	}

	// New enum management
	let newEpicValue = '';
	let newUserValue = '';

	function addEpicEnum() {
		if (newEpicValue && !epicEnums.includes(newEpicValue)) {
			epicEnums = [...epicEnums, newEpicValue];
			newEpicValue = '';
		}
	}

	function deleteEpicEnum(value: string) {
		epicEnums = epicEnums.filter((e) => e !== value);
	}

	function addUserEnum() {
		if (newUserValue && !userEnums.includes(newUserValue)) {
			userEnums = [...userEnums, newUserValue];
			newUserValue = '';
		}
	}

	function deleteUserEnum(value: string) {
		userEnums = userEnums.filter((u) => u !== value);
	}

	function editRequirement(requirement: Requirement) {
		editingRequirement = { ...requirement };
		showModal = true;
	}

	function addRequirementToEpic(epicName: string) {
		const newId = generateRequirementId(epicName, requirements);
		editingRequirement = {
			id: newId,
			epic: epicName,
			user: '',
			userStory: '',
			priority: 'Medium',
			acceptanceCriteria: ''
		};
		showModal = true;
	}

	function addNewRequirement() {
		editingRequirement = {
			id: 'NEW-001',
			epic: '',
			user: '',
			userStory: '',
			priority: 'Medium',
			acceptanceCriteria: ''
		};
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		editingRequirement = null;
	}

	function renumberEpicRequirements(epicName: string) {
		const epicReqs = requirements.filter((r) => r.epic === epicName);
		const otherReqs = requirements.filter((r) => r.epic !== epicName);

		const epicCode = epicName.replace(/\s+/g, '').substring(0, 3).toUpperCase();

		// Create new requirements with sequential IDs
		const renumberedEpicReqs = epicReqs.map((req, index) => ({
			...req,
			id: `${epicCode}-${(index + 1).toString().padStart(3, '0')}`
		}));

		requirements = [...otherReqs, ...renumberedEpicReqs];
	}

	function saveRequirement(req: Requirement) {
		// If this is a new requirement or epic changed, generate proper ID
		if (
			req.id === 'NEW-001' ||
			(req.epic && req.epic !== requirements.find((r) => r.id === req.id)?.epic)
		) {
			req.id = generateRequirementId(req.epic, requirements);
		}

		const index = requirements.findIndex((r) => r.id === req.id);
		if (index >= 0) {
			requirements[index] = req;
			requirements = [...requirements];
		} else {
			requirements = [...requirements, req];
		}

		// Sort requirements by epic and ID
		requirements = requirements.sort((a, b) => {
			if (a.epic !== b.epic) return a.epic.localeCompare(b.epic);
			return a.id.localeCompare(b.id);
		});

		closeModal();
	}

	function handleCellEdit(e: Event, field: keyof Requirement, requirement: Requirement) {
		const target = e.target as HTMLElement;
		if (target && target.textContent !== null) {
			requirement[field] = target.textContent;
			requirements = [...requirements];
		}
	}

	function deleteRequirement(id: string) {
		if (confirm('Are you sure you want to delete this requirement?')) {
			const req = requirements.find((r) => r.id === id);
			const epicName = req?.epic || '';

			requirements = requirements.filter((r) => r.id !== id);

			// Renumber this epic's requirements
			if (epicName) {
				renumberEpicRequirements(epicName);
			}
		}
	}
</script>

<div class="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
	<div class="mb-4 flex justify-between">
		<h1 class="text-2xl font-bold dark:text-gray-100">Requirements Management</h1>
		<button
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
			onclick={addNewRequirement}
		>
			Add Requirement
		</button>
	</div>

	<!-- Enum Management Section -->
	<div class="mb-6 grid grid-cols-2 gap-4">
		<div class="rounded border p-4 dark:border-gray-700 dark:bg-gray-800">
			<h2 class="mb-2 text-lg font-semibold dark:text-gray-200">Epic Values</h2>
			<div class="mb-2 flex">
				<input
					type="text"
					bind:value={newEpicValue}
					placeholder="New epic value"
					class="mr-2 flex-grow rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
				<button
					class="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
					onclick={addEpicEnum}
				>
					Add
				</button>
			</div>
			<ul class="max-h-32 overflow-y-auto dark:text-gray-300">
				{#each epicEnums as epic}
					<li class="mb-1 flex items-center justify-between">
						<span>{epic}</span>
						<button
							class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
							onclick={() => deleteEpicEnum(epic)}
						>
							✕
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="rounded border p-4 dark:border-gray-700 dark:bg-gray-800">
			<h2 class="mb-2 text-lg font-semibold dark:text-gray-200">User Values</h2>
			<div class="mb-2 flex">
				<input
					type="text"
					bind:value={newUserValue}
					placeholder="New user value"
					class="mr-2 flex-grow rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
				<button
					class="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
					onclick={addUserEnum}
				>
					Add
				</button>
			</div>
			<ul class="max-h-32 overflow-y-auto dark:text-gray-300">
				{#each userEnums as user}
					<li class="mb-1 flex items-center justify-between">
						<span>{user}</span>
						<button
							class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
							onclick={() => deleteUserEnum(user)}
						>
							✕
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Requirements Section by Epic -->
	{#each uniqueEpics as epicName}
		<div class="mb-4 rounded border dark:border-gray-700">
			<div class="flex items-center justify-between bg-gray-100 p-3 dark:bg-gray-700">
				<h3 class="font-semibold dark:text-gray-200">{epicName}</h3>
				<button
					class="rounded bg-green-500 px-2 py-1 text-sm text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
					onclick={() => addRequirementToEpic(epicName)}
				>
					+ Add Requirement
				</button>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full bg-white dark:bg-gray-800">
					<thead class="bg-gray-50 dark:bg-gray-800">
						<tr>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>ID</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>User</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>User Story</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>Priority</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>Actions</th
							>
						</tr>
					</thead>
					<tbody>
						{#each requirements.filter((r) => r.epic === epicName) as requirement (requirement.id)}
							<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
								<td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-300"
									>{requirement.id}</td
								>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<select
										bind:value={requirement.user}
										class="w-full rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										{#each userEnums as option}
											<option value={option}>{option}</option>
										{/each}
										{#if !userEnums.includes(requirement.user) && requirement.user}
											<option value={requirement.user}>{requirement.user}</option>
										{/if}
									</select>
								</td>
								<td
									class="border-b px-4 py-2 dark:border-gray-600"
									contenteditable="true"
									onblur={(e) => handleCellEdit(e, 'userStory', requirement)}
									>{requirement.userStory}</td
								>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<select
										bind:value={requirement.priority}
										class="w-full rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										<option value="High">High</option>
										<option value="Medium">Medium</option>
										<option value="Low">Low</option>
									</select>
								</td>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<button
										class="mr-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
										onclick={() => editRequirement(requirement)}
									>
										Details
									</button>
									<button
										class="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
										onclick={() => deleteRequirement(requirement.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/each}

	<!-- Requirements that don't have an epic yet -->
	{#if requirements.some((r) => !r.epic)}
		<div class="mb-4 rounded border dark:border-gray-700">
			<div class="bg-gray-100 p-3 dark:bg-gray-700">
				<h3 class="font-semibold dark:text-gray-200">Unassigned Requirements</h3>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full bg-white dark:bg-gray-800">
					<thead class="bg-gray-50 dark:bg-gray-800">
						<tr>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>ID</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>Epic</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>User</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>User Story</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>Priority</th
							>
							<th class="border-b px-4 py-2 text-left dark:border-gray-600 dark:text-gray-300"
								>Actions</th
							>
						</tr>
					</thead>
					<tbody>
						{#each requirements.filter((r) => !r.epic) as requirement (requirement.id)}
							<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
								<td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-300"
									>{requirement.id}</td
								>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<select
										bind:value={requirement.epic}
										class="w-full rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										<option value="">Select Epic</option>
										{#each epicEnums as option}
											<option value={option}>{option}</option>
										{/each}
									</select>
								</td>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<select
										bind:value={requirement.user}
										class="w-full rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										{#each userEnums as option}
											<option value={option}>{option}</option>
										{/each}
										{#if !userEnums.includes(requirement.user) && requirement.user}
											<option value={requirement.user}>{requirement.user}</option>
										{/if}
									</select>
								</td>
								<td
									class="border-b px-4 py-2 dark:border-gray-600"
									contenteditable="true"
									onblur={(e) => handleCellEdit(e, 'userStory', requirement)}
									>{requirement.userStory}</td
								>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<select
										bind:value={requirement.priority}
										class="w-full rounded border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										<option value="High">High</option>
										<option value="Medium">Medium</option>
										<option value="Low">Low</option>
									</select>
								</td>
								<td class="border-b px-4 py-2 dark:border-gray-600">
									<button
										class="mr-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
										onclick={() => editRequirement(requirement)}
									>
										Details
									</button>
									<button
										class="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
										onclick={() => deleteRequirement(requirement.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>

{#if showModal && editingRequirement}
	<RequirementModal
		requirement={editingRequirement}
		epicOptions={epicEnums}
		userOptions={userEnums}
		onClose={closeModal}
		onSave={saveRequirement}
	/>
{/if}

<style>
	[contenteditable='true']:focus {
		outline: 2px solid #4299e1;
		padding: 0.25rem;
	}
	[contenteditable='true']:hover:not(:focus) {
		background-color: rgba(66, 153, 225, 0.1);
	}
</style>
