<script lang="ts">
	import type { SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import type { typeCategoriaArvore } from './typeCategoriaArvore';

	let {
		categoria,
		nivel = 0,
		selecionadas,
		funcaoToggle,
	} = $props<{
		categoria: typeCategoriaArvore;
		nivel?: number;
		selecionadas: SvelteSet<string>;
		funcaoToggle: (id: string) => void;
	}>();

	let aberto = $state(true);
</script>

<li>
	<div class="flex items-center gap-2" style={`padding-left:${nivel * 24}px`}>
		{#if categoria.filhas.length}
			<button type="button" class="w-5 text-center" onclick={() => (aberto = !aberto)}>
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
	</div>

	{#if aberto && categoria.filhas.length}
		<ul>
			{#each categoria.filhas as filha (filha.idCategorias)}
				<CategoriaTree categoria={filha} nivel={nivel + 1} {selecionadas} {funcaoToggle} />
			{/each}
		</ul>
	{/if}
</li>
