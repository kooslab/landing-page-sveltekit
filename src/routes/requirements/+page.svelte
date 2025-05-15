<script lang="ts">
	import RequirementModal from './RequirementModal.svelte';
	import EnumManager from './components/EnumManager.svelte';
	import EpicSection from './components/EpicSection.svelte';
	import UnassignedRequirements from './components/UnassignedRequirements.svelte';

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

<div class="container mx-auto p-2 dark:bg-gray-900 dark:text-white sm:p-4">
	<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
		<h1 class="text-xl font-bold dark:text-gray-100 sm:text-2xl">Requirements Management</h1>
		<button
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
			onclick={addNewRequirement}
		>
			Add Requirement
		</button>
	</div>

	<!-- Enum Management Section -->
	<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
		<EnumManager
			title="Epic Values"
			values={epicEnums}
			onAdd={addEpicEnum}
			onDelete={deleteEpicEnum}
		/>

		<EnumManager
			title="User Values"
			values={userEnums}
			onAdd={addUserEnum}
			onDelete={deleteUserEnum}
		/>
	</div>

	<!-- Requirements Section by Epic -->
	{#each uniqueEpics as epicName}
		<EpicSection
			{epicName}
			{requirements}
			userOptions={userEnums}
			onAddRequirement={addRequirementToEpic}
			onEditRequirement={editRequirement}
			onDeleteRequirement={deleteRequirement}
			onCellEdit={handleCellEdit}
		/>
	{/each}

	<!-- Requirements that don't have an epic yet -->
	<UnassignedRequirements
		{requirements}
		epicOptions={epicEnums}
		userOptions={userEnums}
		onEditRequirement={editRequirement}
		onDeleteRequirement={deleteRequirement}
		onCellEdit={handleCellEdit}
	/>
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
