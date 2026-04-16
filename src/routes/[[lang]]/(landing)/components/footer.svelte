<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	let langPrefix = $derived($page.params.lang ? `/${$page.params.lang}` : '');
</script>

<footer class="min-h-16 w-full border-t">
	<div class="container max-w-[1024px] py-8 text-foreground/70">
		<div class="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center space-x-1">Koostory UG © {new Date().getFullYear()}</div>
			<div class="flex flex-col gap-2 text-sm text-foreground/50 sm:items-end">
				<div class="flex gap-4">
					<a href="{langPrefix}/privacy" class="transition-colors hover:text-foreground/70">
						{$_('footer.privacy')}
					</a>
					<a href="{langPrefix}/terms" class="transition-colors hover:text-foreground/70">
						{$_('footer.terms')}
					</a>
				</div>
				<a href="mailto:ilmokoo@koostory.net" class="transition-colors hover:text-foreground/70"
					>ilmokoo@koostory.net</a
				>
				<span>Akazienstraße 3a, 10827 Berlin</span>
			</div>
		</div>
	</div>
</footer>
