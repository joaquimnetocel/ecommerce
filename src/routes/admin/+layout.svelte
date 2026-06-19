<script lang="ts">
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar/index.js';
	import Menu from './_Menu/Menu.svelte';
	import './_css/formularios.css';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<Menu />
	<Sidebar.Inset>
		<header>
			<Sidebar.Trigger />
		</header>
		<div class="my-6 px-10">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
