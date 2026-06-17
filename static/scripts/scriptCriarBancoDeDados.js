import 'dotenv/config';
import { Client } from 'pg';

const client = new Client({
	host: process.env.BANCO_HOST,
	port: Number(process.env.BANCO_PORTA),
	user: process.env.BANCO_USUARIO,
	password: process.env.BANCO_SENHA,
});

await client.connect();

try {
	await client.query(`CREATE DATABASE "${process.env.BANCO_BANCO_DE_DADOS}"`);
	console.log(`BANCO '${process.env.BANCO_BANCO_DE_DADOS}' CRIADO COM SUCESSO.`);
} catch (erro) {
	if (erro.code === '42P04') {
		console.log('BANCO JÁ EXISTE.');
	} else {
		throw erro;
	}
} finally {
	await client.end();
}

