<script lang="ts">
	import * as Collapsible from '$lib/shadcn/componentes/ui/collapsible';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(),
		trigger,
		content,
	}: {
		trigger: Snippet;
		content: Snippet;
		open: boolean;
	} = $props();
</script>

<Collapsible.Root bind:open>
	<Collapsible.Trigger
		class={` ${
			open ? 'rounded-t-md rounded-b-none' : 'rounded-md'
		} flex w-full cursor-pointer items-center gap-2 bg-white px-4 py-3 text-left font-medium hover:bg-slate-200`}
	>
		<ChevronDown class={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />

		{@render trigger()}
	</Collapsible.Trigger>

	<Collapsible.Content
		class="overflow-hidden rounded-b-md bg-slate-300 px-4 pt-2 pb-4
		data-[state=closed]:animate-collapsible-up
		data-[state=open]:animate-collapsible-down"
	>
		{@render content()}
	</Collapsible.Content>
</Collapsible.Root>
