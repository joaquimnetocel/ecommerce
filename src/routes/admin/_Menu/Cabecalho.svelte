<script lang="ts">
	import { resolve } from '$app/paths';
	import * as DropdownMenu from '$lib/shadcn/componentes/ui/dropdown-menu';
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar';
	import { ChevronDown } from '@lucide/svelte/icons';
</script>

<Sidebar.Header>
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							class="cursor-pointer [&[data-state=open]_.menu-chevron]:rotate-180"
						>
							IR PARA...

							<ChevronDown class="menu-chevron ms-auto transition-transform duration-200" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)">
					<DropdownMenu.Item>
						{#snippet child({ props })}
							<a href={resolve('/')} {...props}> PÁGINA INICIAL </a>
						{/snippet}
					</DropdownMenu.Item>

					<DropdownMenu.Item>
						{#snippet child({ props })}
							<a href={resolve('/produtos')} {...props}> PÁGINA DE PRODUTOS </a>
						{/snippet}
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Header>
