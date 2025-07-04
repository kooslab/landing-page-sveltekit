<script lang="ts">
	import Navbar from '../[[lang]]/(landing)/components/navbar.svelte';
	import Footer from '../[[lang]]/(landing)/components/footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="container mx-auto flex-1 px-4 py-8">
		{@render children()}
	</main>
	<Footer />
</div>
