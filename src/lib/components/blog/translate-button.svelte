<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

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

	const languages: { code: SupportedLang; label: string; flag: string }[] = [
		{ code: 'EN', label: 'English', flag: '🇬🇧' },
		{ code: 'KO', label: '한국어', flag: '🇰🇷' },
		{ code: 'DE', label: 'Deutsch', flag: '🇩🇪' }
	];

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

	const buttonLabel = $derived(
		isLoading
			? 'Translating...'
			: currentLang
				? languages.find((l) => l.code === currentLang)?.label
				: 'Translate'
	);
</script>

<div class="flex items-center gap-2">
	{#if currentLang}
		<Button variant="ghost" size="sm" onclick={handleShowOriginal} class="text-muted-foreground">
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
		</Button>
	{/if}

	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" size="sm" disabled={isLoading}>
				{#if isLoading}
					<svg
						class="mr-1 h-4 w-4 animate-spin"
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
						class="mr-1"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
						<path d="M2 12h20" />
					</svg>
				{/if}
				{buttonLabel}
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
					class="ml-1"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start">
			{#each languages as lang}
				<DropdownMenu.Item
					onclick={() => handleTranslate(lang.code)}
					class={currentLang === lang.code ? 'bg-accent' : ''}
				>
					<span class="mr-2">{lang.flag}</span>
					{lang.label}
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
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

{#if error}
	<p class="mt-2 text-sm text-red-500">{error}</p>
{/if}
