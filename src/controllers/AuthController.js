import AuthService from "../services/AuthService.js";
import { handleResult } from '../middlewares/handleResult.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AuthController {
    // Login
    login = asyncWrapper(async (req, res) => {
        const { email, senha } = req.body;

        // Verificar se o email e senha estão corretos
        const result = await AuthService.login(email, senha);

        // Se o login for bem-sucedido, result.success será true, caso contrário, result.error será definido
        return handleResult(result, res); // 200: Success ou 401: Unauthorized
    });  
}

export default new AuthController();