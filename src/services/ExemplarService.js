import Exemplar from "../models/Exemplar.js";
import ExemplarDAO from "../data/ExemplarDAO.js";
import { notFoundIfNull, notFoundIfEmpty, normalizeToBit } from '../utils/ServiceHelpers.js';
import { Result } from '../utils/Result.js';

class ExemplarService {

    async obterPorFiltro({ acervo, tombo, status, estado }){
        const filtro = {
            ...(acervo && { titulo: { valor: acervo, like: true } }),
            ...(tombo && { tombo: { valor: tombo, like: true } }),
            ...(status && { status: { valor: status } }),
            ...(estado && { estado: { valor: estado } })
        };
        const exemplares = await ExemplarDAO.buscarPorFiltro(filtro);
        return notFoundIfEmpty(exemplares, 'Exemplar');
    }
}

export default new ExemplarService();