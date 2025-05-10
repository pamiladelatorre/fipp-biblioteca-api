import Usuario from "../models/Usuario.js";
import UsuarioDAO from "../data/UsuarioDAO.js";
import bcrypt from "bcrypt";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';


class UsuarioService {
    async adicionar({ cpf, nome, dataNascimento, telefone, email, cep, endereco, tipoUsuario }){
        let usuario = await UsuarioDAO.buscarPorCpf(cpf);
        if(usuario)
            return Result.fail(errorFactory('Conflict', 'CPF já cadastrado.'));

        usuario = await UsuarioDAO.buscarPorEmail(email);
        if(usuario)
            return Result.fail(errorFactory('Conflict', 'E-mail já cadastrado.'));

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(cpf, salt)

        const novoUsuario = Usuario.criar(cpf, nome, dataNascimento, telefone, email, hashSenha, cep, endereco, tipoUsuario);
        usuario = await UsuarioDAO.inserir(novoUsuario);
       
        return Result.ok(usuario);
    }

    async obterPorId(id){
        const usuario = await UsuarioDAO.buscarPorId(id);
        return notFoundIfNull(usuario, 'Usuario');
    }

    async alterar({ id, cpf, nome, dataNascimento, telefone, email, senha, cep, endereco, tipoUsuario }){
        const usuario = await UsuarioDAO.buscarPorId(id);
        const validacao = notFoundIfNull(usuario, 'Usuario');
        if (validacao.isFailure) return validacao;

        usuario.alterar(cpf, nome, dataNascimento, telefone, email, senha, cep, endereco, tipoUsuario);
        await UsuarioDAO.atualizar(usuario);
        return Result.ok(usuario);
    }

    async alterarStatusBloqueado(id, bloqueado){
        const usuario = await UsuarioDAO.buscarPorId(id);
        const validacao = notFoundIfNull(usuario, 'Usuario');
        if (validacao.isFailure) return validacao;

        usuario.alterarBloqueado(bloqueado);
        await UsuarioDAO.atualizar(usuario);
        return Result.ok();
    }

    async alterarStatusAtivo(id, ativo){
        const usuario = await UsuarioDAO.buscarPorId(id);
        const validacao = notFoundIfNull(usuario, 'Usuario');
        if (validacao.isFailure) return validacao;

        usuario.alterarAtivo(ativo);
        await UsuarioDAO.atualizar(usuario);
        return Result.ok();
    }

    async obterPorFiltro({ descricao, ativo }){
        const filtro = {
            ...(descricao && { descricao: { valor: descricao, like: true } }),
            ...(ativo !== undefined && { ativo: { valor: normalizeToBit(ativo) } })
        };
        const usuarios = await UsuarioDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(usuarios, 'Usuario');
    }
}

export default new UsuarioService();