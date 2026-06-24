<script lang="ts">
	import { tamanhos } from '$lib/constantes/tamanhos';
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import * as ButtonGroup from '$lib/shadcn/componentes/ui/button-group';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import { Pencil, Plus, Trash2 } from '@lucide/svelte';
	import Item from './Item.svelte';
	import { sweetalertApagar } from './funcoes/sweetalertApagar';
	import { sweetalertEditar } from './funcoes/sweetalertEditar';
	import { funcaoApagar } from './store/funcaoApagar';
	import { funcaoCriarSubcategoria } from './store/funcaoCriarSubcategoria';
	import { funcaoEditar } from './store/funcaoEditar';
	import { store } from './store/store.svelte';
	import type { tipoGalho } from './tipoGalho';

	let {
		galho,
		nivel = 0,
	}: {
		galho: tipoGalho;
		nivel?: number;
	} = $props();

	let aberto = $state(true);

	const funcaoIdentar = (nivel: number) => nivel * 24;
	const editOffset = 48;
</script>

<li>
	<div class="flex items-center gap-2" style={`padding-left:${funcaoIdentar(nivel)}px`}>
		{#if galho.filhos.length}
			<button type="button" class="w-5 cursor-pointer" onclick={() => (aberto = !aberto)}>
				{aberto ? '▼' : '▶'}
			</button>
		{:else}
			<div class="w-5"></div>
		{/if}
		<Label class="flex items-center gap-2">
			<span>{galho.campoNome}</span>
		</Label>
		<ButtonGroup.Root>
			<Button
				size="xs"
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				onclick={async () => {
					const novoNome = await sweetalertEditar(galho.campoNome);
					if (novoNome) {
						funcaoEditar(galho, novoNome);
					}
				}}
			>
				<Pencil />
			</Button>
			<Button
				size="xs"
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				onclick={async () => {
					const aux = await sweetalertApagar(galho.campoNome);
					if (aux) {
						funcaoApagar(galho);
					}
				}}
			>
				<Trash2 />
			</Button>
			<Button
				size="xs"
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				onclick={() => {
					store.criandoEm = galho.idCategorias;
					store.inputs[galho.idCategorias] = '';
				}}
			>
				<Plus /> SUBCATEGORIA
			</Button>
		</ButtonGroup.Root>
	</div>

	{#if store.criandoEm === galho.idCategorias}
		<div
			class="flex items-center gap-2"
			style={`padding-left:${funcaoIdentar(nivel) + editOffset}px`}
		>
			<Input
				class="h-7 w-90 rounded border-2 border-slate-400 bg-white px-2 py-1 text-sm"
				value={store.inputs[galho.idCategorias] ?? ''}
				maxlength={tamanhos.categorias.campoNome}
				oninput={(e) => {
					store.inputs[galho.idCategorias] = (e.target as HTMLInputElement).value.toUpperCase();
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') funcaoCriarSubcategoria(galho.idCategorias);
					if (e.key === 'Escape') {
						if (store.criandoEm) delete store.inputs[store.criandoEm];
						store.criandoEm = null;
					}
				}}
			/>

			<Button
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				size="sm"
				onclick={() => funcaoCriarSubcategoria(galho.idCategorias)}
			>
				CRIAR
			</Button>
		</div>
	{/if}

	{#if aberto && galho.filhos.length}
		<ul>
			{#each galho.filhos as filha (filha.idCategorias)}
				<Item galho={filha} nivel={nivel + 1} />
			{/each}
		</ul>
	{/if}
</li>
