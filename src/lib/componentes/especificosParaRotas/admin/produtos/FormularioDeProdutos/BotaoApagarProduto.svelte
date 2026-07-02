<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import Swal from 'sweetalert2';
	import { remotaApagarProduto } from './funcoes/remotaApagarProduto.remote';
	import type { typeDados } from './typeDados';

	let { dados, voltarPara }: { dados: typeDados; voltarPara: Pathname } = $props();
</script>

<Button
	onclick={async () => {
		const { isConfirmed } = await Swal.fire({
			title: 'Apagar produto?',
			text: 'Esta operação não poderá ser desfeita.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim, apagar',
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#d33',
			reverseButtons: true,
			focusCancel: true,
		});

		if (!isConfirmed) {
			return;
		}

		await remotaApagarProduto({
			idProdutos: dados.inputs.formProdutos.idProdutos,
		});

		goto(resolve(voltarPara));
	}}
	variant="destructive"
	class="cursor-pointer"
>
	APAGAR PRODUTO
</Button>
