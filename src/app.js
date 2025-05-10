import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json()); // Parser para requisições com JSON
app.use(express.urlencoded({ extended: true })); // Suporte para form-urlencoded

// Rotas da aplicação
routes(app);

export default app;