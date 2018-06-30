# Teste Front-End 2018-1 - Johnatan-Ricardo-Martins

Nesta aplicação o usuário poderá criar uma conta de usuário, após a criação da conta o mesmo é redirecionado para a aplicação, a aplicação tem como objetivo pesquisar usuários do GitHub, apresentando as informações de seu perfil em um cartão, no qual a partir deste, o usuário pode visualizar uma lista de seus repositórios e fazer anotações ao usuário referente;

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

 - DataBase: git_hub_api;
 - Collections: user, annotation;
 - Informar url do banco de dados no seguinte arquivo: api/config.json;
 - A api está configurada na porta 3000, caso seja necessário alterar a mesma, basta alterar a porta no arquivo: api/index.js, caso altere a porta da API, é necessário alterar a API_URL no seguinte arquivo: web-app/config/dev.env.js;


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
