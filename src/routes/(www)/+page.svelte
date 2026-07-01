<script lang="ts">
	import { PUBLIC_LOJA } from '$env/static/public';
	import SliderDeTextosHorizontal from '$lib/componentes/compartilhados/SliderDeTextosHorizontal.svelte';
	import SliderDeTextosVertical from '$lib/componentes/compartilhados/SliderDeTextosVertical.svelte';
	import Banners from '$lib/componentes/especificosParaRotas/www/Banners.svelte';
	import BarraDeNavegacao from '$lib/componentes/especificosParaRotas/www/BarraDeNavegacao/BarraDeNavegacao.svelte';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['sliderDeTextosHorizontal', 'sliderDeTextosVertical', 'descricao', 'banners'],
	});
</script>

<h1 class="sr-only">{configuracoes.descricao}</h1>

<SliderDeTextosVertical
	textos={configuracoes.sliderDeTextosVertical.textos}
	duracao={configuracoes.sliderDeTextosVertical.duracao}
/>

<BarraDeNavegacao />

<Banners />

<SliderDeTextosHorizontal
	textos={configuracoes.sliderDeTextosHorizontal.textos}
	duracao={configuracoes.sliderDeTextosHorizontal.duracao}
/>
