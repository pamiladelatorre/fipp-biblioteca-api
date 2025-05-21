import UsuarioDAO from "../data/UsuarioDAO.js";
import { Result } from '../utils/Result.js';
import { errorFactory } from '../utils/errorFactory.js';
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils.js";

class AuthService {
    async login(email, senha){
        // Buscar usuário no banco de dados
        const usuario = await UsuarioDAO.buscarPorEmail(email);
        
        if(!usuario)
            return Result.fail(errorFactory('Unauthorized', 'E-mail ou senha inválidos.'));

        // Verificar senha
        const isPasswordValid  = await bcrypt.compare(senha, usuario.senha);
         
        if (!isPasswordValid)
            return Result.fail(errorFactory('Unauthorized', 'E-mail ou senha inválidos.'));

        // Gerar token
        const token = generateToken({ id: usuario.id, nome: usuario.nome, perfil: usuario.tipoUsuario, primeiroAcesso: usuario.primeiroAcesso});

        return Result.ok(token);
    }
}

export default new AuthService();