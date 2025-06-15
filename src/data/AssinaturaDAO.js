import BaseDAO from './BaseDAO.js';
import Assinatura from '../models/Assinatura.js';

class AssinaturaDAO extends BaseDAO {
  constructor() {
    super('assinaturas');
  }

  static getInstance() {
    return BaseDAO.getInstance(AssinaturaDAO);
  }

  mapRowToEntity(row) {
    return new Assinatura(
      row.id,
      row.fornecedor_id,
      row.descricao,
      row.periodicidade,
      row.numero_contrato,
      row.valor,
      row.data_inicio,
      row.data_fim,
      row.ativo,
      row.data_criacao,
      row.data_alteracao
    );
  }


  
  

 /* async buscarPorId(id) {
    const [row] = await query(`SELECT * FROM assinaturas WHERE id = ?`, [id]);
    return row ? this.mapRowToEntity(row) : null;
  }


  async atualizar(assinatura) {
    if (!(assinatura instanceof Assinatura)) throw new Error("Instância inválida de Assinatura.");

    await transaction(async (conn) => {
      await super.atualizar(assinatura, conn, ['dataCriacao']);
    });

    return assinatura;
  }

  async atualizarAtivo(assinatura) {
    if (!(assinatura instanceof Assinatura)) throw new Error("Instância inválida de Assinatura.");
    
    return super.atualizar(assinatura);
  }

  async buscarPorFornecedor(fornecedorId) {
    const rows = await query(`SELECT * FROM assinaturas WHERE fornecedor_id = ?`, [fornecedorId]);
    return rows.map(row => this.mapRowToEntity(row));
  }
}

function formatarDataParaMySQL(data) {
  if (!data) return null;
  return new Date(data).toISOString().split('T')[0]; // "2025-06-02"

}*/
}



export default AssinaturaDAO.getInstance();
