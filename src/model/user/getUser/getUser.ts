import * as DB from "../../../repositories/queryTools.js";

export let getUser = async (table: string): Promise<any> => {
  const logPrefix = `[getUser][Table: ${table}]`;

  try {
    console.info(`${logPrefix} - Iniciando consulta de todos os registros`);
    let result = await DB.selectFromTable(table);
    console.info(`${logPrefix} - Consulta finalizada com sucesso, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar dados:`, error);
    throw error;
  }
};

export let getUserByID = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getUserByID][Table: ${table}][ID: ${id}]`;

  try {
    console.info(`${logPrefix} - Iniciando consulta por ID`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(`${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar dados por ID:`, error);
    throw error;
  }
};

export let getColaborador = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getColaborador][Table: ${table}][ID: ${id}]`;

  try {
    console.info(`${logPrefix} - Iniciando consulta do colaborador`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(`${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar colaborador:`, error);
    throw error;
  }
};
