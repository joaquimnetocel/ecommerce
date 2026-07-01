<script lang="ts">
	import type { Pathname } from '$app/types';
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { funcaoSubmeter } from './funcoes/funcaoSubmeter';
	import type { typeDados } from './typeDados';

	let { texto, dados, voltarPara }: { texto: string; dados: typeDados; voltarPara: Pathname } =
		$props();
</script>

<Button class="cursor-pointer" onclick={() => funcaoSubmeter({ dados, voltarPara })}>
	{texto}
</Button>
