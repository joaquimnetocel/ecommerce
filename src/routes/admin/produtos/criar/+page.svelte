<script lang="ts">
	import Formulario from '$lib/componentes/admin/produtos/FormularioDeProdutos/Formulario.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

{#key data.inputs.formProdutos.idProdutos}
	<Formulario {data} />
{/key}
