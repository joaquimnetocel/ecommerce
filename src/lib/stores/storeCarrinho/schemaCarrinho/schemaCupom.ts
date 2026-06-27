import * as v from 'valibot';

export const schemaCupom = v.variant('tipo', [
	v.object({
		tipo: v.literal('percentual'),
		codigo: v.nullable(v.string()),
		valor: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
		minimo: v.pipe(v.number(), v.minValue(0)),
	}),
	v.object({
		tipo: v.literal('fixo'),
		codigo: v.nullable(v.string()),
		valor: v.pipe(v.number(), v.minValue(0)),
		minimo: v.pipe(v.number(), v.minValue(0)),
	}),
]);
