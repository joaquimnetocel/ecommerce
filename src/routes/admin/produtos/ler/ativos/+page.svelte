<script lang="ts">
	import Listagem from '../Listagem.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<h1 class="mb-6 text-2xl font-bold">PRODUTOS ATIVOS</h1>

<Listagem lido={data.lido} />
