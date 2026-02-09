<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '@/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		children,
		...restProps
	}: SelectPrimitive.ContentProps = $props();
</script>

<SelectPrimitive.Content
	bind:ref
	{sideOffset}
	class={cn(
		'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none',
		className
	)}
	{...restProps}
>
	<div class="w-full p-1">
		{@render children?.()}
	</div>
</SelectPrimitive.Content>
