# Fipp Biblioteca API

API RESTful desenvolvida com Node.js e Express para o sistema de biblioteca da Fipp. Estruturada com foco em boas práticas de desenvolvimento, seguindo princípios de organização modular e separação de responsabilidades.

---

## 📚 Funcionalidades

- Gerenciamento de catálogo de acervos
- Empréstimos e devoluções
- Cadastro e autenticação de usuários
- Controle de exemplares
- Validações de entrada e tratamento de erros
- Estrutura pronta para escalar e manter

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- DAO
- JWT para autenticação
- Yup para validações
- Dotenv
- MVC orientado a serviços

---

## 📂 Estrutura de Diretórios

src/
├── config/ # Arquivos de configuração (banco, etc.)
├── controllers/ # Lógica de entrada das rotas
├── data/ # DAO
├── infra/ # Integrações com serviços externos, DB
├── middlewares/ # Middlewares de autenticação, log, etc.
├── models/ # Definição dos modelos (ORM/ODM)
├── routes/ # Definição de rotas da aplicação
├── services/ # Lógica de negócios central
├── utils/ # Funções utilitárias
├── validations/ # Schemas e validações de entrada
├── .env # Variáveis de ambiente
├── app.js # Configuração da aplicação
├── server.js # Ponto de entrada principal (start do servidor)
└── package.json # Gerenciador de dependências

---

## 🚀 Como executar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/unitech-biblioteca-api.git
cd unitech-biblioteca-api

npm install

PORT=3000
DATABASE_URL=mongodb://localhost:27017/biblioteca
JWT_SECRET=minha_chave_secreta

npm run dev