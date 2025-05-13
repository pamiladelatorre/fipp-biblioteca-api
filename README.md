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

## 📁 Estrutura de pastas

```
src/
  config/           # Configurações
  controllers/      # Requisições
  data/             # Dados mock
  infra/            # DB e serviços externos
  middlewares/      # Autenticação, etc.
  models/           # Schemas/ORM
  routes/           # Rotas Express
  services/         # Regras de negócio
  utils/            # Helpers
  validations/      # Joi/Yup
app.js              # Monta a app Express
server.js           # Inicia o servidor
.env                # Variáveis de ambiente
```

## 🚀 Como executar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/unitech-biblioteca-api.git
cd unitech-biblioteca-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
PORT=3000
DATABASE_URL=mongodb://localhost:27017/biblioteca
JWT_SECRET=minha_chave_secreta
```

### 4. Inicie o servidor
```bash
npm run dev
```
A API estará disponível em: http://localhost:3000