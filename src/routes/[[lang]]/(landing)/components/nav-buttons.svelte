<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	import CircleUserIcon from 'lucide-svelte/icons/circle-user';

	import { Button, buttonVariants } from '@/components/ui/button';
	import * as Dropdown from '@/components/ui/dropdown-menu';

	let { session } = $derived($page.data);
	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
</script>

<div class="hidden items-center md:ml-6 md:flex">
	<a
		href="{langPrefix}/#process"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		{$_('nav.process')}
	</a>
	<a
		href="{langPrefix}/#portfolio"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		{$_('nav.portfolio')}
	</a>
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
