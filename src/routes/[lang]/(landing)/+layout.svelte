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

<div class="mx-auto min-h-dvh w-full max-w-7xl px-4 sm:px-8 md:px-12">
	<div>
		{@render children?.()}
	</div>
	<!-- <div class="dark:prose-dark prose">
		{@render children?.()}
	</div> -->
</div>

<Footer />
