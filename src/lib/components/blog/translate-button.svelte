<script lang="ts">
	import { onMount } from 'svelte';

	type SupportedLang = 'EN' | 'KO' | 'DE';

	interface Props {
		slug: string;
		originalTitle: string;
		originalContent: string;
		onTranslate: (translatedTitle: string, translatedContent: string, lang: SupportedLang) => void;
		onShowOriginal: () => void;
	}

	let { slug, originalTitle, originalContent, onTranslate, onShowOriginal }: Props = $props();

	let isLoading = $state(false);
	let currentLang = $state<SupportedLang | null>(null);
	let error = $state<string | null>(null);
	let showDropdown = $state(false);

	const languages: { code: SupportedLang; label: string; flag: string }[] = [
		{ code: 'EN', label: 'English', flag: '🇬🇧' },
		{ code: 'KO', label: '한국어', flag: '🇰🇷' },
		{ code: 'DE', label: 'Deutsch', flag: '🇩🇪' }
	];

	// Detect user's preferred language from browser
	function detectUserLanguage(): SupportedLang | null {
		if (typeof window === 'undefined') return null;

		const browserLang = navigator.language || navigator.languages?.[0] || '';
		const langCode = browserLang.toLowerCase().split('-')[0];

		if (langCode === 'de') return 'DE';
		if (langCode === 'ko') return 'KO';
		return null; // English is the default/original, no translation needed
	}

	// Auto-translate on mount if user's browser language differs from English
	onMount(() => {
		const detectedLang = detectUserLanguage();
		if (detectedLang) {
			handleTranslate(detectedLang);
		}
	});

	function getCacheKey(lang: SupportedLang): string {
		return `translate_${slug}_${lang}`;
	}

	function getFromCache(lang: SupportedLang): { title: string; content: string } | null {
		if (typeof window === 'undefined') return null;
		const cached = localStorage.getItem(getCacheKey(lang));
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch {
				return null;
			}
		}
		return null;
	}

	function saveToCache(lang: SupportedLang, title: string, content: string): void {
		if (typeof window === 'undefined') return;
		localStorage.setItem(getCacheKey(lang), JSON.stringify({ title, content }));
	}

	async function translateText(text: string, targetLang: SupportedLang): Promise<string> {
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, targetLang })
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.error || 'Translation failed');
		}

		const data = await response.json();
		return data.translatedText;
	}

	async function handleTranslate(lang: SupportedLang): Promise<void> {
		showDropdown = false;

		if (lang === currentLang) return;

		error = null;

		// Check cache first
		const cached = getFromCache(lang);
		if (cached) {
			currentLang = lang;
			onTranslate(cached.title, cached.content, lang);
			return;
		}

		isLoading = true;

		try {
			// Translate title and content in parallel
			const [translatedTitle, translatedContent] = await Promise.all([
				translateText(originalTitle, lang),
				translateText(originalContent, lang)
			]);

			// Cache the result
			saveToCache(lang, translatedTitle, translatedContent);

			currentLang = lang;
			onTranslate(translatedTitle, translatedContent, lang);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Translation failed';
		} finally {
			isLoading = false;
		}
	}

	function handleShowOriginal(): void {
		currentLang = null;
		error = null;
		onShowOriginal();
	}

	function toggleDropdown(event: MouseEvent): void {
		event.stopPropagation();
		if (!isLoading) {
			showDropdown = !showDropdown;
		}
	}

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.translate-dropdown')) {
			showDropdown = false;
		}
	}

	const buttonLabel = $derived(
		isLoading
			? 'Translating...'
			: currentLang
				? languages.find((l) => l.code === currentLang)?.label
				: 'Translate'
	);
</script>

<svelte:window onclick={handleClickOutside} />

<div class="flex items-center gap-2">
	{#if currentLang}
		<button
			type="button"
			onclick={handleShowOriginal}
			class="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="mr-1"
			>
				<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
				<path d="M3 3v5h5" />
			</svg>
			Show Original
		</button>
	{/if}

	<div class="translate-dropdown relative">
		<button
			type="button"
			onclick={toggleDropdown}
			disabled={isLoading}
			class="flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
		>
			{#if isLoading}
				<svg
					class="h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
					<path d="M2 12h20" />
				</svg>
			{/if}
			<span>{buttonLabel}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>

		{#if showDropdown}
			<div
				class="absolute left-0 z-50 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md"
			>
				{#each languages as lang}
					<button
						type="button"
						onclick={() => handleTranslate(lang.code)}
						class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground {currentLang ===
						lang.code
							? 'bg-accent'
							: ''}"
					>
						<span class="mr-2">{lang.flag}</span>
						<span>{lang.label}</span>
						{#if currentLang === lang.code}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="ml-auto"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if error}
	<p class="mt-2 text-sm text-red-500">{error}</p>
{/if}
