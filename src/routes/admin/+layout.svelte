<script lang="ts">
	import Menu from '$lib/componentes/admin/Menu/index.svelte';
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar/index.js';
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
