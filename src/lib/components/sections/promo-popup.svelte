<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import { browser } from '$app/environment';

	let { onBook = () => {}, showPromo = false }: { onBook?: () => void; showPromo?: boolean } =
		$props();

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
			<Dialog.Title class="text-xl">Free 45-Min Automation Consulting</Dialog.Title>
			<Dialog.Description>Find out where you're losing time — and how to fix it</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4">
			<p class="text-sm leading-relaxed text-foreground/80">
				We'll map your current workflows, identify the biggest bottlenecks, and show you exactly where automation can save hours every week.
			</p>

			<div class="rounded-lg bg-muted/40 p-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					What you'll walk away with
				</p>
				<ul class="space-y-1.5">
					{#each [
						'A clear picture of where your team is losing time',
						'Specific bottlenecks that can be automated today',
						'A prioritized action plan — what to automate first and why',
						"Honest advice on what's worth automating and what isn't"
					] as example}
						<li class="flex items-start gap-2 text-sm text-foreground/70">
							<span class="mt-1 block h-1 w-1 flex-shrink-0 rounded-full bg-foreground/30"></span>
							{example}
						</li>
					{/each}
				</ul>
			</div>

			<p class="text-xs text-muted-foreground">
				Spots are limited — we'll close this once our schedule fills up.
			</p>

			<Button
				size="lg"
				class="group w-full text-sm"
				onclick={() => {
					open = false;
					onBook();
				}}
			>
				Book Your Free Consulting Session
				<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Button>

			<button
				class="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
				onclick={dismiss}
			>
				Don't show this today
			</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
