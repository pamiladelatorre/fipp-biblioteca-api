import { pool } from '../config/db.js';

export async function query(sql, params = [], conn = null) {
    try {
        const executor = conn || pool;
        const [rows] = await executor.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('[Database][Query] Erro ao executar query:', err);
        throw new Error(`[Database][Query] ${err.message}`);
    }
}

export async function execute(sql, params = [], conn = null) {
    try {
        const executor = conn || pool;
        const [result] = await executor.execute(sql, params);
        return result;
    } catch (err) {
        console.error('[Database][Execute] Erro ao executar execute:', err);
        throw new Error(`[Database][Execute] ${err.message}`);
    }
}

export async function transaction(callback) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (err) {
        await connection.rollback();
        console.error('[Database][Transaction] Erro na transação:', err); // Log detalhado do erro
        throw new Error(`[Database][Transaction] ${err.message}`);
    } finally {
        connection.release();
    }
}

// Exemplo de uso de transação
// import { transaction } from '../infra/db.js';

// await transaction(async (conn) => {
//     await conn.execute('UPDATE contas SET saldo = saldo - ? WHERE id = ?', [100, 1]);
//     await conn.execute('UPDATE contas SET saldo = saldo + ? WHERE id = ?', [100, 2]);
// });
