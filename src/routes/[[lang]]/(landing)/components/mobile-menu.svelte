<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _, locale } from 'svelte-i18n';

	import { Menu, Home, User, BookOpen, Hammer, Briefcase } from 'lucide-svelte';

	import { buttonVariants } from '$lib/components/ui/button';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';

	let { session } = $derived($page.data);
	// Use locale store so sub-pages (no lang param) still link to correct home
	let currentLang = $derived($locale || 'en');
	let homeHref = $derived(currentLang === 'en' ? '/' : `/${currentLang}`);

	let sheetOpen = $state(false);
</script>

<Sheet.Root bind:open={sheetOpen}>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				class="md:hidden"
				onclick={() => (sheetOpen = !sheetOpen)}
			>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle menu</span>
			</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content side="left" class="w-[85vw] max-w-[300px]">
		<Sheet.Header>
			<Sheet.Title class="text-left text-xl">KooStory</Sheet.Title>
		</Sheet.Header>
		<nav class="flex flex-col gap-4 px-2 py-6">
			<a
				href={homeHref}
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => goto(homeHref), 300);
				}}
			>
				<Home class="h-5 w-5" />
				Home
			</a>

			<a
				href="/about"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => goto('/about'), 300);
				}}
			>
				<User class="h-5 w-5" />
				{$_('nav.about')}
			</a>

			<a
				href="/workshops"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => goto('/workshops'), 300);
				}}
			>
				<Hammer class="h-5 w-5" />
				{$_('nav.workshops')}
			</a>

			<a
				href="/use-cases"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => goto('/use-cases'), 300);
				}}
			>
				<Briefcase class="h-5 w-5" />
				{$_('nav.useCases')}
			</a>

			<a
				href="/blog"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => goto('/blog'), 300);
				}}
			>
				<BookOpen class="h-5 w-5" />
				{$_('nav.blog')}
			</a>
		</nav>
	</Sheet.Content>
</Sheet.Root>
