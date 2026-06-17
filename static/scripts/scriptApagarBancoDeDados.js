import 'dotenv/config';
import { Client } from 'pg';

async function main() {
	const client = new Client({
		host: process.env.BANCO_HOST,
		port: Number(process.env.BANCO_PORTA),
		user: process.env.BANCO_USUARIO,
		password: process.env.BANCO_SENHA,
	});

	await client.connect();

	try {
		await client.query(
			`DROP DATABASE "${process.env.BANCO_BANCO_DE_DADOS}" WITH (FORCE)`
		);

		console.log(`BANCO '${process.env.BANCO_BANCO_DE_DADOS}' REMOVIDO COM SUCESSO.`);
	} catch (erro) {
		if (erro.code === '3D000') {
			console.log('BANCO NÃO EXISTE.');
		} else {
			throw erro;
		}
	} finally {
		await client.end();
	}
}

main().catch(console.error);