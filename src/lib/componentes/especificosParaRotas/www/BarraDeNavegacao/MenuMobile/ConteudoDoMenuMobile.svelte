<script lang="ts">
	import { PUBLIC_LOJA } from '$env/static/public';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';
	import { ChevronDown, Mail, Phone, X } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { funcaoEstados } from './funcaoEstados.svelte';
	import { storeVisivel } from './storeVisivel.svelte';

	const estados = funcaoEstados();

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['mobileMenu', 'email', 'whatsapp'],
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

{#if storeVisivel.valor}
	<aside class="fixed inset-0 z-100 flex overflow-hidden bg-transparent">
		<button
			transition:fade={{ duration: 500 }}
			aria-label="Sidebar"
			type="button"
			class="bg-opacity-50 absolute inset-0 bg-black focus:outline-none"
			onclick={() => {
				storeVisivel.valor = false;
			}}
		>
		</button>
		<div
			transition:fade={{ duration: 500 }}
			class="relative z-60 h-full w-full overflow-x-hidden overflow-y-auto bg-primary p-6 pt-16 text-white"
		>
			<button
				type="button"
				aria-label="Close sidebar"
				class="bg-opacity-50 absolute top-4 right-4 transform cursor-pointer rounded-full bg-zinc-800 p-2 text-white transition duration-300 hover:scale-125 hover:text-zinc-200 focus:outline-none"
				onclick={() => (storeVisivel.valor = false)}
			>
				<X class="h-5 w-5" />
			</button>

			<ul class="m-0 flex w-full list-none flex-col gap-4 p-0 text-sm">
				{#if configuracoes.mobileMenu.length}
					<li class="mt-2">
						<ul class="m-0 flex w-full list-none flex-col gap-3 p-0 text-sm">
							{#each configuracoes.mobileMenu as m, mx (mx)}
								<li>
									{#if m?.children?.length}
										<div
											class="flex w-full items-center justify-between gap-2 py-1
                     text-zinc-200 hover:text-white"
										>
											<a
												href={m.link}
												aria-label="Click to visit category related products"
												class="flex-1 cursor-pointer text-base font-medium"
												onclick={() => estados.funcaoToggleMenu(m, mx)}
											>
												{m.name}
											</a>

											<button
												type="button"
												aria-label="Toggle subcategory"
												class="cursor-pointer overflow-hidden p-2 focus:outline-none"
												onclick={() => estados.funcaoToggleMenu(m, mx)}
											>
												<ChevronDown
													class="h-5 w-5 shrink-0 transition duration-300
                                {estados.exibirSubcategoria[mx] ? '-rotate-180 transform' : ''}"
												/>
											</button>
										</div>
									{:else}
										<a
											href={m.link}
											aria-label="Click to visit category related products"
											class="flex w-full cursor-pointer items-center justify-between gap-2 py-1 text-left text-base font-medium text-zinc-200 hover:text-white focus:outline-none"
											onclick={() => (storeVisivel.valor = false)}
										>
											{m.name}
										</a>
									{/if}

									{#if estados.exibirSubcategoria[mx]}
										<ul class="mt-2 ml-4 list-none p-0">
											{#each m.children as c, cx (cx)}
												<li class="mb-2">
													{#if c.children?.length}
														<div
															class="flex w-full items-center justify-between gap-2 py-1
                          {estados.menuSelecionado2 === c.name
																? 'text-white'
																: 'text-zinc-200 hover:text-white'}"
														>
															<a
																href={c.link}
																class="flex-1 cursor-pointer"
																onclick={() => estados.funcaoToggleMenu2(c, cx)}
															>
																{c.name}
															</a>

															<button
																type="button"
																aria-label="Toggle subcategory"
																class="cursor-pointer overflow-hidden p-2 focus:outline-none"
																onclick={() => estados.funcaoToggleMenu2(c, cx)}
															>
																<ChevronDown
																	class="h-5 w-5 shrink-0 transition duration-300
                                {estados.exibirSubcategoria2[cx] ? '-rotate-180 transform' : ''}"
																/>
															</button>
														</div>
													{:else}
														<a
															href={c.link}
															aria-label="Click to visit category related products page"
															class="flex w-full items-center justify-between gap-2 py-1 text-left text-zinc-200 hover:text-white focus:outline-none"
															onclick={() => (storeVisivel.valor = false)}
														>
															{c.name}
														</a>
													{/if}

													{#if estados.exibirSubcategoria2[cx]}
														<ul class="mt-1 ml-4 list-none p-0">
															{#each c.children as cc, contador (contador)}
																<li>
																	<a
																		href={cc.link}
																		aria-label="Click to visit category related products page"
																		class="flex w-full items-center justify-between gap-2 py-1 text-left text-zinc-200 hover:text-white focus:outline-none"
																		onclick={() => (storeVisivel.valor = false)}
																	>
																		{cc.name}
																	</a>
																</li>
															{/each}
														</ul>
													{/if}
												</li>
											{/each}
										</ul>
									{/if}
								</li>
							{/each}
						</ul>
					</li>
				{/if}

				{#if configuracoes.email || configuracoes.whatsapp.numeroFormatado}
					<li class="mt-4 border-zinc-700 pt-4 {configuracoes.mobileMenu.length ? 'border-t' : ''}">
						<div class="flex flex-col gap-2">
							{#if configuracoes.email}
								<a
									href="mailto:{configuracoes.email}"
									aria-label="Email us"
									class="transiton flex items-center gap-2 text-zinc-200 duration-300 hover:text-white focus:outline-none"
								>
									<Mail class="size-4" />
									{configuracoes.email}
								</a>
							{/if}

							{#if configuracoes.whatsapp.numeroFormatado}
								<a
									href={`https://api.whatsapp.com/send?phone=${configuracoes.whatsapp.numero}&text=${encodeURIComponent(configuracoes.whatsapp.mensagem)}`}
									aria-label="Chat on WhatsApp"
									class="transiton flex items-center gap-2 text-zinc-200 duration-300 hover:text-white focus:outline-none"
								>
									<Phone class="size-4" />
									{configuracoes.whatsapp.numeroFormatado}
								</a>
							{/if}
						</div>
					</li>
				{/if}

				<!-- {#if menuItemsUser?.length}
					<li class="mt-4 border-t border-zinc-700 pt-4">
						<ul class="m-0 flex w-full list-none flex-col gap-3 p-0 text-sm">
							{#each menuItemsUser as m}
								<li>
									<a
										href={m.url}
										class="transiton block py-1 text-base text-zinc-200 duration-300 hover:text-white focus:outline-none"
										onclick={() => (estados.barraLateralVisivel = false)}
									>
										{m.title}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				{/if} -->
			</ul>
		</div>
	</aside>
{/if}
