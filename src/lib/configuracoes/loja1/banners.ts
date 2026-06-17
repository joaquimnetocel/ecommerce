import type { Pathname } from '$app/types';
import { PUBLIC_LOJA } from '$env/static/public';

type typeBanners = {
	desktop: { url: string; link: Pathname }[];
	mobile: { url: string; link: Pathname }[];
	textoExterno?: string;
	textoDoBotao?: string;
};

export const banners: typeBanners = {
	textoExterno: 'PREENCHER ALGO',
	textoDoBotao: 'PRODUTOS',
	desktop: [
		{
			url: `/${PUBLIC_LOJA}/imagens/banner1.png`,
			link: '/produtos',
		},
		{
			url: `/${PUBLIC_LOJA}/imagens/banner2.png`,
			link: '/produtos',
		},
	],
	mobile: [
		{
			url: `/${PUBLIC_LOJA}/imagens/bannerMobile1.png`,
			link: '/produtos',
		},
	],
};
