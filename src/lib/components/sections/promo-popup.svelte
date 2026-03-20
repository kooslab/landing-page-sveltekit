<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import { browser } from '$app/environment';

	let { onBook = () => {} }: { onBook?: () => void } = $props();

	const STORAGE_KEY = 'koostory_promo_dismissed';

	let open = $state(false);
	let dismissed = $state(false);

	// Check localStorage on mount — only dismissed for today
	$effect(() => {
		if (browser) {
			const stored = localStorage.getItem(STORAGE_KEY);
			const today = new Date().toISOString().split('T')[0];
			dismissed = stored === today;
		}
	});

	// Scroll trigger
	$effect(() => {
		if (!browser || dismissed) return;

		let triggered = false;

		function onScroll() {
			if (triggered) return;
			const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
			if (scrollPercent > 0.15) {
				triggered = true;
				// Small delay so it doesn't feel jarring
				setTimeout(() => {
					open = true;
				}, 500);
				window.removeEventListener('scroll', onScroll);
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function dismiss() {
		open = false;
		dismissed = true;
		if (browser) {
			const today = new Date().toISOString().split('T')[0];
			localStorage.setItem(STORAGE_KEY, today);
		}
	}

	function handleOpenChange(isOpen: boolean) {
		open = isOpen;
	}
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title class="text-xl">{$_('promo.title')}</Dialog.Title>
			<Dialog.Description>{$_('promo.subtitle')}</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4">
			<p class="text-sm leading-relaxed text-foreground/80">
				{$_('promo.description')}
			</p>

			<div class="rounded-lg bg-muted/40 p-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					{$_('promo.examplesLabel')}
				</p>
				<ul class="space-y-1.5">
					{#each [0, 1, 2, 3] as i}
						<li class="flex items-start gap-2 text-sm text-foreground/70">
							<span class="mt-1 block h-1 w-1 flex-shrink-0 rounded-full bg-foreground/30"></span>
							{$_(`promo.examples.${i}`)}
						</li>
					{/each}
				</ul>
			</div>

			<p class="text-xs text-muted-foreground">
				{$_('promo.expiry')}
			</p>

			<Button
				size="lg"
				class="group w-full text-sm"
				onclick={() => {
					open = false;
					onBook();
				}}
			>
				{$_('promo.cta')}
				<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Button>

			<button
				class="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
				onclick={dismiss}
			>
				{$_('promo.dontShow')}
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
