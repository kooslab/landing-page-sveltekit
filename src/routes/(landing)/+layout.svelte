<script lang="ts">
	import { type Snippet } from 'svelte';

	import Footer from './components/footer.svelte';
	import Navbar from './components/navbar.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<Navbar />

<div class="min-h-dvh w-full">
	{@render children?.()}
</div>

<Footer />
