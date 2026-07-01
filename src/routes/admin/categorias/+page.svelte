<script lang="ts">
	import FormularioDeCategorias from '$lib/componentes/admin/categorias/FormularioDeCategorias/index.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<FormularioDeCategorias dados={data.lido} />
