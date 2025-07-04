<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import CircleUserIcon from 'lucide-svelte/icons/circle-user';

	import { Button, buttonVariants } from '@/components/ui/button';
	import * as Dropdown from '@/components/ui/dropdown-menu';

	let { session } = $derived($page.data);
	let lang = $derived($page.params?.lang || 'en');
	let langPrefix = $derived(lang === 'en' ? '' : `/${lang}`);
</script>

<div class="hidden items-center md:ml-6 md:flex">
	<a
		href="{langPrefix}/#vision"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Vision
	</a>
	<a
		href="{langPrefix}/#mission"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Mission
	</a>
	<a
		href="{langPrefix}/#portfolio"
		class="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Portfolio
	</a>
	<Button size="sm" variant="ghost" class="rounded-full text-foreground/60" href="/blog"
		>Blog</Button
	>
</div>

<!-- Commented out user account section for future use -->
<!-- 
<div class="flex items-center">
	{#if session}
		<Dropdown.Root>
			<Dropdown.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
				<CircleUserIcon />
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Group>
					<form method="POST" action="/auth?/logout" class="contents" use:enhance>
						<button type="submit" class="contents">
							<Dropdown.Item>Log out</Dropdown.Item>
						</button>
					</form>
				</Dropdown.Group>
			</Dropdown.Content>
		</Dropdown.Root>
	{:else}
		<div>
			<Button size="sm" variant="outline" href="/login">Log in</Button>
			<Button size="sm" href="/signup">Sign up</Button>
		</div>
	{/if}
</div>
-->
