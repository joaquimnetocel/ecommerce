<script lang="ts">
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar';
	// import Cabecalho from './Cabecalho.svelte';
	import ItemDoMenu from './ItemDoMenu.svelte';
	import { constMenu } from './constMenu';
</script>

<Sidebar.Root>
	<!-- <Cabecalho /> -->
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>MENU:</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each constMenu as item (item.id)}
						<ItemDoMenu node={item} />
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
