<script lang="ts">
	import Formulario from '../_Formulario/Formulario.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<Formulario {data} />
