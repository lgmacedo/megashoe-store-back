# MegaShoestore - Backend

API utilizada no e-commerce MegaShoestore. Possui as funcionalidades básicas de um e-commerce:

- Login
- Cadastro
- Listagem de produtos
- Listagem de pedidos
- Baixa de itens
- Controle de estoque
- Registro de pedidos

## Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Autores

- [@MatheusW166](https://github.com/MatheusW166)
- [@lgmacedo](https://github.com/lgmacedo)
- [@aabenjamin](https://github.com/aabenjamim)

## Endpoints

### Cadastro

```curl
POST /cadastro
```

#### Requisição
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | Nome do usuário |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `senha`      | `string` | Senha com pelo menos 6 caracteres |

#### Resposta
Nenhuma

<hr/>

### Login

```curl
POST /
```

#### Requisição
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `senha`      | `string` | Senha com pelo menos 6 caracteres |

#### Resposta
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `_id`      | `string` | Identificação do usuário |
| `email`      | `string` | Email no formato `xxxx@xxxx.xx` |
| `nome`      | `string` | Nome do usuário |
| `token` | `string` | Token de autenticação para rotas privadas |

<hr/>

```diff
-Todas as rotas abaixo necessitam do header Authorization: "Bearer ${token}"
```

### Listar produtos

```curl
GET /produtos
```

#### Requisição
Nada

#### Resposta

| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `Array`<[Produto](#produto)> | Array de produtos |

##### Produto
| Campo   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `_id`      | `string` | Identificação do produto |
| `nome`      | `string` | Nome registrado |
| `descricao`      | `string` | Breve descrição do produto |
| `imagem` | `string` | Imagem em PNG |
| `quantidade` | `number` | Quantidade disponível em estoque |
| `preco` | `number` | Preço do produto em reais |

<hr />

### Listar produtos por IDs

#### Requisição
| Query   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ids`      | `Array<string>` | Array com os ids dos produtos |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `Array`<[Produto](#produto)> | Array de produtos |

<hr />

### Obter produto por ID

```curl
GET /produtos/:idProduto
```

#### Requisição

| Parâmetro | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProduto`      | `string` | ID do produto desejado |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| [Produto](#produto) | Produto encontrado no estoque |

<hr />

### Checar se um produto está disponível

```curl
GET /produtos/checar/:idProduto
```

#### Requisição

| Parâmetro | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProduto`      | `string` | ID do produto que deseja checar |

#### Resposta
| Tipo       | Descrição                                   |
| :--------- | :------------------------------------------ |
| `bool` | Indica se o produto está disponível ou não |

<hr />
