<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	import CircleUserIcon from 'lucide-svelte/icons/circle-user';
	import { ChevronDown, Building2, FileSpreadsheet } from 'lucide-svelte';

	import { Button, buttonVariants } from '@/components/ui/button';
	import * as Dropdown from '@/components/ui/dropdown-menu';

	let { session } = $derived($page.data);
	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
	let dropdownOpen = $state(false);
</script>

<div class="hidden items-center md:ml-6 md:flex">
	<Dropdown.Root bind:open={dropdownOpen}>
		<Dropdown.Trigger
			class="mr-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
		>
			{$_('nav.whoWeHelp')}
			<ChevronDown class="h-3.5 w-3.5" />
		</Dropdown.Trigger>
		<Dropdown.Content align="start" class="w-56">
			<a
				href="{langPrefix}/for/agencies"
				class="flex items-center gap-3 rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
				onclick={() => (dropdownOpen = false)}
			>
				<Building2 class="h-4 w-4 text-muted-foreground" />
				<div>
					<div class="font-medium">{$_('nav.forAgencies')}</div>
					<div class="text-xs text-muted-foreground">Portals, CRM, workflows</div>
				</div>
			</a>
			<a
				href="{langPrefix}/for/no-more-offices"
				class="flex items-center gap-3 rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
				onclick={() => (dropdownOpen = false)}
			>
				<FileSpreadsheet class="h-4 w-4 text-muted-foreground" />
				<div>
					<div class="font-medium">{$_('nav.forSpreadsheetTeams')}</div>
					<div class="text-xs text-muted-foreground">Beyond spreadsheets</div>
				</div>
			</a>
		</Dropdown.Content>
	</Dropdown.Root>
	<a
		href="{langPrefix}/about"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		{$_('nav.about')}
	</a>
	<a
		href="{langPrefix}/workshops"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		{$_('nav.workshops')}
	</a>
	<Button size="sm" variant="ghost" class="rounded-full text-foreground/60" href="/blog"
		>{$_('nav.blog')}</Button
	>
</div>
