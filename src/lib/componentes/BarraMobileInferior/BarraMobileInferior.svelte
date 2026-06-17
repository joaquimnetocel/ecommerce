<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import LazyImg from '$lib/componentes/LazyImage.svelte';
	import { funcaoFormatarPreco } from '$lib/funcoes/funcaoFormatarPreco';
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Separator } from '$lib/shadcn/componentes/ui/separator';
	import { cn } from '$lib/shadcn/utils';
	import { carrinho } from '$lib/stores/carrinho.svelte';
	import {
		ArrowLeft,
		Heart,
		House,
		Minus,
		PackageSearch,
		// Play,
		Plus,
		ShoppingCart,
		Trash2,
	} from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	// import LoadingDots from './LoadingDots.svelte';

	let { class: className = '' } = $props();

	let estadoCarrinhoVisivel = $state(false);

	const navItems = [
		{
			label: 'INÍCIO',
			icon: House,
			href: '/' as const,
		},
		{
			label: 'PRODUTOS',
			icon: PackageSearch,
			href: '/' as const,
		},
		{
			label: 'Wishlist',
			icon: Heart,
			href: '/' as const,
		},
		// {
		// 	label: 'Categories',
		// 	icon: Grid,
		// 	href: '/categories'
		// },
		// {
		// 	label: 'Reels',
		// 	icon: Play,
		// 	href: '/reels'
		// },
		{
			label: 'CARRINHO',
			icon: ShoppingCart,
			onClick: () => {
				estadoCarrinhoVisivel = true;
			},
		},
	];

	function isActive(href: string) {
		return page.url.pathname === href;
	}
</script>

<div class="h-16"></div>

<nav class={cn('fixed right-0 bottom-0 left-0 z-40 border-t border-gray-100 bg-white', className)}>
	<div class="flex h-16 items-center justify-around px-4">
		{#each navItems as item, i (i)}
			{#if item.href}
				<a
					href={resolve(item.href)}
					class="flex cursor-pointer flex-col items-center gap-1 text-xs"
					class:text-primary={isActive(item.href)}
					class:text-gray-500={!isActive(item.href)}
				>
					<item.icon size={24} />
					<span>{item.label}</span>
				</a>
			{:else}
				<button
					onclick={item.onClick}
					class="flex cursor-pointer flex-col items-center gap-1 text-xs"
				>
					<div class="relative">
						<item.icon size={24} />
						{#if carrinho.itens.length > 0}
							<span
								class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white"
							>
								{carrinho.quantidadeTotalDeItens}
							</span>
						{/if}
					</div>
					<span>{item.label}</span>
				</button>
			{/if}
		{/each}
	</div>
</nav>

{#if estadoCarrinhoVisivel}
	<div class="fixed inset-0 z-1000001 bg-white" transition:slide={{ duration: 300 }}>
		<div class="flex h-full flex-col">
			<header class="flex items-center gap-4 border-b p-4">
				<button
					class="cursor-pointer rounded-full p-2 hover:bg-gray-100"
					onclick={() => (estadoCarrinhoVisivel = false)}
				>
					<ArrowLeft size={24} />
				</button>
				<h2 class="text-lg font-medium">MEU CARRINHO</h2>
			</header>

			<div class="flex-1 overflow-auto p-4">
				{#if carrinho.itens.length}
					<div class="space-y-4">
						{#each carrinho.itens as item, i (i)}
							<div class="flex items-center gap-4 rounded-lg border p-4">
								<a
									href={resolve(`/produto/${item.idDoProduto}/${item.slug}`)}
									onclick={() => (estadoCarrinhoVisivel = false)}
								>
									<LazyImg
										src={item.imagem}
										alt={item.nome}
										width={30}
										height={20}
										class="rounded-md object-cover"
									/>
								</a>
								<div class="flex-1">
									<a
										href={resolve(`/produto/${item.idDoProduto}/${item.slug}`)}
										onclick={() => (estadoCarrinhoVisivel = false)}
									>
										<h3 class="font-medium">
											{item.nome}
										</h3>
									</a>
									<div class="mt-2 flex items-center justify-between">
										<div class="flex items-center gap-2">
											<button
												class="cursor-pointer rounded-full p-1 hover:bg-gray-100"
												onclick={() => carrinho.diminuirQuantidade(item.idDaVariante)}
											>
												<Minus size={16} />
											</button>
											<span class="mx-2">
												<!-- {#if carrinho.updatingItem[item.id]}
													<LoadingDots />
												{:else} -->
												{item.quantidade}
												<!-- {/if} -->
											</span>
											<button
												class="cursor-pointer rounded-full p-1 hover:bg-gray-100"
												onclick={() => carrinho.aumentarQuantidade(item.idDaVariante)}
											>
												<Plus size={16} />
											</button>
										</div>
										<button
											class="cursor-pointer text-red-500 hover:text-red-600"
											onclick={() => carrinho.removerItem(item.idDaVariante)}
										>
											<Trash2 size={20} />
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex h-full flex-col items-center justify-center">
						<p class="mb-4 text-gray-500">O CARRINHO ESTÁ VAZIO.</p>
						<Button
							onclick={() => {
								estadoCarrinhoVisivel = false;
								// goto(resolve('/'));
							}}
						>
							CONTINUE COMPRANDO
						</Button>
					</div>
				{/if}
			</div>

			{#if carrinho.itens.length}
				<div class="border-t bg-white p-4">
					<div class="space-y-4">
						<div class="flex justify-between text-sm">
							<span>SUBTOTAL</span>
							<span>{funcaoFormatarPreco(carrinho.precoTotalSemFrete)}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span>ENTREGA</span>
							<span>CALCULADA NO CHECKOUT...</span>
						</div>
						<Separator />
						<div class="flex justify-between font-medium">
							<span>TOTAL</span>
							<span>{funcaoFormatarPreco(carrinho.precoTotalSemFrete)}</span>
						</div>
						<Button
							class="w-full cursor-pointer"
							onclick={() => {
								estadoCarrinhoVisivel = false;
								goto(resolve('/checkout/carrinho'));
							}}
						>
							COMPRAR
						</Button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
<!-- Add padding to bottom of page to account for nav on mobile only -->
<div class="h-16 md:hidden"></div>
