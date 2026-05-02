<script lang="ts">
	import { page } from '$app/state';
	import { toggleMode, mode } from 'mode-watcher';
	import {
		LayoutGrid,
		BookOpen,
		Calendar,
		Plus,
		Lightbulb,
		Settings,
		ExternalLink,
		Sun,
		Moon
	} from 'lucide-svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutGrid, exact: true },
		{ href: '/admin/topics', label: 'Topic Explorer', icon: Lightbulb },
		{ href: '/admin/blogs', label: 'Blog Posts', icon: BookOpen },
		{ href: '/admin/blogs/new', label: 'Create Article', icon: Plus, exact: true },
		{ href: '/admin/reservations', label: 'Reservations', icon: Calendar },
		{ href: '/admin/settings', label: 'Settings', icon: Settings }
	];

	function isActive(item: { href: string; exact?: boolean }) {
		const path = page.url.pathname;
		if (item.exact) return path === item.href;
		return path === item.href || path.startsWith(item.href + '/');
	}
</script>

<div class="flex min-h-screen">
	<aside class="w-64 border-r bg-background p-6">
		<div class="mb-8">
			<h2 class="text-lg font-semibold">Admin Panel</h2>
		</div>
		<nav class="space-y-2">
			{#each navItems as item}
				{@const active = isActive(item)}
				<a
					href={item.href}
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors {active
						? 'bg-accent text-accent-foreground'
						: 'hover:bg-accent hover:text-accent-foreground'}"
				>
					<item.icon size={20} />
					{item.label}
				</a>
			{/each}

			<div class="my-4 border-t"></div>

			<a
				href="/"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<ExternalLink size={20} />
				View Site
			</a>
			<button
				onclick={toggleMode}
				class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				{#if $mode === 'dark'}
					<Sun size={20} />
					Light Mode
				{:else}
					<Moon size={20} />
					Dark Mode
				{/if}
			</button>
		</nav>
	</aside>

	{@render children()}
</div>
