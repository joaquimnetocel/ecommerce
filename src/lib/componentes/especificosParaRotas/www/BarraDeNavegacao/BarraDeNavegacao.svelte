<script lang="ts">
	import BotaoParaVoltarParaPaginaInicial from './BotaoParaVoltarParaPaginaInicial.svelte';
	import CarrinhoDeCompras from './CarrinhoDeCompras/CarrinhoDeCompras.svelte';
	import MainNav from './LogoENome.svelte';
	import BotaoDoMenuMobile from './MenuMobile/BotaoDoMenuMobile.svelte';
	import ConteudoDoMenuMobile from './MenuMobile/ConteudoDoMenuMobile.svelte';
	import MenuParaTelaGrande from './MenuParaTelaGrande.svelte';
</script>

<header
	class="sticky top-0 z-50 w-full flex-col items-center justify-between bg-white shadow-xs transition-all duration-200 max-sm:border-b"
>
	<div
		class="mx-2 flex items-center justify-between bg-white py-3 sm:py-2 lg:container lg:mx-auto lg:px-8"
	>
		<div class="flex gap-3 sm:justify-center">
			<BotaoDoMenuMobile />
			<MainNav />
		</div>
		<div class="hidden md:block">
			<MenuParaTelaGrande />
		</div>
		<div class="flex items-center gap-2">
			<div class="flex items-center">
				<div class="relative flex items-center gap-4 sm:gap-5">
					<BotaoParaVoltarParaPaginaInicial />
					<CarrinhoDeCompras />
				</div>
			</div>
		</div>
	</div>
</header>

<ConteudoDoMenuMobile />
