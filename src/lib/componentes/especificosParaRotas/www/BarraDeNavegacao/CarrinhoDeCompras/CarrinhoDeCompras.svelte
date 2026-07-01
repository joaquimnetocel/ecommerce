<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { funcaoFormatarPreco } from '$lib/funcoes/funcaoFormatarPreco';
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import {
		derivedPrecoTotal,
		derivedQuantidadeTotalNocarrinho,
	} from '$lib/stores/storeCarrinho/deriveds.svelte';
	import { storeCarrinho } from '$lib/stores/storeCarrinho/storeCarrinho.svelte';
	import { ShoppingBag, X } from '@lucide/svelte';
	import ItemDoCarrinho from './ItemDoCarrinho.svelte';
	import { transicaoFadeTopRight } from './transicaoFadeTopRight';

	let visivel = $state(false);
</script>

{#if !page.url.pathname.startsWith('/checkout')}
	<div class="relative" role="navigation">
		<!-- <a
			class="group relative flex items-center justify-center rounded-full p-2 text-gray-500 transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-100 hover:text-primary active:scale-95 lg:hidden"
			href={resolve('/checkout/carrinho')}
			aria-label="VER CARRINHO"
		>
			<ShoppingBag class="h-5 w-5" />
			{#if carrinho.itens.length > 0}
				<span
					class="absolute top-1 right-1 inline-flex transform items-center justify-center rounded-full bg-primary px-1.5 py-1 text-[10px] leading-none font-bold text-white transition-all duration-300 group-hover:scale-110"
				>
					{carrinho.quantidadeTotalDeItens}
				</span>
			{/if}
		</a> -->
		<button
			class="group relative flex items-center justify-center rounded-full p-2 text-gray-500 transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-100 hover:text-primary active:scale-95"
			aria-label="ABRIR E FECHAR CARRINHO"
			onclick={() => {
				visivel = !visivel;
			}}
		>
			<ShoppingBag class="h-5 w-5" />
			{#if derivedQuantidadeTotalNocarrinho() && storeCarrinho.itens.length > 0}
				<span
					class="absolute top-1 right-1 inline-flex transform items-center justify-center rounded-full bg-primary px-1.5 py-1 text-[10px] leading-none font-bold text-white transition-all duration-300 group-hover:scale-110"
				>
					{derivedQuantidadeTotalNocarrinho()}
				</span>
			{/if}
		</button>
		{#if visivel}
			<button
				class="fixed inset-0 z-50 h-svh w-full scrollbar-none overflow-hidden bg-black/30 transition-opacity duration-300"
				aria-label="Close cart"
				onclick={() => {
					visivel = false;
				}}
			>
				<style>
					body {
						overflow: hidden;
					}
				</style>
				<span class="sr-only">Close cart</span>
			</button>

			<div
				class="shadow-3xl ease-out-expo fixed top-0 right-0 z-10000000 h-screen w-full overflow-y-auto bg-white transition-all duration-500 sm:w-[37.5%]"
				transition:transicaoFadeTopRight={{ duration: 500 }}
			>
				<div class="relative z-50 flex h-full flex-col justify-between bg-white p-4">
					<div class="sm:mx-3">
						<h2
							class="mt-4 mb-4 text-xl font-bold tracking-widest text-gray-900 uppercase"
							style="font-family: 'Montserrat', sans-serif;"
						>
							MEU CARRINHO
						</h2>
						<button
							class="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-75"
							aria-label="close cart"
							onclick={() => {
								visivel = false;
							}}
						>
							<X class="size-5" />
						</button>

						<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
						{#each storeCarrinho.itens || [] as _, i (i)}
							<div class="rounded-lg transition-all duration-300 hover:bg-gray-50">
								<ItemDoCarrinho bind:itemDoCarrinho={storeCarrinho.itens[i]} />
							</div>
						{/each}
					</div>

					<div
						class="sticky bottom-0 {storeCarrinho.itens.length > 0
							? '-mx-4 border-t border-gray-100 bg-gray-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]'
							: ''} py-6 sm:px-4"
					>
						<div class="space-y-1">
							{#if storeCarrinho.itens.length > 0}
								<div class="mx-4 flex items-center justify-between">
									<p class="text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-sm">
										TOTAL
									</p>
									<p class="text-base font-bold text-gray-900 sm:text-xl">
										{funcaoFormatarPreco(derivedPrecoTotal())}
									</p>
								</div>
								<p
									class="mx-4 text-right text-[10px] font-bold tracking-tighter text-gray-400 uppercase"
								>
									ENTREGA CALCULADA NO CHECKOUT...
								</p>
							{:else}
								<div class="flex min-h-[80vh] flex-col items-center justify-center gap-3 bg-white">
									<div class="mb-6 rounded-full bg-gray-50 p-8 ring-1 ring-gray-100">
										<ShoppingBag class="h-12 w-12 text-gray-300" />
									</div>
									<span class="text-xl font-bold tracking-widest text-gray-900 uppercase"
										>CARRINHO VAZIO!</span
									>
									<span
										class="max-w-xs px-2 text-center text-xs leading-relaxed font-medium text-gray-500"
										>Não encontramos nenhum item no carrinho. Vá em frente e acrescente alguns itens
										ao carrinho.</span
									>
									<button
										onclick={() => (visivel = false)}
										class="mt-8 cursor-pointer rounded-full bg-primary px-8 py-3 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-black active:scale-95"
									>
										CONTINUE COMPRANDO
									</button>
								</div>
							{/if}
						</div>
						{#if derivedQuantidadeTotalNocarrinho() >= 0 && storeCarrinho.itens.length > 0}
							<div class="mx-4 mt-6 flex justify-between gap-3">
								<!-- <Button
									variant="secondary"
									// disabled={!!cartState.isUpdatingCart}
									onclick={() => (visivel = false)}
									class="w-[48%] py-6 text-[10px] font-bold tracking-widest uppercase transition-all active:scale-95"
								>
									Continue
								</Button> -->
								<Button
									// disabled={!!cartState.isUpdatingCart}
									onclick={(e) => {
										e.stopPropagation();
										visivel = false;
										goto(resolve('/checkout/carrinho'));
									}}
									class="w-full cursor-pointer bg-primary py-6 text-[10px] font-bold tracking-widest uppercase transition-all hover:bg-black active:scale-95"
								>
									COMPRAR
								</Button>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
