import { banners as banners1 } from './loja1/banners';
import { descricao as descricao1 } from './loja1/descricao';
import { email as email1 } from './loja1/email';
import { menuParaTelaGrande as menuParaTelaGrande1 } from './loja1/menuParaTelaGrande';
import { mobileMenu as mobileMenu1 } from './loja1/mobileMenu';
import { nome as nome1 } from './loja1/nome';
import { redesSociais as redesSociais1 } from './loja1/redesSociais';
import { rodape as rodape1 } from './loja1/rodape';
import { sliderDeTextosHorizontal as sliderDeTextosHorizontal1 } from './loja1/sliderDeTextosHorizontal';
import { sliderDeTextosVertical as sliderDeTextosVertical1 } from './loja1/sliderDeTextosVertical';
import { whatsapp as whatsapp1 } from './loja1/whatsapp';

type typeLoja = {
	banners: typeof banners1;
	nome: typeof nome1;
	descricao: typeof descricao1;
	sliderDeTextosHorizontal: typeof sliderDeTextosHorizontal1;
	sliderDeTextosVertical: typeof sliderDeTextosVertical1;
	rodape: typeof rodape1;
	redesSociais: typeof redesSociais1;
	whatsapp: typeof whatsapp1;
	mobileMenu: typeof mobileMenu1;
	email: typeof email1;
	menuParaTelaGrande: typeof menuParaTelaGrande1;
};

type typeConfiguracoes = {
	loja1: typeLoja;
};

const configuracoes: typeConfiguracoes = {
	loja1: {
		banners: banners1,
		nome: nome1,
		descricao: descricao1,
		sliderDeTextosHorizontal: sliderDeTextosHorizontal1,
		sliderDeTextosVertical: sliderDeTextosVertical1,
		rodape: rodape1,
		redesSociais: redesSociais1,
		whatsapp: whatsapp1,
		mobileMenu: mobileMenu1,
		email: email1,
		menuParaTelaGrande: menuParaTelaGrande1,
	},
};

export function funcaoConfiguracoes<K extends keyof typeLoja>({
	loja,
	quais = [],
}: {
	loja: string;
	quais?: K[];
}) {
	const configuracoesDaLoja = configuracoes[loja as keyof typeConfiguracoes];

	if (quais.length > 0) {
		return Object.fromEntries(
			quais.map((corrente) => [corrente, configuracoesDaLoja[corrente]]),
		) as Pick<typeLoja, K>;
	}

	return configuracoesDaLoja;
}
