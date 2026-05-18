<script lang="ts">
	import LogoContainer from './logo-container.svelte';
	import NavButtons from './nav-buttons.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import LanguageSwitcher from '@/components/language-switcher.svelte';
	import { page } from '$app/stores';

	let scrollY: number = $state(0);
	let scrolled = $derived(scrollY > 10);
	let isMainRoute = $derived($page.route.id === '/[[lang]]/(landing)');
</script>

<svelte:window bind:scrollY />

<header
	class="sticky top-0 z-50 w-full transition-all duration-300 {scrolled
		? 'border-b border-border bg-background/95 backdrop-blur-sm'
		: 'bg-brand'}"
>
	<nav class="container flex w-full items-center justify-between px-5 py-3 md:px-5 md:py-4">
		<div class="flex items-center">
			<LogoContainer {scrolled} />
			<NavButtons {scrolled} />
		</div>

		<div class="flex items-center space-x-2 md:space-x-4">
			{#if isMainRoute}<LanguageSwitcher />{/if}
			<MobileMenu />
		</div>
	</nav>
</header>
