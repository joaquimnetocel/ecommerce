<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { PUBLIC_LOJA } from '$env/static/public';
	import LazyImage from '$lib/componentes/compartilhados/LazyImage.svelte';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';
	import * as Carousel from '$lib/shadcn/componentes/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['banners'],
	});

	const isVideoURL = (url: string) => /\.(mp4|webm|mkv)$/.test(url);
</script>

{#if configuracoes.banners.desktop.length > 0}
	<div class="relative w-full">
		<!-- Desktop -->
		<div class="hidden sm:block">
			<Carousel.Root opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 10000 })]}>
				<Carousel.Content class="-ml-5">
					{#each configuracoes.banners.desktop as corrente, indice (indice)}
						<Carousel.Item class="">
							<div class="relative w-full overflow-hidden rounded-none shadow-2xl">
								{#if corrente.url}
									<a
										href={resolve(corrente.link)}
										aria-label="Click to visit banner related products page"
										class="group block h-full"
										data-sveltekit-preload-data
									>
										{#if isVideoURL(corrente.url)}
											<video
												class="w-full object-cover"
												src={corrente.url}
												loop
												autoplay
												muted
												playsinline
											>
												<track kind="captions" />
												<p>Video playback not supported</p>
											</video>
										{:else}
											<div class="relative overflow-hidden">
												<LazyImage
													isIntersecting={true}
													aspectRatio="auto:auto"
													src={corrente.url}
													alt="Promotional Banner {indice + 1} - Shop the latest collection"
													class="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
													fetchpriority={indice === 0 ? 'high' : 'auto'}
													loading={indice === 0 ? 'eager' : 'lazy'}
												/>
												<div
													class="absolute inset-0 flex flex-col items-center justify-center bg-black/10 transition-opacity duration-500 group-hover:bg-black/20"
												>
													<div
														class="flex translate-y-4 flex-col items-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
													>
														{#if configuracoes.banners.textoExterno}
															<span
																class="mb-4 block text-center text-sm font-black tracking-[0.4em] text-white/90 uppercase"
															>
																{configuracoes.banners.textoExterno}
															</span>
														{/if}

														{#if configuracoes.banners.textoDoBotao}
															<button
																onclick={() => goto(resolve('/produtos'))}
																class="relative cursor-pointer overflow-hidden rounded-full bg-white px-10 py-4 text-center text-sm font-black tracking-widest text-black uppercase shadow-2xl transition-all hover:scale-105 active:scale-95"
															>
																{configuracoes.banners.textoDoBotao}
															</button>
														{/if}
													</div>
												</div>
											</div>
										{/if}
									</a>
								{/if}
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>

		<!-- Mobile -->
		<div class="block max-h-150 sm:hidden">
			<Carousel.Root opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 10000 })]}>
				<Carousel.Content class="-ml-5">
					{#each configuracoes.banners.mobile as corrente, indice (indice)}
						<Carousel.Item class="h-full">
							<div class="relative w-full overflow-hidden rounded-none shadow-lg">
								{#if corrente.url}
									<!-- Banner -->
									<a
										href={resolve(corrente.link)}
										aria-label="Click to visit banner related products page"
										class="group block h-full"
										data-sveltekit-preload-data
									>
										{#if isVideoURL(corrente.url)}
											<video
												class="w-full object-cover"
												src={corrente.url}
												loop
												autoplay
												muted
												playsinline
											>
												<track kind="captions" />
												<p>Video playback not supported</p>
											</video>
										{:else}
											<div class="relative">
												<LazyImage
													isIntersecting={true}
													src={corrente.url}
													aspectRatio="auto:auto"
													alt="Promotional Mobile Banner {indice + 1} - Exclusive Deals"
													class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
													fetchpriority={indice === 0 ? 'high' : 'auto'}
													loading={indice === 0 ? 'eager' : 'lazy'}
												/>
												<div class="absolute inset-0 flex items-center justify-center">
													<div
														class="rounded-full bg-white/90 px-6 py-2.5 text-xs font-black tracking-widest text-black uppercase shadow-xl backdrop-blur-sm"
													>
														{configuracoes.banners.textoDoBotao}
													</div>
												</div>
											</div>
										{/if}
									</a>
								{/if}
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>
	</div>
{/if}
