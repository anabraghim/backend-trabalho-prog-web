# 🎬 Back do CineXP
---
### 🔗  Links importantes
Repositório do front: [clique aqui](https://github.com/anabraghim/trabalho_prog_web)
Site: [clique aqui](https://cinexp.netlify.app/)
### 📝 Descrição geral
Este repositório contém a API do projeto CineXP, desenvolvida como parte do trabalho da disciplina de Programação para Web, ministrada pelo professor Hudson Silva Borges.

A API foi desenvolvida utilizando Node.js com Express, com persistência de dados em PostgreSQL e mapeamento objeto-relacional com Prisma. A aplicação está dividida em camadas, com controllers responsáveis por lidar com as requisições e uma camada de serviços (services) que concentra a lógica de negócios.

A API serve como base para um site de críticas de filmes, e possui funcionalidades completas de gerenciamento de usuários, críticas, comentários e cadastro de filmes.

O deploy foi realizado na plataforma Render.
### 👥 Integrantes do grupo
Ana Júlia de Lima Braghim
RGA: 2023.1907.037-8
Mariele Andressa de Oliveira Farias
RGA: 2023.1907.053-0
Matheus Droppa Omido
RGA: 2023.1907.055-6
### 🧭 Rotas e funcionalidades
- CRUD de usuário
- CRUD de crítica
- Criar comentário
- Cadastrar filme
- Entrar e cadastrar usuário
 ### ⚙️ Tecnologias utilçizadas
 1. NodeJS com Express
 2. Banco de dados PostgreSQL
 3. ORM Prisma

 ### Como rodar o projeto
 1. Clone o repositório:
 ```
git clone https://github.com/anabraghim/backend-trabalho-prog-web.git
cd backend-trabalho-prog-web

 ```

2. Instale as dependências:
```
npm install

```

3. Execute as migrações com Prisma:

```
npx prisma migrate dev

```
4. Inicie o servidor:

```
npm run dev

```