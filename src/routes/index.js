import { Router } from 'express';

import auth from "../middlewares/auth.js";
import authRoutes from './auth.routes.js';
import acervoRoutes from './acervo.routes.js'
import autorRoutes from './autor.routes.js'
import categoriaRoutes from './categoria.routes.js'
import fornecedorRoutes from './fornecedor.routes.js'
import generoRoutes from './genero.routes.js';
import motivoBaixaRoutes from './motivoBaixa.routes.js'
import usuarioRoutes from './usuario.routes.js'

const authRouter = Router();
authRouter.use(auth);  // Aplica o middleware auth a todas as rotas subsequentes

authRouter.use('/acervos', acervoRoutes);
authRouter.use('/autores', autorRoutes);
authRouter.use('/categorias', categoriaRoutes);
authRouter.use('/fornecedores', fornecedorRoutes);
authRouter.use('/generos', generoRoutes);
authRouter.use('/motivos-baixas', motivoBaixaRoutes);
authRouter.use('/usuarios', usuarioRoutes);

export default (app) => {
    app.use('/auth', authRoutes); // Rota pública
    app.use('/api', authRouter);  // Rota privada com autenticação
}