# Teste Front-End 2018-1 - Johnatan-Ricardo-Martins

Nesta aplicação o usuário poderá criar uma conta de usuário, após a criação da conta o mesmo é redirecionado para a aplicação, a aplicação tem como objetivo pesquisar usuários do GitHub, apresentando as informações de seu perfil, e uma lista de seus repositórios com paginação.

A aplicação consome das seguintes API's públicas:

* GitHub API: https://api.github.com;
* Postmon API: https://api.postmon.com.br;

Front End:

- VueJS;
- Vuetify;

API da aplicação:

- NodeJS;
- MongoDB;

A aplicação também possui autenticação de usuário por token JWT.

Desenvolvido utilizando Node 8.11.1 e NPM 6.1.0;

## Configurações da API

``` bash
# instalar dependências
npm install

Criar um mongoDB com os seguintes requisitos:

 - Nome: git_hub_api;
 - Collections: user, annotations;

# Ativando servidor da API
node index

```

## Configurações do Web-app

``` bash
# instalar dependências
npm install

# Ativando servidor
npm run dev

```