<script lang="ts">
	import { page } from '$app/stores';
	import { Globe } from 'lucide-svelte';
	import { locale } from 'svelte-i18n';
	import { updateLocale } from '$lib/i18n';

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'ko', name: '한국어' },
		{ code: 'de', name: 'Deutsch' }
	];

	let showDropdown = $state(false);

	// Get current language from the store
	let currentLang = $derived($locale || 'en');

	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		showDropdown = !showDropdown;
	}

	async function switchLanguage(langCode: string, event: MouseEvent) {
		event.stopPropagation();

		// Don't do anything if it's the same language
		if (langCode === currentLang) {
			showDropdown = false;
			return;
		}

		// Get the current pathname
		const currentPath = window.location.pathname;

		// Split path and remove empty strings
		const pathSegments = currentPath.split('/').filter(Boolean);

		// Remove the current language code if it exists as the first segment
		if (pathSegments.length > 0 && (pathSegments[0] === 'en' || pathSegments[0] === 'ko' || pathSegments[0] === 'de')) {
			pathSegments.shift();
		}

		// Build the new path
		// For English, use root path. For other languages, include the language code
		let newPath: string;
		if (langCode === 'en') {
			newPath = pathSegments.length > 0 ? '/' + pathSegments.join('/') : '/';
		} else {
			newPath = `/${langCode}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
		}

		// Update locale immediately for better UX
		await updateLocale(langCode);

		// Navigate to the new path
		window.location.href = newPath;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-switcher')) {
			showDropdown = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="language-switcher relative">
	<button
		onclick={toggleDropdown}
		class="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
		aria-label="Change language"
		type="button"
	>
		<Globe class="h-4 w-4" />
	</button>

	{#if showDropdown}
		<div class="absolute right-0 z-50 mt-2 w-32 rounded-md border bg-background p-1 shadow-md">
			{#each languages as lang}
				{@const isCurrentLang = lang.code === currentLang}
				<button
					onclick={(e) => switchLanguage(lang.code, e)}
					class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors {isCurrentLang
						? 'cursor-default bg-accent font-semibold'
						: 'cursor-pointer hover:bg-accent hover:text-accent-foreground'}"
					type="button"
				>
					{lang.name}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-switcher {
		position: relative;
	}
</style>
