<script lang="ts">
	import { PUBLIC_LOJA } from '$env/static/public';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['menuParaTelaGrande'],
	});

	let selectedCategory = $state('');
	let funcaoToggleMenuItemFilho = $state<boolean[]>([]);

	function funcaoAbrirMenuFilho(categoryName: string, index: number) {
		selectedCategory = categoryName;

		funcaoToggleMenuItemFilho = funcaoToggleMenuItemFilho.map(() => false);
		funcaoToggleMenuItemFilho[index] = true;
	}

	function funcaoFecharMenuFilho(index: number, closeCategory = true) {
		if (closeCategory) {
			selectedCategory = '';
		}

		funcaoToggleMenuItemFilho[index] = false;
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

{#if configuracoes.menuParaTelaGrande.length}
	<ul class="flex max-w-[65vw] scrollbar-none flex-row items-center gap-2 overflow-x-auto">
		{#each configuracoes.menuParaTelaGrande as correnteMenu, index (index)}
			<li
				class="hoverable"
				onmouseenter={() => {
					funcaoAbrirMenuFilho(correnteMenu.name, index);
				}}
			>
				<a
					href={correnteMenu.link}
					aria-label="Visit {correnteMenu.name}"
					class="relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold tracking-widest whitespace-nowrap text-gray-500 uppercase transition-all duration-300 hover:text-primary active:scale-95
					{selectedCategory === correnteMenu.name ? 'text-primary after:scale-x-100' : 'after:scale-x-0'}
					after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
					style="font-family: 'Montserrat', sans-serif;"
				>
					<span>{correnteMenu.name}</span>

					{#if correnteMenu.children?.length}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-3.5 w-3.5 shrink-0 transition-transform duration-300
							{selectedCategory === correnteMenu.name ? '-rotate-180' : ''}"
						>
							<path
								fill-rule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</a>

				{#if funcaoToggleMenuItemFilho[index] && correnteMenu.children?.length}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="mega-menu absolute top-full left-[5vw] z-9999 w-[90vw] max-w-7xl overflow-hidden rounded-b-xl border-x border-b border-gray-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
						onmouseleave={() => {
							funcaoFecharMenuFilho(index, true);
						}}
					>
						<div class="grid grid-cols-4 gap-8 p-10">
							{#each correnteMenu.children as c, indice (indice)}
								<div class="flex flex-col gap-5">
									<a
										href={c.link}
										class="cursor-pointer text-xs font-black tracking-[0.2em] text-primary uppercase transition-all hover:translate-x-1"
										style="font-family: 'Montserrat', sans-serif;"
									>
										{c.name}
									</a>

									{#if c.children}
										<ul class="flex flex-col gap-2.5">
											{#each c.children as c1, indice (indice)}
												<li>
													<a
														href={c1.link}
														class="block cursor-pointer text-[13px] font-medium text-gray-500 transition-all hover:translate-x-1 hover:text-primary"
													>
														{c1.name}
													</a>
												</li>
											{/each}
										</ul>
									{/if}
								</div>
							{/each}
						</div>

						<div class="border-t border-gray-100 bg-gray-50 px-10 py-4">
							<a
								href={correnteMenu.link}
								class="cursor-pointer text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase transition-colors hover:text-primary"
							>
								VER TUDO EM {correnteMenu.name}
							</a>
						</div>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.hoverable {
		position: static;
	}

	.mega-menu {
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
