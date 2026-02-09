<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import Check from 'svelte-radix/Check.svelte';
	import { cn } from '@/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		disabled,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	{disabled}
	{label}
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ selected })}
		<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			{#if selected}
				<Check class="h-4 w-4" />
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted: false })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>
