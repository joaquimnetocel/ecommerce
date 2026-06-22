<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Plus } from '@lucide/svelte';
	import CategoriaTree from './CategoriaTree.svelte';
	import { deriveds } from './deriveds.svelte';
	import { funcaoCriarCategoria } from './store/funcaoCriarCategoria';
	import { store } from './store/store.svelte';
	import type { tipoCategorias } from './tipoCategorias';

	let {
		dados,
		apenasMarcadas = false,
		verCheckboxes,
	}: { verCheckboxes: boolean; dados: tipoCategorias; apenasMarcadas?: boolean } = $props();

	$effect.pre(() => {
		store.categorias = structuredClone(dados ?? []);
	});

	$effect.pre(() => {
		store.apenasMarcadas = apenasMarcadas;
	});
</script>

{#if deriveds.arvore().length > 0}
	<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
		<Input
			class="border-2 border-slate-400 bg-white"
			bind:value={store.pesquisa}
			placeholder="PESQUISAR CATEGORIA..."
		/>
		{#if verCheckboxes}
			<label
				class="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 select-none"
			>
				<input
					type="checkbox"
					class="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
					bind:checked={store.apenasMarcadas}
				/>
				<span>VER APENAS MARCADAS</span>
			</label>
		{/if}
	</div>
{/if}

<div class="space-y-4">
	<ul>
		{#if deriveds.arvoreFiltrada().length === 0}
			<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
		{:else}
			{#each deriveds.arvoreFiltrada() as galho (galho.idCategorias)}
				<CategoriaTree {galho} nivel={0} {verCheckboxes} />
			{/each}
		{/if}
	</ul>

	<Button class="cursor-pointer" onclick={funcaoCriarCategoria}>
		<Plus /> CRIAR CATEGORIA
	</Button>
</div>
