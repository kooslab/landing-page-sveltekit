<script lang="ts">
	import { page } from '$app/state';
	import {
		LayoutGrid,
		BookOpen,
		Calendar,
		Plus,
		Lightbulb,
		Settings,
		ExternalLink
	} from 'lucide-svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutGrid, exact: true },
		{ href: '/admin/topics', label: 'Topic Explorer', icon: Lightbulb },
		{ href: '/admin/blogs', label: 'Blog Posts', icon: BookOpen },
		{ href: '/admin/blogs/new', label: 'New Article', icon: Plus, exact: true },
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
	<!-- Sidebar -->
	<aside class="flex w-60 flex-shrink-0 flex-col bg-brand px-4 py-7">
		<!-- Brand -->
		<div class="mb-8 flex items-center gap-2 px-2">
			<span class="text-lg font-bold text-white">KooStory</span>
			<span
				class="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white/50"
			>
				Admin
			</span>
		</div>

		<!-- Nav -->
		<nav class="flex-1 space-y-0.5">
			{#each navItems as item}
				{@const active = isActive(item)}
				<a
					href={item.href}
					class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors {active
						? 'bg-white/10 text-white'
						: 'text-white/45 hover:bg-white/5 hover:text-white/80'}"
				>
					<item.icon size={17} />
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Bottom -->
		<div class="mt-4 space-y-0.5 border-t border-white/10 pt-4">
			<a
				href="/"
				class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white/80"
			>
				<ExternalLink size={17} />
				View Site
			</a>
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex flex-1 flex-col bg-canvas-soft">
		{@render children()}
	</main>
</div>
