<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/shadcn/componentes/ui/card';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Plus } from '@lucide/svelte';
	import Item from './Item.svelte';
	import { deriveds } from './deriveds.svelte';
	import { funcaoCriarCategoria } from './store/funcaoCriarCategoria';
	import { store } from './store/store.svelte';
	import type { tipoCategorias } from './tipoCategorias';

	let {
		dados,
	}: {
		dados: tipoCategorias;
	} = $props();

	$effect.pre(() => {
		store.categorias = dados;
	});

	// 3. VIA DE SAÍDA (Avisa o Pai quando houver cliques nos checkboxes internos)
</script>

<Card class="gap-2 bg-slate-200 shadow-md">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle>CATEGORIAS</CardTitle>
			<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
			<Button class="cursor-pointer" onclick={funcaoCriarCategoria}><Plus /> CRIAR CATEGORIA</Button
			>
		</div>
	</CardHeader>

	<CardContent class="space-y-4">
		{#if deriveds.arvore().length > 0}
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<Input
					class="border-2 border-slate-400 bg-white"
					bind:value={store.pesquisa}
					placeholder="PESQUISAR CATEGORIA..."
				/>
			</div>
		{/if}

		<div class="space-y-4">
			<ul>
				{#if deriveds.arvoreFiltrada().length === 0}
					<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
				{:else}
					{#each deriveds.arvoreFiltrada() as galho (galho.idCategorias)}
						<Item {galho} nivel={0} />
					{/each}
				{/if}
			</ul>
		</div>
	</CardContent>
</Card>

<!-- <pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre> -->
