export type typeErrosDeFormularios<T> = {
	[K in keyof T]?: T[K] extends Array<infer U>
		? typeErrosDeFormularios<U>[]
		: T[K] extends object
			? typeErrosDeFormularios<T[K]>
			: string;
};
