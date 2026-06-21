<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_LOJA } from '$env/static/public';
	import WhatsappChat from '$lib/componentes/WhatsappChat.svelte';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';
	import masterCard from '$lib/imagens/metodosDePagamento/mastercard.png';
	import paypal from '$lib/imagens/metodosDePagamento/paypal.png';
	import skrill from '$lib/imagens/metodosDePagamento/skrill.png';
	import visa from '$lib/imagens/metodosDePagamento/visa.png';
	import { ChevronDown } from '@lucide/svelte';
	import RedesSociais from './RedesSociais.svelte';

	let { propDeveColapsarNoMobile = false } = $props();

	let estadoExpandido = $state(false);

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['nome', 'descricao', 'rodape', 'whatsapp'],
	});

	const paymentMethodCards = [
		{ src: masterCard, alt: 'Mastercard' },
		{ src: paypal, alt: 'PayPal' },
		{ src: skrill, alt: 'Skrill' },
		{ src: visa, alt: 'Visa' },
	];
</script>

<div class="mt-8">
	<footer class="mt-2 border-t">
		<div class="mx-auto w-full xl:pb-2">
			{#if propDeveColapsarNoMobile}
				<button
					class="flex w-full items-center justify-between p-4 text-sm font-medium tracking-tighter text-gray-900 uppercase md:hidden dark:text-white"
					onclick={() => (estadoExpandido = !estadoExpandido)}
				>
					<span>Mais informações sobre {configuracoes.nome}</span>
					<ChevronDown
						size={20}
						class="transition-transform duration-200 {estadoExpandido ? 'rotate-180' : ''}"
					/>
				</button>
			{/if}

			<div
				class="overflow-hidden {propDeveColapsarNoMobile
					? estadoExpandido
						? ''
						: 'hidden md:block'
					: ''}"
			>
				<div class="mx-auto max-w-7xl gap-4 p-4 px-8 py-8 md:flex md:justify-between md:py-16">
					<div class="mb-12 flex max-w-xs flex-col gap-4">
						<a href={resolve('/')} class="flex items-center">
							<img
								src={`/${PUBLIC_LOJA}/imagens/logo.png`}
								class="mr-2 h-10 object-contain"
								alt={configuracoes.nome}
							/>
							<span class="text-2xl font-semibold dark:text-white"> {configuracoes.nome} </span>
						</a>
						<div class="prose text-sm text-gray-600">
							{configuracoes.descricao}
						</div>

						<RedesSociais />
					</div>
					<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
						<div>
							<h1 class="text-black-200 mb-4 text-lg font-semibold">LINKS RÁPIDOS</h1>
							<ul class="space-y-2">
								<li>
									<a
										href={resolve('/')}
										class="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-900"
									>
										INÍCIO
									</a>
								</li>
								<li>
									<a
										href={resolve('/produtos')}
										class="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-900"
									>
										PRODUTOS
									</a>
								</li>
							</ul>
						</div>
						{#each configuracoes.rodape as item (item.name)}
							<div>
								<h1 class="text-black-200 mb-4 text-lg font-semibold">{item?.name}</h1>
								{#if item?.items?.length > 0}
									<ul class="space-y-2">
										{#each item.items as child (child.name)}
											<li>
												{#if child.link}
													<a
														href={resolve(child.link) || '#'}
														target="_blank"
														class="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-900"
														rel="noopener noreferrer"
													>
														{child.name}
													</a>
												{:else}
													<span class="text-sm text-gray-400">{child.name}</span>
												{/if}
											</li>
										{/each}
									</ul>
								{:else}
									<p class="text-sm text-gray-400">No links available</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<div
					class="flex flex-col gap-2 border-t px-8 py-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div
						class="flex w-full flex-col-reverse items-start justify-between gap-6 max-sm:mt-2 sm:flex-row sm:items-center sm:gap-0"
					>
						<span class="text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-center">
							© Copyright
							{new Date().getFullYear()}
							<a
								href={resolve('/')}
								class="cursor-pointer text-gray-900 transition-colors hover:text-primary"
							>
								{configuracoes.nome}
							</a>
							. TODOS OS DIREITOS RESERVADOS.
						</span>
						<!-- <TrustpilotPlugin /> -->

						{#if paymentMethodCards?.length}
							<ul
								class="col-span-1 m-0 flex list-none flex-wrap items-center justify-end gap-3 p-0"
							>
								{#each paymentMethodCards as pmc, i (i)}
									<li>
										<img
											src={pmc.src}
											alt="payment method card - {pmc.alt}"
											class="h-6 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
										/>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<WhatsappChat whatsapp={configuracoes.whatsapp.numero} mensagem={configuracoes.whatsapp.mensagem} />
