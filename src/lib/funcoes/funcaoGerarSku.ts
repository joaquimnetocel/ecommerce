import { randomUUID } from 'crypto';

export function funcaoGerarSku() {
	return `SKU-${randomUUID().slice(0, 8).toUpperCase()}`;
}
