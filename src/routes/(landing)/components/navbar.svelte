<script lang="ts">
	import LogoContainer from './logo-container.svelte';
	import NavButtons from './nav-buttons.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import { ThemeToggle } from '@/components/theme-controller';

	let scrollY: number = $state(0);
</script>

<svelte:window bind:scrollY />

<header
	class="sticky top-0 z-50 w-full border-border bg-background {scrollY > 0 ? 'border-b' : ''}"
>
	<nav class="container flex w-full items-center justify-between px-4 py-3 md:px-4 md:py-4">
		<div class="flex items-center">
			<LogoContainer />
			<NavButtons />
		</div>

		<div class="flex items-center space-x-2 md:space-x-4">
			<ThemeToggle />
			<MobileMenu />
		</div>
	</nav>
</header>
