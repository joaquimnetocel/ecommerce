<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button } from '$lib/shadcn/componentes/ui/button';

	let { voltarPara }: { voltarPara: Pathname } = $props();
</script>

<Button
	variant="outline"
	onclick={() => {
		goto(resolve(voltarPara));
	}}
	class="cursor-pointer"
>
	CANCELAR
</Button>
