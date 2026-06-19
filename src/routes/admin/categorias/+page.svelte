<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import { constCategorias } from './constCategorias';
	import { funcaoMontarArvore } from './funcaoMontarArvore';

	let categorias = funcaoMontarArvore(constCategorias);

	let selecionadas = new SvelteSet<string>();

	// function salvar() {
	// 	console.log([...selecionadas]);
	// }
</script>

<form class="space-y-4">
	<ul>
		{#each categorias as categoria (categoria.idCategorias)}
			<CategoriaTree {categoria} nivel={0} {selecionadas} />
		{/each}
	</ul>

	<button type="submit" class="rounded border px-4 py-2"> Salvar </button>
</form>
<pre>{JSON.stringify([...selecionadas], null, 2)}</pre>
