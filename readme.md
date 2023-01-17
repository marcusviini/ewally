# Sistema para recomendar amizades

## Com base em um grafo de amizades, o sistema recomenda novas amizades para um usuário.

### Features
- [x] Create Person - [POST] http://localhost:3000/person
- [x] Get Person - [GET] http://localhost:3000/person/:CPF
- [x] Clean - [DELETE] http://localhost:3000/clean
- [x] Create Relationship - [POST] http://localhost:3000/relationship
- [x] Get Recommendations - [GET] http://localhost:3000/recommendations/:CPF

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/). 

# Acesse a pasta do projeto no terminal/cmd
$ cd ewally

# Vá para a pasta do service-grpc
$ cd service-grpc

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor grpc inciará na porta:3001

# Acesse a pasta do projeto em um novo terminal/cmd
$ cd ewally

# Vá para a pasta do service-gateway
$ cd service-gateway

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000> 


# A documentação com swagger estará disponível em <http://localhost:3000/docs>  

### 🛠 Tecnologias

As seguintes ferramentas e tecnologias foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [GRPC](https://grpc.io/)
- [Express](https://expressjs.com/pt-br/)
- [Yup](https://www.npmjs.com/package/yup/)
