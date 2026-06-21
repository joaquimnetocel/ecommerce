<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import { Plus, Trash2 } from '@lucide/svelte';
	import CategoriaTree from './CategoriaTree.svelte';
	import { funcaoApagar } from './funcoes/store/funcaoApagar';
	import { funcaoCheckbox } from './funcoes/store/funcaoCheckbox';
	import { funcaoCriarSubcategoria } from './funcoes/store/funcaoCriarSubcategoria';
	import { store } from './store.svelte';
	import type { tipoGalho } from './tipoGalho';

	let {
		galho,
		nivel = 0,
		// funcaoCheckbox,
	}: {
		galho: tipoGalho;
		nivel?: number;
		// funcaoCheckbox: (id: string) => void;
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

		<Label class="flex cursor-pointer items-center gap-2">
			<input
				class="cursor-pointer"
				type="checkbox"
				checked={store.selecionadas.has(galho.idCategorias)}
				onchange={() => funcaoCheckbox(galho.idCategorias)}
			/>
			<span>{galho.campoNome}</span>
		</Label>
		<Button
			size="xs"
			class="cursor-pointer rounded border px-2 py-1 text-xs"
			onclick={() => {
				funcaoApagar(galho);
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
	</div>

	{#if store.criandoEm === galho.idCategorias}
		<div
			class="flex items-center gap-2"
			style={`padding-left:${funcaoIdentar(nivel) + editOffset}px`}
		>
			<Input
				class="h-7 w-90 rounded border-2 border-slate-400 bg-white px-2 py-1 text-sm"
				value={store.inputs[galho.idCategorias] ?? ''}
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
				autofocus
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
				<CategoriaTree galho={filha} nivel={nivel + 1} />
			{/each}
		</ul>
	{/if}
</li>
