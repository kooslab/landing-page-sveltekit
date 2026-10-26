<script lang="ts">
	import '../app.pcss';
	import type { LayoutData } from './$types';

	import { page } from '$app/stores';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let metaTags = $derived(deepMerge(data?.baseMetaTags || {}, $page.data?.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="dark" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />

{@render children()}
