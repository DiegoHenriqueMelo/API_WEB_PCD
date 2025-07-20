// server/data/connect.ts (ou .js)
import { Pool } from "pg";
import "dotenv/config";

/**
 * Configuração do pool de conexões com o banco PostgreSQL,
 * utilizando variáveis de ambiente para dados sensíveis.
 */
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

/**
 * Evento disparado quando a conexão com o banco é estabelecida com sucesso.
 */
pool.on("connect", () => {
  console.log("✅ Conectado ao PostgreSQL via Pool!");
});

/**
 * Evento para captura de erros inesperados no pool de conexões.
 * Importante para monitoramento e tratamento de falhas.
 * @param err - Objeto de erro retornado pelo pool
 */
pool.on("error", (err) => {
  console.error("❌ Erro inesperado no pool de conexões:", err);
});
