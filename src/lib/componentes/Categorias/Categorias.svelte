<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Plus } from '@lucide/svelte';
	import CategoriaTree from './CategoriaTree.svelte';
	import { deriveds } from './deriveds.svelte';
	import { remotaCriar } from './funcoes/remotaCriar.remote';
	import { sweetalertCriar } from './funcoes/sweetalertCriar';
	import { store } from './store/store.svelte';
	import type { tipoCategorias } from './tipoCategorias';

	let { dados }: { dados: tipoCategorias } = $props();

	$effect(() => {
		store.categorias = structuredClone(dados);
	});
</script>

{#if deriveds.arvore().length > 0}
	<Input
		class="border-2 border-slate-400 bg-white"
		bind:value={store.pesquisa}
		placeholder="PESQUISAR CATEGORIA..."
	/>
{/if}

<div class="space-y-4">
	<ul>
		{#if deriveds.arvoreFiltrada().length === 0}
			<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
		{:else}
			{#each deriveds.arvoreFiltrada() as galho (galho.idCategorias)}
				<CategoriaTree {galho} nivel={0} />
			{/each}
		{/if}
	</ul>

	<Button
		class="cursor-pointer"
		onclick={async () => {
			const digitado = await sweetalertCriar();
			if (!digitado) return;
			const inserido = await remotaCriar({
				campoNome: digitado,
				keyCategoriasPai: null,
				idCategorias: undefined,
			});
			store.categorias = [inserido, ...store.categorias];
		}}
	>
		<Plus /> CRIAR CATEGORIA
	</Button>
</div>

<pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre>
