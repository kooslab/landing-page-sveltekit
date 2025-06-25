<script lang="ts">
	import { Logo } from '@/components/logo';
	import { page } from '$app/stores';

	let lang = $derived($page.params?.lang || 'en');
</script>

<a class="contents" href="/{lang}">
	<div class="flex h-9 items-center space-x-2 md:space-x-3">
		<Logo size="sm" />
		<div class="text-lg font-medium">Kooslab</div>
	</div>
</a>
