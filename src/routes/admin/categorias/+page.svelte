<script lang="ts">
	import type { PageProps } from './$types';
	import FormularioDeCategorias from './_FormularioDeCategorias/FormularioDeCategorias.svelte';

	let { data }: PageProps = $props();
</script>

<FormularioDeCategorias dados={data.lido} />
