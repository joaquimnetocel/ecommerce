<script lang="ts">
	import { PUBLIC_LOJA, PUBLIC_URL } from '$env/static/public';
	import './layout.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={`${PUBLIC_URL}/${PUBLIC_LOJA}/imagens/icon.png`} />
	<meta name="PREENCHER AQUI" content="PREENCHER AQUI" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="PREENCHER AQUI" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content="PREENCHER AQUI" />
	<meta property="og:description" content="PREENCHER AQUI" />
	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content={`${PUBLIC_URL}/${PUBLIC_LOJA}/imagens/capa.jpg`}
	/><!-- 1200 × 630 pixels para capa.jpg -->
</svelte:head>

<div class="min-h-screen">
	<main class="min-h-screen bg-background">
		{@render children()}
	</main>
</div>
