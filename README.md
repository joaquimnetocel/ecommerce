# MODELO DE ECOMMERCE

## ERD

![Computer](./static/erd.svg)

## INSTALAÇÃO DE PACOTES

```bash
npm install
```

## ARQUIVO .env

- Copie o conteúdo do arquivo _.env.example_ para um arquivo novo _.env_.

- Troque a senha do banco de dados no arquivo _.env_ para sua senha do postgres.

## BANCO DE DADOS

- Crie o banco de dados vazio:

  ```bash
  npm run db:apagar
  npm run db:criar
  ```

- PREENCHA O BANCO DE DADOS COM A ESTRUTURA DECLARADA PELO SCHEMA DO DRIZZLE:

  ```bash
  npm run db:push
  ```

## RODAR EM MODO DESENVOLVIMENTO

```sh
npm run dev
```

## ACESSO EM MODO DE DESENVOLVIMENTO

Acesse [https://localhost:5173/admin](https://localhost:5173/admin/) no navegador.

## MODO PRODUÇÃO

```sh
npm run build
npm run preview
```
