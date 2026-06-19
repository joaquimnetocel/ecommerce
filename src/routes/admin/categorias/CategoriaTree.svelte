<script lang="ts">
	import type { SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import type { typeCategoriaArvore } from './typeCategoriaArvore';

	let {
		categoria,
		nivel = 0,
		selecionadas,
		funcaoToggle,
		criandoEm,
		iniciarCriacao,
		salvarSubcategoria,
		cancelarCriacao,
		getInput,
		setInput,
	} = $props<{
		categoria: typeCategoriaArvore;
		nivel?: number;
		selecionadas: SvelteSet<string>;
		funcaoToggle: (id: string) => void;
		criandoEm: string | null;
		iniciarCriacao: (idPai: string) => void;
		salvarSubcategoria: (idPai: string) => void;
		cancelarCriacao: () => void;
		getInput: (id: string) => string;
		setInput: (id: string, value: string) => void;
	}>();

	let aberto = $state(true);

	// const indent = (nivel: number) => `padding-left:${nivel * 24}px`;
	const indent = (nivel: number) => nivel * 24;
	const editOffset = 48;
</script>

<li>
	<!-- HEADER DA CATEGORIA -->
	<div class="flex items-center gap-2" style={`padding-left:${indent(nivel)}px`}>
		{#if categoria.filhas.length}
			<button type="button" class="w-5" onclick={() => (aberto = !aberto)}>
				{aberto ? '▼' : '▶'}
			</button>
		{:else}
			<div class="w-5"></div>
		{/if}

		<label class="flex cursor-pointer items-center gap-2">
			<input
				type="checkbox"
				checked={selecionadas.has(categoria.idCategorias)}
				onchange={() => funcaoToggle(categoria.idCategorias)}
			/>
			<span>{categoria.campoNome}</span>
		</label>

		<button
			type="button"
			class="rounded border px-2 py-1 text-xs"
			onclick={() => iniciarCriacao(categoria.idCategorias)}
		>
			+ Subcategoria
		</button>
	</div>

	<!-- INPUT ALINHADO CORRETAMENTE -->
	{#if criandoEm === categoria.idCategorias}
		<div class="flex items-center gap-2" style={`padding-left:${indent(nivel) + editOffset}px`}>
			<input
				class="rounded border px-2 py-1 text-sm"
				value={getInput(categoria.idCategorias)}
				oninput={(e) => setInput(categoria.idCategorias, (e.target as HTMLInputElement).value)}
				onkeydown={(e) => {
					if (e.key === 'Enter') salvarSubcategoria(categoria.idCategorias);
					if (e.key === 'Escape') cancelarCriacao();
				}}
				autofocus
			/>

			<button
				type="button"
				class="rounded border px-2 py-1 text-xs"
				onclick={() => salvarSubcategoria(categoria.idCategorias)}
			>
				OK
			</button>
		</div>
	{/if}

	<!-- FILHOS -->
	{#if aberto && categoria.filhas.length}
		<ul>
			{#each categoria.filhas as filha (filha.idCategorias)}
				<CategoriaTree
					categoria={filha}
					nivel={nivel + 1}
					{selecionadas}
					{funcaoToggle}
					{criandoEm}
					{iniciarCriacao}
					{salvarSubcategoria}
					{cancelarCriacao}
					{getInput}
					{setInput}
				/>
			{/each}
		</ul>
	{/if}
</li>
