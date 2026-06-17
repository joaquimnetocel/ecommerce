import { db } from '$lib/server/db';

type typeTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type typeExecutor = typeof db | typeTransaction;
