import { Router } from 'express';

import auth from "../middlewares/auth.js";
import authRoutes from './auth.routes.js';
import acervoRoutes from './acervo.routes.js';
import autorRoutes from './autor.routes.js';
import categoriaRoutes from './categoria.routes.js';
import compraRoutes from './compra.routes.js';
import entradaAcervoRoutes from './entradaAcervo.routes.js';
import exemplarRoutes from './exemplar.routes.js';
import fornecedorRoutes from './fornecedor.routes.js';
import generoRoutes from './genero.routes.js';
import infracaoRoutes from './infracao.routes.js';
import motivoBaixaRoutes from './motivoBaixa.routes.js';
import movimetacaoExemplarRoutes from './movimetacaoExemplar.routes.js';
import usuarioRoutes from './usuario.routes.js';
import doadorRoutes from './doador.routes.js';
import assinaturaRoutes from './assinatura.routes.js'

const authRouter = Router();
authRouter.use(auth);  // Aplica o middleware auth a todas as rotas subsequentes

authRouter.use('/acervos', acervoRoutes);
authRouter.use('/autores', autorRoutes);
authRouter.use('/categorias', categoriaRoutes);
authRouter.use('/compras', compraRoutes);
authRouter.use('/entradas-acervo', entradaAcervoRoutes);
authRouter.use('/exemplares', exemplarRoutes);
authRouter.use('/fornecedores', fornecedorRoutes);
authRouter.use('/generos', generoRoutes);
authRouter.use('/infracoes', infracaoRoutes);
authRouter.use('/motivos-baixa', motivoBaixaRoutes);
authRouter.use('/movimentacoes-exemplar', movimetacaoExemplarRoutes);
authRouter.use('/usuarios', usuarioRoutes);
authRouter.use('/doadores', doadorRoutes);
authRouter.use('/assinaura', assinaturaRoutes);


export default (app) => {
    app.use('/auth', authRoutes); // Rota pública
    app.use('/api', authRouter);  // Rota privada com autenticação
}