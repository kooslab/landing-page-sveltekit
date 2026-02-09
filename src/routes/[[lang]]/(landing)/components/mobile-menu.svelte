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
		LogOut
	} from 'lucide-svelte';

	import { buttonVariants } from '$lib/components/ui/button';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';

	let { session } = $derived($page.data);
	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);

	let sheetOpen = $state(false);

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
				class="flex items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={() => {
					scrollToSection('about');
				}}
			>
				<User class="h-5 w-5" />
				{$_('nav.about')}
			</button>

			<button
				class="flex items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={() => {
					scrollToSection('process');
				}}
			>
				<Hammer class="h-5 w-5" />
				{$_('nav.process')}
			</button>

			<button
				class="flex items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
				onclick={() => {
					scrollToSection('portfolio');
				}}
			>
				<Briefcase class="h-5 w-5" />
				{$_('nav.portfolio')}
			</button>

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
