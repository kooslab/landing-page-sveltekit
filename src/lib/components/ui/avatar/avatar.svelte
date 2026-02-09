<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';
	import { cn } from '@/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		delayMs,
		children,
		...restProps
	}: AvatarPrimitive.RootProps = $props();
</script>

<AvatarPrimitive.Root
	bind:ref
	{delayMs}
	class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
	{...restProps}
>
	{@render children?.()}
</AvatarPrimitive.Root>
