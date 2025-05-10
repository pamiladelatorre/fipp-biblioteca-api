import { verifyToken } from "../utils/jwtUtils.js";
import { Result } from "../utils/Result.js";
import { handleResult } from "./handleResult.js";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return handleResult(Result.fail('Acesso negado.', 'Unauthorized'), res);
    }
  
    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error.message || error);
        return handleResult(Result.fail(error.message, 'Unauthorized'), res)
    }
};

export default auth;