<script lang="ts">
	import Categorias from '$lib/componentes/FormularioDeCategorias/FormularioDeCategorias.svelte';
	import { store } from '$lib/componentes/FormularioDeCategorias/store/store.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Categorias dados={data.lido} verCheckboxes={true} />

<pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre>
