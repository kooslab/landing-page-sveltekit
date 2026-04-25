<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	import {
		Menu,
		Home,
		User,
		Hammer,
		Briefcase,
		BookOpen,
		ChevronDown,
		LogOut,
		Layers,
		Building2,
		FileSpreadsheet
	} from 'lucide-svelte';

	import { buttonVariants } from '$lib/components/ui/button';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';

	let { session } = $derived($page.data);
	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);

	let sheetOpen = $state(false);
	let solutionsOpen = $state(false);

	function toggleSheet() {
		sheetOpen = !sheetOpen;
	}

	const scrollToSection = (sectionId: string) => {
		sheetOpen = false;

		setTimeout(() => {
			const currentPath = window.location.pathname;
			const isLandingPage = currentPath === '/' || currentPath === `/${lang}`;

			if (!isLandingPage) {
				goto(`${langPrefix}/#${sectionId}`);
				return;
			}

			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 300);
	};
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
				href="{langPrefix}/"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => {
						goto(`${langPrefix}/`);
					}, 300);
				}}
			>
				<Home class="h-5 w-5" />
				Home
			</a>

			<button
				class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={() => (solutionsOpen = !solutionsOpen)}
			>
				<span class="flex items-center gap-3">
					<Layers class="h-5 w-5" />
					{$_('nav.whoWeHelp')}
				</span>
				<ChevronDown class="h-4 w-4 transition-transform {solutionsOpen ? 'rotate-180' : ''}" />
			</button>
			{#if solutionsOpen}
				<div class="ml-8 flex flex-col gap-1">
					<a
						href="{langPrefix}/for/agencies"
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
						onclick={(e) => {
							e.preventDefault();
							sheetOpen = false;
							setTimeout(() => {
								goto(`${langPrefix}/for/agencies`);
							}, 300);
						}}
					>
						<Building2 class="h-4 w-4" />
						{$_('nav.forAgencies')}
					</a>
					<a
						href="{langPrefix}/for/no-more-offices"
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
						onclick={(e) => {
							e.preventDefault();
							sheetOpen = false;
							setTimeout(() => {
								goto(`${langPrefix}/for/no-more-offices`);
							}, 300);
						}}
					>
						<FileSpreadsheet class="h-4 w-4" />
						{$_('nav.forSpreadsheetTeams')}
					</a>
				</div>
			{/if}

			<a
				href="{langPrefix}/about"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => {
						goto(`${langPrefix}/about`);
					}, 300);
				}}
			>
				<User class="h-5 w-5" />
				{$_('nav.about')}
			</a>

			<a
				href="/blog"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={(e) => {
					e.preventDefault();
					sheetOpen = false;
					setTimeout(() => {
						goto('/blog');
					}, 300);
				}}
			>
				<BookOpen class="h-5 w-5" />
				{$_('nav.blog')}
			</a>

			<div class="mt-6 border-t border-border pt-6">
				<a
					href="{langPrefix}/#workshop"
					class={buttonVariants({ variant: 'default', size: 'sm', class: 'w-full' })}
					onclick={(e) => {
						e.preventDefault();
						scrollToSection('workshop');
					}}
				>
					{$_('workshop.cta')}
				</a>
			</div>
		</nav>
	</Sheet.Content>
</Sheet.Root>
