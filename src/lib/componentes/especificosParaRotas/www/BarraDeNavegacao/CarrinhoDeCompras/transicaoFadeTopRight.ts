import { cubicOut } from 'svelte/easing';

export function transicaoFadeTopRight(
	node: HTMLDivElement,
	params: {
		duration?: number;
		delay?: number;
		easing?: (t: number) => number;
		transformOrigin?: string;
		x?: number;
		y?: number;
	} = {},
) {
	return {
		delay: params.delay ?? 0,
		duration: params.duration ?? 400,
		easing: params.easing ?? cubicOut,
		css: (t: number, u: number) => `
			transform-origin: ${params.transformOrigin ?? 'top right'};
			transform:
				translate(${(params.x ?? 20) * u}px, ${(params.y ?? -20) * u}px)
				scale(${t});
			opacity: ${t};
		`,
	};
}
