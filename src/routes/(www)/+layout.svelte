<script lang="ts">
	import BarraMobileInferior from '$lib/componentes/compartilhados/BarraMobileInferior/BarraMobileInferior.svelte';
	import Rodape from '$lib/componentes/compartilhados/Rodape/Rodape.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col justify-between">
	<main class="min-h-screen flex-1">
		{@render children()}
	</main>
	<Rodape />
	<BarraMobileInferior />
</div>
