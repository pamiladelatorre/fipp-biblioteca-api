import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Verificar se as variáveis de ambiente necessárias estão presentes
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Erro: A variável de ambiente ${envVar} está ausente.`);
        process.exit(1); // Interrompe a aplicação caso as variáveis estejam ausentes
    }
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Valida a conexão no início da aplicação
(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Conexão com MySQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Falha ao conectar ao banco de dados:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
})();

export { pool };
